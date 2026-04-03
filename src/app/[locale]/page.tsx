import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Code, CheckCircle, Shield } from "lucide-react";
import { EmailCapture } from "@/components/email-capture";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: "Zero to AI Agents — Learn, Compare & Master AI Coding Agents",
    description:
      "In-depth reviews, comparisons, and guides for AI coding agents like Cursor, GitHub Copilot, Windsurf, Claude Code, and Devin.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

type ContentType = "review" | "comparison" | "guide";

interface ContentItem {
  type: ContentType;
  title: string;
  href: string;
  description: string;
}

const contentItems: ContentItem[] = [
  // Reviews
  {
    type: "review",
    title: "Cursor Review",
    href: "/reviews/cursor",
    description: "The AI-first code editor with built-in agent capabilities",
  },
  {
    type: "review",
    title: "GitHub Copilot Review",
    href: "/reviews/github-copilot",
    description: "Microsoft's AI pair programmer for VS Code and beyond",
  },
  {
    type: "review",
    title: "Windsurf Review",
    href: "/reviews/windsurf",
    description: "Codeium's free-tier AI coding agent",
  },
  {
    type: "review",
    title: "Claude Code Review",
    href: "/reviews/claude-code",
    description: "Anthropic's CLI-based autonomous coding agent",
  },
  {
    type: "review",
    title: "Devin Review",
    href: "/reviews/devin",
    description: "The first fully autonomous AI software engineer",
  },
  // Comparisons
  {
    type: "comparison",
    title: "Cursor vs GitHub Copilot",
    href: "/compare/cursor-vs-github-copilot",
    description: "The two most popular AI coding tools head-to-head",
  },
  {
    type: "comparison",
    title: "Cursor vs Windsurf",
    href: "/compare/cursor-vs-windsurf",
    description: "AI-first IDE showdown: which editor wins?",
  },
  {
    type: "comparison",
    title: "GitHub Copilot vs Claude Code",
    href: "/compare/github-copilot-vs-claude-code",
    description: "IDE extension vs CLI agent: different approaches compared",
  },
  {
    type: "comparison",
    title: "Cursor vs Windsurf vs Copilot",
    href: "/compare/cursor-vs-windsurf-vs-github-copilot",
    description: "Three-way battle of the top AI coding tools",
  },
  {
    type: "comparison",
    title: "Devin vs Claude Code",
    href: "/compare/devin-vs-claude-code",
    description: "Autonomous AI agents compared",
  },
  // Guides
  {
    type: "guide",
    title: "What Are AI Coding Agents?",
    href: "/guides/what-are-ai-coding-agents",
    description: "Everything you need to know about AI-powered coding",
  },
  {
    type: "guide",
    title: "How to Choose an AI Coding Agent",
    href: "/guides/how-to-choose-ai-coding-agent",
    description: "Find the perfect AI coding tool for your needs",
  },
  {
    type: "guide",
    title: "Getting Started with AI Pair Programming",
    href: "/guides/getting-started-ai-pair-programming",
    description: "Your first steps with AI pair programming",
  },
  {
    type: "guide",
    title: "Beginners vs Experienced Developers",
    href: "/guides/ai-coding-agents-beginners-vs-experienced",
    description: "Best picks based on your skill level",
  },
  {
    type: "guide",
    title: "Free vs Paid AI Coding Agents",
    href: "/guides/free-vs-paid-ai-coding-agents",
    description: "What you actually get on free vs paid plans",
  },
];

const typeBadgeStyles: Record<ContentType, string> = {
  review: "bg-orange-100 text-orange-700 border border-orange-200",
  comparison: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  guide: "bg-amber-100 text-amber-700 border border-amber-200",
};

const typeLabels: Record<ContentType, string> = {
  review: "Review",
  comparison: "Comparison",
  guide: "Guide",
};

const trustItems = [
  {
    icon: Code,
    title: "Hands-on Testing",
    description: "We use every tool ourselves before reviewing",
  },
  {
    icon: CheckCircle,
    title: "Independent Reviews",
    description: "No sponsored content, no pay-for-placement",
  },
  {
    icon: Shield,
    title: "Updated Regularly",
    description: "All reviews reflect the latest features and pricing",
  },
];

const filterTabs = ["All", "Reviews", "Comparisons", "Guides"];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />

        <div className="relative container max-w-4xl mx-auto text-center px-4 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Zero to AI Agents
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Learn, compare, and master AI coding agents
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <a
              href="#content"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-full shadow-lg shadow-orange-500/25 font-semibold transition-all"
            >
              Browse Reviews
            </a>
            <Link
              href="/guides"
              className="border border-slate-600 bg-white/10 hover:border-orange-400 text-white px-6 py-3.5 rounded-full font-semibold transition-all"
            >
              Read Guides
            </Link>
          </div>

          {/* Hero illustration — floating AI comparison card */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-sm text-slate-400">AI Agent Comparison</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {["Cursor", "Copilot", "Claude Code"].map((name) => (
                  <div key={name} className="bg-slate-700/50 rounded-lg p-3 text-center">
                    <div className="text-orange-400 font-semibold text-sm">{name}</div>
                    <div className="text-2xl font-bold text-white mt-1">4.8</div>
                    <div className="text-xs text-slate-400">★★★★★</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section id="content" className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-6">
            Latest Reviews, Guides &amp; Comparisons
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {filterTabs.map((tab, i) => (
              <span
                key={tab}
                className={
                  i === 0
                    ? "bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
                    : "border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-4 py-2 rounded-full text-sm font-semibold hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
                }
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 overflow-hidden hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 flex flex-col p-5"
              >
                <div className="flex flex-col gap-3 flex-1">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-0.5 rounded-full w-fit ${typeBadgeStyles[item.type]}`}
                  >
                    {typeLabels[item.type]}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 flex-1">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="text-orange-500 group-hover:text-orange-600 font-semibold text-sm">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">
            Why Trust Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 bg-white dark:bg-slate-800"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container px-4 max-w-3xl mx-auto">
          <EmailCapture variant="inline" />
        </div>
      </section>
    </div>
  );
}
