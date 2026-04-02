import { setRequestLocale } from "next-intl/server";
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
  Users,
  Terminal,
  Code,
  Zap,
  Clock,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  GitBranch,
  MessageSquare,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/guides/getting-started-ai-pair-programming`;

  const languages: Record<string, string> = {
    "x-default": `${baseUrl}/guides/getting-started-ai-pair-programming`,
  };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/guides/getting-started-ai-pair-programming`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "Getting Started with AI Pair Programming: A Practical Guide - ZeroToAIAgents",
    description:
      "Learn how to set up AI pair programming with Cursor, GitHub Copilot, or Claude Code. Best practices, common mistakes, workflow tips, and example sessions included.",
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: "Getting Started with AI Pair Programming: A Practical Guide",
      description:
        "Learn how to set up AI pair programming with Cursor, GitHub Copilot, or Claude Code. Best practices, common mistakes, workflow tips, and example sessions included.",
      type: "article",
    },
  };
}

export default async function GettingStartedAiPairProgrammingPage({
  params,
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pageUrl =
    locale === "en"
      ? `${baseUrl}/guides/getting-started-ai-pair-programming`
      : `${baseUrl}/${locale}/guides/getting-started-ai-pair-programming`;

  return (
    <>
      <ArticleJsonLd
        title="Getting Started with AI Pair Programming: A Practical Guide"
        description="Learn how to set up AI pair programming with Cursor, GitHub Copilot, or Claude Code. Best practices, common mistakes, workflow tips, and example sessions included."
        url={pageUrl}
        datePublished="2026-01-25"
        dateModified="2026-04-02"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          {
            name: "Getting Started with AI Pair Programming",
            url: pageUrl,
          },
        ]}
      />
      <article className="flex flex-col">
        {/* Hero */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <BreadcrumbSchema
                items={[
                  { name: "Guides", href: "/guides" },
                  {
                    name: "Getting Started with AI Pair Programming",
                    href: "/guides/getting-started-ai-pair-programming",
                  },
                ]}
                className="mb-6"
              />
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Practical Guide</Badge>
                <Badge variant="outline">11 min read</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Getting Started with AI Pair Programming
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                AI pair programming is the practice of working alongside an AI
                coding agent in real time — writing code together, reviewing
                suggestions, and iterating rapidly. This guide gets you set up
                and productive in one afternoon.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Updated April 2, 2026
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Beginner Friendly
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
                  { id: "what-is", title: "What AI Pair Programming Actually Is" },
                  { id: "setup", title: "Setup Steps for Popular Tools" },
                  { id: "best-practices", title: "Best Practices" },
                  { id: "common-mistakes", title: "Common Mistakes to Avoid" },
                  { id: "workflow", title: "Recommended Workflow" },
                  { id: "example-session", title: "Example AI Pair Programming Session" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">

              {/* What Is It */}
              <div id="what-is" className="scroll-mt-20 mb-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Users className="h-6 w-6 text-primary" />
                  What AI Pair Programming Actually Is
                </h2>
                <p className="text-muted-foreground mb-4">
                  Traditional pair programming involves two developers at one keyboard — one writes (the &quot;driver&quot;), one reviews and thinks ahead (the &quot;navigator&quot;). Studies show this produces higher-quality code with fewer bugs, though at roughly 1.5x the time cost.
                </p>
                <p className="text-muted-foreground mb-4">
                  AI pair programming applies this dynamic with an AI agent as your co-developer. The AI never gets tired, never has an off day, knows every library in existence, and can switch between driver and navigator roles instantly. The key difference from just using an AI chatbot is continuity — the AI stays in context with your code session and responds to your actual work as it evolves.
                </p>
                <div className="bg-card border rounded-xl p-6 my-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    AI Pair Programming vs. Just Using AI Chat
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold mb-2 text-muted-foreground">AI Chat (ChatGPT, Claude.ai)</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• You copy/paste code manually</li>
                        <li>• Loses context between sessions</li>
                        <li>• Can&apos;t see your actual project</li>
                        <li>• High friction for iterations</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2 text-muted-foreground">AI Pair Programming (Cursor, Copilot)</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• AI reads your actual files</li>
                        <li>• Maintains project context</li>
                        <li>• Applies changes directly</li>
                        <li>• Low friction, fast iterations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Setup */}
              <div id="setup" className="scroll-mt-20 mb-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Terminal className="h-6 w-6 text-primary" />
                  Setup Steps for Popular Tools
                </h2>

                <div className="space-y-6 my-6">
                  <div className="bg-card border rounded-xl overflow-hidden">
                    <div className="bg-muted/40 px-5 py-3 border-b">
                      <h3 className="font-bold">Setting up Cursor</h3>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">1</span>
                        <p className="text-sm text-muted-foreground">Download Cursor from cursor.com and install it. Import your VS Code settings when prompted — it carries over extensions, themes, and keybindings automatically.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">2</span>
                        <p className="text-sm text-muted-foreground">Sign in with a GitHub or Google account. The free tier starts immediately — no credit card needed.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">3</span>
                        <p className="text-sm text-muted-foreground">Open your project folder. Cursor will index your codebase in the background — you&apos;ll see a progress indicator in the status bar.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">4</span>
                        <p className="text-sm text-muted-foreground">Try autocomplete first: start typing in any file and press Tab to accept suggestions. Then open Composer (Cmd+I / Ctrl+I) and type: &quot;Explain what this function does&quot; while your cursor is inside a function.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl overflow-hidden">
                    <div className="bg-muted/40 px-5 py-3 border-b">
                      <h3 className="font-bold">Setting up GitHub Copilot</h3>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">1</span>
                        <p className="text-sm text-muted-foreground">Go to github.com/settings/copilot and enable Copilot on your account. The free tier is available immediately.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">2</span>
                        <p className="text-sm text-muted-foreground">In VS Code, install the &quot;GitHub Copilot&quot; and &quot;GitHub Copilot Chat&quot; extensions from the marketplace. In JetBrains, install from Plugins &gt; Marketplace.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">3</span>
                        <p className="text-sm text-muted-foreground">Sign in with your GitHub account when prompted. Autocomplete activates automatically.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">4</span>
                        <p className="text-sm text-muted-foreground">For agent mode: open the Copilot Chat panel (Ctrl+Alt+I), click the mode selector, and switch to &quot;Agent&quot; to enable multi-step task execution.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl overflow-hidden">
                    <div className="bg-muted/40 px-5 py-3 border-b">
                      <h3 className="font-bold">Setting up Claude Code</h3>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">1</span>
                        <p className="text-sm text-muted-foreground">Install via npm: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">npm install -g @anthropic-ai/claude-code</code>. Requires Node.js 18+ and an Anthropic API key.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">2</span>
                        <p className="text-sm text-muted-foreground">Set your API key: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">export ANTHROPIC_API_KEY=your_key_here</code>. Add this to your shell profile (.bashrc/.zshrc) to persist it.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">3</span>
                        <p className="text-sm text-muted-foreground">Navigate to your project directory and run <code className="bg-muted px-1.5 py-0.5 rounded text-xs">claude</code>. It will scan the directory and start an interactive session.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">4</span>
                        <p className="text-sm text-muted-foreground">Start with: &quot;Give me a brief tour of this codebase.&quot; This warms up the context and shows you how Claude Code communicates about your project.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div id="best-practices" className="scroll-mt-20 mb-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  Best Practices for AI Pair Programming
                </h2>
                <p className="text-muted-foreground mb-6">
                  These practices come from months of daily use and will meaningfully improve your results:
                </p>
                <div className="space-y-4">
                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold mb-1">Write Clear, Specific Prompts</h3>
                        <p className="text-sm text-muted-foreground mb-2">Vague prompts produce vague results. The quality of AI output scales directly with the quality of your input.</p>
                        <div className="grid md:grid-cols-2 gap-3 text-xs">
                          <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded border border-red-200 dark:border-red-800">
                            <p className="font-semibold text-red-700 dark:text-red-300 mb-1">Weak prompt:</p>
                            <p className="text-muted-foreground">&quot;Fix the login&quot;</p>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded border border-green-200 dark:border-green-800">
                            <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Strong prompt:</p>
                            <p className="text-muted-foreground">&quot;The login endpoint returns 500 when the email doesn&apos;t exist in the database. Add proper error handling that returns 404 with a user-friendly message.&quot;</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold mb-1">Always Review Generated Code</h3>
                        <p className="text-sm text-muted-foreground">AI agents generate plausible-looking code, but they can introduce subtle bugs, use deprecated APIs, or miss security implications. Treat every AI-generated change as code submitted by a junior developer: read it, understand it, then approve it. This is not optional — it&apos;s the key professional practice.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold mb-1">Use Iterative Refinement</h3>
                        <p className="text-sm text-muted-foreground">Don&apos;t try to describe the entire feature in one prompt. Describe the high-level goal, let the agent produce something, then iterate with targeted corrections. &quot;That looks right, but use async/await instead of promises&quot; is easier for the agent to handle than a 500-word spec up front.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold mb-1">Give the Agent Context It Doesn&apos;t Have</h3>
                        <p className="text-sm text-muted-foreground">The agent knows your code but not your constraints. Mention things like: &quot;This is a public API so backward compatibility matters&quot; or &quot;We&apos;re on Node 18 so we can&apos;t use that API&quot; or &quot;Our team style prefers named function expressions over arrow functions.&quot; These constraints dramatically improve output quality.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold mb-1">Commit Frequently</h3>
                        <p className="text-sm text-muted-foreground">When you&apos;re moving fast with an AI agent, git becomes your safety net. Commit small working checkpoints so you can always roll back if a large change goes sideways. Make a habit of committing before starting any agent-driven refactoring.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div id="common-mistakes" className="scroll-mt-20 mb-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                  Common Mistakes to Avoid
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Accepting changes without reading them</h4>
                      <p className="text-sm text-muted-foreground">The &quot;accept all&quot; button is a trap for beginners. Every experienced developer I know reviews diffs before accepting, especially for agent-generated multi-file changes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Asking the agent to do too much at once</h4>
                      <p className="text-sm text-muted-foreground">&quot;Refactor the entire authentication system&quot; is too large for a single agent run. Break it into &quot;Extract the token validation into its own module,&quot; then &quot;Add refresh token support,&quot; etc.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Not running tests after AI changes</h4>
                      <p className="text-sm text-muted-foreground">AI-generated code can pass visual inspection but introduce logic errors. Always run your test suite after agent-driven changes, especially after refactoring.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Treating AI output as ground truth</h4>
                      <p className="text-sm text-muted-foreground">If the AI confidently says &quot;this is the correct way to use the API,&quot; check the actual documentation. Models have training cutoffs and sometimes hallucinate API details.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Not learning from the generated code</h4>
                      <p className="text-sm text-muted-foreground">The most dangerous trap: becoming dependent on AI without growing your own skills. When the agent writes a pattern you don&apos;t recognize, stop and understand it. AI should accelerate your learning, not replace it.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workflow */}
              <div id="workflow" className="scroll-mt-20 mb-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <GitBranch className="h-6 w-6 text-primary" />
                  Recommended Workflow
                </h2>
                <p className="text-muted-foreground mb-4">
                  This is the workflow I use daily that keeps velocity high while maintaining code quality:
                </p>
                <div className="space-y-3 my-6">
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">1</span>
                      <h4 className="font-semibold">Plan before prompting</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-10">Before opening the AI chat, write down in plain English what you want to build. This forces you to think through the requirements and gives you a clear prompt.</p>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">2</span>
                      <h4 className="font-semibold">Start with a clean git state</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-10">Commit any pending work. Start each AI session from a clean working tree so you can see exactly what the agent changed.</p>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">3</span>
                      <h4 className="font-semibold">Give context, then the task</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-10">Brief the agent: what the codebase does, any constraints, what you want to achieve. Then give the specific task. One paragraph of context dramatically improves output.</p>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">4</span>
                      <h4 className="font-semibold">Review the diff carefully</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-10">Read every change before accepting. Understand why each change was made. Ask the agent to explain anything unclear.</p>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">5</span>
                      <h4 className="font-semibold">Run tests and manual verification</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-10">Never ship AI-generated code without running your test suite and doing a quick manual sanity check on the changed functionality.</p>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">6</span>
                      <h4 className="font-semibold">Commit and document</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-10">Commit with a clear message. If the AI helped with a non-obvious approach, add a brief comment explaining the rationale.</p>
                  </div>
                </div>
              </div>

              {/* Example Session */}
              <div id="example-session" className="scroll-mt-20 mb-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Example AI Pair Programming Session
                </h2>
                <p className="text-muted-foreground mb-4">
                  Here is a realistic session using Cursor Composer to add a feature to a Node.js API:
                </p>
                <div className="bg-muted/40 rounded-xl p-5 my-6 space-y-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">YOU:</p>
                    <p className="bg-card border rounded-lg p-3">This is a Node.js/Express API for a todo app. I need to add rate limiting to the POST /todos endpoint — maximum 10 new todos per user per hour. We use Redis for caching already (see redis.ts). Don&apos;t install new packages if we can avoid it.</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">CURSOR:</p>
                    <p className="bg-primary/5 border border-primary/20 rounded-lg p-3">I&apos;ll add rate limiting using your existing Redis connection. Here&apos;s my plan: (1) Create a rate-limit utility using Redis INCR + EXPIRE, (2) Create a middleware function, (3) Apply it to the POST /todos route. [Shows diff of 3 files]</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">YOU (after reviewing diff):</p>
                    <p className="bg-card border rounded-lg p-3">The logic looks right but the Redis key should include the user ID, not just the IP address, since we have authenticated users. Also add a test for the rate limit middleware.</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">CURSOR:</p>
                    <p className="bg-primary/5 border border-primary/20 rounded-lg p-3">Good catch. Updated the key format to use req.user.id from your JWT middleware. Added a test file with 3 tests: under limit, at limit, over limit. [Shows updated diff]</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">YOU:</p>
                    <p className="bg-card border rounded-lg p-3">Looks good. Accept all.</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  This entire session takes 5–10 minutes. The equivalent without AI assistance would take 30–45 minutes including researching the Redis patterns, writing the code, and writing the tests. That&apos;s the productivity gain in action.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 lg:py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl font-bold">Pick Your Tool and Start Today</h2>
              <p className="text-muted-foreground">
                The fastest way to learn AI pair programming is to start using it on real work. Pick one tool and spend a week with it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/compare">
                    Compare the Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/guides/what-are-ai-coding-agents">
                    Back to the Basics
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <FAQSchema
                faqs={[
                  {
                    question: "Do I need to be a good programmer to use AI pair programming?",
                    answer: "No, but having basic programming knowledge helps you review and understand what the AI generates. Complete beginners can use AI pair programming tools, but they should take extra care to understand each piece of generated code rather than blindly accepting it. The tools are excellent for learning because they explain concepts on demand.",
                  },
                  {
                    question: "How do I handle it when the AI generates wrong code?",
                    answer: "Tell the agent what's wrong specifically. 'That's not quite right — the function should return null instead of throwing when the user isn't found' gives the agent a clear correction target. If the agent keeps going in the wrong direction after 2-3 attempts, start a new session with a more precise prompt.",
                  },
                  {
                    question: "Should I use AI for all my code or only some tasks?",
                    answer: "Most developers use AI pair programming for routine coding tasks, boilerplate, tests, and refactoring — but apply more personal judgment to architecture decisions, security-critical code, and anything requiring deep domain expertise. As you gain confidence reviewing AI output, you'll naturally expand what you delegate.",
                  },
                  {
                    question: "Will AI pair programming make me a worse programmer?",
                    answer: "Only if you stop thinking. Developers who use AI pair programming actively — asking questions, understanding the generated code, pushing back when something seems wrong — typically improve faster because they're exposed to more patterns and approaches. Developers who blindly accept output without reading it do risk skill atrophy.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <RelatedPages
                title="Continue Learning"
                pages={[
                  {
                    title: "What Are AI Coding Agents?",
                    description: "Complete overview of the technology and tools",
                    href: "/guides/what-are-ai-coding-agents",
                    icon: "shield",
                  },
                  {
                    title: "How to Choose the Right AI Coding Agent",
                    description: "Decision framework for picking the best tool",
                    href: "/guides/how-to-choose-ai-coding-agent",
                    icon: "zap",
                  },
                  {
                    title: "Beginners vs Experienced Developers",
                    description: "Best tools for your skill level",
                    href: "/guides/ai-coding-agents-beginners-vs-experienced",
                    icon: "lock",
                  },
                  {
                    title: "Best AI Coding Agents 2026",
                    description: "Our top-rated picks with detailed analysis",
                    href: "/best/coding-agents",
                    icon: "trophy",
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
