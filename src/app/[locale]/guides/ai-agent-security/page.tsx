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
  Shield,
  Lock,
  Eye,
  Key,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Clock,
  BookOpen,
  FileText,
  Database,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/guides/ai-agent-security`;

  const languages: Record<string, string> = { "x-default": `${baseUrl}/guides/ai-agent-security` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/guides/ai-agent-security`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "AI Agent Security & Privacy Guide 2026 - ZeroToAIAgents",
    description:
      "Essential security and privacy best practices for AI agents. Learn about data protection, access controls, compliance, and risk mitigation.",
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: "AI Agent Security & Privacy Guide 2026",
      description: "Essential security and privacy best practices for AI agents.",
      type: "article",
    },
  };
}

export default async function AiAgentSecurityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pageUrl = locale === "en" ? `${baseUrl}/guides/ai-agent-security` : `${baseUrl}/${locale}/guides/ai-agent-security`;

  return (
    <>
      <ArticleJsonLd
        title="AI Agent Security & Privacy Guide 2026"
        description="Essential security and privacy best practices for AI agents."
        url={pageUrl}
        datePublished="2026-02-01"
        dateModified="2026-02-16"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "AI Agent Security", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "AI Agent Security", href: "/guides/ai-agent-security" }]} className="mb-6" />
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Security Guide</Badge>
                <Badge variant="outline">7 min read</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                AI Agent Security & Privacy Guide
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Protect your business and customers with comprehensive security and privacy practices for AI agents.
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
                  <Shield className="h-6 w-6 text-primary" />
                  Why Security Matters for AI Agents
                </h2>
                <p className="text-muted-foreground mb-4">
                  AI agents have access to sensitive business data, customer information, and often the ability to take actions that impact your operations. Unlike traditional software, AI agents make autonomous decisions, which introduces unique security challenges.
                </p>
                <p className="text-muted-foreground mb-4">
                  A compromised AI agent could leak confidential data, make unauthorized transactions, damage customer relationships, or expose your organization to legal liability. Implementing robust security measures is not optional—it's essential.
                </p>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                  Key Security Principles
                </h2>
                <div className="grid gap-4">
                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Principle of Least Privilege</h3>
                        <p className="text-sm text-muted-foreground">
                          Grant AI agents only the minimum permissions necessary to perform their tasks. Never give blanket access to all systems or data.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Data Minimization</h3>
                        <p className="text-sm text-muted-foreground">
                          Only provide agents with the data they absolutely need. Avoid sending entire databases or customer records when specific fields would suffice.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Audit Logging</h3>
                        <p className="text-sm text-muted-foreground">
                          Log every action an AI agent takes, including what data it accessed, what decisions it made, and what actions it executed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Human-in-the-Loop for High-Risk Actions</h3>
                        <p className="text-sm text-muted-foreground">
                          Require human approval for actions that involve money, data deletion, legal commitments, or sensitive customer interactions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                  Privacy & Compliance
                </h2>
                <p className="text-muted-foreground mb-4">
                  When deploying AI agents, you must comply with data protection regulations like GDPR, CCPA, HIPAA (for healthcare), and industry-specific standards.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Data Processing Agreements</p>
                      <p className="text-sm text-muted-foreground">Ensure your AI agent provider has proper DPAs in place if they process customer data.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Data Retention Policies</p>
                      <p className="text-sm text-muted-foreground">Define how long agent conversation logs and customer data are retained, and implement automatic deletion.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">User Consent</p>
                      <p className="text-sm text-muted-foreground">Inform customers when they're interacting with an AI agent and obtain consent for data processing.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Right to Deletion</p>
                      <p className="text-sm text-muted-foreground">Provide mechanisms for users to request deletion of their data from agent memory and logs.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  Common Security Risks
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <h4 className="font-semibold mb-1">Prompt Injection Attacks</h4>
                    <p className="text-sm text-muted-foreground">
                      Malicious users may try to manipulate the agent with crafted prompts. Use input validation, prompt templates, and output filtering to mitigate this.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <h4 className="font-semibold mb-1">Data Leakage</h4>
                    <p className="text-sm text-muted-foreground">
                      Agents may inadvertently reveal sensitive information in responses. Implement content filtering and test agents thoroughly before production.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <h4 className="font-semibold mb-1">Unauthorized Actions</h4>
                    <p className="text-sm text-muted-foreground">
                      Without proper guardrails, agents might take actions beyond their intended scope. Use role-based access controls and action approval workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl font-bold">Find Secure AI Agent Platforms</h2>
              <p className="text-muted-foreground">
                Compare platforms based on security certifications, compliance features, and privacy controls.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/compare">
                    Compare Platforms
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/guides/choosing-ai-agent">Selection Guide</Link>
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
                    question: "Are AI agents GDPR compliant?",
                    answer: "AI agents can be GDPR compliant if properly configured. Choose platforms with GDPR features like data processing agreements, encryption, audit logs, and data deletion capabilities. You're responsible for configuring agents correctly and obtaining user consent."
                  },
                  {
                    question: "Can AI agents be hacked?",
                    answer: "Like any software, AI agents have security risks including prompt injection, data leakage, and unauthorized access. Mitigate risks through access controls, input validation, audit logging, human oversight for sensitive actions, and choosing reputable platforms with strong security."
                  },
                  {
                    question: "How is data encrypted in AI agents?",
                    answer: "Reputable platforms use TLS/SSL for data in transit and AES-256 encryption for data at rest. Conversation logs, customer data, and API credentials should all be encrypted. Verify your platform's encryption standards before deployment."
                  },
                  {
                    question: "What security certifications should I look for?",
                    answer: "Look for SOC 2 Type II, ISO 27001, GDPR compliance, and industry-specific certifications (HIPAA for healthcare, PCI DSS for payments). Check if the platform has penetration testing, bug bounty programs, and transparent security documentation."
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
                  { title: "Choosing an AI Agent", description: "Selection criteria and comparison", href: "/guides/choosing-ai-agent", icon: "shield" },
                  { title: "AI Agent Integrations", description: "Connect securely to your stack", href: "/guides/ai-agent-integrations", icon: "lock" },
                  { title: "Best AI Agents 2026", description: "Top secure platforms", href: "/best/best-ai-agent", icon: "trophy" }
                ]}
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
