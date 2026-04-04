import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export interface BlogPost {
  id: string;
  slug: string;
  language: string;
  title: string;
  excerpt: string;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  category: string;
  tags: string[];
  featuredImage: string | null;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/** Map a Convex blogPost document to our BlogPost interface */
function toPublicPost(doc: {
  _id: string;
  _creationTime: number;
  slug: string;
  language: string;
  title: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  published: boolean;
  publishedAt?: string;
}): BlogPost {
  return {
    id: doc._id,
    slug: doc.slug,
    language: doc.language,
    title: doc.title,
    excerpt: doc.excerpt,
    content: doc.content,
    metaTitle: doc.seoTitle || null,
    metaDescription: doc.seoDescription || null,
    category: doc.category,
    tags: doc.tags,
    featuredImage: doc.featuredImage || null,
    published: doc.published,
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt) : null,
    createdAt: new Date(doc._creationTime),
    updatedAt: doc.publishedAt ? new Date(doc.publishedAt) : new Date(doc._creationTime),
  };
}

export async function getAllPublishedPosts(language = "en"): Promise<BlogPost[]> {
  try {
    const posts = await fetchQuery(api.blogPosts.listPublished, { language });
    return posts.map(toPublicPost);
  } catch (err) {
    console.error("Failed to fetch blog posts:", (err as Error).message);
    return [];
  }
}

export async function getPostBySlug(slug: string, language = "en"): Promise<BlogPost | null> {
  try {
    const doc = await fetchQuery(api.blogPosts.getBySlug, { slug, language });
    if (!doc || !doc.published) return null;
    return toPublicPost(doc);
  } catch (err) {
    console.error("Failed to fetch post:", (err as Error).message);
    return null;
  }
}

export async function getAllPublishedSlugs(): Promise<Array<{ slug: string; updatedAt: Date }>> {
  try {
    const posts = await fetchQuery(api.blogPosts.listPublished, {});
    return (posts as Array<{ slug: string; publishedAt?: string; _creationTime: number }>).map(
      (p) => ({
        slug: p.slug,
        updatedAt: p.publishedAt ? new Date(p.publishedAt) : new Date(p._creationTime),
      })
    );
  } catch {
    return [];
  }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const doc = await fetchQuery(api.blogPosts.getById, { id: id as Id<"blogPosts"> });
    if (!doc) return null;
    return toPublicPost(doc);
  } catch {
    return null;
  }
}

export async function publishPost(id: string): Promise<void> {
  await fetchMutation(api.blogPosts.publish, { id: id as Id<"blogPosts"> });
}
