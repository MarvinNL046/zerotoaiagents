// Scraper stub — Jina/BrightData integration placeholder.
// TODO: wire up JINA_API_KEY / BRIGHT_DATA_API_KEY when scraping is enabled.

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

export async function scrapeUrl(
  _url: string
): Promise<{ content: string; provider: "jina" | "brightdata" }> {
  throw new Error("Scraping not yet configured");
}

export async function scrapeAgentPricing(
  _agentSlug: string
): Promise<ScrapedPricing> {
  throw new Error("Scraping not yet configured");
}

export async function scrapeAgentNews(): Promise<ScrapedNews[]> {
  return [];
}

export async function scrapeAllAgentData(): Promise<ScrapedPricing[]> {
  return [];
}

export async function scrapeUseCaseAgentData(
  _useCaseSlug: string
): Promise<ScrapedCountryData> {
  throw new Error("Scraping not yet configured");
}

export async function saveScrapeJob(_job: {
  type: string;
  source: string;
  agentSlug?: string;
  status: "pending" | "running" | "completed" | "failed";
  result?: string;
  error?: string;
  startedAt: Date;
  completedAt?: Date;
}): Promise<string> {
  return "";
}
