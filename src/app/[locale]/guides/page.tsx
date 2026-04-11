import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  BookOpen,
  Brain,
  DollarSign,
  GraduationCap,
  Users,
  Code,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "AI Coding Agent Guides 2026",
    description:
      "In-depth guides on AI coding agents: what they are, how to choose one, getting started with AI pair programming, and more. Written by developers who use these tools daily.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

const guides = [
  {
    slug: "what-are-ai-coding-agents",
    icon: Brain,
    category: "Fundamentals",
    title: "What Are AI Coding Agents? A Complete Guide",
    description:
      "Define AI coding agents, understand how they differ from chatbots and autocomplete, and learn what tools like Cursor, Copilot, and Claude Code can actually do.",
    readTime: "12 min read",
    featured: true,
  },
  {
    slug: "how-to-choose-ai-coding-agent",
    icon: BookOpen,
    category: "Decision Guide",
    title: "How to Choose the Right AI Coding Agent in 2026",
    description:
      "A practical decision framework based on budget, IDE preference, language support, team size, and privacy requirements — with a clear recommendation matrix.",
    readTime: "10 min read",
    featured: true,
  },
  {
    slug: "getting-started-ai-pair-programming",
    icon: Users,
    category: "Getting Started",
    title: "Getting Started with AI Pair Programming",
    description:
      "Setup steps for Cursor, GitHub Copilot, and Claude Code, plus best practices, common mistakes to avoid, and a realistic example session.",
    readTime: "11 min read",
    featured: true,
  },
  {
    slug: "ai-coding-agent-statistics",
    icon: TrendingUp,
    category: "Data & Trends",
    title: "AI Coding Agent Statistics 2026",
    description:
      "The most useful public numbers on adoption, trust, GitHub Copilot scale, Cursor rollout, and where AI coding agents are actually delivering ROI.",
    readTime: "10 min read",
    featured: false,
  },
  {
    slug: "ai-coding-agents-beginners-vs-experienced",
    icon: GraduationCap,
    category: "Skill Level",
    title: "AI Coding Agents: Best Picks for Beginners vs Experienced Developers",
    description:
      "Why your skill level changes which tool you should use, with beginner-friendly picks and power-user tools compared side by side.",
    readTime: "10 min read",
    featured: false,
  },
  {
    slug: "free-vs-paid-ai-coding-agents",
    icon: DollarSign,
    category: "Pricing",
    title: "Free vs Paid AI Coding Agents: What You Actually Get",
    description:
      "Honest breakdown of free tiers for all 5 agents, what you lose on free plans, a cost comparison table, and best-value picks.",
    readTime: "9 min read",
    featured: false,
  },
];

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featuredGuides = guides.filter((g) => g.featured);
  const otherGuides = guides.filter((g) => !g.featured);

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs */}
      <div className="container pt-6">
        <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }]} />
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              AI Coding Agent Guides
            </h1>
            <p className="text-lg text-muted-foreground">
              In-depth guides on AI coding agents — written by developers who
              use these tools daily. From first steps to advanced workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Start Here</h2>
            <p className="text-muted-foreground">
              The three guides that give you the full picture.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group"
                >
                  <div className="bg-card border rounded-xl p-6 h-full hover:shadow-lg hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {guide.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {guide.readTime}
                      </span>
                      <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read guide
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Guides */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">More Guides</h2>
            <p className="text-muted-foreground">
              Deep dives on specific topics.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {otherGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group"
                >
                  <div className="bg-card border rounded-lg p-5 flex items-start gap-4 hover:shadow-md hover:border-primary/50 transition-all">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold group-hover:text-primary transition-colors">
                          {guide.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {guide.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {guide.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {guide.readTime}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">
              Ready to Compare the Tools?
            </h2>
            <p className="text-muted-foreground">
              See detailed comparisons of Cursor, GitHub Copilot, Windsurf,
              Claude Code, and Devin — with pricing, features, and honest
              verdicts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/compare"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Compare AI Coding Agents
              </Link>
              <Link
                href="/reviews"
                className="inline-flex items-center justify-center px-6 py-3 border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                View Top Picks
              </Link>
            </div>
            <div className="pt-2">
              <Link
                href="/guides/ai-coding-agent-statistics"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <TrendingUp className="h-4 w-4" />
                View the latest AI coding agent statistics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
