import { NextRequest, NextResponse } from "next/server";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

function validatePipelineKey(request: NextRequest): boolean {
  const key = request.headers.get("x-admin-key") || request.headers.get("x-pipeline-key");
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
    return NextResponse.json({ error: "Failed to list posts" }, { status: 500 });
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
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
