import { NextRequest, NextResponse } from "next/server";
import { scrapeAgentPricing } from "@/lib/pipeline/scraper";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";

export const maxDuration = 120;

function validatePipelineKey(request: NextRequest): boolean {
  const key = request.headers.get("x-admin-key") || request.headers.get("x-pipeline-key");
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
      const jobId = await fetchMutation(api.pipelineJobs.create, {
        type: "scrape-pricing",
        agentSlug,
      });
      await fetchMutation(api.pipelineJobs.start, { id: jobId });

      try {
        const scraped = await scrapeAgentPricing(agentSlug);

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
