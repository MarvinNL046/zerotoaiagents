# AI Agent Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace VPN-copied pipeline stubs with working AI agent scraping, blog generation, affiliate sync, and GitHub Actions workflows.

**Architecture:** Convex tables for persistence (blogPosts, pipelineJobs, scrapedAgentData). Next.js API routes authenticate via `x-pipeline-key` header and call Convex mutations/queries. Jina Reader API (free, no key) for web scraping. Existing `ai-provider.ts` (Claude + OpenAI failover) for content generation. GitHub Actions cron triggers the API routes daily.

**Tech Stack:** Convex, Next.js 16 App Router, TypeScript, Jina Reader API, Claude/OpenAI

---

## File Structure

### New Files
| File | Responsibility |
|------|----------------|
| `convex/blogPosts.ts` | Convex mutations/queries for blog posts |
| `convex/pipelineJobs.ts` | Convex mutations/queries for pipeline job tracking |
| `convex/scrapedAgentData.ts` | Convex mutations/queries for scraped agent data |

### Modified Files
| File | Changes |
|------|---------|
| `convex/schema.ts` | Add blogPosts, pipelineJobs, scrapedAgentData tables |
| `src/lib/pipeline/scraper.ts` | Implement Jina Reader scraping + AI pricing extraction |
| `src/lib/pipeline/blog-service.ts` | Wire to Convex instead of returning empty |
| `src/lib/pipeline/affiliate-sync.ts` | Implement HEAD-request link checker |
| `src/app/api/pipeline/scrape/route.ts` | Implement scrape endpoint |
| `src/app/api/pipeline/generate/route.ts` | Implement generate endpoint with start/status/publish |
| `src/app/api/pipeline/sync-links/route.ts` | Already has auth, just needs working sync function |
| `src/app/api/pipeline/status/route.ts` | Implement health check |
| `src/app/api/pipeline/posts/route.ts` | Implement blog posts management |
| `.github/workflows/agent-scrape.yml` | Adapt from VPN to AI agents, fix octal bug |
| `.github/workflows/content-generate.yml` | Minor model name fix |

---

## Task 1: Convex Schema — Add Tables

**Files:**
- Modify: `convex/schema.ts`

- [ ] **Step 1: Add blogPosts, pipelineJobs, and scrapedAgentData tables to schema**

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  emails: defineTable({
    email: v.string(),
    site: v.string(),
    locale: v.string(),
    subscribedAt: v.string(),
  })
    .index("by_email_site", ["email", "site"])
    .index("by_site", ["site"]),

  blogPosts: defineTable({
    slug: v.string(),
    language: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    seoTitle: v.string(),
    seoDescription: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    aiModel: v.string(),
    featuredImage: v.optional(v.string()),
    published: v.boolean(),
    publishedAt: v.optional(v.string()),
  })
    .index("by_slug_language", ["slug", "language"])
    .index("by_published", ["published"])
    .index("by_category", ["category"]),

  pipelineJobs: defineTable({
    type: v.string(),
    status: v.string(),
    agentSlug: v.optional(v.string()),
    result: v.optional(v.string()),
    error: v.optional(v.string()),
    startedAt: v.string(),
    completedAt: v.optional(v.string()),
  })
    .index("by_type_status", ["type", "status"])
    .index("by_status", ["status"]),

  scrapedAgentData: defineTable({
    agentSlug: v.string(),
    priceMonthly: v.optional(v.number()),
    priceYearly: v.optional(v.number()),
    hasFreeTier: v.optional(v.boolean()),
    freeTierInfo: v.optional(v.string()),
    rawContent: v.string(),
    sourceUrl: v.string(),
    scrapedAt: v.string(),
  })
    .index("by_agent", ["agentSlug"])
    .index("by_agent_date", ["agentSlug", "scrapedAt"]),
});
```

- [ ] **Step 2: Push schema to Convex**

Run: `cd /home/marvin/Projecten/zerotoaiagents && npx convex dev --once`
Expected: Schema syncs successfully, new tables created.

- [ ] **Step 3: Commit**

```bash
git add convex/schema.ts
git commit -m "feat: add blogPosts, pipelineJobs, scrapedAgentData tables to Convex schema"
```

---

## Task 2: Convex Functions — blogPosts

**Files:**
- Create: `convex/blogPosts.ts`

- [ ] **Step 1: Create blogPosts Convex functions**

```typescript
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    slug: v.string(),
    language: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    seoTitle: v.string(),
    seoDescription: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    aiModel: v.string(),
    featuredImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug_language", (q) =>
        q.eq("slug", args.slug).eq("language", args.language)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        published: existing.published,
        publishedAt: existing.publishedAt,
      });
      return existing._id;
    }

    return await ctx.db.insert("blogPosts", {
      ...args,
      published: false,
    });
  },
});

export const publish = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    const post = await ctx.db.get(id);
    if (!post) throw new Error("Post not found");
    await ctx.db.patch(id, {
      published: true,
      publishedAt: new Date().toISOString(),
    });
    return { slug: post.slug };
  },
});

export const unpublish = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { published: false });
  },
});

export const remove = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const getBySlug = query({
  args: { slug: v.string(), language: v.string() },
  handler: async (ctx, { slug, language }) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_slug_language", (q) =>
        q.eq("slug", slug).eq("language", language)
      )
      .first();
  },
});

export const listPublished = query({
  args: { language: v.optional(v.string()) },
  handler: async (ctx, { language }) => {
    const posts = await ctx.db
      .query("blogPosts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .collect();
    if (language) {
      return posts.filter((p) => p.language === language);
    }
    return posts;
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("blogPosts").collect();
  },
});

export const getById = query({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});
```

- [ ] **Step 2: Sync with Convex**

Run: `cd /home/marvin/Projecten/zerotoaiagents && npx convex dev --once`
Expected: Functions deployed successfully.

- [ ] **Step 3: Commit**

```bash
git add convex/blogPosts.ts
git commit -m "feat: add Convex blogPosts mutations and queries"
```

---

## Task 3: Convex Functions — pipelineJobs and scrapedAgentData

**Files:**
- Create: `convex/pipelineJobs.ts`
- Create: `convex/scrapedAgentData.ts`

- [ ] **Step 1: Create pipelineJobs Convex functions**

```typescript
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    type: v.string(),
    agentSlug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("pipelineJobs", {
      type: args.type,
      status: "pending",
      agentSlug: args.agentSlug,
      startedAt: new Date().toISOString(),
    });
  },
});

export const start = mutation({
  args: { id: v.id("pipelineJobs") },
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { status: "running" });
  },
});

export const complete = mutation({
  args: {
    id: v.id("pipelineJobs"),
    result: v.optional(v.string()),
  },
  handler: async (ctx, { id, result }) => {
    await ctx.db.patch(id, {
      status: "completed",
      result,
      completedAt: new Date().toISOString(),
    });
  },
});

export const fail = mutation({
  args: {
    id: v.id("pipelineJobs"),
    error: v.string(),
  },
  handler: async (ctx, { id, error }) => {
    await ctx.db.patch(id, {
      status: "failed",
      error,
      completedAt: new Date().toISOString(),
    });
  },
});

export const getById = query({
  args: { id: v.id("pipelineJobs") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const jobs = await ctx.db.query("pipelineJobs").order("desc").take(limit || 20);
    return jobs;
  },
});

export const countByStatus = query({
  args: {},
  handler: async (ctx) => {
    const jobs = await ctx.db.query("pipelineJobs").collect();
    const counts: Record<string, number> = {};
    for (const job of jobs) {
      counts[job.status] = (counts[job.status] || 0) + 1;
    }
    return counts;
  },
});
```

- [ ] **Step 2: Create scrapedAgentData Convex functions**

```typescript
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const upsert = mutation({
  args: {
    agentSlug: v.string(),
    priceMonthly: v.optional(v.number()),
    priceYearly: v.optional(v.number()),
    hasFreeTier: v.optional(v.boolean()),
    freeTierInfo: v.optional(v.string()),
    rawContent: v.string(),
    sourceUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("scrapedAgentData")
      .withIndex("by_agent", (q) => q.eq("agentSlug", args.agentSlug))
      .order("desc")
      .first();

    const data = {
      ...args,
      scrapedAt: new Date().toISOString(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    }
    return await ctx.db.insert("scrapedAgentData", data);
  },
});

export const getLatestByAgent = query({
  args: { agentSlug: v.string() },
  handler: async (ctx, { agentSlug }) => {
    return await ctx.db
      .query("scrapedAgentData")
      .withIndex("by_agent", (q) => q.eq("agentSlug", agentSlug))
      .order("desc")
      .first();
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("scrapedAgentData").collect();
  },
});
```

- [ ] **Step 3: Sync with Convex**

Run: `cd /home/marvin/Projecten/zerotoaiagents && npx convex dev --once`
Expected: Functions deployed successfully.

- [ ] **Step 4: Commit**

```bash
git add convex/pipelineJobs.ts convex/scrapedAgentData.ts
git commit -m "feat: add Convex pipelineJobs and scrapedAgentData functions"
```

---

## Task 4: Scraper Implementation

**Files:**
- Modify: `src/lib/pipeline/scraper.ts`

- [ ] **Step 1: Implement scraper with Jina Reader + AI pricing extraction**

Replace the entire file:

```typescript
import { aiAgentProviders } from "@/lib/ai-agent-data";
import { generateContent } from "./ai-provider";

export interface ScrapedPricing {
  agentSlug: string;
  priceMonthly?: number;
  priceYearly?: number;
  hasFreeTier?: boolean;
  freeTierInfo?: string;
  rawContent: string;
  sourceUrl: string;
}

export interface ScrapedNews {
  title: string;
  summary: string;
  source: string;
  url: string;
  date?: string;
  agentMentions: string[];
}

/**
 * Fetch clean text from a URL via Jina Reader API (free, no key required).
 */
export async function scrapeUrl(url: string): Promise<string> {
  const res = await fetch(`https://r.jina.ai/${url}`, {
    headers: { Accept: "text/plain" },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    throw new Error(`Jina Reader failed for ${url}: ${res.status}`);
  }
  const text = await res.text();
  // Limit to 8000 chars to stay within AI context limits
  return text.slice(0, 8000);
}

/**
 * Scrape an agent's website and extract pricing info via AI.
 */
export async function scrapeAgentPricing(agentSlug: string): Promise<ScrapedPricing> {
  const agent = aiAgentProviders.find((a) => a.slug === agentSlug);
  if (!agent) throw new Error(`Agent not found: ${agentSlug}`);

  const rawContent = await scrapeUrl(agent.website);

  // Use AI to extract structured pricing from raw text
  let priceMonthly: number | undefined;
  let priceYearly: number | undefined;
  let hasFreeTier: boolean | undefined;
  let freeTierInfo: string | undefined;

  try {
    const aiResponse = await generateContent({
      systemPrompt:
        "Extract pricing information from the following webpage text. Return ONLY valid JSON with these fields: { priceMonthly?: number, priceYearly?: number, hasFreeTier?: boolean, freeTierInfo?: string }. If a field cannot be determined, omit it. Numbers should be in USD. Do not include currency symbols.",
      userPrompt: `Extract pricing for "${agent.name}" from:\n\n${rawContent}`,
      temperature: 0.1,
      maxTokens: 500,
    });

    let raw = aiResponse.content.trim();
    if (raw.startsWith("```")) raw = raw.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
    const parsed = JSON.parse(raw);
    priceMonthly = typeof parsed.priceMonthly === "number" ? parsed.priceMonthly : undefined;
    priceYearly = typeof parsed.priceYearly === "number" ? parsed.priceYearly : undefined;
    hasFreeTier = typeof parsed.hasFreeTier === "boolean" ? parsed.hasFreeTier : undefined;
    freeTierInfo = typeof parsed.freeTierInfo === "string" ? parsed.freeTierInfo : undefined;
  } catch (err) {
    console.error(`AI pricing extraction failed for ${agentSlug}:`, (err as Error).message);
  }

  return {
    agentSlug,
    priceMonthly,
    priceYearly,
    hasFreeTier,
    freeTierInfo,
    rawContent,
    sourceUrl: agent.website,
  };
}

/**
 * Scrape pricing for all agents.
 */
export async function scrapeAllAgentData(): Promise<ScrapedPricing[]> {
  const results: ScrapedPricing[] = [];
  for (const agent of aiAgentProviders) {
    try {
      const data = await scrapeAgentPricing(agent.slug);
      results.push(data);
    } catch (err) {
      console.error(`Failed to scrape ${agent.slug}:`, (err as Error).message);
    }
  }
  return results;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/pipeline/scraper.ts
git commit -m "feat: implement scraper with Jina Reader API + AI pricing extraction"
```

---

## Task 5: Blog Service — Wire to Convex

**Files:**
- Modify: `src/lib/pipeline/blog-service.ts`

- [ ] **Step 1: Replace stubs with Convex queries**

Replace the entire file:

```typescript
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export interface BlogPost {
  id: string;
  slug: string;
  language: string;
  title: string;
  excerpt: string;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  category: string;
  tags: string[];
  featuredImage: string | null;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/** Map a Convex blogPost document to our BlogPost interface */
function toPublicPost(doc: {
  _id: string;
  _creationTime: number;
  slug: string;
  language: string;
  title: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  published: boolean;
  publishedAt?: string;
}): BlogPost {
  return {
    id: doc._id,
    slug: doc.slug,
    language: doc.language,
    title: doc.title,
    excerpt: doc.excerpt,
    content: doc.content,
    metaTitle: doc.seoTitle || null,
    metaDescription: doc.seoDescription || null,
    category: doc.category,
    tags: doc.tags,
    featuredImage: doc.featuredImage || null,
    published: doc.published,
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt) : null,
    createdAt: new Date(doc._creationTime),
    updatedAt: doc.publishedAt ? new Date(doc.publishedAt) : new Date(doc._creationTime),
  };
}

export async function getAllPublishedPosts(language = "en"): Promise<BlogPost[]> {
  try {
    const posts = await fetchQuery(api.blogPosts.listPublished, { language });
    return posts.map(toPublicPost);
  } catch (err) {
    console.error("Failed to fetch blog posts:", (err as Error).message);
    return [];
  }
}

export async function getPostBySlug(slug: string, language = "en"): Promise<BlogPost | null> {
  try {
    const doc = await fetchQuery(api.blogPosts.getBySlug, { slug, language });
    if (!doc || !doc.published) return null;
    return toPublicPost(doc);
  } catch (err) {
    console.error("Failed to fetch post:", (err as Error).message);
    return null;
  }
}

export async function getAllPublishedSlugs(): Promise<Array<{ slug: string; updatedAt: Date }>> {
  try {
    const posts = await fetchQuery(api.blogPosts.listPublished, {});
    return posts.map((p) => ({
      slug: p.slug,
      updatedAt: p.publishedAt ? new Date(p.publishedAt) : new Date(p._creationTime),
    }));
  } catch {
    return [];
  }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const doc = await fetchQuery(api.blogPosts.getById, { id: id as Id<"blogPosts"> });
    if (!doc) return null;
    return toPublicPost(doc);
  } catch {
    return null;
  }
}

export async function publishPost(id: string): Promise<void> {
  await fetchMutation(api.blogPosts.publish, { id: id as Id<"blogPosts"> });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/pipeline/blog-service.ts
git commit -m "feat: wire blog-service to Convex queries/mutations"
```

---

## Task 6: Affiliate Sync Implementation

**Files:**
- Modify: `src/lib/pipeline/affiliate-sync.ts`

- [ ] **Step 1: Implement affiliate link health checker**

Replace the entire file:

```typescript
import { aiAgentProviders } from "@/lib/ai-agent-data";

interface SyncResult {
  synced: number;
  total: number;
  broken: string[];
}

/**
 * Check all affiliate links by sending HEAD requests.
 * Returns which links are working and which are broken.
 */
export async function syncAffiliateLinks(): Promise<SyncResult> {
  const results: SyncResult = { synced: 0, total: 0, broken: [] };

  for (const agent of aiAgentProviders) {
    if (!agent.affiliateUrl) continue;
    results.total++;

    try {
      const res = await fetch(agent.affiliateUrl, {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(10_000),
      });

      if (res.ok || res.status === 301 || res.status === 302) {
        results.synced++;
      } else {
        results.broken.push(agent.slug);
        console.warn(`Broken affiliate link: ${agent.slug} → ${res.status}`);
      }
    } catch (err) {
      results.broken.push(agent.slug);
      console.warn(`Affiliate link error: ${agent.slug} → ${(err as Error).message}`);
    }
  }

  return results;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/pipeline/affiliate-sync.ts
git commit -m "feat: implement affiliate link health checker"
```

---

## Task 7: API Route — Scrape Endpoint

**Files:**
- Modify: `src/app/api/pipeline/scrape/route.ts`

- [ ] **Step 1: Implement the scrape API route**

Replace the entire file:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { scrapeAgentPricing } from "@/lib/pipeline/scraper";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

export const maxDuration = 120;

function validatePipelineKey(request: NextRequest): boolean {
  const key =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-pipeline-key");
  return !!key && key === process.env.PIPELINE_SECRET;
}

export async function POST(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, agentSlug } = body as { type: string; agentSlug?: string };

    if (type === "pricing" && agentSlug) {
      // Create pipeline job
      const jobId = await fetchMutation(api.pipelineJobs.create, {
        type: "scrape-pricing",
        agentSlug,
      });
      await fetchMutation(api.pipelineJobs.start, { id: jobId });

      try {
        const scraped = await scrapeAgentPricing(agentSlug);

        // Save scraped data
        await fetchMutation(api.scrapedAgentData.upsert, {
          agentSlug: scraped.agentSlug,
          priceMonthly: scraped.priceMonthly,
          priceYearly: scraped.priceYearly,
          hasFreeTier: scraped.hasFreeTier,
          freeTierInfo: scraped.freeTierInfo,
          rawContent: scraped.rawContent.slice(0, 4000),
          sourceUrl: scraped.sourceUrl,
        });

        await fetchMutation(api.pipelineJobs.complete, {
          id: jobId,
          result: JSON.stringify({
            priceMonthly: scraped.priceMonthly,
            priceYearly: scraped.priceYearly,
            hasFreeTier: scraped.hasFreeTier,
          }),
        });

        return NextResponse.json({
          success: true,
          agentSlug,
          priceMonthly: scraped.priceMonthly,
          priceYearly: scraped.priceYearly,
          hasFreeTier: scraped.hasFreeTier,
        });
      } catch (err) {
        await fetchMutation(api.pipelineJobs.fail, {
          id: jobId,
          error: (err as Error).message,
        });
        throw err;
      }
    }

    return NextResponse.json({ error: `Unknown scrape type: ${type}` }, { status: 400 });
  } catch (error) {
    console.error("Pipeline scrape error:", error);
    return NextResponse.json(
      { error: "Scrape failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/pipeline/scrape/route.ts
git commit -m "feat: implement pipeline scrape API route"
```

---

## Task 8: API Route — Generate Endpoint

**Files:**
- Modify: `src/app/api/pipeline/generate/route.ts`

- [ ] **Step 1: Implement the generate API route with start/status/publish phases**

Replace the entire file:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { generateContentForTopic } from "@/lib/pipeline/content-generator";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

export const maxDuration = 300;

function validatePipelineKey(request: NextRequest): boolean {
  const key =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-pipeline-key");
  return !!key && key === process.env.PIPELINE_SECRET;
}

export async function POST(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { phase, topic, model, publish: shouldPublish, jobId, postId } = body as {
      type: string;
      phase: string;
      topic?: string;
      model?: string;
      publish?: boolean;
      jobId?: string;
      postId?: string;
    };

    // Phase 1: Start generation
    if (phase === "start") {
      const pipelineJobId = await fetchMutation(api.pipelineJobs.create, {
        type: "generate-blog",
      });
      await fetchMutation(api.pipelineJobs.start, { id: pipelineJobId });

      // Pick topic: use index based on existing post count, or "auto"
      let topicIndex = 0;
      if (topic === "auto" || !topic) {
        const allPosts = await fetchQuery(api.blogPosts.listAll, {});
        topicIndex = allPosts.length % 9; // rotate through 9 topics
      }

      try {
        const generated = await generateContentForTopic(topicIndex);
        if (!generated) {
          await fetchMutation(api.pipelineJobs.fail, {
            id: pipelineJobId,
            error: "No content generated (topic index out of range)",
          });
          return NextResponse.json(
            { status: "failed", error: "No content generated" },
            { status: 500 }
          );
        }

        // Save to Convex
        const blogPostId = await fetchMutation(api.blogPosts.create, {
          slug: generated.slug,
          language: "en",
          title: generated.title,
          excerpt: generated.excerpt,
          content: generated.content,
          seoTitle: generated.seoTitle,
          seoDescription: generated.seoDescription,
          category: generated.type,
          tags: [generated.type, "ai-agents"],
          aiModel: model || "claude-haiku",
        });

        // Auto-publish if requested
        if (shouldPublish) {
          await fetchMutation(api.blogPosts.publish, { id: blogPostId as Id<"blogPosts"> });
        }

        await fetchMutation(api.pipelineJobs.complete, {
          id: pipelineJobId,
          result: JSON.stringify({ postId: blogPostId, slug: generated.slug }),
        });

        return NextResponse.json({
          jobId: pipelineJobId,
          status: "completed",
          postId: blogPostId,
          slug: generated.slug,
          title: generated.title,
        });
      } catch (err) {
        await fetchMutation(api.pipelineJobs.fail, {
          id: pipelineJobId,
          error: (err as Error).message,
        });
        return NextResponse.json(
          { status: "failed", error: (err as Error).message },
          { status: 500 }
        );
      }
    }

    // Phase 2: Check status
    if (phase === "status" && jobId) {
      const job = await fetchQuery(api.pipelineJobs.getById, {
        id: jobId as Id<"pipelineJobs">,
      });
      if (!job) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
      }

      const result = job.result ? JSON.parse(job.result) : {};
      return NextResponse.json({
        status: job.status,
        postId: result.postId,
        slug: result.slug,
        title: result.title,
        error: job.error,
      });
    }

    // Phase 3: Publish
    if (phase === "publish" && postId) {
      const result = await fetchMutation(api.blogPosts.publish, {
        id: postId as Id<"blogPosts">,
      });
      return NextResponse.json({ published: true, slug: result.slug });
    }

    return NextResponse.json({ error: "Invalid phase or missing params" }, { status: 400 });
  } catch (error) {
    console.error("Pipeline generate error:", error);
    return NextResponse.json(
      { error: "Generation failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/pipeline/generate/route.ts
git commit -m "feat: implement pipeline generate API with start/status/publish phases"
```

---

## Task 9: API Routes — Status and Posts

**Files:**
- Modify: `src/app/api/pipeline/status/route.ts`
- Modify: `src/app/api/pipeline/posts/route.ts`

- [ ] **Step 1: Implement status endpoint**

Replace `src/app/api/pipeline/status/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

function validatePipelineKey(request: NextRequest): boolean {
  const key =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-pipeline-key");
  return !!key && key === process.env.PIPELINE_SECRET;
}

export async function GET(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [jobCounts, recentJobs, allPosts] = await Promise.all([
      fetchQuery(api.pipelineJobs.countByStatus, {}),
      fetchQuery(api.pipelineJobs.listRecent, { limit: 10 }),
      fetchQuery(api.blogPosts.listAll, {}),
    ]);

    return NextResponse.json({
      jobs: jobCounts,
      recentJobs: recentJobs.map((j) => ({
        type: j.type,
        status: j.status,
        agentSlug: j.agentSlug,
        startedAt: j.startedAt,
        completedAt: j.completedAt,
      })),
      blogPosts: {
        total: allPosts.length,
        published: allPosts.filter((p) => p.published).length,
        draft: allPosts.filter((p) => !p.published).length,
      },
    });
  } catch (error) {
    console.error("Pipeline status error:", error);
    return NextResponse.json(
      { error: "Status check failed", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Implement posts management endpoint**

Replace `src/app/api/pipeline/posts/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

function validatePipelineKey(request: NextRequest): boolean {
  const key =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-pipeline-key");
  return !!key && key === process.env.PIPELINE_SECRET;
}

export async function GET(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await fetchQuery(api.blogPosts.listAll, {});
    return NextResponse.json({
      posts: posts.map((p) => ({
        id: p._id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        published: p.published,
        publishedAt: p.publishedAt,
        createdAt: new Date(p._creationTime).toISOString(),
      })),
    });
  } catch (error) {
    console.error("Pipeline posts error:", error);
    return NextResponse.json(
      { error: "Failed to list posts" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    await fetchMutation(api.blogPosts.remove, { id: id as Id<"blogPosts"> });
    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("Pipeline delete post error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/pipeline/status/route.ts src/app/api/pipeline/posts/route.ts
git commit -m "feat: implement pipeline status and posts management API routes"
```

---

## Task 10: GitHub Actions — Adapt Scrape Workflow

**Files:**
- Modify: `.github/workflows/agent-scrape.yml`

- [ ] **Step 1: Rewrite workflow for AI agents**

Replace the entire file with:

```yaml
name: Daily AI Agent Data Scrape & Sync

on:
  schedule:
    # Every day at 06:00 UTC
    - cron: "0 6 * * *"
  workflow_dispatch:

jobs:
  # Tier 1: Top 8 agents (most important, scrape daily)
  scrape-tier1:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    strategy:
      max-parallel: 3
      fail-fast: false
      matrix:
        agent:
          - cursor
          - claude-code
          - github-copilot
          - windsurf
          - devin
          - replit-agent
          - chatgpt
          - gemini

    steps:
      - name: Scrape ${{ matrix.agent }} pricing
        run: |
          echo "Scraping ${{ matrix.agent }}..."
          RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
            "${{ secrets.SITE_URL }}/api/pipeline/scrape" \
            -H "Content-Type: application/json" \
            -H "x-pipeline-key: ${{ secrets.PIPELINE_SECRET }}" \
            -d '{"type": "pricing", "agentSlug": "${{ matrix.agent }}"}' \
            --max-time 90)

          HTTP_CODE=$(echo "$RESPONSE" | tail -1)
          BODY=$(echo "$RESPONSE" | sed '$d')

          echo "Status: $HTTP_CODE"
          echo "$BODY" | head -c 300

          if [ "$HTTP_CODE" -ge 500 ]; then
            echo "::error::${{ matrix.agent }} scrape failed with $HTTP_CODE"
          fi

  # Tier 2: Remaining agents (rotate daily — scrape ~8 per day)
  scrape-tier2:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Scrape tier 2 agents (rotating batch)
        run: |
          ALL_AGENTS=(
            claude perplexity amazon-q-developer n8n-ai flowise
            relevance-ai make-ai zapier-central crewai autogen
            langgraph agentgpt salesforce-agentforce microsoft-copilot-studio
            google-vertex-ai-agent-builder intercom-fin zendesk-ai ada-ai
          )

          TOTAL=${#ALL_AGENTS[@]}
          BATCH_SIZE=8
          # Use day-of-year without leading zeros to avoid bash octal bug
          DAY=$(date +%-j)
          START=$(( (DAY * BATCH_SIZE) % TOTAL ))

          echo "Day $DAY: scraping $BATCH_SIZE agents starting at index $START (of $TOTAL total)"

          for i in $(seq 0 $((BATCH_SIZE - 1))); do
            IDX=$(( (START + i) % TOTAL ))
            AGENT=${ALL_AGENTS[$IDX]}

            echo ""
            echo "=== Scraping $AGENT ==="
            RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
              "${{ secrets.SITE_URL }}/api/pipeline/scrape" \
              -H "Content-Type: application/json" \
              -H "x-pipeline-key: ${{ secrets.PIPELINE_SECRET }}" \
              -d "{\"type\": \"pricing\", \"agentSlug\": \"$AGENT\"}" \
              --max-time 90)

            HTTP_CODE=$(echo "$RESPONSE" | tail -1)
            echo "Status: $HTTP_CODE"

            if [ "$HTTP_CODE" -ge 500 ]; then
              echo "::warning::$AGENT scrape failed with $HTTP_CODE"
            fi

            sleep 3
          done

  sync-links:
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - name: Sync affiliate links
        run: |
          echo "Checking affiliate link health..."
          RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
            "${{ secrets.SITE_URL }}/api/pipeline/sync-links" \
            -H "Content-Type: application/json" \
            -H "x-pipeline-key: ${{ secrets.PIPELINE_SECRET }}" \
            -d '{}' \
            --max-time 120)

          HTTP_CODE=$(echo "$RESPONSE" | tail -1)
          BODY=$(echo "$RESPONSE" | sed '$d')

          echo "Status: $HTTP_CODE"
          echo "$BODY"

          if [ "$HTTP_CODE" -ge 400 ]; then
            echo "::warning::Affiliate link sync returned $HTTP_CODE"
          fi

  health-check:
    runs-on: ubuntu-latest
    needs: [scrape-tier1, scrape-tier2, sync-links]
    if: always()
    timeout-minutes: 2

    steps:
      - name: Check pipeline health
        run: |
          echo "Checking pipeline health..."
          curl -s "${{ secrets.SITE_URL }}/api/pipeline/status" \
            -H "x-pipeline-key: ${{ secrets.PIPELINE_SECRET }}" \
            --max-time 30 | head -c 1000
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/agent-scrape.yml
git commit -m "feat: adapt scrape workflow from VPN to AI agents, fix octal bug"
```

---

## Task 11: GitHub Actions — Fix Content Generate Workflow

**Files:**
- Modify: `.github/workflows/content-generate.yml`

The workflow is already correct structurally. But since the generate endpoint now returns `status: "completed"` synchronously (no polling needed), simplify the workflow:

- [ ] **Step 1: Simplify content-generate workflow**

Replace the entire file:

```yaml
name: Daily Blog Post Generation

on:
  schedule:
    # Every day at 08:00 UTC
    - cron: "0 8 * * *"
  workflow_dispatch:
    inputs:
      topic:
        description: "Blog post topic (leave empty for auto-select)"
        required: false
        default: "auto"
      model:
        description: "AI model to use"
        required: false
        default: "claude-haiku"
        type: choice
        options:
          - claude-haiku
          - gpt-4o-mini
      publish:
        description: "Publish immediately?"
        required: false
        default: "true"
        type: choice
        options:
          - "true"
          - "false"

jobs:
  generate-and-publish:
    runs-on: ubuntu-latest
    timeout-minutes: 8

    steps:
      - name: Generate blog post
        id: generate
        run: |
          TOPIC="${{ github.event.inputs.topic || 'auto' }}"
          MODEL="${{ github.event.inputs.model || 'claude-haiku' }}"
          PUBLISH="${{ github.event.inputs.publish || 'true' }}"

          echo "Starting blog generation..."
          echo "  Topic: $TOPIC"
          echo "  Model: $MODEL"
          echo "  Publish: $PUBLISH"

          RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
            "${{ secrets.SITE_URL }}/api/pipeline/generate" \
            -H "Content-Type: application/json" \
            -H "x-pipeline-key: ${{ secrets.PIPELINE_SECRET }}" \
            -d "{\"type\": \"blog-post\", \"phase\": \"start\", \"topic\": \"$TOPIC\", \"model\": \"$MODEL\", \"publish\": $PUBLISH}" \
            --max-time 300)

          HTTP_CODE=$(echo "$RESPONSE" | tail -1)
          BODY=$(echo "$RESPONSE" | sed '$d')

          echo "Status: $HTTP_CODE"
          echo "$BODY" | head -c 500

          if [ "$HTTP_CODE" -ge 400 ]; then
            echo "::error::Blog generation failed with HTTP $HTTP_CODE"
            echo "$BODY"
            exit 1
          fi

          SLUG=$(echo "$BODY" | jq -r '.slug // empty')
          TITLE=$(echo "$BODY" | jq -r '.title // empty')
          POST_ID=$(echo "$BODY" | jq -r '.postId // empty')

          echo "slug=$SLUG" >> "$GITHUB_OUTPUT"
          echo "title=$TITLE" >> "$GITHUB_OUTPUT"
          echo "post_id=$POST_ID" >> "$GITHUB_OUTPUT"

          echo "Generated: $TITLE"

      - name: Summary
        run: |
          echo "Title: ${{ steps.generate.outputs.title }}"
          echo "Slug: ${{ steps.generate.outputs.slug }}"
          echo "Post ID: ${{ steps.generate.outputs.post_id }}"
          echo "URL: ${{ secrets.SITE_URL }}/blog/${{ steps.generate.outputs.slug }}"
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/content-generate.yml
git commit -m "feat: simplify blog generation workflow for synchronous API"
```

---

## Task 12: Set GitHub Secrets and Environment Variables

- [ ] **Step 1: Generate a pipeline secret**

Run:
```bash
PIPELINE_KEY=$(openssl rand -hex 32)
echo "Generated PIPELINE_SECRET: $PIPELINE_KEY"
```

- [ ] **Step 2: Set GitHub secrets**

Run:
```bash
gh secret set SITE_URL --repo MarvinNL046/zerotoaiagents --body "https://zerotoaiagents.com"
gh secret set PIPELINE_SECRET --repo MarvinNL046/zerotoaiagents --body "$PIPELINE_KEY"
```

Expected: Both secrets set successfully.

- [ ] **Step 3: Add PIPELINE_SECRET to Vercel**

Run:
```bash
cd /home/marvin/Projecten/zerotoaiagents
echo "$PIPELINE_KEY" | vercel env add PIPELINE_SECRET production preview development
```

Expected: Environment variable added.

- [ ] **Step 4: Add PIPELINE_SECRET to .env.local**

Append to `.env.local`:
```
PIPELINE_SECRET=<the generated key>
```

---

## Task 13: Push Convex Schema and Verify

- [ ] **Step 1: Push all Convex changes to production**

Run:
```bash
cd /home/marvin/Projecten/zerotoaiagents
npx convex deploy
```

Expected: Schema and functions deployed successfully.

- [ ] **Step 2: Verify locally**

Run the dev server and test the status endpoint:
```bash
curl -s http://localhost:3000/api/pipeline/status \
  -H "x-pipeline-key: <PIPELINE_SECRET>" | jq .
```

Expected: JSON response with jobs, recentJobs, blogPosts counts.

- [ ] **Step 3: Test scrape endpoint locally**

```bash
curl -s -X POST http://localhost:3000/api/pipeline/scrape \
  -H "Content-Type: application/json" \
  -H "x-pipeline-key: <PIPELINE_SECRET>" \
  -d '{"type": "pricing", "agentSlug": "cursor"}' | jq .
```

Expected: JSON with `success: true`, pricing data for Cursor.

- [ ] **Step 4: Test generate endpoint locally**

```bash
curl -s -X POST http://localhost:3000/api/pipeline/generate \
  -H "Content-Type: application/json" \
  -H "x-pipeline-key: <PIPELINE_SECRET>" \
  -d '{"type": "blog-post", "phase": "start", "topic": "auto", "model": "claude-haiku", "publish": true}' | jq .
```

Expected: JSON with `status: "completed"`, postId, slug, title.

---

## Task 14: Deploy, Push, and Trigger Workflow

- [ ] **Step 1: Push to GitHub**

```bash
cd /home/marvin/Projecten/zerotoaiagents
git push origin main
```

- [ ] **Step 2: Wait for Vercel deploy to complete**

Check deployment status:
```bash
vercel ls --limit 3
```

- [ ] **Step 3: Trigger scrape workflow manually**

```bash
gh workflow run agent-scrape.yml --repo MarvinNL046/zerotoaiagents
```

- [ ] **Step 4: Trigger generate workflow manually**

```bash
gh workflow run content-generate.yml --repo MarvinNL046/zerotoaiagents
```

- [ ] **Step 5: Verify workflow success**

```bash
gh run list --repo MarvinNL046/zerotoaiagents --limit 4
```

Expected: Both workflows show "completed/success".
