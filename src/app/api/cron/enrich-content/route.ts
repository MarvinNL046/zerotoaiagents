import { NextRequest, NextResponse } from "next/server";
import { generateContentForTopic } from "@/lib/pipeline/content-generator";

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get the topic index from query params or default to 0
    const { searchParams } = new URL(req.url);
    const topicIndex = parseInt(searchParams.get("topic") || "0", 10);

    const result = await generateContentForTopic(topicIndex);

    if (!result) {
      return NextResponse.json({ message: "No more topics to generate or generation failed" }, { status: 200 });
    }

    // Log the result (content would be stored/published in a future iteration)
    console.log(`Generated ${result.type}: ${result.title} (${result.slug})`);
    console.log(`Content length: ${result.content.length} chars`);

    return NextResponse.json({
      success: true,
      title: result.title,
      slug: result.slug,
      type: result.type,
      contentLength: result.content.length,
      seoTitle: result.seoTitle,
    });
  } catch (error) {
    console.error("Content enrichment failed:", error);
    return NextResponse.json(
      { error: "Generation failed", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// Also support GET for Vercel Cron (Vercel cron sends GET requests)
export async function GET(req: NextRequest) {
  return POST(req);
}
