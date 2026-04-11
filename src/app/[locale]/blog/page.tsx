import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Image, { type ImageLoaderProps } from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Shield,
  Globe,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RelatedPages } from "@/components/seo/related-pages";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getAllPublishedPosts } from "@/lib/pipeline/blog-service";
import { routing } from "@/i18n/routing";

// Force dynamic rendering so new DB posts show immediately
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

const passthroughImageLoader = ({ src }: ImageLoaderProps) => src;

function formatDateLong(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const months: Record<string, string[]> = {
    en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    nl: ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],
    de: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    es: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
    fr: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
  };
  const m = (months[locale] || months.en);
  return `${m[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function formatDateShort(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const months: Record<string, string[]> = {
    en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    nl: ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],
    de: ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
    es: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],
    fr: ["jan","fév","mar","avr","mai","jun","jul","aoû","sep","oct","nov","déc"],
  };
  const m = (months[locale] || months.en);
  return `${m[date.getMonth()]} ${date.getDate()}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/blog`;
  const languages: Record<string, string> = { "x-default": `${baseUrl}/blog` };

  routing.locales.forEach((l) => {
    const localePrefix = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${localePrefix}/blog`;
  });

  const titles: Record<string, string> = {
    en: "AI Agent Blog - News, Tips & Guides",
    nl: "AI Agent Blog - Nieuws, Tips & Gidsen",
    de: "KI-Agent Blog - Neuigkeiten, Tipps & Leitfäden",
    es: "Blog de Agentes IA - Noticias, Consejos y Guías",
    fr: "Blog Agents IA - Actualités, Conseils et Guides",
    zh: "AI代理博客 - 新闻、技巧和指南",
    ja: "AIエージェントブログ - ニュース、ヒント、ガイド",
    ko: "AI 에이전트 블로그 - 뉴스, 팁 및 가이드",
    th: "บล็อก AI Agent - ข่าว เคล็ดลับ และคู่มือ",
  };

  const descriptions: Record<string, string> = {
    en: "Stay updated with the latest AI agent news, tips, and in-depth guides. Learn about AI agent platforms, use cases, and best practices.",
    nl: "Blijf op de hoogte van het laatste AI agent nieuws, tips en uitgebreide gidsen. Leer over AI agent platforms, toepassingen en best practices.",
    de: "Bleiben Sie auf dem Laufenden mit den neuesten KI-Agent-Nachrichten, Tipps und ausführlichen Leitfäden. Erfahren Sie mehr über KI-Agent-Plattformen, Anwendungsfälle und Best Practices.",
    es: "Mantente actualizado con las últimas noticias de agentes IA, consejos y guías detalladas. Aprende sobre plataformas de agentes IA, casos de uso y mejores prácticas.",
    fr: "Restez informé des dernières actualités sur les agents IA, conseils et guides détaillés. Apprenez-en plus sur les plateformes d'agents IA, cas d'usage et meilleures pratiques.",
    zh: "了解最新的AI代理新闻、技巧和深入指南。学习AI代理平台、用例和最佳实践。",
    ja: "最新のAIエージェントニュース、ヒント、詳細なガイドで最新情報を入手。AIエージェントプラットフォーム、ユースケース、ベストプラクティスについて学びましょう。",
    ko: "최신 AI 에이전트 뉴스, 팁 및 심층 가이드로 최신 정보를 유지하세요. AI 에이전트 플랫폼, 사용 사례 및 모범 사례에 대해 알아보세요.",
    th: "อัปเดตข่าวสาร AI Agent ล่าสุด เคล็ดลับ และคู่มือเชิงลึก เรียนรู้เกี่ยวกับแพลตฟอร์ม AI Agent กรณีการใช้งาน และแนวทางปฏิบัติที่ดีที่สุด",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: canonicalUrl,
      siteName: "ZeroToAIAgents",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
  };
}

const categoryConfig: Record<string, {
  icon: typeof TrendingUp;
  color: string;
  gradient: string;
  iconColor: string;
  bgPattern: string;
  label: string;
}> = {
  deals: {
    icon: TrendingUp,
    color: "text-green-600",
    gradient: "from-emerald-500/20 via-green-500/10 to-yellow-500/20",
    iconColor: "text-emerald-600",
    bgPattern: "bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_50%)]",
    label: "deals",
  },
  deal: {
    icon: TrendingUp,
    color: "text-green-600",
    gradient: "from-emerald-500/20 via-green-500/10 to-yellow-500/20",
    iconColor: "text-emerald-600",
    bgPattern: "bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_50%)]",
    label: "deals",
  },
  security: {
    icon: Shield,
    color: "text-blue-600",
    gradient: "from-blue-500/20 via-indigo-500/10 to-purple-500/20",
    iconColor: "text-blue-600",
    bgPattern: "bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.15),transparent_50%)]",
    label: "security",
  },
  tips: {
    icon: Globe,
    color: "text-purple-600",
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    iconColor: "text-orange-600",
    bgPattern: "bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.15),transparent_50%)]",
    label: "tips",
  },
  guide: {
    icon: Globe,
    color: "text-purple-600",
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    iconColor: "text-orange-600",
    bgPattern: "bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.15),transparent_50%)]",
    label: "tips",
  },
  news: {
    icon: Newspaper,
    color: "text-orange-600",
    gradient: "from-rose-500/20 via-pink-500/10 to-orange-500/20",
    iconColor: "text-rose-600",
    bgPattern: "bg-[radial-gradient(circle_at_50%_70%,rgba(244,63,94,0.15),transparent_50%)]",
    label: "news",
  },
  comparison: {
    icon: Shield,
    color: "text-blue-600",
    gradient: "from-blue-500/20 via-indigo-500/10 to-purple-500/20",
    iconColor: "text-blue-600",
    bgPattern: "bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.15),transparent_50%)]",
    label: "security",
  },
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  // Fetch dynamic posts from DB (graceful fallback on error)
  let dynamicPosts: Array<{
    slug: string;
    category: string;
    featured: boolean;
    date: string;
    readTime: string;
    title: string;
    excerpt: string;
    featuredImage: string | null;
    isDynamic: true;
  }> = [];

  try {
    // Fetch locale-specific posts first, then English fallback for non-English locales
    const dbPosts = await getAllPublishedPosts(locale);
    const seenSlugs = new Set(dbPosts.map((p) => p.slug));

    // Add English posts that don't have a translation in the current locale
    if (locale !== "en") {
      const enPosts = await getAllPublishedPosts("en");
      for (const enPost of enPosts) {
        if (!seenSlugs.has(enPost.slug)) {
          dbPosts.push(enPost);
        }
      }
    }

    dynamicPosts = dbPosts.map((post) => ({
      slug: post.slug,
      category: post.category,
      featured: false,
      date: post.publishedAt?.toISOString().split("T")[0] || post.createdAt.toISOString().split("T")[0],
      readTime: `${Math.max(1, Math.ceil(post.content.replace(/data:[^"]+/g, "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().length / 1500))} min`,
      title: post.title,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      isDynamic: true as const,
    }));
  } catch {
    // DB might not be available during build — continue with static posts only
  }

  // Use only dynamic posts from DB
  const allPosts = dynamicPosts;

  const featuredPost = allPosts.find((post) => post.featured);
  const otherPosts = allPosts.filter((post) => !post.featured);

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs */}
      <div className="container pt-6">
        <BreadcrumbSchema items={[{ name: "Blog", href: "/blog" }]} />
      </div>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 border-b bg-muted/30">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default" className="cursor-pointer">
              {t("categories.all")}
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              {t("categories.deals")}
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              {t("categories.security")}
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              {t("categories.tips")}
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              {t("categories.news")}
            </Badge>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{t("featured.title")}</h2>
            </div>
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-primary/20">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Image */}
                    <div
                      className={cn(
                        "aspect-video md:aspect-auto flex items-center justify-center relative overflow-hidden",
                        "bg-gradient-to-br",
                        categoryConfig[featuredPost.category]?.gradient || "from-primary/20 to-primary/5",
                        categoryConfig[featuredPost.category]?.bgPattern
                      )}
                    >
                      {featuredPost.featuredImage ? (
                        <Image
                          loader={passthroughImageLoader}
                          unoptimized
                          src={featuredPost.featuredImage}
                          alt={featuredPost.isDynamic ? featuredPost.title : ""}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-grid-white/5" />
                          {(() => {
                            const FeaturedIcon = categoryConfig[featuredPost.category]?.icon || TrendingUp;
                            return (
                              <FeaturedIcon
                                className={cn(
                                  "h-20 w-20 relative z-10",
                                  categoryConfig[featuredPost.category]?.iconColor || "text-primary/40"
                                )}
                              />
                            );
                          })()}
                        </>
                        )}
                      </div>
                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="default">
                          {t(`categories.${categoryConfig[featuredPost.category]?.label || featuredPost.category}`)}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDateLong(featuredPost.date, locale)}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">
                        {featuredPost.isDynamic
                          ? featuredPost.title
                          : t(`posts.${featuredPost.slug}.title`)}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {featuredPost.isDynamic
                          ? featuredPost.excerpt
                          : t(`posts.${featuredPost.slug}.excerpt`)}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium">
                          {t("readMore")}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">{t("recent.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => {
              const config = categoryConfig[post.category];
              const CategoryIcon = config?.icon || Newspaper;

              // Dynamic posts use DB title/excerpt; static posts use i18n
              const postTitle = post.isDynamic
                ? post.title
                : t(`posts.${post.slug}.title`);
              const postExcerpt = post.isDynamic
                ? post.excerpt
                : t(`posts.${post.slug}.excerpt`);

              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 group">
                    <CardContent className="p-0">
                      {/* Image */}
                      <div
                        className={cn(
                          "aspect-video flex items-center justify-center border-b relative overflow-hidden",
                          "bg-gradient-to-br",
                          config?.gradient || "from-muted to-muted/50",
                          config?.bgPattern,
                          "group-hover:scale-105 transition-transform duration-300"
                        )}
                      >
                        {post.featuredImage ? (
                          <Image
                            loader={passthroughImageLoader}
                            unoptimized
                            src={post.featuredImage}
                            alt={postTitle}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-grid-white/5" />
                            <CategoryIcon
                              className={cn(
                                "h-14 w-14 relative z-10",
                                config?.iconColor || "text-muted-foreground/40"
                              )}
                            />
                          </>
                        )}
                      </div>
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {t(`categories.${categoryConfig[post.category]?.label || post.category}`)}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDateShort(post.date, locale)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">
                          {postTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {postExcerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center gap-1 text-primary font-medium">
                            {t("readMore")}
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 border-t">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold">{t("cta.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("cta.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <RelatedPages
              title={t("relatedPages.title")}
              pages={[
                { title: t("relatedPages.bestAgents"), description: t("relatedPages.bestAgentsDesc"), href: "/reviews", icon: "trophy" },
                { title: "AI Coding Agent Statistics 2026", description: "See the latest public adoption, trust, and enterprise usage numbers.", href: "/guides/ai-coding-agent-statistics", icon: "users" },
                { title: t("relatedPages.guides"), description: t("relatedPages.guidesDesc"), href: "/guides/what-are-ai-coding-agents", icon: "shield" },
                { title: t("relatedPages.compare"), description: t("relatedPages.compareDesc"), href: "/compare", icon: "zap" },
                { title: t("relatedPages.useCases"), description: t("relatedPages.useCasesDesc"), href: "/guides", icon: "tag" }
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
