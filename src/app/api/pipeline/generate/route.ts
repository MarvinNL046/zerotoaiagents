import { NextRequest, NextResponse } from "next/server";
import { generateContentForTopic } from "@/lib/pipeline/content-generator";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

export const maxDuration = 300;

function validatePipelineKey(request: NextRequest): boolean {
  const key = request.headers.get("x-admin-key") || request.headers.get("x-pipeline-key");
  return !!key && key === process.env.PIPELINE_API_KEY;
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

      let topicIndex = 0;
      if (topic === "auto" || !topic) {
        const allPosts = await fetchQuery(api.blogPosts.listAll, {});
        topicIndex = allPosts.length % 9;
      }

      try {
        const generated = await generateContentForTopic(topicIndex);
        if (!generated) {
          await fetchMutation(api.pipelineJobs.fail, {
            id: pipelineJobId,
            error: "No content generated (topic index out of range)",
          });
          return NextResponse.json({ status: "failed", error: "No content generated" }, { status: 500 });
        }

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
        return NextResponse.json({ status: "failed", error: (err as Error).message }, { status: 500 });
      }
    }

    // Phase 2: Check status
    if (phase === "status" && jobId) {
      const job = await fetchQuery(api.pipelineJobs.getById, { id: jobId as Id<"pipelineJobs"> });
      if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
      const result = job.result ? JSON.parse(job.result) : {};
      return NextResponse.json({ status: job.status, postId: result.postId, slug: result.slug, error: job.error });
    }

    // Phase 3: Publish
    if (phase === "publish" && postId) {
      const result = await fetchMutation(api.blogPosts.publish, { id: postId as Id<"blogPosts"> });
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
