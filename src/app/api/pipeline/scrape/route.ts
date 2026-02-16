import { NextRequest, NextResponse } from "next/server";
import {
  scrapeAgentPricing,
  scrapeAgentNews,
  scrapeAllAgentData,
  scrapeUseCaseAgentData,
  saveScrapeJob,
} from "@/lib/pipeline/scraper";

function validatePipelineKey(request: NextRequest): boolean {
  const key =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-pipeline-key");
  return key === process.env.PIPELINE_SECRET;
}

export async function POST(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, agentSlug, useCaseSlug } = body as {
      type: "agent-data" | "pricing" | "news" | "use-case-agent";
      agentSlug?: string;
      useCaseSlug?: string;
    };

    if (!type) {
      return NextResponse.json(
        { error: "Missing required field: type" },
        { status: 400 }
      );
    }

    const startedAt = new Date();
    let results: unknown;
    let source: string;

    switch (type) {
      case "agent-data": {
        source = "all-agent-pricing-pages";
        results = await scrapeAllAgentData();
        break;
      }
      case "pricing": {
        if (!agentSlug) {
          return NextResponse.json(
            { error: "agentSlug is required for pricing scrape" },
            { status: 400 }
          );
        }
        source = `pricing:${agentSlug}`;
        results = await scrapeAgentPricing(agentSlug);
        break;
      }
      case "news": {
        source = "agent-news-sources";
        results = await scrapeAgentNews();
        break;
      }
      case "use-case-agent": {
        if (!useCaseSlug) {
          return NextResponse.json(
            { error: "useCaseSlug is required for use-case-agent scrape" },
            { status: 400 }
          );
        }
        source = `use-case-agent:${useCaseSlug}`;
        results = await scrapeUseCaseAgentData(useCaseSlug);
        break;
      }
      default:
        return NextResponse.json(
          { error: `Invalid type: ${type}` },
          { status: 400 }
        );
    }

    const jobId = await saveScrapeJob({
      type,
      source,
      agentSlug: agentSlug || useCaseSlug,
      status: "completed",
      result: JSON.stringify(results),
      startedAt,
      completedAt: new Date(),
    });

    return NextResponse.json({
      jobId,
      status: "completed",
      results,
    });
  } catch (error) {
    console.error("Pipeline scrape error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Try to save the failed job
    try {
      await saveScrapeJob({
        type: "unknown",
        source: "error",
        status: "failed",
        error: errorMessage,
        startedAt: new Date(),
        completedAt: new Date(),
      });
    } catch {
      // Ignore save errors
    }

    return NextResponse.json(
      { error: "Scrape failed", details: errorMessage },
      { status: 500 }
    );
  }
}
