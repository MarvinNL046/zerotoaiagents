import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import {
  Video,
  GitCompare,
  ThumbsUp,
  Repeat,
  Monitor,
  Terminal,
  Code2,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmailCapture } from "@/components/email-capture";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "Watch Me Build — Real AI Coding Agent Use Cases | ZeroToAIAgents",
    description:
      "Screen recordings and real build sessions using Cursor, Claude Code, Copilot CLI, Windsurf, and more. Side-by-side LLM comparisons, honest wins and failures, and reusable prompts.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Watch Me Build — Real AI Coding Agent Use Cases | ZeroToAIAgents",
      description:
        "Screen recordings and real build sessions using Cursor, Claude Code, Copilot CLI, Windsurf, and more. Side-by-side LLM comparisons, honest wins and failures, and reusable prompts.",
      url: `${baseUrl}/watch-me-build`,
      siteName: "ZeroToAIAgents",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Watch Me Build — Real AI Coding Agent Use Cases | ZeroToAIAgents",
      description:
        "Screen recordings and real build sessions using AI coding agents. Real tools. Real builds. Honest results.",
    },
    alternates: {
      canonical: `${baseUrl}/watch-me-build`,
    },
  };
}

const whatToExpect = [
  {
    icon: Video,
    title: "Full build session recordings",
    description:
      "Complete screencasts from blank project to working product — no fast-forwarding over the hard parts.",
  },
  {
    icon: GitCompare,
    title: "Side-by-side LLM comparisons",
    description:
      "The same task, the same IDE, different models. See exactly where Claude, GPT, and Gemini diverge in practice.",
  },
  {
    icon: ThumbsUp,
    title: "Honest wins and failures",
    description:
      "When the AI gets it wrong or spins in circles, you'll see that too. No cherry-picked highlight reels.",
  },
  {
    icon: Repeat,
    title: "Reusable prompts and workflows",
    description:
      "Every session ends with a set of prompts, settings, and workflows you can copy directly into your own projects.",
  },
];

const upcomingBuilds = [
  {
    title: "Local Business Scraper with Claude Code + Bright Data",
    description:
      "A working lead scraper built in one Claude Code session — city + category in, structured business leads out. Full stack, exact prompt, what broke.",
    ide: "Claude Code",
    llm: "Bright Data",
    ideColor: "orange" as const,
    llmColor: "blue" as const,
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-500",
    icon: Terminal,
    href: "/watch-me-build/local-business-scraper-claude-code",
    label: "Build #01 · Preview",
    labelVariant: "orange" as const,
  },
  {
    title: "Next.js SaaS in Cursor + Claude Opus 4.6",
    description:
      "A one-day invoice-tracker SaaS — auth, billing, dashboard, webhooks — built in Cursor with Claude Opus 4.6. Hour-by-hour log of what shipped and what broke.",
    ide: "Cursor",
    llm: "Claude Opus 4.6",
    ideColor: "purple" as const,
    llmColor: "orange" as const,
    gradientFrom: "from-purple-500",
    gradientTo: "to-indigo-600",
    icon: Monitor,
    href: null,
    label: "Coming soon",
    labelVariant: "secondary" as const,
  },
  {
    title: "Refactor marathon in Copilot CLI",
    description:
      "Refactoring a messy 3,000-line legacy codebase using GitHub Copilot CLI. How far can it go before it needs hand-holding?",
    ide: "Copilot CLI",
    llm: "GPT-4o",
    ideColor: "blue" as const,
    llmColor: "green" as const,
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-500",
    icon: Code2,
    href: null,
    label: "Coming soon",
    labelVariant: "secondary" as const,
  },
  {
    title: "Full-stack build in Windsurf",
    description:
      "A full-stack app — React frontend, Express API, Postgres database — built entirely inside Windsurf with minimal manual edits.",
    ide: "Windsurf",
    llm: "Gemini 2.5 Pro",
    ideColor: "green" as const,
    llmColor: "blue" as const,
    gradientFrom: "from-teal-500",
    gradientTo: "to-green-600",
    icon: Layers,
    href: null,
    label: "Coming soon",
    labelVariant: "secondary" as const,
  },
];

export default async function WatchMeBuildPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs */}
      <div className="container pt-6">
        <BreadcrumbSchema
          items={[{ name: "Watch Me Build", href: "/watch-me-build" }]}
        />
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge
                variant="orange"
                className="px-3 py-1 text-sm font-semibold"
              >
                Coming Soon
              </Badge>
            </div>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Video className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Watch Me Build
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Real builds. Real tools. See how today&apos;s AI coding agents
              actually perform when the rubber hits the road.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              What to Expect
            </h2>
            <p className="text-muted-foreground">
              Every episode is a no-edit, no-highlight-reel look at what it
              actually takes to build something with AI.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {whatToExpect.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="gap-4 py-6">
                  <CardContent className="flex flex-col gap-3 px-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold leading-snug">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Builds */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Upcoming Builds
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s in the pipeline. Every build uses a
              different tool combination so you can compare apples to apples.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Build #01 is live in preview — full screencasts and master prompts
              drop soon.
            </p>
            <p className="text-sm text-muted-foreground">
              <Link
                href="/watch-me-build/local-business-scraper-claude-code"
                className="text-primary hover:underline font-medium"
              >
                Read Build #01 →
              </Link>
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {upcomingBuilds.map((build) => {
              const Icon = build.icon;
              const inner = (
                <>
                  {/* Gradient placeholder header */}
                  <div
                    className={`h-28 bg-gradient-to-br ${build.gradientFrom} ${build.gradientTo} flex items-center justify-center relative`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant={build.labelVariant}
                        className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs"
                      >
                        {build.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-base leading-snug">
                      {build.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {build.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      <Badge variant={build.ideColor}>{build.ide}</Badge>
                      <Badge variant={build.llmColor}>{build.llm}</Badge>
                    </div>
                  </div>
                </>
              );

              return build.href ? (
                <Link
                  key={build.title}
                  href={build.href}
                  className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow block"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={build.title}
                  className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">
                Get notified when the first build drops.
              </h2>
              <p className="text-muted-foreground">
                No spam — just a heads-up when a new episode is live.
              </p>
            </div>
            <EmailCapture
              variant="inline"
              heading="Notify me when Watch Me Build launches"
              subtext="Be first to know when the first real-use screencast goes live."
              buttonText="Notify Me"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
