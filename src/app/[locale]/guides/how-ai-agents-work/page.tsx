import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { TableOfContents } from "@/components/seo/table-of-contents";
import { routing } from "@/i18n/routing";
import {
  Brain,
  Eye,
  Lightbulb,
  Zap,
  Database,
  Network,
  Clock,
  BookOpen,
  ArrowRight,
  Cpu,
  MessageSquare,
  GitBranch,
  RefreshCw,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/guides/how-ai-agents-work`;

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": `${baseUrl}/guides/how-ai-agents-work` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/guides/how-ai-agents-work`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "How Do AI Agents Work? Technical Guide 2026 - ZeroToAIAgents",
    description:
      "Discover the technical architecture behind AI agents: perception, reasoning, planning, action, and learning. A comprehensive technical guide for developers and decision-makers.",
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "How Do AI Agents Work? Technical Guide 2026",
      description:
        "Discover the technical architecture behind AI agents: perception, reasoning, planning, action, and learning.",
      type: "article",
    },
  };
}

export default async function HowAiAgentsWorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pageUrl = locale === "en" ? `${baseUrl}/guides/how-ai-agents-work` : `${baseUrl}/${locale}/guides/how-ai-agents-work`;

  return (
    <>
      <ArticleJsonLd
        title="How Do AI Agents Work? Technical Guide 2026"
        description="Discover the technical architecture behind AI agents: perception, reasoning, planning, action, and learning."
        url={pageUrl}
        datePublished="2026-02-01"
        dateModified="2026-02-16"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "How AI Agents Work", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "How AI Agents Work", href: "/guides/how-ai-agents-work" }]} className="mb-6" />
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Technical Guide</Badge>
              <Badge variant="outline">10 min read</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              How Do AI Agents Work? Technical Guide
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Understand the technical architecture behind AI agents: from perception and reasoning to planning, action execution, and continuous learning.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Updated Feb 16, 2026
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Intermediate Level
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <TableOfContents
              title="In This Guide"
              items={[
                { id: "architecture", title: "The AI Agent Architecture" },
                { id: "perception", title: "Perception & Input" },
                { id: "reasoning", title: "Reasoning & Planning" },
                { id: "action", title: "Action & Execution" },
                { id: "learning", title: "Learning & Memory" },
                { id: "multi-agent", title: "Multi-Agent Systems" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            {/* Architecture */}
            <div id="architecture" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Cpu className="h-6 w-6 text-primary" />
                The AI Agent Architecture
              </h2>
              <p className="text-muted-foreground mb-4">
                AI agents follow a continuous cycle of perception, reasoning, action, and learning. This architecture, often called the "sense-think-act" loop, enables agents to operate autonomously in complex environments.
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">The Core Agent Loop</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Perceive</p>
                      <p className="text-sm text-muted-foreground">Receive input from environment (messages, data, events)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center font-bold text-green-600 dark:text-green-400">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Think</p>
                      <p className="text-sm text-muted-foreground">Analyze context, reason about options, plan next steps</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center font-bold text-purple-600 dark:text-purple-400">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Act</p>
                      <p className="text-sm text-muted-foreground">Execute actions using tools and APIs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center font-bold text-orange-600 dark:text-orange-400">
                      4
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Learn</p>
                      <p className="text-sm text-muted-foreground">Store feedback and improve future performance</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                This cycle repeats continuously, allowing the agent to adapt to changing conditions and improve over time. Modern AI agents are built on top of Large Language Models (LLMs) like GPT-4, Claude, or Gemini, which provide the reasoning engine at the core.
              </p>
            </div>

            {/* Perception */}
            <div id="perception" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Eye className="h-6 w-6 text-primary" />
                Perception & Input Processing
              </h2>
              <p className="text-muted-foreground mb-4">
                Perception is how an AI agent understands its environment. Unlike humans who perceive through senses, AI agents process structured and unstructured data from various sources.
              </p>

              <div className="grid gap-4 my-6">
                <div className="bg-card border rounded-xl p-5">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Natural Language Input
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Agents process text from emails, chat messages, support tickets, or voice transcriptions. They extract intent, entities, and context using natural language understanding (NLU).
                  </p>
                </div>

                <div className="bg-card border rounded-xl p-5">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Database className="h-5 w-5 text-green-600" />
                    Structured Data
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Agents can query databases, read spreadsheets, parse JSON/XML, and integrate with business systems to gather relevant information.
                  </p>
                </div>

                <div className="bg-card border rounded-xl p-5">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    Event Triggers
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Agents listen for events like new customer signups, order completions, or threshold alerts, then react accordingly.
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                Modern agents use embedding models to convert text into numerical vectors, enabling semantic search and similarity matching. This allows them to understand meaning, not just keywords.
              </p>
            </div>

            {/* Reasoning & Planning */}
            <div id="reasoning" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
                Reasoning & Planning
              </h2>
              <p className="text-muted-foreground mb-4">
                The reasoning layer is where the agent's "intelligence" resides. This is typically powered by a Large Language Model that can understand context, generate responses, and make decisions.
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-3">Key Reasoning Techniques</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Chain-of-Thought (CoT)</h4>
                    <p className="text-sm text-muted-foreground">
                      The agent breaks down complex problems into step-by-step reasoning, showing its work like a human would. Example: "First, I need to check inventory. Then, calculate shipping cost. Finally, provide a quote."
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">ReAct (Reasoning + Acting)</h4>
                    <p className="text-sm text-muted-foreground">
                      The agent alternates between reasoning about the problem and taking actions to gather more information. It can plan, execute, observe results, and re-plan dynamically.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Few-Shot Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      Agents learn from examples provided in their prompt. By showing 2-3 examples of desired behavior, the agent can generalize to new situations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Retrieval-Augmented Generation (RAG)</h4>
                    <p className="text-sm text-muted-foreground">
                      The agent retrieves relevant information from a knowledge base or vector database before generating a response, ensuring accuracy and up-to-date information.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                Planning involves breaking down goals into actionable subtasks. An agent might create a multi-step plan like: "1) Query CRM for customer data, 2) Check product availability, 3) Generate personalized recommendation, 4) Send email."
              </p>
            </div>

            {/* Action & Execution */}
            <div id="action" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Zap className="h-6 w-6 text-primary" />
                Action & Execution
              </h2>
              <p className="text-muted-foreground mb-4">
                Actions are what make AI agents truly useful—they don't just talk, they do. Agents execute actions through "tools" or "function calling," which are integrations with external systems.
              </p>

              <div className="space-y-4 my-6">
                <div className="bg-card border rounded-lg p-4">
                  <h3 className="font-bold mb-2">Tool/Function Calling</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Modern LLMs support function calling, where the agent can invoke predefined functions to interact with external systems. Example tools:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• <code className="bg-muted px-1 rounded">send_email(to, subject, body)</code></li>
                    <li>• <code className="bg-muted px-1 rounded">query_database(sql)</code></li>
                    <li>• <code className="bg-muted px-1 rounded">create_calendar_event(date, title)</code></li>
                    <li>• <code className="bg-muted px-1 rounded">update_crm_record(id, fields)</code></li>
                  </ul>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <h3 className="font-bold mb-2">API Integrations</h3>
                  <p className="text-sm text-muted-foreground">
                    Agents connect to third-party services via REST APIs, webhooks, or SDKs. Common integrations include Slack, Gmail, Salesforce, Stripe, Zendesk, and thousands of other tools via platforms like Zapier or Make.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <h3 className="font-bold mb-2">Code Execution</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced agents can write and execute code in sandboxed environments to perform complex calculations, data transformations, or custom logic that goes beyond pre-built tools.
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                Safety mechanisms are critical during action execution. Agents typically require human approval for high-risk actions (like financial transactions or data deletion) and have rate limits to prevent runaway behavior.
              </p>
            </div>

            {/* Learning & Memory */}
            <div id="learning" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <RefreshCw className="h-6 w-6 text-primary" />
                Learning & Memory
              </h2>
              <p className="text-muted-foreground mb-4">
                AI agents improve over time through various forms of memory and learning mechanisms.
              </p>

              <div className="grid gap-4 my-6">
                <div className="bg-card border rounded-xl p-5">
                  <h3 className="font-bold mb-2">Short-Term Memory (Context Window)</h3>
                  <p className="text-sm text-muted-foreground">
                    The agent remembers the current conversation or task context. Modern LLMs have context windows ranging from 8K to 200K+ tokens, allowing them to track long conversations or analyze large documents.
                  </p>
                </div>

                <div className="bg-card border rounded-xl p-5">
                  <h3 className="font-bold mb-2">Long-Term Memory (Vector Databases)</h3>
                  <p className="text-sm text-muted-foreground">
                    Past interactions, customer preferences, and learned knowledge are stored in vector databases (like Pinecone, Weaviate, or Chroma). The agent can recall relevant information from thousands of past interactions instantly.
                  </p>
                </div>

                <div className="bg-card border rounded-xl p-5">
                  <h3 className="font-bold mb-2">Episodic Memory</h3>
                  <p className="text-sm text-muted-foreground">
                    The agent stores specific interaction histories (e.g., "Last time this customer called, they complained about shipping delays"). This enables personalized, context-aware interactions.
                  </p>
                </div>

                <div className="bg-card border rounded-xl p-5">
                  <h3 className="font-bold mb-2">Reinforcement Learning from Human Feedback (RLHF)</h3>
                  <p className="text-sm text-muted-foreground">
                    Agents can be fine-tuned based on human ratings of their performance. When users mark responses as "helpful" or "unhelpful," the agent learns to optimize for better outcomes.
                  </p>
                </div>
              </div>
            </div>

            {/* Multi-Agent Systems */}
            <div id="multi-agent" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Network className="h-6 w-6 text-primary" />
                Multi-Agent Systems
              </h2>
              <p className="text-muted-foreground mb-4">
                Complex problems often require multiple specialized agents working together, each with specific expertise and responsibilities.
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">Example: Customer Service Multi-Agent System</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <GitBranch className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold">Router Agent</p>
                      <p className="text-sm text-muted-foreground">Classifies incoming requests and routes to appropriate specialist agent</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold">Technical Support Agent</p>
                      <p className="text-sm text-muted-foreground">Handles product troubleshooting and technical questions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Database className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold">Billing Agent</p>
                      <p className="text-sm text-muted-foreground">Manages subscription changes, refunds, and payment issues</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Brain className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-semibold">Escalation Agent</p>
                      <p className="text-sm text-muted-foreground">Determines when to hand off to human support and summarizes context</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                Multi-agent systems can collaborate, delegate tasks, and even negotiate with each other to achieve complex goals that would be difficult for a single agent to handle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">Ready to Implement AI Agents?</h2>
            <p className="text-muted-foreground">
              Compare top AI agent platforms and find the one with the right technical capabilities for your use case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/compare">
                  Compare Platforms
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/guides/choosing-ai-agent">Choosing Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FAQSchema
              faqs={[
                {
                  question: "What programming languages are AI agents built with?",
                  answer: "AI agents are most commonly built with Python due to its rich ecosystem of AI/ML libraries (LangChain, LlamaIndex, Transformers). However, TypeScript/JavaScript is also popular for web-based agents, and many no-code platforms allow building agents without programming."
                },
                {
                  question: "Can I build my own AI agent?",
                  answer: "Yes! You can build custom AI agents using frameworks like LangChain (Python/JS), AutoGPT, or BabyAGI. For simpler use cases, no-code platforms like Zapier Central, Relevance AI, or VectorShift allow you to create agents without coding. The complexity depends on your use case."
                },
                {
                  question: "How do AI agents differ from RPA (Robotic Process Automation)?",
                  answer: "RPA follows rigid, pre-programmed workflows and breaks when conditions change. AI agents use LLMs to understand context, adapt to new situations, and make decisions dynamically. Think of RPA as a robot following a script, while AI agents are more like intelligent assistants that can think and improvise."
                },
                {
                  question: "What are the limitations of current AI agents?",
                  answer: "Current limitations include: occasional hallucinations (making up information), difficulty with very long-term planning, potential for errors in multi-step reasoning, and challenges with tasks requiring visual perception or physical interaction. They work best with well-defined tasks and clear success criteria."
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <RelatedPages
              title="Continue Learning"
              pages={[
                { title: "What is an AI Agent?", description: "Beginner's guide to AI agents", href: "/guides/what-is-ai-agent", icon: "shield" },
                { title: "Building AI Workflows", description: "Step-by-step workflow design guide", href: "/guides/building-ai-workflows", icon: "zap" },
                { title: "AI Agent Integrations", description: "Connect agents to your tech stack", href: "/guides/ai-agent-integrations", icon: "lock" },
                { title: "Best AI Agents 2026", description: "Top-rated platforms compared", href: "/best/best-ai-agent", icon: "trophy" }
              ]}
            />
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
