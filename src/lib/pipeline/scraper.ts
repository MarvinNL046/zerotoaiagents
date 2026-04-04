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

export async function scrapeUrl(url: string): Promise<string> {
  const jinaUrl = `https://r.jina.ai/${url}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(jinaUrl, {
      headers: { Accept: "text/plain" },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Jina Reader returned ${res.status} for ${url}`);
    }

    const text = await res.text();
    return text.slice(0, 8000);
  } finally {
    clearTimeout(timeout);
  }
}

export async function scrapeAgentPricing(agentSlug: string): Promise<ScrapedPricing> {
  const agent = aiAgentProviders.find((a) => a.slug === agentSlug);
  if (!agent) {
    throw new Error(`Agent not found: ${agentSlug}`);
  }

  const rawContent = await scrapeUrl(agent.website);

  const aiResponse = await generateContent({
    systemPrompt:
      "Extract pricing information from the following webpage text. Return ONLY valid JSON with these fields: { priceMonthly?: number, priceYearly?: number, hasFreeTier?: boolean, freeTierInfo?: string }. Numbers should be in USD.",
    userPrompt: rawContent,
    temperature: 0.1,
    maxTokens: 500,
  });

  let extracted: {
    priceMonthly?: number;
    priceYearly?: number;
    hasFreeTier?: boolean;
    freeTierInfo?: string;
  } = {};

  try {
    // Strip markdown fences if present
    let json = aiResponse.content.trim();
    if (json.startsWith("```")) {
      json = json.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    }

    const parsed = JSON.parse(json);

    if (typeof parsed === "object" && parsed !== null) {
      if (typeof parsed.priceMonthly === "number") extracted.priceMonthly = parsed.priceMonthly;
      if (typeof parsed.priceYearly === "number") extracted.priceYearly = parsed.priceYearly;
      if (typeof parsed.hasFreeTier === "boolean") extracted.hasFreeTier = parsed.hasFreeTier;
      if (typeof parsed.freeTierInfo === "string") extracted.freeTierInfo = parsed.freeTierInfo;
    }
  } catch {
    // If parsing fails, return raw content without pricing fields
    console.warn(`Failed to parse AI pricing response for ${agentSlug}:`, aiResponse.content);
  }

  return {
    agentSlug,
    ...extracted,
    rawContent,
    sourceUrl: agent.website,
  };
}

export async function scrapeAllAgentData(): Promise<ScrapedPricing[]> {
  const results: ScrapedPricing[] = [];

  for (const agent of aiAgentProviders) {
    try {
      const pricing = await scrapeAgentPricing(agent.slug);
      results.push(pricing);
    } catch (err) {
      console.error(`Failed to scrape ${agent.slug}:`, (err as Error).message);
    }
  }

  return results;
}
