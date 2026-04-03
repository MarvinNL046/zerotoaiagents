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

const reviews: Record<string, ReviewContent> = {
  "cursor": cursorReview,
};

export function getReviewContent(slug: string): ReviewContent | null {
  return reviews[slug] || null;
}
