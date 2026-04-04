import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug_language", (q) =>
        q.eq("slug", args.slug).eq("language", args.language)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        published: existing.published,
        publishedAt: existing.publishedAt,
      });
      return existing._id;
    }

    return await ctx.db.insert("blogPosts", {
      ...args,
      published: false,
    });
  },
});

export const publish = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    const post = await ctx.db.get(id);
    if (!post) throw new Error("Post not found");
    await ctx.db.patch(id, {
      published: true,
      publishedAt: new Date().toISOString(),
    });
    return { slug: post.slug };
  },
});

export const unpublish = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { published: false });
  },
});

export const remove = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const getBySlug = query({
  args: { slug: v.string(), language: v.string() },
  handler: async (ctx, { slug, language }) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_slug_language", (q) =>
        q.eq("slug", slug).eq("language", language)
      )
      .first();
  },
});

export const listPublished = query({
  args: { language: v.optional(v.string()) },
  handler: async (ctx, { language }) => {
    const posts = await ctx.db
      .query("blogPosts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .collect();
    if (language) {
      return posts.filter((p) => p.language === language);
    }
    return posts;
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("blogPosts").collect();
  },
});

export const getById = query({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});
