import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { NewsletterFooter } from "@/components/newsletter/newsletter-footer";

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
    href: "/compare/cursor-vs-windsurf-vs-copilot",
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
  review: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  comparison: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  guide: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

const typeLabels: Record<ContentType, string> = {
  review: "Review",
  comparison: "Comparison",
  guide: "Guide",
};

const trustItems = [
  {
    title: "Hands-on Testing",
    description: "We use every tool ourselves before reviewing",
  },
  {
    title: "Independent Reviews",
    description: "No sponsored content, no pay-for-placement",
  },
  {
    title: "Updated Regularly",
    description: "All reviews reflect the latest features and pricing",
  },
];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 lg:py-32">
        <div className="container max-w-4xl mx-auto text-center px-4 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Zero to AI Agents
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
            Learn, compare, and master AI coding agents
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentItems.map((item) => (
              <Link key={item.href} href={item.href} className="group block">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${typeBadgeStyles[item.type]}`}
                    >
                      {typeLabels[item.type]}
                    </span>
                    <CardTitle className="text-base mt-2">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 bg-muted/40">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Why Trust Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {trustItems.map((item) => (
              <div key={item.title} className="text-center space-y-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container px-4 max-w-md mx-auto">
          <NewsletterFooter />
        </div>
      </section>
    </div>
  );
}
