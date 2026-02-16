import { eq, asc, count } from "drizzle-orm";
import { getDb, aiAgentProviders, type AiAgentProvider } from "./index";

// Type for AI Agent data that matches the frontend interface
export interface AiAgentData {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  screenshot: string | null;
  thumbnailImage: string | null;
  cardImage: string | null;
  ogImage: string | null;
  website: string;
  affiliateUrl: string;
  monthlyPrice: number;
  annualPrice: number;
  hasFreeTier: boolean;
  freeTierLimits: string | null;
  category: string;
  subcategory: string | null;
  modelsSupported: string[];
  integrations: string[];
  maxUsers: string;
  apiAccess: boolean;
  overallRating: number;
  easeOfUse: number;
  performance: number;
  valueForMoney: number;
  shortDescription: string | null;
  pros: string[];
  cons: string[];
  features: string[];
  bestFor: string | null;
  editorChoice: boolean;
  featured: boolean;
  sortOrder: number;
}

// Convert Drizzle AiAgentProvider to frontend AiAgentData
function toAiAgentData(agent: AiAgentProvider): AiAgentData {
  return {
    id: agent.id,
    name: agent.name,
    slug: agent.slug,
    logo: agent.logo,
    screenshot: agent.screenshot,
    thumbnailImage: agent.thumbnailImage,
    cardImage: agent.cardImage,
    ogImage: agent.ogImage,
    website: agent.website,
    affiliateUrl: agent.affiliateUrl,
    monthlyPrice: Number(agent.monthlyPrice),
    annualPrice: Number(agent.annualPrice),
    hasFreeTier: agent.hasFreeTier,
    freeTierLimits: agent.freeTierLimits,
    category: agent.category,
    subcategory: agent.subcategory,
    modelsSupported: agent.modelsSupported ?? [],
    integrations: agent.integrations ?? [],
    maxUsers: agent.maxUsers,
    apiAccess: agent.apiAccess,
    overallRating: Number(agent.overallRating),
    easeOfUse: Number(agent.easeOfUse),
    performance: Number(agent.performance),
    valueForMoney: Number(agent.valueForMoney),
    shortDescription: agent.shortDescription,
    pros: agent.pros ?? [],
    cons: agent.cons ?? [],
    features: agent.features ?? [],
    bestFor: agent.bestFor,
    editorChoice: agent.editorChoice,
    featured: agent.featured,
    sortOrder: agent.sortOrder,
  };
}

// Get all AI Agents sorted by sortOrder
export async function getAllAgentsFromDb(): Promise<AiAgentData[]> {
  const db = getDb();
  const agents = await db
    .select()
    .from(aiAgentProviders)
    .orderBy(asc(aiAgentProviders.sortOrder));
  return agents.map(toAiAgentData);
}

// Get featured AI Agents
export async function getFeaturedAgentsFromDb(): Promise<AiAgentData[]> {
  const db = getDb();
  const agents = await db
    .select()
    .from(aiAgentProviders)
    .where(eq(aiAgentProviders.featured, true))
    .orderBy(asc(aiAgentProviders.sortOrder));
  return agents.map(toAiAgentData);
}

// Get AI Agent by slug
export async function getAgentBySlugFromDb(slug: string): Promise<AiAgentData | null> {
  const db = getDb();
  const agents = await db
    .select()
    .from(aiAgentProviders)
    .where(eq(aiAgentProviders.slug, slug))
    .limit(1);
  return agents[0] ? toAiAgentData(agents[0]) : null;
}

// Get AI Agent by ID
export async function getAgentByIdFromDb(id: string): Promise<AiAgentData | null> {
  const db = getDb();
  const agents = await db
    .select()
    .from(aiAgentProviders)
    .where(eq(aiAgentProviders.id, id))
    .limit(1);
  return agents[0] ? toAiAgentData(agents[0]) : null;
}

// Admin functions for CRUD operations

export type AiAgentCreateInput = Omit<AiAgentData, "id">;
export type AiAgentUpdateInput = Partial<AiAgentCreateInput>;

// Create AI Agent
export async function createAgent(data: AiAgentCreateInput): Promise<AiAgentData> {
  const db = getDb();
  const result = await db
    .insert(aiAgentProviders)
    .values({
      name: data.name,
      slug: data.slug,
      logo: data.logo,
      screenshot: data.screenshot,
      thumbnailImage: data.thumbnailImage,
      cardImage: data.cardImage,
      ogImage: data.ogImage,
      website: data.website,
      affiliateUrl: data.affiliateUrl,
      monthlyPrice: String(data.monthlyPrice),
      annualPrice: String(data.annualPrice),
      hasFreeTier: data.hasFreeTier,
      freeTierLimits: data.freeTierLimits,
      category: data.category,
      subcategory: data.subcategory,
      modelsSupported: data.modelsSupported,
      integrations: data.integrations,
      maxUsers: data.maxUsers,
      apiAccess: data.apiAccess,
      overallRating: String(data.overallRating),
      easeOfUse: String(data.easeOfUse),
      performance: String(data.performance),
      valueForMoney: String(data.valueForMoney),
      shortDescription: data.shortDescription,
      pros: data.pros,
      cons: data.cons,
      features: data.features,
      bestFor: data.bestFor,
      editorChoice: data.editorChoice,
      featured: data.featured,
      sortOrder: data.sortOrder,
    })
    .returning();
  return toAiAgentData(result[0]);
}

// Update AI Agent
export async function updateAgent(id: string, data: AiAgentUpdateInput): Promise<AiAgentData> {
  const db = getDb();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: Record<string, any> = {};

  // Only include fields that are provided
  if (data.name !== undefined) updateData.name = data.name;
  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.logo !== undefined) updateData.logo = data.logo;
  if (data.screenshot !== undefined) updateData.screenshot = data.screenshot;
  if (data.thumbnailImage !== undefined) updateData.thumbnailImage = data.thumbnailImage;
  if (data.cardImage !== undefined) updateData.cardImage = data.cardImage;
  if (data.ogImage !== undefined) updateData.ogImage = data.ogImage;
  if (data.website !== undefined) updateData.website = data.website;
  if (data.affiliateUrl !== undefined) updateData.affiliateUrl = data.affiliateUrl;
  if (data.monthlyPrice !== undefined) updateData.monthlyPrice = String(data.monthlyPrice);
  if (data.annualPrice !== undefined) updateData.annualPrice = String(data.annualPrice);
  if (data.hasFreeTier !== undefined) updateData.hasFreeTier = data.hasFreeTier;
  if (data.freeTierLimits !== undefined) updateData.freeTierLimits = data.freeTierLimits;
  if (data.category !== undefined) updateData.category = data.category;
  if (data.subcategory !== undefined) updateData.subcategory = data.subcategory;
  if (data.modelsSupported !== undefined) updateData.modelsSupported = data.modelsSupported;
  if (data.integrations !== undefined) updateData.integrations = data.integrations;
  if (data.maxUsers !== undefined) updateData.maxUsers = data.maxUsers;
  if (data.apiAccess !== undefined) updateData.apiAccess = data.apiAccess;
  if (data.overallRating !== undefined) updateData.overallRating = String(data.overallRating);
  if (data.easeOfUse !== undefined) updateData.easeOfUse = String(data.easeOfUse);
  if (data.performance !== undefined) updateData.performance = String(data.performance);
  if (data.valueForMoney !== undefined) updateData.valueForMoney = String(data.valueForMoney);
  if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription;
  if (data.pros !== undefined) updateData.pros = data.pros;
  if (data.cons !== undefined) updateData.cons = data.cons;
  if (data.features !== undefined) updateData.features = data.features;
  if (data.bestFor !== undefined) updateData.bestFor = data.bestFor;
  if (data.editorChoice !== undefined) updateData.editorChoice = data.editorChoice;
  if (data.featured !== undefined) updateData.featured = data.featured;
  if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;

  updateData.updatedAt = new Date();

  const result = await db
    .update(aiAgentProviders)
    .set(updateData)
    .where(eq(aiAgentProviders.id, id))
    .returning();
  return toAiAgentData(result[0]);
}

// Delete AI Agent
export async function deleteAgent(id: string): Promise<void> {
  const db = getDb();
  await db.delete(aiAgentProviders).where(eq(aiAgentProviders.id, id));
}

// Get AI Agent count
export async function getAgentCount(): Promise<number> {
  const db = getDb();
  const result = await db.select({ count: count() }).from(aiAgentProviders);
  return result[0]?.count ?? 0;
}
