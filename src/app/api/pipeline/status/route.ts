import { NextRequest, NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";

function validatePipelineKey(request: NextRequest): boolean {
  const key = request.headers.get("x-admin-key") || request.headers.get("x-pipeline-key");
  const secret = process.env.PIPELINE_API_KEY;
  console.log(`Auth debug: key_len=${key?.length} secret_len=${secret?.length} secret_set=${!!secret} match=${key === secret}`);
  return !!key && !!secret && key === secret;
}

export async function GET(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized", debug: {
      apiKeySet: !!process.env.PIPELINE_API_KEY,
      secretSet: !!process.env.PIPELINE_SECRET,
      geminiSet: !!process.env.GEMINI_API_KEY,
      cronSet: !!process.env.CRON_SECRET,
      envKeys: Object.keys(process.env).filter(k => !k.startsWith("npm_") && !k.startsWith("PATH") && !k.startsWith("NODE") && !k.startsWith("HOME")).sort().join(","),
    } }, { status: 401 });
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
