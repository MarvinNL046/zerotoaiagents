// Blog service stub — Convex backend not yet connected.
// All functions return empty data until Convex is wired in.
// TODO: replace with Convex queries once the blog pipeline is migrated.

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

export async function getAllPublishedPosts(
  _language = "en"
): Promise<BlogPost[]> {
  void _language;
  return [];
}

export async function getPostBySlug(
  _slug: string,
  _language = "en"
): Promise<BlogPost | null> {
  void _slug;
  void _language;
  return null;
}

export async function getAllPublishedSlugs(): Promise<
  Array<{ slug: string; updatedAt: Date }>
> {
  return [];
}

export async function getPostById(_id: string): Promise<BlogPost | null> {
  void _id;
  return null;
}

export async function publishPost(_id: string): Promise<void> {
  void _id;
}
