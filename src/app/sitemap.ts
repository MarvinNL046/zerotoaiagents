import { MetadataRoute } from "next";
import { aiAgentProviders } from "@/lib/ai-agent-data";
import { getReviewContent } from "@/lib/review-content";
import { getAllPublishedSlugs } from "@/lib/pipeline/blog-service";

function toIsoDate(dateLike: string | Date): string {
  const date = typeof dateLike === "string"
    ? new Date(`${dateLike}T00:00:00.000Z`)
    : dateLike;

  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zerotoaiagents.com";
  const now = new Date().toISOString();
  const publishedBlogPosts = await getAllPublishedSlugs();

  const staticPages = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/reviews", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/compare", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/blog", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/guides", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/guides/what-are-ai-coding-agents", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/guides/how-to-choose-ai-coding-agent", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/guides/getting-started-ai-pair-programming", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/guides/ai-coding-agents-beginners-vs-experienced", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/guides/free-vs-paid-ai-coding-agents", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.4, changeFrequency: "monthly" as const },
    { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const comparisons = [
    "/compare/cursor-vs-github-copilot",
    "/compare/cursor-vs-windsurf",
    "/compare/github-copilot-vs-claude-code",
    "/compare/cursor-vs-windsurf-vs-github-copilot",
    "/compare/devin-vs-claude-code",
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of staticPages) {
    entries.push({
      url: `${baseUrl}${page.url}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // All 26 agent reviews
  for (const agent of aiAgentProviders) {
    const reviewContent = getReviewContent(agent.slug);
    entries.push({
      url: `${baseUrl}/reviews/${agent.slug}`,
      lastModified: reviewContent ? toIsoDate(reviewContent.lastUpdated) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Featured comparisons only
  for (const path of comparisons) {
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  for (const post of publishedBlogPosts) {
    entries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: toIsoDate(post.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
