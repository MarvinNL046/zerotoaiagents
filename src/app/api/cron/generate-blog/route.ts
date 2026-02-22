import { NextRequest, NextResponse } from "next/server";
import { eq, and, asc, desc } from "drizzle-orm";
import { getDb, contentQueue, scrapeJobs, blogPosts } from "@/lib/db";
import {
  generateBlogPostText,
  generateBlogPostImages,
  autoSelectTopic,
} from "@/lib/pipeline/content-generator";
import { generateContent, type AiModel } from "@/lib/pipeline/ai-provider";
import { publishPost, getPostById } from "@/lib/pipeline/blog-service";
import { sendPostPublishedNotification } from "@/lib/resend";

// Vercel Cron: allow up to 300s on Pro plan (5 min).
// On Free plan this defaults to 60s which is enough for a single post
// text generation (~20-30s). Image generation can be skipped or done
// separately via the "images" phase.
export const maxDuration = 300;

// Vercel Cron Jobs send a GET request with Authorization header
export async function GET(request: NextRequest) {
  // Verify the request comes from Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();

  try {
    // === PHASE 1: Check for pending jobs in the content queue ===
    const [pendingJob] = await db
      .select()
      .from(contentQueue)
      .where(
        and(
          eq(contentQueue.status, "pending"),
          eq(contentQueue.type, "blog-post")
        )
      )
      .orderBy(asc(contentQueue.priority), asc(contentQueue.createdAt))
      .limit(1);

    if (!pendingJob) {
      // No pending jobs -- auto-generate a new post
      console.log("[cron/generate-blog] No pending jobs, auto-generating...");
      return await autoGeneratePost(db);
    }

    // Process the pending job
    console.log(
      `[cron/generate-blog] Processing job ${pendingJob.id}...`
    );

    // Mark as processing
    await db
      .update(contentQueue)
      .set({ status: "processing", attempts: pendingJob.attempts + 1 })
      .where(eq(contentQueue.id, pendingJob.id));

    // Parse job input
    const input = JSON.parse(pendingJob.input || "{}");
    const rawTopic: string | undefined = input.topic;
    const model: AiModel = (pendingJob.aiModel as AiModel) || "claude-haiku";
    const shouldPublish: boolean = input.publish ?? false;

    // Get recent scrape data for context
    const recentScrapes = await db
      .select()
      .from(scrapeJobs)
      .where(eq(scrapeJobs.status, "completed"))
      .orderBy(desc(scrapeJobs.createdAt))
      .limit(5);

    // Resolve topic
    const topic =
      !rawTopic || rawTopic === "auto"
        ? await autoSelectTopic(recentScrapes)
        : rawTopic;

    console.log(`[cron/generate-blog] Topic: "${topic}", Model: ${model}`);

    // Build scrape context
    const scrapeContext = recentScrapes
      .map((s) => s.result)
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 4000);

    // Generate blog post text (the fast part: ~20-30s)
    const post = await generateBlogPostText(
      topic,
      scrapeContext || null,
      model
    );

    // Ensure unique slug
    let finalSlug = post.slug;
    const [existingPost] = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, finalSlug), eq(blogPosts.language, "en")))
      .limit(1);

    if (existingPost) {
      const now = new Date();
      finalSlug = `${post.slug}-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      console.log(
        `[cron/generate-blog] Slug "${post.slug}" exists, using "${finalSlug}"`
      );
    }

    // Save the text-only post to DB first
    const [savedPost] = await db
      .insert(blogPosts)
      .values({
        slug: finalSlug,
        language: "en",
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        category: post.category,
        tags: post.tags,
        featuredImage: null,
        aiModel: model,
        aiPrompt: topic,
        sourceData: scrapeContext || null,
        published: false,
      })
      .returning();

    console.log(
      `[cron/generate-blog] Post saved: ${savedPost.id} "${savedPost.title}"`
    );

    // Try to generate images (may timeout on Free plan, that's OK)
    try {
      await generateBlogPostImages(post);

      // Update post with images
      const updateData: Record<string, unknown> = { updatedAt: new Date() };
      if (post.featuredImage) updateData.featuredImage = post.featuredImage;
      if (post.content !== savedPost.content) updateData.content = post.content;

      if (Object.keys(updateData).length > 1) {
        await db
          .update(blogPosts)
          .set(updateData)
          .where(eq(blogPosts.id, savedPost.id));
        console.log("[cron/generate-blog] Post updated with images");
      }
    } catch (imgErr) {
      console.warn("[cron/generate-blog] Image generation failed (non-fatal):", imgErr);
    }

    // Publish if requested
    if (shouldPublish) {
      await db
        .update(blogPosts)
        .set({ published: true, publishedAt: new Date() })
        .where(eq(blogPosts.id, savedPost.id));
      console.log("[cron/generate-blog] Post published");
    }

    // Mark job as completed
    await db
      .update(contentQueue)
      .set({
        status: "completed",
        output: JSON.stringify({
          postId: savedPost.id,
          slug: finalSlug,
          title: savedPost.title,
          published: shouldPublish,
        }),
        processedAt: new Date(),
      })
      .where(eq(contentQueue.id, pendingJob.id));

    // Translate to other languages (fire-and-forget via separate cron or inline)
    try {
      await translatePost(
        {
          slug: finalSlug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          category: post.category,
          tags: post.tags,
          featuredImage: post.featuredImage || null,
        },
        model,
        topic,
        shouldPublish
      );
    } catch (transErr) {
      console.warn("[cron/generate-blog] Translation failed (non-fatal):", transErr);
    }

    console.log("[cron/generate-blog] Done!");

    return NextResponse.json({
      success: true,
      postId: savedPost.id,
      slug: finalSlug,
      title: savedPost.title,
      published: shouldPublish,
    });
  } catch (error) {
    console.error("[cron/generate-blog] Failed:", error);

    return NextResponse.json(
      {
        error: "Blog generation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Auto-generate a post without a pending queue job
async function autoGeneratePost(db: ReturnType<typeof getDb>) {
  const model: AiModel = "claude-haiku";

  // Get recent scrape data
  const recentScrapes = await db
    .select()
    .from(scrapeJobs)
    .where(eq(scrapeJobs.status, "completed"))
    .orderBy(desc(scrapeJobs.createdAt))
    .limit(5);

  const topic = await autoSelectTopic(recentScrapes);
  console.log(`[cron/generate-blog] Auto-selected topic: "${topic}"`);

  const scrapeContext = recentScrapes
    .map((s) => s.result)
    .filter(Boolean)
    .join("\n\n")
    .slice(0, 4000);

  // Generate text
  const post = await generateBlogPostText(topic, scrapeContext || null, model);

  // Ensure unique slug
  let finalSlug = post.slug;
  const [existingPost] = await db
    .select({ id: blogPosts.id })
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, finalSlug), eq(blogPosts.language, "en")))
    .limit(1);

  if (existingPost) {
    const now = new Date();
    finalSlug = `${post.slug}-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  // Save to DB (as draft, not published)
  const [savedPost] = await db
    .insert(blogPosts)
    .values({
      slug: finalSlug,
      language: "en",
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      category: post.category,
      tags: post.tags,
      featuredImage: null,
      aiModel: model,
      aiPrompt: topic,
      sourceData: scrapeContext || null,
      published: false,
    })
    .returning();

  console.log(
    `[cron/generate-blog] Auto-generated draft: ${savedPost.id} "${savedPost.title}"`
  );

  // Try images
  try {
    await generateBlogPostImages(post);
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (post.featuredImage) updateData.featuredImage = post.featuredImage;
    if (post.content !== savedPost.content) updateData.content = post.content;

    if (Object.keys(updateData).length > 1) {
      await db
        .update(blogPosts)
        .set(updateData)
        .where(eq(blogPosts.id, savedPost.id));
    }
  } catch (imgErr) {
    console.warn("[cron/generate-blog] Image gen failed (non-fatal):", imgErr);
  }

  // Translate
  try {
    await translatePost(
      {
        slug: finalSlug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        category: post.category,
        tags: post.tags,
        featuredImage: post.featuredImage || null,
      },
      model,
      topic,
      false
    );
  } catch (transErr) {
    console.warn("[cron/generate-blog] Translation failed (non-fatal):", transErr);
  }

  return NextResponse.json({
    success: true,
    postId: savedPost.id,
    slug: finalSlug,
    title: savedPost.title,
    published: false,
    autoGenerated: true,
  });
}

// Translate a post to all supported languages
async function translatePost(
  englishPost: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
    category: string;
    tags: string[];
    featuredImage: string | null;
  },
  model: AiModel,
  topic: string,
  publish: boolean
) {
  const db = getDb();

  const targetLanguages = [
    { code: "nl", name: "Dutch" },
    { code: "de", name: "German" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "zh", name: "Chinese (Simplified)" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "th", name: "Thai" },
  ];

  console.log(
    `[cron/generate-blog] Translating to ${targetLanguages.length} languages...`
  );

  // Translate one language at a time to stay within time limits
  for (const lang of targetLanguages) {
    try {
      // Check if translation already exists
      const [existing] = await db
        .select({ id: blogPosts.id })
        .from(blogPosts)
        .where(
          and(
            eq(blogPosts.slug, englishPost.slug),
            eq(blogPosts.language, lang.code)
          )
        )
        .limit(1);

      if (existing) {
        console.log(`[cron/generate-blog] ${lang.code}: already exists, skipping`);
        continue;
      }

      const translatePrompt = `Translate the following blog post metadata and content to ${lang.name}.

RULES:
- Translate ALL text naturally and fluently — not word-for-word
- Keep ALL HTML tags, structure, and formatting exactly as-is
- Keep ALL URLs/links unchanged (do not translate URLs)
- Keep all <img> tags and their src/alt attributes unchanged
- Keep technical terms (AI, API, LLM, GPT, etc.) in English
- Translate the title, excerpt, metaTitle, and metaDescription too

Respond ONLY with valid JSON (no markdown blocks):
{
  "title": "translated title",
  "excerpt": "translated excerpt (max 160 chars)",
  "metaTitle": "translated SEO title (max 60 chars)",
  "metaDescription": "translated meta description (max 155 chars)",
  "content": "translated HTML content"
}

ORIGINAL ENGLISH POST:
Title: ${englishPost.title}
Excerpt: ${englishPost.excerpt}
MetaTitle: ${englishPost.metaTitle}
MetaDescription: ${englishPost.metaDescription}

Content:
${englishPost.content.slice(0, 12000)}`;

      const translatedRaw = await generateContent(translatePrompt, {
        model,
        maxTokens: 16384,
        temperature: 0.7,
      });

      // Parse translation
      let translated;
      try {
        let jsonStr = translatedRaw
          .trim()
          .replace(/^```(?:json)?\s*\n?/, "")
          .replace(/\n?\s*```\s*$/, "");
        const match = jsonStr.match(/\{[\s\S]*\}/);
        if (match) jsonStr = match[0];
        translated = JSON.parse(jsonStr);
      } catch {
        console.warn(
          `[cron/generate-blog] ${lang.code}: JSON parse failed, skipping`
        );
        continue;
      }

      if (!translated.title || !translated.content) {
        console.warn(
          `[cron/generate-blog] ${lang.code}: missing title/content, skipping`
        );
        continue;
      }

      // Save translation
      await db.insert(blogPosts).values({
        slug: englishPost.slug,
        language: lang.code,
        title: translated.title,
        excerpt: (translated.excerpt || englishPost.excerpt).slice(0, 160),
        content: translated.content,
        metaTitle: (translated.metaTitle || translated.title).slice(0, 60),
        metaDescription: (
          translated.metaDescription ||
          translated.excerpt ||
          ""
        ).slice(0, 155),
        category: englishPost.category,
        tags: englishPost.tags,
        featuredImage: englishPost.featuredImage,
        aiModel: model,
        aiPrompt: `${topic} [${lang.code}]`,
        sourceData: null,
        published: publish,
        publishedAt: publish ? new Date() : null,
      });

      console.log(`[cron/generate-blog] ${lang.code}: translated and saved`);
    } catch (langErr) {
      console.warn(
        `[cron/generate-blog] ${lang.code}: translation failed:`,
        langErr
      );
    }
  }

  console.log("[cron/generate-blog] All translations done!");
}
