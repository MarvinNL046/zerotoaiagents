import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { AuthorBio } from "@/components/author-bio";
import { routing } from "@/i18n/routing";
import {
  ArrowRight,
  Bot,
  Brain,
  Briefcase,
  CheckCircle,
  Code2,
  MessagesSquare,
  Network,
  Workflow,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";
const pageSlug = "what-are-ai-agents";

const faqs = [
  {
    question: "What is an AI agent in simple terms?",
    answer:
      "An AI agent is software that can interpret a goal, make decisions, use tools, and take actions with some level of autonomy. It is more than a chatbot because it can do work, not just answer questions.",
  },
  {
    question: "How are AI agents different from chatbots?",
    answer:
      "A chatbot mainly responds to prompts in conversation. An AI agent can plan steps, call tools, interact with software, and continue working toward an outcome. The difference is action and workflow control, not just language generation.",
  },
  {
    question: "Are AI coding agents the same thing as AI agents?",
    answer:
      "AI coding agents are one category inside the broader AI agent market. They specialize in reading code, editing files, running commands, and helping software teams ship faster. The wider category also includes workflow, research, support, and enterprise agents.",
  },
  {
    question: "When should a team use an AI agent?",
    answer:
      "Use an AI agent when the work involves repeatable steps, tool access, and measurable outcomes. Good fits include coding tasks, reporting, workflow automation, knowledge retrieval, and operational handoffs that benefit from speed but still allow human review.",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/guides/${pageSlug}`;
  const languages: Record<string, string> = {
    "x-default": `${baseUrl}/guides/${pageSlug}`,
  };

  routing.locales.forEach((l) => {
    const localePrefix = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${localePrefix}/guides/${pageSlug}`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "What Are AI Agents? A Beginner's Guide",
    description:
      "Learn what AI agents are, how they differ from chatbots and copilots, where they are used, and which categories matter most in 2026.",
    keywords: [
      "what are ai agents",
      "ai agents explained",
      "ai agent examples",
      "ai agent vs chatbot",
      "types of ai agents",
      "what is an ai agent",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: "What Are AI Agents? A Beginner's Guide",
      description:
        "A practical introduction to AI agents: what they are, how they work, and where they fit beyond coding alone.",
      url: canonicalUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: "What Are AI Agents? A Beginner's Guide",
      description:
        "A practical introduction to AI agents: categories, examples, and how they differ from chatbots and copilots.",
    },
  };
}

const agentCategories = [
  {
    title: "Coding Agents",
    icon: Code2,
    description:
      "These agents work inside developer workflows: reading code, editing files, running tests, and helping ship software.",
    cta: { label: "See coding agent reviews", href: "/reviews" },
  },
  {
    title: "Workflow Automation Agents",
    icon: Workflow,
    description:
      "These agents connect apps, trigger actions, and automate business processes across tools like CRMs, docs, and internal systems.",
    cta: { label: "See n8n AI review", href: "/reviews/n8n-ai" },
  },
  {
    title: "Research And Multi-Agent Systems",
    icon: Network,
    description:
      "These systems coordinate multiple specialized agents for planning, critique, retrieval, and execution across longer tasks.",
    cta: { label: "See CrewAI review", href: "/reviews/crewai" },
  },
  {
    title: "Customer And Business Agents",
    icon: Briefcase,
    description:
      "These agents handle support, operations, reporting, and internal workflows for sales, service, and enterprise teams.",
    cta: { label: "Compare agent categories", href: "/compare" },
  },
];

export default async function WhatAreAiAgentsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="flex flex-col">
      <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <BreadcrumbSchema
              items={[
                { name: "Guides", href: "/guides" },
                { name: "What Are AI Agents?", href: `/guides/${pageSlug}` },
              ]}
              className="mb-6 text-slate-400"
            />
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                Fundamentals
              </Badge>
              <Badge className="bg-white/10 text-slate-300 border-white/20">
                9 min read
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              What Are AI Agents?
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              AI agents are software systems that can interpret goals, use tools, make decisions,
              and take action with some degree of autonomy. They matter because they move AI beyond
              answering questions and into completing work.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h2 className="font-semibold mb-2">Short definition</h2>
                <p className="text-sm text-slate-300">
                  An AI agent is software that observes context, plans steps, and takes actions to reach an outcome.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h2 className="font-semibold mb-2">Why this matters</h2>
                <p className="text-sm text-slate-300">
                  The shift from chat to action is what makes agents commercially important in coding, operations, and automation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto review-content">
            <h2 className="flex items-center gap-2 text-3xl font-bold mb-4">
              <Bot className="h-7 w-7 text-orange-500" />
              AI Agents Are About Action, Not Just Answers
            </h2>
            <p>
              The easiest mistake is to think an AI agent is just a smarter chatbot. That is not quite right.
              A chatbot mostly responds to prompts. An agent can often break a task into steps, call tools,
              use memory or context, and keep moving toward an outcome.
            </p>
            <p>
              In practice, that means an agent can do things like edit code, summarize a dashboard, create a workflow,
              route a support task, or trigger actions across multiple systems. The more tool access and decision-making it has,
              the more agentic the system becomes.
            </p>
            <div className="my-8 rounded-2xl border bg-card p-6">
              <h3 className="font-semibold mb-3">The simplest model</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  It receives a goal.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  It reads context or state.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  It chooses actions or tools.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  It iterates until the task is finished or needs human input.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto review-content">
            <h2 className="flex items-center gap-2 text-3xl font-bold mb-4">
              <MessagesSquare className="h-7 w-7 text-orange-500" />
              How AI Agents Differ From Chatbots, Copilots, and Automations
            </h2>
            <p>
              Chatbots focus on conversation. Copilots assist inside an existing workflow. Automation tools run predefined steps.
              AI agents sit somewhere between those worlds: they can reason over a goal, choose actions dynamically, and adapt when the path is not fully scripted.
            </p>
            <p>
              That is why categories overlap. A coding copilot can become an agent when it edits files, runs commands, and keeps iterating.
              A workflow tool becomes agentic when it can decide which branch or tool to use without every step being hard-coded.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 max-w-3xl">
              <h2 className="flex items-center gap-2 text-3xl font-bold mb-3">
                <Brain className="h-7 w-7 text-orange-500" />
                The Main Types of AI Agents
              </h2>
              <p className="text-muted-foreground">
                This is the category map that matters most in 2026. It is also the best way to understand where your site already has authority.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {agentCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.title} className="rounded-2xl border bg-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-5">
                      {category.description}
                    </p>
                    <Button asChild variant="outline">
                      <Link href={category.cta.href}>
                        {category.cta.label}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto review-content">
            <h2 className="text-3xl font-bold mb-4">Examples of AI Agents in the Real World</h2>
            <p>
              In software, a tool like <Link href="/reviews/claude-code" className="text-orange-600 hover:text-orange-700 underline">Claude Code</Link>
              {" "}acts as an agent when it reads a codebase, applies edits, runs commands, and iterates on failures.
            </p>
            <p>
              In automation, a tool like <Link href="/reviews/n8n-ai" className="text-orange-600 hover:text-orange-700 underline">n8n AI</Link>
              {" "}becomes agentic when it orchestrates multiple systems, decides which branch to follow, and handles structured work beyond a static one-step zap.
            </p>
            <p>
              In framework land, tools like <Link href="/reviews/crewai" className="text-orange-600 hover:text-orange-700 underline">CrewAI</Link>
              {" "}help teams build multi-agent systems where planning, execution, retrieval, and critique are split across specialized roles.
            </p>
            <p>
              If your main interest is still coding agents, use our <Link href="/reviews" className="text-orange-600 hover:text-orange-700 underline">best AI coding agents hub</Link>.
              If you want to narrow down specific tools, go straight to the <Link href="/compare" className="text-orange-600 hover:text-orange-700 underline">comparison hub</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FAQSchema faqs={faqs} title="What Are AI Agents? FAQ" />
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-3">
            <Link href="/reviews" className="rounded-2xl border bg-card p-5 hover:border-orange-300 hover:shadow-lg transition-all">
              <h3 className="font-semibold mb-2">Best AI Coding Agents</h3>
              <p className="text-sm text-muted-foreground">
                Start with the highest-intent commercial hub and see the current top picks.
              </p>
            </Link>
            <Link href="/guides/what-are-ai-coding-agents" className="rounded-2xl border bg-card p-5 hover:border-orange-300 hover:shadow-lg transition-all">
              <h3 className="font-semibold mb-2">What Are AI Coding Agents?</h3>
              <p className="text-sm text-muted-foreground">
                Go deeper on the coding-specific segment if that is your main use case.
              </p>
            </Link>
            <Link href="/guides/ai-coding-agent-statistics" className="rounded-2xl border bg-card p-5 hover:border-orange-300 hover:shadow-lg transition-all">
              <h3 className="font-semibold mb-2">AI Coding Agent Statistics</h3>
              <p className="text-sm text-muted-foreground">
                See adoption, trust, and buyer-facing metrics behind the category.
              </p>
            </Link>
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
