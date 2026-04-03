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

const reviews: Record<string, ReviewContent> = {
  "cursor": cursorReview,
  "claude-code": claudeCodeReview,
  "github-copilot": githubCopilotReview,
  "windsurf": windsurfReview,
  "devin": devinReview,
};

export function getReviewContent(slug: string): ReviewContent | null {
  return reviews[slug] || null;
}
