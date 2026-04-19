import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { EmailCapture } from "@/components/email-capture";
import { externalAffiliates } from "@/lib/external-affiliates";
import {
  Video,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";
const pageSlug = "/watch-me-build/local-business-scraper-claude-code";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}${pageSlug}`;

  return {
    metadataBase: new URL(baseUrl),
    title:
      "I Built a Local Business Scraper with Claude Code + Bright Data | Watch Me Build",
    description:
      "Full walkthrough of building a working local-business lead scraper using Claude Code and Bright Data — what worked, what broke, and the exact stack that made it production-reliable.",
    robots: { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title:
        "I Built a Local Business Scraper with Claude Code + Bright Data | Watch Me Build",
      description:
        "Full walkthrough of building a working local-business lead scraper using Claude Code and Bright Data — what worked, what broke, and the exact stack that made it production-reliable.",
      url: canonicalUrl,
      siteName: "ZeroToAIAgents",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "I Built a Local Business Scraper with Claude Code + Bright Data | Watch Me Build",
      description:
        "Full walkthrough of building a working local-business lead scraper using Claude Code and Bright Data — what worked, what broke, and the exact stack that made it production-reliable.",
    },
  };
}

export default async function LocalBusinessScraperPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="flex flex-col">
      {/* Breadcrumb */}
      <div className="container pt-6">
        <BreadcrumbSchema
          items={[
            { name: "Watch Me Build", href: "/watch-me-build" },
            {
              name: "Local Business Scraper with Claude Code",
              href: pageSlug,
            },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-orange-500/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge variant="orange" className="px-3 py-1 text-sm font-semibold">
              Watch Me Build · Build #01
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              I Built a Local Business Scraper with Claude Code + Bright Data
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              A working local-business lead scraper, built in one Claude Code
              session. Here&apos;s the full stack, the exact prompt, what Claude
              got right on the first try, and the one piece that made the whole
              thing reliable.
            </p>

            {/* Stack badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="orange">Claude Code</Badge>
              <Badge variant="blue">Bright Data</Badge>
              <Badge variant="default">Next.js</Badge>
              <Badge variant="purple">Convex</Badge>
              <Badge variant="secondary">Clerk</Badge>
              <Badge variant="green">OpenRouter</Badge>
            </div>

            {/* Video placeholder */}
            <Card className="overflow-hidden border-dashed border-2">
              <div className="aspect-video bg-slate-100 dark:bg-slate-800/60 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <Video className="h-7 w-7 text-slate-500 dark:text-slate-400" />
                </div>
                <p className="text-sm font-medium text-center px-4">
                  Full screencast drops soon — subscribe below to get notified.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Outcome first */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert max-w-none space-y-4">
            <p className="text-base md:text-lg leading-relaxed">
              The scraper takes a city and a business category — say,{" "}
              <em>plumbers in Austin</em> or <em>dentists in Manchester</em> —
              and returns a structured list of local-business leads: name, phone
              number, website, Google review count, and average rating. All
              pulled, parsed, and stored automatically.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Most scraping SaaS tools charge $200–500/month for this kind of
              output. This stack costs $25–50/month in infrastructure, and you
              own every piece of it. No vendor lock-in, no per-seat pricing, no
              request cap you can&apos;t control. Curious what this actually
              costs?{" "}
              <Link
                href="/guides/ai-scraper-cost-breakdown"
                className="text-primary underline underline-offset-2 hover:no-underline"
              >
                See the AI scraper cost breakdown →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* The stack */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              The stack — and why each piece is here
            </h2>

            <ol className="space-y-8 list-none p-0">
              {/* 1. Claude Code */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">Claude Code</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The CLI that wrote roughly 90% of the scraper. I gave it a
                    single master prompt covering the full project — schema,
                    scraping logic, backend functions, and dashboard UI. It
                    planned the architecture, generated the Convex schema on the
                    first try, and wired up most of the integration with minimal
                    back-and-forth.
                  </p>
                </div>
              </li>

              {/* 2. Bright Data */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div className="space-y-2">
                  <h3 className="font-semibold text-base">Bright Data</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The proxy and scraping infrastructure. Without this, any
                    scraper you build on top of AI is one IP block away from
                    breaking. Bright Data handles geo-rotation, JavaScript
                    rendering, and residential proxy coverage — the things that
                    are genuinely hard to DIY and catastrophic to get wrong in
                    production.
                  </p>
                  <Button asChild size="sm" className="mt-1">
                    <a
                      href={externalAffiliates.brightData.url}
                      target="_blank"
                      rel="noopener sponsored"
                    >
                      Try Bright Data (free $25 credit) →
                    </a>
                  </Button>
                </div>
              </li>

              {/* 3. Convex */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">Convex</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Database and backend functions in one. I skipped traditional
                    API routes entirely — Convex mutations and queries handled
                    all the data access. The reactive queries also made the
                    dashboard UI trivially easy to build; it just watches the
                    right table and re-renders on updates.
                  </p>
                </div>
              </li>

              {/* 4. Clerk */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">Clerk</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Auth and middleware. Adding Clerk to a Next.js project is
                    genuinely a 10-minute job — it handled sign-in, session
                    management, and route protection without needing a custom
                    auth layer. Claude Code had no trouble integrating it.
                  </p>
                </div>
              </li>

              {/* 5. OpenRouter */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">
                    OpenRouter (Gemini Flash)
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Fast, cheap LLM for the AI-enrichment layer — generating
                    search keywords and hashtags from business metadata. At
                    roughly $0.10 per 1M input tokens, Gemini Flash is the right
                    call for high-volume, low-complexity tasks you don&apos;t
                    want to run through a more expensive model.
                  </p>
                </div>
              </li>

              {/* 6. Next.js */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
                  6
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">Next.js</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The frontend shell and dashboard UI. Server components for
                    the public-facing pages, client components for the
                    interactive dashboard. Nothing novel here — it&apos;s just a
                    reliable baseline Claude Code knows well.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Master prompt CTA */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              The one-shot prompt that built it
            </h2>
            <p className="text-muted-foreground">
              I&apos;ll publish the full master prompt as part of the series.
              You can grab it here:
            </p>
            <Card className="border-orange-200 dark:border-orange-800/50 bg-orange-50/50 dark:bg-orange-950/20">
              <CardContent className="p-6 space-y-3">
                <h3 className="font-bold text-lg">Get the master prompt</h3>
                <p className="text-sm text-muted-foreground">
                  The exact prompt I used to scaffold this scraper in a single
                  Claude Code session — schema, integration, dashboard, and all.
                </p>
                <Button asChild>
                  <Link href="/prompts/local-business-scraper">
                    Get the local business scraper prompt <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Build walkthrough */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-bold">Build walkthrough</h2>

            {/* Step 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                1. Scaffolding Convex + Clerk in 90 seconds
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The first thing Claude Code did was set up the project
                structure: Next.js app, Convex provider, Clerk middleware, and
                environment variable placeholders. All generated before I
                wrote a single line of my own. The Convex schema came out
                exactly right — tables for scraped businesses, scrape jobs, and
                user settings, with the right index definitions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What impressed me was the order of operations. Claude didn&apos;t
                jump straight into scraping logic — it validated the data layer
                first, which is the right call. Schema-first development is
                good engineering and the model knew it.
              </p>
              <Card className="overflow-hidden border-dashed border-2">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center text-muted-foreground text-sm">
                  Screenshot: Convex + Clerk initial scaffold in terminal
                </div>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                2. Wiring the Bright Data data-collection endpoint
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                This is where the first real decision happened. Claude Code
                generated a basic fetch-based scraper initially — no proxy, no
                headless browser. That works fine for simple sites with a
                public API, but local-business data from Google and Yelp needs
                residential proxy rotation and JavaScript rendering. I pointed
                it at the Bright Data Web Unlocker API and it adapted the
                implementation cleanly.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The integration itself needed manual tuning — more on that in
                the &quot;what broke&quot; section. But the structural wiring
                (Convex action calling the Bright Data endpoint, parsing the
                response, writing to the database) was all generated correctly.
              </p>
              <Card className="overflow-hidden border-dashed border-2">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center text-muted-foreground text-sm">
                  Screenshot: Bright Data endpoint wired in Convex action
                </div>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                3. Hashtag / keyword generation via OpenRouter
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                After each scrape batch, the tool runs each business record
                through Gemini Flash via OpenRouter to generate search keywords
                and social hashtags. Claude Code set up the OpenRouter client,
                wrote the prompt template, and built the Convex action that
                batches records to keep costs low. The output is structured JSON
                — category tags, location-specific keywords, and a short pitch
                line for each business.
              </p>
              <Card className="overflow-hidden border-dashed border-2">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center text-muted-foreground text-sm">
                  Screenshot: OpenRouter enrichment output for a sample record
                </div>
              </Card>
            </div>

            {/* Step 4 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                4. Building the dashboard UI
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I didn&apos;t prompt for a specific dashboard design — I just
                asked Claude Code to &quot;build a dashboard UI that shows
                active scrape jobs and lets me browse results.&quot; What came
                back was a two-panel layout: job history on the left, results
                table on the right with search and filter. It used Convex
                reactive queries so the table updates in real-time as scrape
                results land.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The component hierarchy was clean and properly typed. This is
                one of the areas where Claude Code genuinely earns its keep —
                translating a vague UI brief into a coherent, working component
                tree.
              </p>
              <Card className="overflow-hidden border-dashed border-2">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center text-muted-foreground text-sm">
                  Screenshot: Dashboard UI — job list + results table
                </div>
              </Card>
            </div>

            {/* Step 5 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">5. First live scrape</h3>
              <p className="text-muted-foreground leading-relaxed">
                First run: &quot;plumbers in Austin, TX.&quot; 47 results in 38
                seconds. Each record included business name, phone number,
                website, review count, average rating, and address. The
                OpenRouter enrichment layer added keywords and hashtags in a
                second pass over the same batch.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The data quality was good enough to export directly as a CSV
                for a lead list. That&apos;s the benchmark — not just
                &quot;it ran,&quot; but &quot;a real person could use this
                output.&quot;
              </p>
              <Card className="overflow-hidden border-dashed border-2">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center text-muted-foreground text-sm">
                  Screenshot: First live scrape results — 47 records, Austin plumbers
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What worked / what broke */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              What worked. What broke.
            </h2>
            <p className="text-muted-foreground">
              Honest breakdown. The &quot;what broke&quot; column isn&apos;t
              softened.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* What worked */}
              <Card className="border-green-200 dark:border-green-800/50">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-green-700 dark:text-green-400">
                    What worked
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Convex schema designed correctly on the first try — right tables, right indexes, no rework needed.",
                      "Clerk middleware integrated cleanly. Sign-in, session management, and protected routes all worked out of the box.",
                      "TypeScript type errors caught before the first run — Claude Code flagged a response shape mismatch before it became a runtime bug.",
                      "Dashboard layout and reactive data binding was production-quality without any UI prompting from me.",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* What needed manual fixing */}
              <Card className="border-red-200 dark:border-red-800/50">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-red-700 dark:text-red-400">
                    What needed manual fixing
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Bright Data integration needed hand-tuning. Claude Code got the structure right but the auth header format and response parsing required two manual corrections.",
                      "One environment variable mismatch — the generated code referenced BRIGHT_DATA_TOKEN but the dashboard docs use BRIGHTDATA_API_KEY. Caught at runtime, not build time.",
                      "Safari auth quirk with Clerk — a third-party cookie issue that doesn't show in Chrome. Required a Clerk config flag I had to look up manually.",
                      "No retry logic on failed scrape jobs. If a Bright Data request times out, the job silently fails. I added a basic retry wrapper after the first production run.",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed">
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* When this stack makes sense */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              When this stack actually makes sense
            </h2>
            <p className="text-muted-foreground">
              Not every scraping project needs this stack. Here&apos;s when the
              Bright Data + Claude Code combo earns its cost:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Use it when */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Use it when
                </h3>
                <ul className="space-y-3">
                  {[
                    "You're scraping at volume and reliability matters (leads, pricing data, SERPs).",
                    "You need geo-targeted data (local businesses, regional pricing).",
                    "You need structured output that won't break when a site changes its HTML.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skip it when */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Skip it when
                </h3>
                <ul className="space-y-3">
                  {[
                    "You're scraping once and throwing it away — use a free library.",
                    "Your target site has a public API — use that.",
                    "You only need a handful of records — cURL + regex is fine.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed">
                      <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed pt-2">
              The reliability piece is where most AI-written scrapers fall apart
              in production. IP blocks, bot detection, and JavaScript rendering
              walls don&apos;t show up when you&apos;re testing locally with 10
              requests. They show up at 10,000. Bright Data is what separates a
              demo from something that runs on a cron without babysitting.
            </p>
            <Button asChild variant="outline">
              <Link href="/reviews/bright-data">
                See the full Bright Data review <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Next steps / cluster links */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              More from this series
            </h2>
            <p className="text-muted-foreground">
              This build is part of a cluster. Each page goes deeper on one
              piece of the stack.
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Card 1: Bright Data review */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <Badge variant="blue">Review</Badge>
                  <h3 className="font-semibold text-sm leading-snug">
                    Bright Data deep-dive review
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Pricing, features, and whether it&apos;s worth it for
                    scraping at scale.
                  </p>
                  <Link
                    href="/reviews/bright-data"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Read the full Bright Data review <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Card 2: Comparison */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <Badge variant="purple">Comparison</Badge>
                  <h3 className="font-semibold text-sm leading-snug">
                    Bright Data vs Firecrawl comparison
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Which scraping layer should you pick for AI-powered data
                    pipelines?
                  </p>
                  <Link
                    href="/compare/bright-data-vs-firecrawl"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Bright Data vs Firecrawl comparison <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Card 3: Master prompt */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <Badge variant="orange">Prompt</Badge>
                  <h3 className="font-semibold text-sm leading-snug">
                    Local business scraper prompt
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The one-shot prompt that scaffolded this entire scraper in a
                    single session.
                  </p>
                  <Link
                    href="/prompts/local-business-scraper"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Get the local business scraper prompt <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Card 4: Tools roundup */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <Badge variant="green">Roundup</Badge>
                  <h3 className="font-semibold text-sm leading-snug">
                    Best scraping tools for AI agents
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Every tool we evaluated for this build, ranked by use case.
                  </p>
                  <Link
                    href="/tools/best-scraping-tools-for-ai-agents"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Best scraping tools for AI agents <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Card 5: Cost breakdown */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <Badge variant="secondary">Cost</Badge>
                  <h3 className="font-semibold text-sm leading-snug">
                    AI scraper cost breakdown
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    What each layer of this stack actually costs at low, medium,
                    and production volume.
                  </p>
                  <Link
                    href="/guides/ai-scraper-cost-breakdown"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    AI scraper cost breakdown <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <EmailCapture
              variant="inline"
              heading="Get notified when the screencast drops"
              subtext="New builds weekly. No spam."
              buttonText="Notify Me"
            />
          </div>
        </div>
      </section>

      {/* Final affiliate CTA strip */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="border-orange-300 dark:border-orange-700/50 bg-orange-50/50 dark:bg-orange-950/20">
              <CardContent className="p-8 text-center space-y-4">
                <h2 className="text-xl md:text-2xl font-bold">
                  Ready to build your own?
                </h2>
                <p className="text-muted-foreground">
                  Bright Data gave me $25 in free credits to play with — same
                  offer is live. Try the stack before you commit.
                </p>
                <Button asChild size="lg">
                  <a
                    href={externalAffiliates.brightData.url}
                    target="_blank"
                    rel="noopener sponsored"
                  >
                    Start with Bright Data →
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </article>
  );
}
