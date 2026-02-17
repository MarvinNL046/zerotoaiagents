import { getDb, scrapeJobs } from "@/lib/db";

const JINA_API_KEY = process.env.JINA_API_KEY;
const JINA_READER_URL = "https://r.jina.ai";
const BRIGHT_DATA_API_KEY = process.env.BRIGHT_DATA_API_KEY;
const BRIGHT_DATA_ZONE = process.env.BRIGHT_DATA_ZONE || "web_unlocker1";

export interface ScrapedPricing {
  agentSlug: string;
  priceMonthly?: number;
  priceYearly?: number;
  priceTwoYear?: number;
  moneyBackDays?: number;
  freeTier?: boolean;
  rawContent: string;
  scrapedWith: "jina" | "brightdata";
}

export interface ScrapedNews {
  title: string;
  summary: string;
  source: string;
  url: string;
  date?: string;
  agentMentions: string[];
}

export interface ScrapedCountryData {
  countrySlug: string;
  countryName: string;
  freedomReport: string | null;
  recentNews: Array<{ title: string; summary: string; url: string }>;
  rawContent: string;
  scrapedAt: string;
}

// Fetch via Jina.ai Reader
async function scrapeWithJina(url: string): Promise<string> {
  const headers: Record<string, string> = {
    Accept: "text/markdown",
  };

  if (JINA_API_KEY) {
    headers["Authorization"] = `Bearer ${JINA_API_KEY}`;
  }

  const response = await fetch(`${JINA_READER_URL}/${url}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `Jina.ai scrape failed for ${url}: ${response.status} ${response.statusText}`
    );
  }

  return response.text();
}

// Fetch via Bright Data Web Unlocker API
async function scrapeWithBrightData(url: string): Promise<string> {
  if (!BRIGHT_DATA_API_KEY) {
    throw new Error("BRIGHT_DATA_API_KEY is not configured");
  }

  const response = await fetch(
    "https://api.brightdata.com/request",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BRIGHT_DATA_API_KEY}`,
      },
      body: JSON.stringify({
        zone: BRIGHT_DATA_ZONE,
        url,
        format: "raw",
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Bright Data scrape failed for ${url}: ${response.status} ${response.statusText}`
    );
  }

  return response.text();
}

// Main scrape function: tries Jina first, falls back to Bright Data
export async function scrapeUrl(url: string): Promise<{ content: string; provider: "jina" | "brightdata" }> {
  // Try Jina.ai first
  try {
    const content = await scrapeWithJina(url);
    if (content && content.length > 100) {
      return { content, provider: "jina" };
    }
    throw new Error("Jina returned empty or too short content");
  } catch (jinaError) {
    console.warn(
      `Jina.ai failed for ${url}, falling back to Bright Data:`,
      jinaError instanceof Error ? jinaError.message : jinaError
    );
  }

  // Fallback to Bright Data
  if (BRIGHT_DATA_API_KEY) {
    try {
      const content = await scrapeWithBrightData(url);
      return { content, provider: "brightdata" };
    } catch (brightError) {
      console.error(
        `Bright Data also failed for ${url}:`,
        brightError instanceof Error ? brightError.message : brightError
      );
      throw new Error(
        `All scrapers failed for ${url}. Jina and Bright Data both returned errors.`
      );
    }
  }

  throw new Error(
    `Jina.ai failed for ${url} and Bright Data is not configured (set BRIGHT_DATA_API_KEY)`
  );
}

// AI Agent pricing page URLs — all 26 providers
const AGENT_PRICING_URLS: Record<string, string> = {
  "claude-code": "https://claude.ai/code",
  "cursor": "https://cursor.com/pricing",
  "github-copilot": "https://github.com/features/copilot/plans",
  "windsurf": "https://codeium.com/windsurf/pricing",
  "replit-agent": "https://replit.com/pricing",
  "devin": "https://devin.ai/pricing",
  "amazon-q-developer": "https://aws.amazon.com/q/developer/pricing/",
  "n8n-ai": "https://n8n.io/pricing",
  "flowise": "https://flowiseai.com/pricing",
  "relevance-ai": "https://relevanceai.com/pricing",
  "make-ai": "https://www.make.com/en/pricing",
  "zapier-central": "https://zapier.com/pricing",
  "crewai": "https://www.crewai.com/pricing",
  "autogen": "https://microsoft.github.io/autogen/",
  "langgraph": "https://langchain-ai.github.io/langgraph/",
  "agentgpt": "https://agentgpt.reworkd.ai/pricing",
  "salesforce-agentforce": "https://www.salesforce.com/agentforce/pricing/",
  "microsoft-copilot-studio": "https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio#Pricing",
  "google-vertex-ai-agent-builder": "https://cloud.google.com/products/agent-builder#pricing",
  "intercom-fin": "https://www.intercom.com/pricing",
  "zendesk-ai": "https://www.zendesk.com/pricing/",
  "ada-ai": "https://www.ada.cx/pricing",
  "chatgpt": "https://openai.com/chatgpt/pricing",
  "claude": "https://claude.ai/",
  "gemini": "https://gemini.google.com/",
  "perplexity": "https://www.perplexity.ai/pro",
};

// Scrape pricing data for a specific AI agent
export async function scrapeAgentPricing(
  agentSlug: string
): Promise<ScrapedPricing> {
  const url = AGENT_PRICING_URLS[agentSlug];
  if (!url) {
    throw new Error(`No pricing URL configured for AI agent: ${agentSlug}`);
  }

  const { content, provider } = await scrapeUrl(url);

  return {
    agentSlug: agentSlug, // Keep field name for compatibility with existing schema
    rawContent: content,
    scrapedWith: provider,
  };
}

// AI agent news sources to scrape
const NEWS_SOURCES = [
  "https://www.techcrunch.com/tag/artificial-intelligence/",
  "https://www.theverge.com/ai-artificial-intelligence",
  "https://www.wired.com/tag/artificial-intelligence/",
];

// Scrape AI agent news from major tech outlets (parallel)
export async function scrapeAgentNews(): Promise<ScrapedNews[]> {
  const settled = await Promise.allSettled(
    NEWS_SOURCES.map(async (sourceUrl) => {
      const { content } = await scrapeUrl(sourceUrl);
      return {
        title: `AI Agent News from ${new URL(sourceUrl).hostname}`,
        summary: content.slice(0, 2000),
        source: new URL(sourceUrl).hostname,
        url: sourceUrl,
        date: new Date().toISOString(),
        agentMentions: extractAgentMentions(content),
      };
    })
  );

  const results: ScrapedNews[] = [];
  for (const r of settled) {
    if (r.status === "fulfilled") results.push(r.value);
    else console.error("News scrape failed:", r.reason);
  }
  return results;
}

// Scrape all known AI agent pricing pages (parallel in batches of 4)
export async function scrapeAllAgentData(): Promise<ScrapedPricing[]> {
  const entries = Object.entries(AGENT_PRICING_URLS);
  const results: ScrapedPricing[] = [];
  const BATCH_SIZE = 4;

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);

    const settled = await Promise.allSettled(
      batch.map(async ([slug]) => scrapeAgentPricing(slug))
    );

    for (const result of settled) {
      if (result.status === "fulfilled") {
        results.push(result.value);
      } else {
        console.error("Scrape failed:", result.reason);
      }
    }
  }

  return results;
}

// Extract AI agent brand mentions from scraped content
function extractAgentMentions(content: string): string[] {
  const agentNames = [
    "Claude Code", "Cursor", "GitHub Copilot", "Windsurf", "Codeium",
    "Replit Agent", "Devin", "Amazon Q Developer", "n8n", "Flowise",
    "Relevance AI", "Make", "Zapier", "CrewAI", "AutoGen", "LangGraph",
    "AgentGPT", "Salesforce Agentforce", "Microsoft Copilot Studio",
    "Google Vertex AI", "Intercom Fin", "Zendesk AI", "Ada",
    "ChatGPT", "OpenAI", "Claude", "Anthropic", "Gemini", "Perplexity",
  ];

  return agentNames.filter((name) =>
    content.toLowerCase().includes(name.toLowerCase())
  );
}

// Use case slug to name mapping for scraping
const USE_CASE_NAMES: Record<string, string> = {
  coding: "Software Development",
  marketing: "Marketing & Advertising",
  writing: "Writing & Content Creation",
  research: "Research & Analysis",
  "customer-support": "Customer Support",
  sales: "Sales & Lead Generation",
  "data-analysis": "Data Analysis & Business Intelligence",
  "hr-recruitment": "HR & Recruitment",
};

// Scrape use-case-specific AI agent data from multiple sources
export async function scrapeUseCaseAgentData(
  useCaseSlug: string
): Promise<ScrapedCountryData> {
  const useCaseName = USE_CASE_NAMES[useCaseSlug];
  if (!useCaseName) {
    throw new Error(`Unknown use case slug: ${useCaseSlug}`);
  }

  const year = new Date().getFullYear();

  // Scrape 3 sources in parallel for comprehensive data
  const results = await Promise.allSettled([
    // 1. AI agent news for this use case
    scrapeUseCaseNews(`https://s.jina.ai/${encodeURIComponent(`${useCaseName} AI agents automation ${year}`)}`),
    // 2. Best AI agent reviews for this use case
    scrapeUseCaseNews(`https://s.jina.ai/${encodeURIComponent(`best AI agents for ${useCaseName} ${year} review`)}`)
      .then((items) => items.map((item) => ({ ...item, title: `[Review] ${item.title}` }))),
    // 3. How-to guides for this use case
    scrapeUseCaseNews(`https://s.jina.ai/${encodeURIComponent(`how to use AI agents ${useCaseName} ${year} guide tutorial`)}`)
      .then((items) => items.map((item) => ({ ...item, title: `[Guide] ${item.title}` }))),
  ]);

  const recentNews: ScrapedCountryData["recentNews"] = [];
  for (let i = 0; i < results.length; i++) {
    if (results[i].status === "fulfilled") {
      const newsItems = (results[i] as PromiseFulfilledResult<ScrapedCountryData["recentNews"]>).value;
      recentNews.push(...newsItems);
    } else {
      console.warn(
        `[scraper] Source ${i} scrape failed for ${useCaseSlug}:`,
        (results[i] as PromiseRejectedResult).reason
      );
    }
  }

  const rawContent = recentNews.length > 0
    ? `RECENT NEWS & SOURCES (${recentNews.length} items):\n${recentNews.map((n) => `- ${n.title}: ${n.summary} (${n.url})`).join("\n")}`
    : "";

  const successCount = results.filter((r) => r.status === "fulfilled").length;
  console.log(`[scraper] ${useCaseName}: ${successCount}/${results.length} sources scraped, ${recentNews.length} news items`);

  if (recentNews.length === 0) {
    throw new Error(
      `No data could be scraped for ${useCaseName}. All ${results.length} sources failed.`
    );
  }

  return {
    countrySlug: useCaseSlug, // Keep field name for compatibility
    countryName: useCaseName,
    freedomReport: null,
    recentNews,
    rawContent,
    scrapedAt: new Date().toISOString(),
  };
}

// Scrape use-case-specific AI agent news via Jina.ai search
async function scrapeUseCaseNews(
  searchUrl: string
): Promise<Array<{ title: string; summary: string; url: string }>> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (JINA_API_KEY) {
    headers["Authorization"] = `Bearer ${JINA_API_KEY}`;
  }

  const response = await fetch(searchUrl, { method: "GET", headers });

  if (!response.ok) {
    throw new Error(`Jina search failed: ${response.status}`);
  }

  const data = await response.json();
  const items: Array<{ title: string; summary: string; url: string }> = [];

  // Jina search API returns { data: [{ title, description, url, content }] }
  const results = data.data || data.results || [];
  for (const item of results.slice(0, 5)) {
    items.push({
      title: item.title || "Untitled",
      summary: (item.description || item.content || "").slice(0, 300),
      url: item.url || "",
    });
  }

  return items;
}

// Save a scrape job record to the database
export async function saveScrapeJob(job: {
  type: string;
  source: string;
  agentSlug?: string;
  status: "pending" | "running" | "completed" | "failed";
  result?: string;
  error?: string;
  startedAt: Date;
  completedAt?: Date;
}): Promise<string> {
  const db = getDb();
  const [record] = await db
    .insert(scrapeJobs)
    .values({
      type: job.type,
      source: job.source,
      agentSlug: job.agentSlug ?? null,
      status: job.status,
      result: job.result ?? null,
      error: job.error ?? null,
      startedAt: job.startedAt,
      completedAt: job.completedAt ?? null,
    })
    .returning({ id: scrapeJobs.id });

  return record.id;
}
