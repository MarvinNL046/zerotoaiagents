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
  Bot,
  Users,
  MessageSquare,
  Zap,
  Target,
  Calendar,
  ShoppingCart,
  Clock,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Database,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/guides/what-is-ai-agent`;

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": `${baseUrl}/guides/what-is-ai-agent` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/guides/what-is-ai-agent`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "What is an AI Agent? Complete Beginner's Guide 2026 - ZeroToAIAgents",
    description:
      "Learn what an AI agent is, how it works, and why you need one. Our comprehensive beginner's guide explains AI agent technology in simple terms.",
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "What is an AI Agent? Complete Beginner's Guide 2026",
      description:
        "Learn what an AI agent is, how it works, and why you need one. Our comprehensive beginner's guide explains AI agent technology in simple terms.",
      type: "article",
    },
  };
}

export default async function WhatIsAiAgentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pageUrl = locale === "en" ? `${baseUrl}/guides/what-is-ai-agent` : `${baseUrl}/${locale}/guides/what-is-ai-agent`;

  return (
    <>
      <ArticleJsonLd
        title="What is an AI Agent? Complete Beginner's Guide 2026"
        description="Learn what an AI agent is, how it works, and why you need one. Our comprehensive beginner's guide explains AI agent technology in simple terms."
        url={pageUrl}
        datePublished="2026-02-01"
        dateModified="2026-02-16"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "What is an AI Agent?", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "What is an AI Agent?", href: "/guides/what-is-ai-agent" }]} className="mb-6" />
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Beginner's Guide</Badge>
              <Badge variant="outline">8 min read</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              What is an AI Agent? Complete Beginner's Guide
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Discover how AI agents are transforming the way we work by autonomously handling tasks, making decisions, and taking actions on your behalf.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Updated Feb 16, 2026
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Beginner Level
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
                { id: "what-is-ai-agent", title: "What is an AI Agent?" },
                { id: "types-of-agents", title: "Types of AI Agents" },
                { id: "agents-vs-chatbots", title: "How They Differ from Chatbots" },
                { id: "real-world-examples", title: "Real-World Examples" },
                { id: "benefits", title: "Benefits of AI Agents" },
                { id: "getting-started", title: "How to Get Started" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            {/* What is an AI Agent */}
            <div id="what-is-ai-agent" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Brain className="h-6 w-6 text-primary" />
                What is an AI Agent?
              </h2>
              <p className="text-muted-foreground mb-4">
                An AI agent is an autonomous software program powered by artificial intelligence that can perceive its environment, make decisions, and take actions to achieve specific goals without constant human oversight. Unlike traditional software that follows rigid rules, AI agents can learn, adapt, and handle complex tasks independently.
              </p>
              <p className="text-muted-foreground mb-4">
                Think of an AI agent as a digital employee that works 24/7, handling repetitive tasks, analyzing data, interacting with customers, and making decisions based on the parameters you set. It combines the power of large language models (LLMs) with the ability to use tools, access data, and execute actions in the real world.
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  Key Characteristics of AI Agents
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Autonomy: Can work independently without constant human input
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Perception: Understands context from text, data, or other inputs
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Decision-making: Analyzes situations and chooses appropriate actions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Action: Can execute tasks, send messages, update databases, and more
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Learning: Improves performance over time through feedback and data
                  </li>
                </ul>
              </div>
            </div>

            {/* Types of AI Agents */}
            <div id="types-of-agents" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Bot className="h-6 w-6 text-primary" />
                Types of AI Agents
              </h2>
              <p className="text-muted-foreground mb-4">
                AI agents come in various forms, each designed for specific use cases and levels of complexity.
              </p>

              <div className="grid gap-4 my-6">
                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Conversational Agents</h3>
                      <p className="text-sm text-muted-foreground">
                        Handle customer service, answer questions, and engage in natural dialogue. Examples: customer support chatbots, virtual assistants.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Task-Oriented Agents</h3>
                      <p className="text-sm text-muted-foreground">
                        Designed to complete specific tasks like scheduling meetings, processing invoices, or managing workflows automatically.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Data Analysis Agents</h3>
                      <p className="text-sm text-muted-foreground">
                        Analyze large datasets, generate insights, create reports, and identify patterns that humans might miss.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Multi-Agent Systems</h3>
                      <p className="text-sm text-muted-foreground">
                        Multiple specialized agents working together, each handling different aspects of complex problems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agents vs Chatbots */}
            <div id="agents-vs-chatbots" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Zap className="h-6 w-6 text-primary" />
                How AI Agents Differ from Chatbots
              </h2>
              <p className="text-muted-foreground mb-4">
                While chatbots and AI agents might seem similar, they have fundamental differences in capability and autonomy.
              </p>

              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-bold">Feature</th>
                      <th className="text-left p-3 font-bold">Traditional Chatbot</th>
                      <th className="text-left p-3 font-bold">AI Agent</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="p-3 font-medium">Autonomy</td>
                      <td className="p-3 text-muted-foreground">Reactive, waits for input</td>
                      <td className="p-3 text-muted-foreground">Proactive, initiates actions</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Decision-Making</td>
                      <td className="p-3 text-muted-foreground">Follows predefined scripts</td>
                      <td className="p-3 text-muted-foreground">Makes contextual decisions</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Tool Usage</td>
                      <td className="p-3 text-muted-foreground">Limited or none</td>
                      <td className="p-3 text-muted-foreground">Can use multiple tools and APIs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Learning</td>
                      <td className="p-3 text-muted-foreground">Minimal adaptation</td>
                      <td className="p-3 text-muted-foreground">Learns from interactions</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Task Complexity</td>
                      <td className="p-3 text-muted-foreground">Simple, single-step</td>
                      <td className="p-3 text-muted-foreground">Complex, multi-step workflows</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Real-World Examples */}
            <div id="real-world-examples" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                Real-World Examples of AI Agents
              </h2>

              <div className="space-y-4 my-6">
                <div className="bg-card border rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">Sales & Customer Success Agent</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically qualifies leads, schedules meetings, follows up with prospects, updates CRM records, and identifies upsell opportunities without human intervention.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">Customer Support Agent</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Handles incoming support tickets, answers common questions, escalates complex issues to humans, and provides 24/7 assistance across multiple channels.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">E-commerce Personal Shopper Agent</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recommends products based on browsing history, answers product questions, helps with sizing, and completes purchases on behalf of customers.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Database className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">Data Analysis & Reporting Agent</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Monitors business metrics, generates automated reports, identifies anomalies, and sends alerts when specific thresholds are met.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div id="benefits" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Benefits of Using AI Agents
              </h2>

              <div className="grid gap-3 my-6">
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">24/7 Availability: Never sleeps, works around the clock</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Scalability: Handle thousands of tasks simultaneously</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Consistency: Delivers uniform quality without fatigue</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Cost Efficiency: Reduces operational costs compared to human labor</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Speed: Processes information and takes action instantly</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Data-Driven: Makes decisions based on comprehensive data analysis</span>
                </div>
              </div>
            </div>

            {/* Getting Started */}
            <div id="getting-started" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Brain className="h-6 w-6 text-primary" />
                How to Get Started with AI Agents
              </h2>
              <p className="text-muted-foreground mb-4">
                Ready to implement AI agents in your business or personal workflow? Here's how to begin:
              </p>

              <div className="space-y-4 my-6">
                <div className="bg-card border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Identify Your Use Case</h4>
                      <p className="text-sm text-muted-foreground">
                        Determine which repetitive or time-consuming tasks could benefit from automation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Choose the Right Platform</h4>
                      <p className="text-sm text-muted-foreground">
                        Compare AI agent platforms based on features, pricing, integrations, and ease of use.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Start Small</h4>
                      <p className="text-sm text-muted-foreground">
                        Begin with a simple use case, measure results, then expand to more complex workflows.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Monitor & Optimize</h4>
                      <p className="text-sm text-muted-foreground">
                        Track performance metrics, gather feedback, and refine your agent's behavior over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">Ready to Find Your Perfect AI Agent?</h2>
            <p className="text-muted-foreground">
              Compare the top AI agent platforms and find the one that best fits your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/compare">
                  Compare AI Agents
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/best/best-ai-agent">View Top Picks</Link>
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
                  question: "What is the difference between AI and an AI agent?",
                  answer: "AI (Artificial Intelligence) is the broad technology that enables machines to perform tasks requiring human intelligence. An AI agent is a specific application of AI that can autonomously perceive, decide, and act to achieve goals. Think of AI as the brain, and the AI agent as the entire autonomous being that uses that brain to interact with the world."
                },
                {
                  question: "Can AI agents replace human workers?",
                  answer: "AI agents are designed to augment human work, not replace it entirely. They excel at repetitive, data-intensive, and well-defined tasks, freeing humans to focus on creative, strategic, and relationship-based work. The most successful implementations use AI agents to handle routine tasks while humans oversee, make complex decisions, and handle exceptions."
                },
                {
                  question: "How much do AI agents cost?",
                  answer: "AI agent pricing varies widely depending on the platform, features, and usage volume. Some platforms offer free tiers for basic use, while enterprise solutions can range from $50/month to several thousand dollars per month. Many use consumption-based pricing, charging per API call, conversation, or task completed."
                },
                {
                  question: "Are AI agents secure and private?",
                  answer: "Security depends on the platform you choose. Reputable AI agent providers implement encryption, access controls, data privacy measures, and compliance with regulations like GDPR and SOC 2. Always review a platform's security documentation, data handling policies, and choose providers with strong track records in enterprise security."
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
                { title: "How AI Agents Work", description: "Technical deep-dive into AI agent architecture", href: "/guides/how-ai-agents-work", icon: "zap" },
                { title: "AI Agent Security", description: "Security and privacy best practices", href: "/guides/ai-agent-security", icon: "lock" },
                { title: "Best AI Agents 2026", description: "Our top-rated AI agent recommendations", href: "/best/best-ai-agent", icon: "trophy" },
                { title: "Choosing an AI Agent", description: "How to select the right AI agent platform", href: "/guides/choosing-ai-agent", icon: "shield" }
              ]}
            />
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
