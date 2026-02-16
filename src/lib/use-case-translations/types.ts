// Translatable content for use case pages
export interface UseCaseTranslation {
  name: string;
  heroSubtitle: string;
  description: string;
  whyAiAgents: string[];
  keyFeatures: string[];
  tips: string[];
  faq: { q: string; a: string }[];
}

export type UseCaseTranslations = Record<string, UseCaseTranslation>;
