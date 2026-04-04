import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const upsert = mutation({
  args: {
    agentSlug: v.string(),
    priceMonthly: v.optional(v.number()),
    priceYearly: v.optional(v.number()),
    hasFreeTier: v.optional(v.boolean()),
    freeTierInfo: v.optional(v.string()),
    rawContent: v.string(),
    sourceUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("scrapedAgentData")
      .withIndex("by_agent", (q) => q.eq("agentSlug", args.agentSlug))
      .order("desc")
      .first();

    const data = {
      ...args,
      scrapedAt: new Date().toISOString(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    }
    return await ctx.db.insert("scrapedAgentData", data);
  },
});

export const getLatestByAgent = query({
  args: { agentSlug: v.string() },
  handler: async (ctx, { agentSlug }) => {
    return await ctx.db
      .query("scrapedAgentData")
      .withIndex("by_agent", (q) => q.eq("agentSlug", agentSlug))
      .order("desc")
      .first();
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("scrapedAgentData").collect();
  },
});
