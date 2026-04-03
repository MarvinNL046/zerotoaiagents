// Static data layer — uses ai-agent-data.ts directly.
// Database (Convex) integration will be added separately.
import { aiAgentProviders, type AiAgentProvider, type AiAgentData } from "./ai-agent-data";

export type { AiAgentData };

// Convert static AiAgentProvider to the normalized AiAgentData interface
function staticToAiAgentData(agent: AiAgentProvider): AiAgentData {
  return {
    id: agent.id,
    name: agent.name,
    slug: agent.slug,
    logo: agent.logo,
    screenshot: null,
    thumbnailImage: null,
    cardImage: null,
    ogImage: null,
    website: agent.website,
    affiliateUrl: agent.affiliateUrl,
    monthlyPrice: agent.monthlyPrice,
    annualPrice: agent.annualPrice,
    hasFreeTier: agent.hasFreeTier,
    freeTierLimits: agent.freeTierLimits ?? null,
    category: agent.category,
    subcategory: agent.subcategory ?? null,
    modelsSupported: agent.modelsSupported,
    integrations: agent.integrations,
    maxUsers: agent.maxUsers,
    apiAccess: agent.apiAccess,
    overallRating: agent.overallRating,
    easeOfUse: agent.easeOfUse,
    performance: agent.performance,
    valueForMoney: agent.valueForMoney,
    shortDescription: agent.shortDescription,
    pros: agent.pros,
    cons: agent.cons,
    features: agent.features,
    bestFor: agent.bestFor,
    editorChoice: agent.editorChoice,
    featured: agent.featured,
    sortOrder: agent.sortOrder,
  };
}

// Get all AI Agents sorted by sortOrder
export async function getAllAgents(): Promise<AiAgentData[]> {
  return aiAgentProviders
    .map(staticToAiAgentData)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

// Get featured AI Agents sorted by sortOrder
export async function getFeaturedAgents(): Promise<AiAgentData[]> {
  return aiAgentProviders
    .filter((agent) => agent.featured)
    .map(staticToAiAgentData)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

// Get AI Agent by slug
export async function getAgentBySlug(slug: string): Promise<AiAgentData | null> {
  const agent = aiAgentProviders.find((a) => a.slug === slug);
  return agent ? staticToAiAgentData(agent) : null;
}
