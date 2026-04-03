export interface ReviewContent {
  slug: string;
  lastUpdated: string;
  readTime: string;
  keyTakeaways: string[];
  content: string; // Full HTML review
  sources: Array<{ name: string; url: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

// Import all reviews
import { cursorReview } from "./cursor";
import { claudeCodeReview } from "./claude-code";
import { githubCopilotReview } from "./github-copilot";
import { windsurfReview } from "./windsurf";
import { devinReview } from "./devin";
import { replitAgentReview } from "./replit-agent";
import { amazonQDeveloperReview } from "./amazon-q-developer";
import { chatgptReview } from "./chatgpt";
import { claudeReview } from "./claude";
import { geminiReview } from "./gemini";
import { perplexityReview } from "./perplexity";
import { n8nAiReview } from "./n8n-ai";
import { flowiseReview } from "./flowise";
import { relevanceAiReview } from "./relevance-ai";
import { makeAiReview } from "./make-ai";
import { zapierCentralReview } from "./zapier-central";

const reviews: Record<string, ReviewContent> = {
  "cursor": cursorReview,
  "claude-code": claudeCodeReview,
  "github-copilot": githubCopilotReview,
  "windsurf": windsurfReview,
  "devin": devinReview,
  "replit-agent": replitAgentReview,
  "amazon-q-developer": amazonQDeveloperReview,
  "chatgpt": chatgptReview,
  "claude": claudeReview,
  "gemini": geminiReview,
  "perplexity": perplexityReview,
  "n8n-ai": n8nAiReview,
  "flowise": flowiseReview,
  "relevance-ai": relevanceAiReview,
  "make-ai": makeAiReview,
  "zapier-central": zapierCentralReview,
};

export function getReviewContent(slug: string): ReviewContent | null {
  return reviews[slug] || null;
}
