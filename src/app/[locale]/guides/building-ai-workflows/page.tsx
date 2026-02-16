import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { routing } from "@/i18n/routing";
import {
  Workflow,
  GitBranch,
  CheckCircle,
  ArrowRight,
  Clock,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/guides/building-ai-workflows`;

  const languages: Record<string, string> = { "x-default": `${baseUrl}/guides/building-ai-workflows` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/guides/building-ai-workflows`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "Building AI Agent Workflows: Design Patterns & Best Practices 2026 - ZeroToAIAgents",
    description:
      "Learn how to design effective AI agent workflows with conditional logic, error handling, and multi-step automation. Practical examples and templates.",
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: "Building AI Agent Workflows: Design Patterns & Best Practices 2026",
      description: "Design effective AI agent workflows with practical examples and templates.",
      type: "article",
    },
  };
}

export default async function BuildingAiWorkflowsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pageUrl = locale === "en" ? `${baseUrl}/guides/building-ai-workflows` : `${baseUrl}/${locale}/guides/building-ai-workflows`;

  return (
    <>
      <ArticleJsonLd
        title="Building AI Agent Workflows: Design Patterns & Best Practices 2026"
        description="Design effective AI agent workflows with practical examples and templates."
        url={pageUrl}
        datePublished="2026-02-01"
        dateModified="2026-02-16"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "Building AI Workflows", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "Building AI Workflows", href: "/guides/building-ai-workflows" }]} className="mb-6" />
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Workflow Guide</Badge>
                <Badge variant="outline">9 min read</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Building AI Agent Workflows
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Master the art of designing effective AI agent workflows with conditional logic, error handling, and multi-step automation.
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

        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto space-y-12">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Workflow className="h-6 w-6 text-primary" />
                  What is an AI Workflow?
                </h2>
                <p className="text-muted-foreground mb-4">
                  An AI workflow is a series of connected steps where an AI agent processes inputs, makes decisions, takes actions, and produces outputs. Unlike traditional workflows that follow rigid rules, AI workflows adapt based on context and can handle ambiguous situations.
                </p>
                <p className="text-muted-foreground mb-4">
                  Effective workflows combine the flexibility of AI reasoning with the reliability of structured processes. This ensures agents deliver consistent results while adapting to unique situations.
                </p>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Target className="h-6 w-6 text-primary" />
                  Workflow Design Principles
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Start with a Clear Goal</p>
                      <p className="text-sm text-muted-foreground">Define what success looks like. "Qualify leads" is vague. "Identify leads with $10K+ budget and 3-month timeline" is specific.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Break Down Complex Tasks</p>
                      <p className="text-sm text-muted-foreground">Decompose big goals into smaller, testable steps. Each step should have a clear input, process, and output.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Add Decision Points</p>
                      <p className="text-sm text-muted-foreground">Use conditional logic to handle different scenarios. &quot;If budget &gt; $10K, route to sales. Else, send to nurture campaign.&quot;</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Plan for Errors</p>
                      <p className="text-sm text-muted-foreground">What happens if an API fails, data is missing, or the agent can't decide? Build fallbacks and escalation paths.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <GitBranch className="h-6 w-6 text-primary" />
                  Common Workflow Patterns
                </h2>
                <div className="space-y-4">
                  <div className="bg-card border rounded-xl p-5">
                    <h3 className="font-bold mb-3">1. Sequential Workflow</h3>
                    <p className="text-sm text-muted-foreground mb-3">Steps execute in order, each depending on the previous one.</p>
                    <div className="bg-muted/50 rounded p-3 text-xs font-mono space-y-1">
                      <div>1. Receive customer inquiry</div>
                      <div>2. Extract intent and entities</div>
                      <div>3. Query knowledge base</div>
                      <div>4. Generate response</div>
                      <div>5. Send to customer</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Best for: Simple, linear processes with predictable steps</p>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <h3 className="font-bold mb-3">2. Conditional Branching</h3>
                    <p className="text-sm text-muted-foreground mb-3">Workflow splits based on conditions or decisions.</p>
                    <div className="bg-muted/50 rounded p-3 text-xs font-mono space-y-1">
                      <div>1. Analyze support ticket</div>
                      <div>2. IF technical issue → Route to engineering</div>
                      <div>   ELSE IF billing → Route to finance</div>
                      <div>   ELSE → General support queue</div>
                      <div>3. Create ticket in appropriate system</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Best for: Classification, routing, and decision-making tasks</p>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <h3 className="font-bold mb-3">3. Loop/Iteration</h3>
                    <p className="text-sm text-muted-foreground mb-3">Repeat steps until a condition is met or goal achieved.</p>
                    <div className="bg-muted/50 rounded p-3 text-xs font-mono space-y-1">
                      <div>1. Get list of pending invoices</div>
                      <div>2. FOR EACH invoice:</div>
                      <div>     - Check payment status</div>
                      <div>     - IF overdue, send reminder</div>
                      <div>     - Update CRM record</div>
                      <div>3. Generate summary report</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Best for: Batch processing, data analysis, and repetitive tasks</p>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <h3 className="font-bold mb-3">4. Human-in-the-Loop</h3>
                    <p className="text-sm text-muted-foreground mb-3">Agent pauses for human approval before critical actions.</p>
                    <div className="bg-muted/50 rounded p-3 text-xs font-mono space-y-1">
                      <div>1. Generate contract based on conversation</div>
                      <div>2. Extract key terms and pricing</div>
                      <div>3. **PAUSE: Request human review**</div>
                      <div>4. IF approved → Send contract to customer</div>
                      <div>   ELSE → Revise and resubmit</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Best for: High-stakes decisions, legal/financial actions, quality control</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Real-World Workflow Example
                </h2>
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="font-bold mb-3">Use Case: Lead Qualification & Routing</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">1.</span>
                      <div>
                        <p className="font-medium">Trigger: New form submission received</p>
                        <p className="text-muted-foreground">Webhook from website triggers workflow</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">2.</span>
                      <div>
                        <p className="font-medium">Enrichment: Query CRM for existing contact</p>
                        <p className="text-muted-foreground">Check if lead already exists, merge data if found</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">3.</span>
                      <div>
                        <p className="font-medium">Qualification: Analyze lead data</p>
                        <p className="text-muted-foreground">Score based on company size, budget, timeline, industry</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">4.</span>
                      <div>
                        <p className="font-medium">Routing Decision:</p>
                        <p className="text-muted-foreground">
                          • High score (80+) → Schedule call with senior AE<br />
                          • Medium score (50-79) → Assign to SDR for outreach<br />
                          • Low score (&lt;50) → Add to nurture email sequence
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">5.</span>
                      <div>
                        <p className="font-medium">Notification: Alert assigned team member</p>
                        <p className="text-muted-foreground">Send Slack message with lead details and AI summary</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">6.</span>
                      <div>
                        <p className="font-medium">Follow-up: Auto-send personalized email</p>
                        <p className="text-muted-foreground">Generate tailored message based on lead's industry and pain points</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-primary">7.</span>
                      <div>
                        <p className="font-medium">Logging: Update CRM with all actions</p>
                        <p className="text-muted-foreground">Record score, routing decision, and next steps</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  Error Handling & Edge Cases
                </h2>
                <div className="space-y-3">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="font-semibold mb-1">Missing or Invalid Data</p>
                    <p className="text-sm text-muted-foreground">Use default values, ask for clarification, or mark for human review. Never let workflows fail silently.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="font-semibold mb-1">API Failures</p>
                    <p className="text-sm text-muted-foreground">Implement retry logic with exponential backoff. After 3 failed attempts, escalate to humans and log the error.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="font-semibold mb-1">Ambiguous Intent</p>
                    <p className="text-sm text-muted-foreground">When the agent can't confidently determine next steps, ask clarifying questions rather than guessing.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="font-semibold mb-1">Timeout or Long-Running Tasks</p>
                    <p className="text-sm text-muted-foreground">Set reasonable timeouts. For slow processes, move to async execution and notify when complete.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                  Workflow Optimization Tips
                </h2>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Minimize API Calls</p>
                      <p className="text-sm text-muted-foreground">Batch requests, cache frequent queries, and only fetch data when needed.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Test with Real Data</p>
                      <p className="text-sm text-muted-foreground">Use production-like data during testing to uncover edge cases and performance issues.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Monitor Performance Metrics</p>
                      <p className="text-sm text-muted-foreground">Track completion rate, average execution time, error rate, and user satisfaction.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Version Your Workflows</p>
                      <p className="text-sm text-muted-foreground">Keep previous versions so you can rollback if new changes cause issues.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl font-bold">Ready to Build Your AI Workflow?</h2>
              <p className="text-muted-foreground">
                Compare platforms with visual workflow builders and advanced automation features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/compare">
                    Compare Platforms
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

        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <FAQSchema
                faqs={[
                  {
                    question: "Do I need to know programming to build AI workflows?",
                    answer: "Not necessarily. Many platforms offer visual workflow builders with drag-and-drop interfaces. However, complex workflows with custom logic, API integrations, or advanced conditional branching may benefit from programming knowledge (Python or JavaScript)."
                  },
                  {
                    question: "How do I test AI workflows before production?",
                    answer: "Use sandbox environments, test with historical data, run A/B tests with small traffic percentages, and implement comprehensive logging. Start with human-in-the-loop approvals for critical actions until you're confident in the workflow's reliability."
                  },
                  {
                    question: "What's the best way to handle workflow failures?",
                    answer: "Implement retry logic for transient errors, log all failures with context, alert humans for critical failures, and have fallback paths (e.g., escalate to human agent). Always track failure rates and investigate patterns to improve reliability."
                  },
                  {
                    question: "Can workflows be reused across different use cases?",
                    answer: "Yes! Design workflows as modular, reusable components. For example, a 'Send Email' workflow can be used in lead nurturing, support tickets, and order confirmations. Use templates and parameterize inputs for maximum reusability."
                  }
                ]}
              />
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <RelatedPages
                title="Related Guides"
                pages={[
                  { title: "How AI Agents Work", description: "Technical architecture guide", href: "/guides/how-ai-agents-work", icon: "zap" },
                  { title: "AI Agent Integrations", description: "Connect to your tech stack", href: "/guides/ai-agent-integrations", icon: "lock" },
                  { title: "AI Agents for Business", description: "Real-world use cases", href: "/guides/ai-agents-for-business", icon: "shield" },
                  { title: "Best AI Agents 2026", description: "Top workflow platforms", href: "/best/best-ai-agent", icon: "trophy" }
                ]}
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
