import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  emails: defineTable({
    email: v.string(),
    site: v.string(),
    locale: v.string(),
    subscribedAt: v.string(),
  })
    .index("by_email_site", ["email", "site"])
    .index("by_site", ["site"]),

  blogPosts: defineTable({
    slug: v.string(),
    language: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    seoTitle: v.string(),
    seoDescription: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    aiModel: v.string(),
    featuredImage: v.optional(v.string()),
    published: v.boolean(),
    publishedAt: v.optional(v.string()),
  })
    .index("by_slug_language", ["slug", "language"])
    .index("by_published", ["published"])
    .index("by_category", ["category"]),

  pipelineJobs: defineTable({
    type: v.string(),
    status: v.string(),
    agentSlug: v.optional(v.string()),
    result: v.optional(v.string()),
    error: v.optional(v.string()),
    startedAt: v.string(),
    completedAt: v.optional(v.string()),
  })
    .index("by_type_status", ["type", "status"])
    .index("by_status", ["status"]),

  scrapedAgentData: defineTable({
    agentSlug: v.string(),
    priceMonthly: v.optional(v.number()),
    priceYearly: v.optional(v.number()),
    hasFreeTier: v.optional(v.boolean()),
    freeTierInfo: v.optional(v.string()),
    rawContent: v.string(),
    sourceUrl: v.string(),
    scrapedAt: v.string(),
  })
    .index("by_agent", ["agentSlug"])
    .index("by_agent_date", ["agentSlug", "scrapedAt"]),
});
