import { NextRequest, NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";

function validatePipelineKey(request: NextRequest): boolean {
  const key = request.headers.get("x-admin-key") || request.headers.get("x-pipeline-key");
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
