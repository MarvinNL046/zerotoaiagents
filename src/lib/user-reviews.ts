// User review types and mock data

export interface UserReview {
  id: string;
  agentSlug: string;
  authorName: string;
  authorEmail: string;
  authorCountry?: string;
  rating: number; // 1-5
  title: string;
  content: string;
  usageType?: "streaming" | "privacy" | "gaming" | "torrenting" | "work" | "general";
  usagePeriod?: "less-than-month" | "1-6-months" | "6-12-months" | "more-than-year";
  userPros: string[];
  userCons: string[];
  verified: boolean;
  approved: boolean;
  featured: boolean;
  helpfulCount: number;
  unhelpfulCount: number;
  newsletterConsent: boolean;
  consentDate?: Date;
  locale: string;
  createdAt: Date;
}

export interface ReviewFormData {
  agentSlug: string;
  authorName: string;
  authorEmail: string;
  authorCountry?: string;
  rating: number;
  title: string;
  content: string;
  usageType?: string;
  usagePeriod?: string;
  userPros: string[];
  userCons: string[];
  locale: string;
  newsletterConsent: boolean;
}

// Mock data for demonstration (will be replaced with database queries)
export const mockUserReviews: UserReview[] = [
  {
    id: "1",
    agentSlug: "cursor",
    authorName: "Michael T.",
    authorEmail: "michael@example.com",
    authorCountry: "US",
    rating: 5,
    title: "Best AI coding assistant ever!",
    content: "I've been using Cursor for over 6 months and it's transformed my development workflow. The AI suggestions are incredibly accurate, and the tab completion feels like magic. Integration with GPT-4 and Claude models gives amazing results. The inline chat for code editing is a game-changer.",
    usageType: "work",
    usagePeriod: "6-12-months",
    userPros: ["Incredibly accurate suggestions", "Tab completion feels magical", "Great model integration"],
    userCons: ["Subscription cost adds up"],
    verified: true,
    approved: true,
    featured: true,
    helpfulCount: 45,
    unhelpfulCount: 3,
    newsletterConsent: true,
    consentDate: new Date("2026-01-15"),
    locale: "en",
    createdAt: new Date("2026-01-15"),
  },
  {
    id: "2",
    agentSlug: "cursor",
    authorName: "Emma S.",
    authorEmail: "emma@example.com",
    authorCountry: "GB",
    rating: 4,
    title: "Great for daily coding",
    content: "Cursor works well for my daily development tasks. The AI code completion is fast and usually relevant. Sometimes it suggests overly complex solutions when simpler ones exist. Overall, a solid coding assistant.",
    usageType: "work",
    usagePeriod: "1-6-months",
    userPros: ["Fast completion", "Usually relevant", "Good for daily tasks"],
    userCons: ["Sometimes over-complicates", "Can be slow on large files"],
    verified: true,
    approved: true,
    featured: false,
    helpfulCount: 28,
    unhelpfulCount: 5,
    newsletterConsent: false,
    locale: "en",
    createdAt: new Date("2025-11-20"),
  },
  {
    id: "3",
    agentSlug: "cursor",
    authorName: "Jan de V.",
    authorEmail: "jan@example.com",
    authorCountry: "NL",
    rating: 5,
    title: "Uitstekende AI code-assistent",
    content: "Ik gebruik Cursor nu meer dan een jaar en ben zeer tevreden. De AI-suggesties zijn uitstekend, vooral voor complexe refactoring. De integratie met verschillende AI-modellen is geweldig. Zeker aan te raden!",
    usageType: "work",
    usagePeriod: "more-than-year",
    userPros: ["Uitstekende suggesties", "Geweldige refactoring", "Multi-model support"],
    userCons: ["Prijs kan lager"],
    verified: true,
    approved: true,
    featured: false,
    helpfulCount: 15,
    unhelpfulCount: 1,
    newsletterConsent: true,
    consentDate: new Date("2025-12-10"),
    locale: "nl",
    createdAt: new Date("2025-12-10"),
  },
  {
    id: "4",
    agentSlug: "claude",
    authorName: "David L.",
    authorEmail: "david@example.com",
    authorCountry: "DE",
    rating: 5,
    title: "The most helpful AI assistant",
    content: "Claude has become my go-to AI for everything from writing to analysis. The reasoning capabilities are impressive and the responses are thoughtful. Claude Pro is worth every penny for the extended usage limits.",
    usageType: "work",
    usagePeriod: "6-12-months",
    userPros: ["Excellent reasoning", "Thoughtful responses", "Great for analysis"],
    userCons: ["Can be verbose at times"],
    verified: true,
    approved: true,
    featured: true,
    helpfulCount: 38,
    unhelpfulCount: 4,
    newsletterConsent: false,
    locale: "en",
    createdAt: new Date("2026-01-20"),
  },
  {
    id: "5",
    agentSlug: "github-copilot",
    authorName: "James R.",
    authorEmail: "james@example.com",
    authorCountry: "AU",
    rating: 4,
    title: "Solid AI pair programmer",
    content: "GitHub Copilot is the gold standard for in-IDE code completion. It understands context well and the suggestions are usually on point. Works great across multiple IDEs. Could be better at understanding larger codebases though.",
    usageType: "work",
    usagePeriod: "more-than-year",
    userPros: ["Gold standard completion", "Multi-IDE support", "Good context awareness"],
    userCons: ["Struggles with large codebases", "Occasional irrelevant suggestions"],
    verified: true,
    approved: true,
    featured: true,
    helpfulCount: 42,
    unhelpfulCount: 6,
    newsletterConsent: false,
    locale: "en",
    createdAt: new Date("2025-10-05"),
  },
  {
    id: "6",
    agentSlug: "n8n-ai",
    authorName: "Anna K.",
    authorEmail: "anna@example.com",
    authorCountry: "PL",
    rating: 4,
    title: "Perfect for workflow automation",
    content: "n8n AI is perfect for someone looking to automate workflows without heavy coding. The visual interface is intuitive and the AI features make complex automations accessible. The self-hosting option is a huge plus for privacy-conscious teams.",
    usageType: "work",
    usagePeriod: "1-6-months",
    userPros: ["Intuitive visual interface", "Great AI features", "Self-hosting option"],
    userCons: ["Learning curve for complex workflows", "Limited templates"],
    verified: true,
    approved: true,
    featured: false,
    helpfulCount: 20,
    unhelpfulCount: 3,
    newsletterConsent: true,
    consentDate: new Date("2025-12-15"),
    locale: "en",
    createdAt: new Date("2025-12-15"),
  },
  {
    id: "7",
    agentSlug: "crewai",
    authorName: "Marcus W.",
    authorEmail: "marcus@example.com",
    authorCountry: "CH",
    rating: 4,
    title: "Powerful multi-agent framework",
    content: "As a developer building AI applications, CrewAI is excellent for orchestrating multiple agents. The framework is well-designed and the documentation is solid. Still evolving but very promising for complex AI workflows.",
    usageType: "work",
    usagePeriod: "1-6-months",
    userPros: ["Well-designed framework", "Great for orchestration", "Good documentation"],
    userCons: ["Still evolving", "Can be complex for beginners"],
    verified: true,
    approved: true,
    featured: true,
    helpfulCount: 15,
    unhelpfulCount: 2,
    newsletterConsent: false,
    locale: "en",
    createdAt: new Date("2025-11-10"),
  },
];

// Helper functions to work with mock data (will be replaced with database queries)
export function getReviewsByAgentSlug(agentSlug: string, locale?: string): UserReview[] {
  return mockUserReviews
    .filter((review) => review.agentSlug === agentSlug && review.approved)
    .filter((review) => !locale || review.locale === locale || review.locale === "en")
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getAverageUserRating(agentSlug: string): { average: number; count: number } {
  const reviews = mockUserReviews.filter(
    (review) => review.agentSlug === agentSlug && review.approved
  );

  if (reviews.length === 0) {
    return { average: 0, count: 0 };
  }

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length,
  };
}

export function getFeaturedReviews(agentSlug: string): UserReview[] {
  return mockUserReviews
    .filter((review) => review.agentSlug === agentSlug && review.approved && review.featured)
    .sort((a, b) => b.helpfulCount - a.helpfulCount);
}

// Get all newsletter subscribers from reviews (GDPR compliant - only those who opted in)
export function getNewsletterSubscribers(): Array<{ email: string; name: string; locale: string; consentDate?: Date }> {
  return mockUserReviews
    .filter((review) => review.newsletterConsent)
    .map((review) => ({
      email: review.authorEmail,
      name: review.authorName,
      locale: review.locale,
      consentDate: review.consentDate,
    }));
}

// Usage type labels
export const usageTypeLabels: Record<string, Record<string, string>> = {
  en: {
    streaming: "Streaming",
    privacy: "Privacy & Security",
    gaming: "Gaming",
    torrenting: "Torrenting",
    work: "Remote Work",
    general: "General Use",
  },
  nl: {
    streaming: "Streaming",
    privacy: "Privacy & Beveiliging",
    gaming: "Gaming",
    torrenting: "Torrenting",
    work: "Thuiswerken",
    general: "Algemeen gebruik",
  },
};

// Usage period labels
export const usagePeriodLabels: Record<string, Record<string, string>> = {
  en: {
    "less-than-month": "Less than a month",
    "1-6-months": "1-6 months",
    "6-12-months": "6-12 months",
    "more-than-year": "More than a year",
  },
  nl: {
    "less-than-month": "Minder dan een maand",
    "1-6-months": "1-6 maanden",
    "6-12-months": "6-12 maanden",
    "more-than-year": "Meer dan een jaar",
  },
};
