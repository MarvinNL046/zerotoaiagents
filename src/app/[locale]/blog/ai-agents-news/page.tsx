import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { AuthorBio } from "@/components/author-bio";
import { routing } from "@/i18n/routing";
import {
  Newspaper,
  Radar,
  Sparkles,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";
const pageSlug = "ai-agents-news";

const faqs = [
  {
    question: "What belongs on an AI agents news page?",
    answer:
      "The most useful AI agents news pages track launches, product changes, infrastructure updates, enterprise adoption signals, and safety or governance developments. The goal is to help readers understand what actually changed and why it matters.",
  },
  {
    question: "Why make a dedicated AI Agents News hub instead of only publishing blog posts?",
    answer:
      "A dedicated hub gives search engines and readers a stable destination for recurring news intent. Individual posts can then feed into that hub, instead of each update competing on its own.",
  },
  {
    question: "How should readers use this page?",
    answer:
      "Use it as the high-level entry point for the category, then click through to comparisons, reviews, and statistics pages when you need detail on specific tools or trends.",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/blog/${pageSlug}`;
  const languages: Record<string, string> = {
    "x-default": `${baseUrl}/blog/${pageSlug}`,
  };

  routing.locales.forEach((l) => {
    const localePrefix = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${localePrefix}/blog/${pageSlug}`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "AI Agents News",
    description:
      "A central hub for AI agents news: launches, updates, enterprise adoption, safety developments, and the pages worth reading next.",
    keywords: [
      "ai agents news",
      "latest ai agents news",
      "ai agent updates",
      "agentic ai news",
      "ai coding agent news",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "AI Agents News",
      description:
        "A central hub for launches, updates, enterprise rollout, and safety developments in the AI agents market.",
      url: canonicalUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Agents News",
      description:
        "A central hub for launches, updates, enterprise rollout, and safety developments in the AI agents market.",
    },
  };
}

export default async function AiAgentsNewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="flex flex-col">
      <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <BreadcrumbSchema
              items={[
                { name: "Blog", href: "/blog" },
                { name: "AI Agents News", href: `/blog/${pageSlug}` },
              ]}
              className="mb-6 text-slate-400"
            />
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                News Hub
              </Badge>
              <Badge className="bg-white/10 text-slate-300 border-white/20">
                Updated weekly
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              AI Agents News
            </h1>
            <p className="text-xl text-slate-300">
              A stable hub for the developments that actually matter in AI agents:
              product launches, workflow shifts, enterprise adoption, and safety changes that affect buyers and builders.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto review-content">
            <h2 className="flex items-center gap-2 text-3xl font-bold mb-4">
              <Newspaper className="h-7 w-7 text-orange-500" />
              What This Hub Tracks
            </h2>
            <p>
              The AI agents market moves quickly, but not every announcement matters. This page is for the updates that change tool selection,
              workflow design, pricing expectations, or enterprise rollout confidence.
            </p>
            <p>
              That includes coding agents, workflow automation platforms, multi-agent frameworks, and enterprise agent products.
              The point is not to chase novelty. The point is to track what changes decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-orange-500" />
                <h2 className="font-semibold">Launches and product updates</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                New agents, pricing changes, capability upgrades, and important shifts in how vendors position their tools.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <h2 className="font-semibold">Adoption and enterprise rollout</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Customer stories, buyer signals, and public evidence that a tool is becoming operationally important.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="h-5 w-5 text-orange-500" />
                <h2 className="font-semibold">Safety and governance</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Changes in sandboxing, permissions, privacy, and control models that affect whether teams can trust a workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto review-content">
            <h2 className="flex items-center gap-2 text-3xl font-bold mb-4">
              <Radar className="h-7 w-7 text-orange-500" />
              Where To Go Next
            </h2>
            <p>
              If you want the fastest category snapshot, start with the
              <Link href="/guides/ai-coding-agent-statistics" className="text-orange-600 hover:text-orange-700 underline"> AI Coding Agent Statistics 2026</Link>
              {" "}page.
            </p>
            <p>
              If you already know the tools you care about, go to the
              <Link href="/compare" className="text-orange-600 hover:text-orange-700 underline"> compare hub</Link>
              {" "}or the
              <Link href="/reviews" className="text-orange-600 hover:text-orange-700 underline"> best AI coding agents hub</Link>.
            </p>
            <p>
              If you are trying to understand the category more broadly before choosing tools, read
              <Link href="/guides/what-are-ai-agents" className="text-orange-600 hover:text-orange-700 underline"> What Are AI Agents?</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-3">
            <Link href="/blog" className="rounded-2xl border bg-card p-5 hover:border-orange-300 hover:shadow-lg transition-all">
              <h3 className="font-semibold mb-2">Browse the Blog</h3>
              <p className="text-sm text-muted-foreground">
                Go back to the full blog index for detailed posts and category-specific articles.
              </p>
            </Link>
            <Link href="/reviews" className="rounded-2xl border bg-card p-5 hover:border-orange-300 hover:shadow-lg transition-all">
              <h3 className="font-semibold mb-2">Read the Reviews</h3>
              <p className="text-sm text-muted-foreground">
                Move from news into commercial evaluation with the main review hub.
              </p>
            </Link>
            <Link href="/compare" className="rounded-2xl border bg-card p-5 hover:border-orange-300 hover:shadow-lg transition-all">
              <h3 className="font-semibold mb-2">Compare the Tools</h3>
              <p className="text-sm text-muted-foreground">
                Narrow the field with side-by-side comparisons once the news gives you a shortlist.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FAQSchema faqs={faqs} title="AI Agents News FAQ" />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AuthorBio />
          </div>
        </div>
      </section>
    </article>
  );
}
