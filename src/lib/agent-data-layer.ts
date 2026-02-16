// Hybrid data layer that uses database when available, falls back to static data
import { aiAgentProviders, type AiAgentProvider as StaticAiAgentProvider } from "./ai-agent-data";
import {
  getAllAgentsFromDb,
  getFeaturedAgentsFromDb,
  getAgentBySlugFromDb,
  type AiAgentData,
} from "./db/agent-service";

// Check if we're in a build phase - use static data during build for faster builds
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build" ||
  process.env.NODE_ENV === "production" && typeof window === "undefined" && !process.env.VERCEL;

// Re-export the AiAgentProvider type for consistency
export type AiAgentProvider = StaticAiAgentProvider | AiAgentData;

// Helper to convert static AI Agent data to match AiAgentData interface
function staticToAiAgentData(agent: StaticAiAgentProvider): AiAgentData {
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

// Get all AI Agents - tries database first, falls back to static data
export async function getAllAgents(): Promise<AiAgentData[]> {
  // During build, use static data directly to avoid slow database timeouts
  if (isBuildPhase) {
    return aiAgentProviders.map(staticToAiAgentData).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  try {
    const dbAgents = await getAllAgentsFromDb();
    if (dbAgents.length > 0) {
      return dbAgents;
    }
  } catch (error) {
    console.warn("Database unavailable, using static AI Agent data:", error);
  }

  // Fallback to static data
  return aiAgentProviders.map(staticToAiAgentData).sort((a, b) => a.sortOrder - b.sortOrder);
}

// Get featured AI Agents - tries database first, falls back to static data
export async function getFeaturedAgents(): Promise<AiAgentData[]> {
  // During build, use static data directly to avoid slow database timeouts
  if (isBuildPhase) {
    return aiAgentProviders
      .filter((agent) => agent.featured)
      .map(staticToAiAgentData)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  try {
    const dbAgents = await getFeaturedAgentsFromDb();
    if (dbAgents.length > 0) {
      return dbAgents;
    }
  } catch (error) {
    console.warn("Database unavailable, using static AI Agent data:", error);
  }

  // Fallback to static data
  return aiAgentProviders
    .filter((agent) => agent.featured)
    .map(staticToAiAgentData)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

// Get AI Agent by slug - tries database first, falls back to static data
export async function getAgentBySlug(slug: string): Promise<AiAgentData | null> {
  // During build, use static data directly to avoid slow database timeouts
  if (isBuildPhase) {
    const staticAgent = aiAgentProviders.find((agent) => agent.slug === slug);
    return staticAgent ? staticToAiAgentData(staticAgent) : null;
  }

  try {
    const dbAgent = await getAgentBySlugFromDb(slug);
    if (dbAgent) {
      return dbAgent;
    }
  } catch (error) {
    console.warn("Database unavailable, using static AI Agent data:", error);
  }

  // Fallback to static data
  const staticAgent = aiAgentProviders.find((agent) => agent.slug === slug);
  return staticAgent ? staticToAiAgentData(staticAgent) : null;
}
