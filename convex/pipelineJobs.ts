import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    type: v.string(),
    agentSlug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("pipelineJobs", {
      type: args.type,
      status: "pending",
      agentSlug: args.agentSlug,
      startedAt: new Date().toISOString(),
    });
  },
});

export const start = mutation({
  args: { id: v.id("pipelineJobs") },
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { status: "running" });
  },
});

export const complete = mutation({
  args: {
    id: v.id("pipelineJobs"),
    result: v.optional(v.string()),
  },
  handler: async (ctx, { id, result }) => {
    await ctx.db.patch(id, {
      status: "completed",
      result,
      completedAt: new Date().toISOString(),
    });
  },
});

export const fail = mutation({
  args: {
    id: v.id("pipelineJobs"),
    error: v.string(),
  },
  handler: async (ctx, { id, error }) => {
    await ctx.db.patch(id, {
      status: "failed",
      error,
      completedAt: new Date().toISOString(),
    });
  },
});

export const getById = query({
  args: { id: v.id("pipelineJobs") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const jobs = await ctx.db.query("pipelineJobs").order("desc").take(limit || 20);
    return jobs;
  },
});

export const countByStatus = query({
  args: {},
  handler: async (ctx) => {
    const jobs = await ctx.db.query("pipelineJobs").collect();
    const counts: Record<string, number> = {};
    for (const job of jobs) {
      counts[job.status] = (counts[job.status] || 0) + 1;
    }
    return counts;
  },
});
