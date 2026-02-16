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
  Plug,
  Database,
  Mail,
  Calendar,
  MessageSquare,
  ShoppingCart,
  CheckCircle,
  ArrowRight,
  Clock,
  BookOpen,
  GitBranch,
  Cloud,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/guides/ai-agent-integrations`;

  const languages: Record<string, string> = { "x-default": `${baseUrl}/guides/ai-agent-integrations` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/guides/ai-agent-integrations`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "AI Agent Integrations Guide 2026 - Connect Your Tech Stack - ZeroToAIAgents",
    description:
      "Learn how to integrate AI agents with CRM, email, calendars, databases, and more. Best practices for seamless connectivity.",
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: "AI Agent Integrations Guide 2026 - Connect Your Tech Stack",
      description: "How to integrate AI agents with your business tools and systems.",
      type: "article",
    },
  };
}

export default async function AiAgentIntegrationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pageUrl = locale === "en" ? `${baseUrl}/guides/ai-agent-integrations` : `${baseUrl}/${locale}/guides/ai-agent-integrations`;

  return (
    <>
      <ArticleJsonLd
        title="AI Agent Integrations Guide 2026 - Connect Your Tech Stack"
        description="How to integrate AI agents with your business tools and systems."
        url={pageUrl}
        datePublished="2026-02-01"
        dateModified="2026-02-16"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "AI Agent Integrations", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "AI Agent Integrations", href: "/guides/ai-agent-integrations" }]} className="mb-6" />
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Integration Guide</Badge>
                <Badge variant="outline">7 min read</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                AI Agent Integrations Guide
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Connect your AI agents to CRM, email, calendars, databases, and thousands of other tools for seamless automation.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Updated Feb 16, 2026
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Technical Focus
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
                  <Plug className="h-6 w-6 text-primary" />
                  Why Integrations Matter
                </h2>
                <p className="text-muted-foreground mb-4">
                  AI agents are only as useful as the systems they can access. Without integrations, agents work in isolation—unable to pull customer data, update records, send emails, or trigger workflows. Proper integration transforms agents from chatbots into powerful automation engines.
                </p>
                <p className="text-muted-foreground mb-4">
                  The best AI agent platforms offer hundreds of pre-built integrations plus APIs for custom connections. Look for native integrations to your critical tools to minimize setup complexity.
                </p>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <GitBranch className="h-6 w-6 text-primary" />
                  Essential Integration Categories
                </h2>
                <div className="grid gap-4">
                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">CRM & Customer Data</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Salesforce, HubSpot, Pipedrive, Zoho CRM. Agents pull customer history, update records, create leads, and track interactions automatically.
                        </p>
                        <p className="text-xs font-semibold text-blue-600">Priority: Critical for sales & support agents</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Email & Communication</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Gmail, Outlook, SendGrid, Mailchimp. Send automated emails, parse incoming messages, and manage campaigns.
                        </p>
                        <p className="text-xs font-semibold text-green-600">Priority: Essential for outreach & notifications</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Messaging Platforms</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Slack, Microsoft Teams, WhatsApp, Discord. Deploy agents where your team and customers already communicate.
                        </p>
                        <p className="text-xs font-semibold text-purple-600">Priority: High for internal tools & customer support</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Calendar & Scheduling</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Google Calendar, Outlook Calendar, Calendly. Agents book meetings, check availability, and send reminders.
                        </p>
                        <p className="text-xs font-semibold text-orange-600">Priority: Critical for sales & scheduling agents</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">E-commerce & Payments</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Shopify, WooCommerce, Stripe, PayPal. Process orders, track shipments, handle returns, and answer product questions.
                        </p>
                        <p className="text-xs font-semibold text-red-600">Priority: Essential for e-commerce businesses</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                        <Cloud className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Databases & Data Sources</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          PostgreSQL, MySQL, MongoDB, Airtable, Google Sheets. Query data, generate reports, and update records in real-time.
                        </p>
                        <p className="text-xs font-semibold text-cyan-600">Priority: High for data analysis agents</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  Integration Best Practices
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Use OAuth When Possible</p>
                      <p className="text-sm text-muted-foreground">OAuth is more secure than API keys. It allows granular permissions and easy revocation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Start with Read-Only Access</p>
                      <p className="text-sm text-muted-foreground">Test integrations with read-only permissions first. Grant write access only after thorough testing.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Implement Rate Limiting</p>
                      <p className="text-sm text-muted-foreground">Prevent runaway API calls that could exceed third-party limits or incur unexpected costs.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Log All Integration Actions</p>
                      <p className="text-sm text-muted-foreground">Track what data was accessed, what actions were taken, and when. Critical for debugging and auditing.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Use Webhooks for Real-Time Updates</p>
                      <p className="text-sm text-muted-foreground">Instead of constantly polling for changes, use webhooks to trigger agent actions when events occur.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Plug className="h-6 w-6 text-primary" />
                  Integration Platforms
                </h2>
                <p className="text-muted-foreground mb-4">
                  If your AI agent platform lacks a specific integration, middleware platforms can bridge the gap:
                </p>
                <div className="grid gap-3">
                  <div className="bg-card border rounded-lg p-4">
                    <p className="font-semibold mb-1">Zapier & Make (Integromat)</p>
                    <p className="text-sm text-muted-foreground">Connect 5,000+ apps with no-code workflows. Ideal for non-technical teams.</p>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <p className="font-semibold mb-1">n8n (Open Source)</p>
                    <p className="text-sm text-muted-foreground">Self-hosted workflow automation with 400+ integrations. Full control and customization.</p>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <p className="font-semibold mb-1">Workato</p>
                    <p className="text-sm text-muted-foreground">Enterprise-grade integration platform with AI-powered workflow suggestions.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Database className="h-6 w-6 text-primary" />
                  Custom Integration Development
                </h2>
                <p className="text-muted-foreground mb-4">
                  For proprietary systems or unique requirements, you may need custom integrations. Most AI agent platforms provide:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>REST APIs:</strong> Call agent functions programmatically from your apps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Webhooks:</strong> Receive notifications when agent events occur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>SDKs:</strong> Libraries for Python, JavaScript, etc. to simplify integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Function Calling:</strong> Define custom tools the agent can invoke</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl font-bold">Find Platforms with the Right Integrations</h2>
              <p className="text-muted-foreground">
                Compare AI agent platforms based on their integration ecosystem.
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
                    question: "Do I need coding skills to set up integrations?",
                    answer: "It depends on the platform. No-code platforms like Zapier or platforms with pre-built integrations require zero coding. Custom integrations or advanced workflows may require basic programming knowledge in Python or JavaScript."
                  },
                  {
                    question: "How secure are AI agent integrations?",
                    answer: "Security varies by platform. Look for OAuth 2.0 support, encrypted API keys, SOC 2 compliance, and granular permission controls. Never share credentials directly—use secure authentication methods and regularly rotate API keys."
                  },
                  {
                    question: "Can AI agents integrate with legacy systems?",
                    answer: "Yes, but it may require custom development. If your legacy system has a REST API or database access, agents can connect. For systems without APIs, you may need middleware or custom connectors built by developers."
                  },
                  {
                    question: "What happens if an integration breaks?",
                    answer: "Integrations can break due to API changes, credential expiration, or rate limits. Choose platforms with monitoring, error alerts, and automatic retry logic. Always have fallback processes and human escalation paths for critical workflows."
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
                  { title: "Building AI Workflows", description: "Workflow design patterns", href: "/guides/building-ai-workflows", icon: "shield" },
                  { title: "Choosing an AI Agent", description: "Platform selection criteria", href: "/guides/choosing-ai-agent", icon: "lock" },
                  { title: "Best AI Agents 2026", description: "Top integrated platforms", href: "/best/best-ai-agent", icon: "trophy" }
                ]}
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
