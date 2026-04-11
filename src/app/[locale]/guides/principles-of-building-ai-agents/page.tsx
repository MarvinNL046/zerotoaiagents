import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { AuthorBio } from "@/components/author-bio";
import { routing } from "@/i18n/routing";
import {
  BrainCircuit,
  CheckCircle,
  GitBranch,
  Layers3,
  ShieldCheck,
  Workflow,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";
const pageSlug = "principles-of-building-ai-agents";

const faqs = [
  {
    question: "What is the most important principle when building AI agents?",
    answer:
      "The most important principle is control over execution. An agent needs clear task boundaries, tool discipline, and a reliable way to recover when a step fails.",
  },
  {
    question: "Should I use a framework like CrewAI, AutoGen, or LangGraph?",
    answer:
      "Yes, if you are building anything beyond a toy prototype. Frameworks help with orchestration, state, tool access, and debugging. The right choice depends on whether you prioritize speed, explicit control, or conversational multi-agent patterns.",
  },
  {
    question: "Why does state matter so much in agent systems?",
    answer:
      "State is what lets an agent make progress across steps without forgetting what already happened. In real systems, state and checkpoints are often more important than model size or prompt cleverness.",
  },
  {
    question: "What should teams evaluate in an agent system?",
    answer:
      "Teams should evaluate task success, error recovery, tool behavior, cost, latency, and how much human review is still required. Good evaluation is about operational reliability, not just nice demos.",
  },
];

const principles = [
  {
    title: "Start with task boundaries",
    icon: Workflow,
    body:
      "An agent needs a narrow definition of success. The more ambiguous the objective, the more likely it is to drift, over-call tools, or waste tokens.",
  },
  {
    title: "Treat tools as capabilities, not magic",
    icon: Layers3,
    body:
      "Tool use turns a model into an agent, but every tool increases failure modes. Give agents only the tools required for the task and keep the contract of each tool explicit.",
  },
  {
    title: "State beats memory hand-waving",
    icon: GitBranch,
    body:
      "Persistent state, checkpoints, and workflow context matter more than vague claims about memory. Good systems make progress inspectable and resumable.",
  },
  {
    title: "Guardrails are part of product quality",
    icon: ShieldCheck,
    body:
      "If an agent can take action, then retries, approvals, and rollback paths are part of the architecture. Safety determines whether teams trust the system enough to keep using it.",
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
    title: "Principles of Building AI Agents",
    description:
      "A practical guide to building AI agents: orchestration, memory, guardrails, evaluation, and how CrewAI, AutoGen, and LangGraph differ.",
    keywords: [
      "principles of building ai agents",
      "ai agent architecture",
      "how to build ai agents",
      "crewai vs autogen vs langgraph",
      "ai agent orchestration",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: "Principles of Building AI Agents",
      description:
        "A practical builder guide for AI agents, with framework-level context for CrewAI, AutoGen, and LangGraph.",
      url: canonicalUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: "Principles of Building AI Agents",
      description:
        "The practical builder guide for AI agents: orchestration, memory, evaluation, and framework choice.",
    },
  };
}

export default async function PrinciplesOfBuildingAiAgentsPage({ params }: Props) {
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
                { name: "Principles of Building AI Agents", href: `/guides/${pageSlug}` },
              ]}
              className="mb-6 text-slate-400"
            />
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                Builder Guide
              </Badge>
              <Badge className="bg-white/10 text-slate-300 border-white/20">
                10 min read
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Principles of Building AI Agents
            </h1>
            <p className="text-xl text-slate-300">
              Good AI agents come from workflow design, not prompt mythology. If you want agents that survive real use,
              you need better boundaries, state, tool contracts, evaluation, and framework choices.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto review-content">
            <h2 className="flex items-center gap-2 text-3xl font-bold mb-4">
              <BrainCircuit className="h-7 w-7 text-orange-500" />
              Good Agents Are Workflow Systems
            </h2>
            <p>
              The first design mistake is to over-focus on model choice. In practice, the harder engineering problems are usually
              task decomposition, state handling, tool contracts, error recovery, and evaluation.
            </p>
            <p>
              That is why modern agent frameworks are really orchestration systems. They help teams manage execution and reliability,
              not just text generation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 max-w-3xl">
              <h2 className="text-3xl font-bold mb-3">Core Principles</h2>
              <p className="text-muted-foreground">
                These are the principles that separate a demo agent from a system you can maintain.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <div key={principle.title} className="rounded-2xl border bg-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-semibold">{principle.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {principle.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto review-content">
            <h2 className="text-3xl font-bold mb-4">How the Main Frameworks Differ</h2>
            <p>
              <Link href="/reviews/crewai" className="text-orange-600 hover:text-orange-700 underline">CrewAI</Link>
              {" "}is strong when you want an approachable role-and-task abstraction and quick time to value.
            </p>
            <p>
              <Link href="/reviews/langgraph" className="text-orange-600 hover:text-orange-700 underline">LangGraph</Link>
              {" "}is strongest when explicit state, graph-based control flow, and production reliability matter most.
            </p>
            <p>
              <Link href="/reviews/autogen" className="text-orange-600 hover:text-orange-700 underline">AutoGen</Link>
              {" "}is useful for conversational multi-agent patterns, especially where dialogue between specialized agents is the core paradigm.
            </p>
            <p>
              If you want the fastest side-by-side view, use the
              <Link href="/compare/crewai-vs-autogen-vs-langgraph" className="text-orange-600 hover:text-orange-700 underline"> CrewAI vs AutoGen vs LangGraph comparison</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-2xl font-bold mb-4">A practical build sequence</h2>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  Define the single job the agent owns.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  Limit tool access to what the job actually needs.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  Add state or checkpoints before adding more autonomy.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  Build evaluation into the loop so you can measure real task success.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  Add approval or rollback paths where the agent can cause real cost or damage.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FAQSchema faqs={faqs} title="Principles of Building AI Agents FAQ" />
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-3">
            <Link href="/reviews/crewai" className="rounded-2xl border bg-card p-5 hover:border-orange-300 hover:shadow-lg transition-all">
              <h3 className="font-semibold mb-2">CrewAI Review</h3>
              <p className="text-sm text-muted-foreground">
                A good fit when you want quick multi-agent orchestration with less upfront complexity.
              </p>
            </Link>
            <Link href="/reviews/autogen" className="rounded-2xl border bg-card p-5 hover:border-orange-300 hover:shadow-lg transition-all">
              <h3 className="font-semibold mb-2">AutoGen Review</h3>
              <p className="text-sm text-muted-foreground">
                Useful if conversational coordination between agents is central to the design.
              </p>
            </Link>
            <Link href="/compare/crewai-vs-autogen-vs-langgraph" className="rounded-2xl border bg-card p-5 hover:border-orange-300 hover:shadow-lg transition-all">
              <h3 className="font-semibold mb-2">3-Way Framework Comparison</h3>
              <p className="text-sm text-muted-foreground">
                Compare the three major framework options before choosing your architecture.
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
