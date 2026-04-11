"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { AgentCard } from "@/components/agents/agent-card";
import { RatingStars } from "@/components/agents/rating-stars";
import { FAQSchema } from "@/components/seo/faq-schema";
import { RelatedPages } from "@/components/seo/related-pages";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { aiAgentProviders, type AgentCategory } from "@/lib/ai-agent-data";
import { Bot, CheckCircle2, GitCompare, Trophy } from "lucide-react";

interface ReviewsPageClientProps {
  agents: typeof aiAgentProviders;
  locale: string;
}

export function ReviewsPageClient({ agents, locale }: ReviewsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<AgentCategory | "all">("all");

  const topCodingAgents = [...agents]
    .filter((agent) => agent.category === "coding-agents")
    .sort((a, b) => b.overallRating - a.overallRating)
    .slice(0, 3);

  const categories: Array<AgentCategory | "all"> = [
    "all",
    "coding-agents",
    "no-code-builders",
    "frameworks",
    "enterprise",
    "customer-support",
    "general-purpose",
  ];

  const filteredAgents = selectedCategory === "all"
    ? agents
    : agents.filter((agent) => agent.category === selectedCategory);

  const reviewFaqs = [
    {
      question: "What is the best AI coding agent in 2026?",
      answer:
        "Based on our current hands-on testing, Claude Code, Cursor, and GitHub Copilot are the strongest overall options for most developers. The right choice depends on whether you want terminal-first autonomy, an AI-native editor, or broad IDE compatibility.",
    },
    {
      question: "How do you rank AI coding agents?",
      answer:
        "We rank tools on overall performance, ease of use, value for money, pricing, workflow fit, and how well they handle real development tasks such as editing, debugging, and navigating larger codebases.",
    },
    {
      question: "Which AI coding agent is best for beginners?",
      answer:
        "Cursor and GitHub Copilot are usually the easiest starting points because they fit into familiar editor workflows and require less setup than more autonomous or framework-oriented tools.",
    },
    {
      question: "Are free AI coding agents worth using?",
      answer:
        "Yes, free tiers are useful for testing workflows and occasional usage, but serious daily development usually benefits from paid plans with better limits, stronger models, and more reliable agent features.",
    },
  ];

  return (
    <div>
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="container relative text-center">
          <Badge className="mb-4 bg-orange-500 text-white hover:bg-orange-500">
            Editorial Rankings 2026
          </Badge>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Best AI Coding Agents 2026
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-300">
            We tested 26 AI agents and ranked the best options for coding, automation, and AI-assisted development. Start with the top picks below, then compare detailed reviews side by side.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-slate-200">
              <Bot className="h-4 w-4 text-orange-400" />
              26 agents reviewed
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-slate-200">
              <GitCompare className="h-4 w-4 text-orange-400" />
              Compare top tools
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-orange-400" />
              Ranked by hands-on testing
            </span>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-orange-500" />
            <h2 className="text-2xl font-bold">Top AI Coding Picks Right Now</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {topCodingAgents.map((agent, index) => (
              <div
                key={agent.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="mb-4 flex items-center justify-between">
                  <Badge variant={index === 0 ? "default" : "secondary"}>
                    #{index + 1} Pick
                  </Badge>
                  <span className="text-sm font-semibold text-muted-foreground">
                    ${agent.annualPrice}/mo
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold">{agent.name}</h3>
                <div className="mb-3 flex items-center gap-2">
                  <RatingStars rating={agent.overallRating} size="sm" showValue={false} />
                  <span className="text-sm font-semibold">{agent.overallRating}/5</span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  {agent.shortDescription}
                </p>
                <p className="mb-5 text-sm font-medium">
                  Best for: {agent.bestFor}
                </p>
                <div className="flex flex-col gap-3">
                  <Button asChild>
                    <Link href={`/reviews/${agent.slug}`}>Read {agent.name} Review</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/compare">Compare Alternatives</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-muted/30 p-6 dark:border-slate-700 lg:col-span-2">
            <h2 className="mb-4 text-2xl font-bold">How We Rank AI Coding Agents</h2>
            <p className="mb-4 text-muted-foreground">
              This page is our roundup hub for the best AI coding agents. We score each tool on hands-on usefulness, model quality, speed, pricing, and how well it fits real development workflows.
            </p>
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <div className="rounded-xl border bg-background p-4">
                <h3 className="mb-2 font-semibold">Performance</h3>
                <p className="text-muted-foreground">How well the agent handles real coding tasks, edits, reasoning, and multi-file work.</p>
              </div>
              <div className="rounded-xl border bg-background p-4">
                <h3 className="mb-2 font-semibold">Ease of use</h3>
                <p className="text-muted-foreground">How quickly a developer can install the tool and start getting useful output.</p>
              </div>
              <div className="rounded-xl border bg-background p-4">
                <h3 className="mb-2 font-semibold">Value for money</h3>
                <p className="text-muted-foreground">How pricing compares to limits, output quality, and day-to-day usefulness.</p>
              </div>
              <div className="rounded-xl border bg-background p-4">
                <h3 className="mb-2 font-semibold">Workflow fit</h3>
                <p className="text-muted-foreground">Whether a tool is better for pair programming, autonomous coding, automation, or enterprise teams.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-bold">Start Here</h2>
            <div className="space-y-3 text-sm">
              <Link href="/compare" className="block rounded-xl border p-4 transition-colors hover:border-orange-500">
                Compare the top agents side by side
              </Link>
              <Link href="/guides/what-are-ai-coding-agents" className="block rounded-xl border p-4 transition-colors hover:border-orange-500">
                Learn what AI coding agents actually do
              </Link>
              <Link href="/guides/how-to-choose-ai-coding-agent" className="block rounded-xl border p-4 transition-colors hover:border-orange-500">
                Use our selection guide to choose faster
              </Link>
              <Link href="/guides/ai-coding-agent-statistics" className="block rounded-xl border p-4 transition-colors hover:border-orange-500">
                Review the latest adoption and market stats
              </Link>
            </div>
          </div>
        </section>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={
                selectedCategory === cat
                  ? "rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
                  : "rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-orange-500 hover:text-orange-500 dark:border-slate-600 dark:text-slate-400"
              }
            >
              {cat === "all"
                ? "All"
                : cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ))}
        </div>

        <div className="mb-6 text-center text-sm text-muted-foreground">
          Showing {filteredAgents.length} agent{filteredAgents.length !== 1 ? "s" : ""}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} rank={index + 1} locale={locale} />
          ))}
        </div>

        <section className="mt-16">
          <FAQSchema
            faqs={reviewFaqs}
            title="Best AI Coding Agents FAQ"
          />
        </section>

        <section className="mt-16">
          <RelatedPages
            title="Related Pages"
            pages={[
              {
                title: "Compare AI Agents",
                description: "See the top tools side by side before choosing a winner.",
                href: "/compare",
                icon: "zap",
              },
              {
                title: "What Are AI Coding Agents?",
                description: "Get the fundamentals before diving into individual tools.",
                href: "/guides/what-are-ai-coding-agents",
                icon: "help",
              },
              {
                title: "How to Choose the Right Agent",
                description: "Use our framework to narrow down the best option for your workflow.",
                href: "/guides/how-to-choose-ai-coding-agent",
                icon: "trophy",
              },
              {
                title: "AI Coding Agent Statistics 2026",
                description: "See the public adoption, trust, and enterprise rollout numbers behind the category.",
                href: "/guides/ai-coding-agent-statistics",
                icon: "users",
              },
            ]}
          />
        </section>
      </div>
    </div>
  );
}
