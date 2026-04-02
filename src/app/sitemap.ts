import { MetadataRoute } from "next";
import { getAllAgents } from "@/lib/agent-data-layer";
import { routing } from "@/i18n/routing";
import { getAllPublishedSlugs } from "@/lib/pipeline/blog-service";
import discoveredStaticRoutes from "@/lib/sitemap-static-routes.generated.json";

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry["changeFrequency"]>;

function getPageProfile(path: string): {
  priority: number;
  changeFrequency: ChangeFrequency;
} {
  if (path === "") return { priority: 1.0, changeFrequency: "weekly" };
  if (path.startsWith("/reviews")) {
    return { priority: 0.9, changeFrequency: "weekly" };
  }
  if (path.startsWith("/compare")) {
    return { priority: 0.85, changeFrequency: "weekly" };
  }
  if (path.startsWith("/blog")) {
    return { priority: 0.8, changeFrequency: "weekly" };
  }
  if (path.startsWith("/guides")) {
    return { priority: 0.75, changeFrequency: "monthly" };
  }
  if (
    path === "/about" ||
    path === "/contact" ||
    path === "/privacy-policy" ||
    path === "/terms"
  ) {
    return { priority: 0.5, changeFrequency: "monthly" };
  }
  return { priority: 0.7, changeFrequency: "weekly" };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zerotoaiagents.com";
  const locales = routing.locales;
  const nowIso = new Date().toISOString();
  const agents = await getAllAgents();
  const routeMap = new Map<string, SitemapEntry>();
  const staticPaths = discoveredStaticRoutes.paths as string[];
  const staticPathSet = new Set(staticPaths);

  const addLocalizedPath = (
    path: string,
    opts?: Partial<Pick<SitemapEntry, "priority" | "changeFrequency" | "lastModified">>
  ) => {
    const profile = getPageProfile(path);
    const alternates: Record<string, string> = {
      "x-default": `${baseUrl}${path}`,
    };

    for (const locale of locales) {
      const altPrefix = locale === "en" ? "" : `/${locale}`;
      alternates[locale] = `${baseUrl}${altPrefix}${path}`;
    }

    for (const locale of locales) {
      const prefix = locale === "en" ? "" : `/${locale}`;
      const url = `${baseUrl}${prefix}${path}`;

      routeMap.set(url, {
        url,
        lastModified: opts?.lastModified ?? nowIso,
        changeFrequency: opts?.changeFrequency ?? profile.changeFrequency,
        priority: opts?.priority ?? profile.priority,
        alternates: { languages: alternates },
      });
    }
  };

  // 1) Auto-discovered static routes for locale pages.
  for (const path of staticPaths) {
    addLocalizedPath(path);
  }

  // 2) Dynamic review pages.
  for (const agent of agents) {
    addLocalizedPath(`/reviews/${agent.slug}`, {
      priority: 0.8,
      changeFrequency: "monthly",
    });
  }

  // 3) Dynamic comparison pages: all generated combinations.
  for (let i = 0; i < agents.length; i++) {
    for (let j = i + 1; j < agents.length; j++) {
      addLocalizedPath(`/compare/${agents[i].slug}-vs-${agents[j].slug}`, {
        priority: 0.7,
        changeFrequency: "weekly",
      });
    }
  }

  // 4) Dynamic blog posts from DB (skip static blog files already discovered).
  try {
    const dynamicSlugs = await getAllPublishedSlugs();
    const slugLastModifiedMap = new Map<string, Date>();

    for (const entry of dynamicSlugs) {
      const existing = slugLastModifiedMap.get(entry.slug);
      if (!existing || entry.updatedAt > existing) {
        slugLastModifiedMap.set(entry.slug, entry.updatedAt);
      }
    }

    for (const [slug, updatedAt] of slugLastModifiedMap) {
      const path = `/blog/${slug}`;
      if (staticPathSet.has(path)) continue;

      addLocalizedPath(path, {
        priority: 0.7,
        changeFrequency: "weekly",
        lastModified: updatedAt.toISOString(),
      });
    }
  } catch {
    // DB can be unavailable during build.
  }

  return Array.from(routeMap.values());
}
