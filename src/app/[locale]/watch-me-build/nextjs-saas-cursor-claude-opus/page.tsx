import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { EmailCapture } from "@/components/email-capture";
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
const pageSlug = "/watch-me-build/nextjs-saas-cursor-claude-opus";

const pageTitle = "Next.js SaaS in Cursor + Claude Opus 4.6 | Watch Me Build";
const pageDescription =
  "One-day invoice-tracker SaaS in Cursor with Claude Opus 4.6 — Next.js 15, Clerk, Stripe, Drizzle. Honest hour-by-hour log of what shipped and what broke.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}${pageSlug}`;

  return {
    metadataBase: new URL(baseUrl),
    title: pageTitle,
    description: pageDescription,
    robots: { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: "ZeroToAIAgents",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default async function NextjsSaasCursorClaudeOpusPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const canonicalUrl = `${baseUrl}${locale === "en" ? "" : `/${locale}`}${pageSlug}`;

  return (
    <article className="flex flex-col">
      {/* Structured data */}
      <ArticleJsonLd
        title={pageTitle}
        description={pageDescription}
        url={canonicalUrl}
        datePublished="2026-04-19"
      />

      {/* Breadcrumb */}
      <div className="container pt-6">
        <BreadcrumbSchema
          items={[
            { name: "Watch Me Build", href: "/watch-me-build" },
            {
              name: "Next.js SaaS in Cursor + Claude Opus 4.6",
              href: pageSlug,
            },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-purple-500/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge variant="purple" className="px-3 py-1 text-sm font-semibold">
              Watch Me Build · Build #02
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              I Built a Next.js SaaS in Cursor with Claude Opus 4.6
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              A full invoice-tracker SaaS — auth, billing, dashboard, database —
              built in a single working day inside{" "}
              <a
                href="https://cursor.com"
                target="_blank"
                rel="noopener"
                className="text-primary underline underline-offset-2 hover:no-underline"
              >
                Cursor
              </a>{" "}
              with Claude Opus 4.6 as the agent model. Here&apos;s the
              hour-by-hour log, the code that survived review, and the parts
              where the model quietly steered me wrong.
            </p>

            {/* Stack badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="purple">Cursor</Badge>
              <Badge variant="orange">Claude Opus 4.6</Badge>
              <Badge variant="default">Next.js 15</Badge>
              <Badge variant="blue">TypeScript</Badge>
              <Badge variant="secondary">Tailwind v4</Badge>
              <Badge variant="green">Clerk</Badge>
              <Badge variant="blue">Stripe</Badge>
              <Badge variant="secondary">Drizzle + Postgres</Badge>
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
              The product is small on purpose: a freelancer invoice tracker.
              Users sign up, connect Stripe, create clients, issue invoices as
              hosted payment links, and see a dashboard with outstanding
              balance, paid this month, and overdue. That&apos;s the whole
              scope. No teams, no PDF branding studio, no multi-currency
              accounting engine. The point was to see what a single day inside
              Cursor with Claude Opus 4.6 actually produces when the spec fits
              on a napkin.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              At the end of the day the app was deployed to Vercel on a custom
              subdomain, the Stripe test-mode end-to-end flow worked (checkout,
              webhook, invoice marked paid, dashboard updated), and the codebase
              weighed in at 3,412 lines of TypeScript across 38 files. About
              2,800 of those lines were written by Claude through Cursor&apos;s
              agent panel. The rest was me fixing things, naming things better,
              and deleting a couple of files the model got enthusiastic about.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              This is the honest version. It is not a sales pitch for Cursor or
              Claude. Both earned their keep and both tripped over the same
              class of mistake more than once. Here is exactly what that looked
              like.
            </p>
          </div>
        </div>
      </section>

      {/* Why this stack */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Why Cursor + Claude Opus 4.6 for this build
            </h2>

            <ol className="space-y-8 list-none p-0">
              {/* 1. Cursor */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">Cursor IDE</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I wanted a real editor with a real agent panel, not a
                    terminal-only flow. For a SaaS scaffold you spend a lot of
                    time jumping between route files, schema files, and UI
                    components. Cursor&apos;s multi-file edit mode plus inline
                    diff preview made every one of those jumps cheap.
                    It&apos;s also the editor I use every day, so there is no
                    muscle-memory tax.
                  </p>
                </div>
              </li>

              {/* 2. Claude Opus 4.6 */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div className="space-y-2">
                  <h3 className="font-semibold text-base">Claude Opus 4.6</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Picked Opus 4.6 over the cheaper Sonnet tier because the
                    work touches Stripe webhooks and auth middleware — the
                    places where a model that silently guesses will cost you
                    hours at 4pm. Opus is slower per turn, but when you factor
                    in how many correction cycles you avoid, it was the right
                    call for this scope. Model selection happens in
                    Cursor&apos;s model picker — see the{" "}
                    <a
                      href="https://docs.anthropic.com/en/docs/about-claude/models"
                      target="_blank"
                      rel="noopener"
                      className="text-primary underline underline-offset-2 hover:no-underline"
                    >
                      Claude models reference
                    </a>{" "}
                    for capability details.
                  </p>
                </div>
              </li>

              {/* 3. Next.js 15 */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">
                    <a
                      href="https://nextjs.org/docs"
                      target="_blank"
                      rel="noopener"
                      className="underline underline-offset-2 hover:no-underline"
                    >
                      Next.js 15
                    </a>{" "}
                    + App Router
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Server Actions, Route Handlers, and async page components
                    are the default. The model handled all three without
                    prompting. I skipped the /pages router entirely.
                  </p>
                </div>
              </li>

              {/* 4. Clerk */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">Clerk for auth</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Same reason as every other SaaS scaffold I do these days —
                    its Next.js middleware and server helpers are a 10-minute
                    job. I wanted the day to be about the product, not about
                    rolling session cookies.
                  </p>
                </div>
              </li>

              {/* 5. Stripe */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">Stripe Checkout</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Hosted Checkout links plus a webhook handler for{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      checkout.session.completed
                    </code>
                    . No custom payment form, no PCI scope to worry about. The
                    webhook marks the invoice as paid and closes the loop.
                  </p>
                </div>
              </li>

              {/* 6. Drizzle + Postgres */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
                  6
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">
                    Drizzle ORM on Neon Postgres
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Three tables: users, clients, invoices. Drizzle because
                    Opus 4.6 writes its query builder output cleanly and
                    because the migration flow is a single CLI call. Neon
                    because free tier, serverless driver, and a connection
                    string is the only setup step.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Hour-by-hour */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-bold">
              Hour-by-hour build log
            </h2>

            {/* Hour 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Hour 1 — Scaffolding and the schema-first detour
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Opened an empty folder, ran{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  npx create-next-app@latest
                </code>
                , opened Cursor, switched the agent panel to Claude Opus 4.6.
                Pasted in a three-paragraph spec covering the product, the
                stack, and the non-goals. First thing Opus did was ask a
                clarifying question: should invoices support partial payments?
                I said no, and it wrote the schema.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I like that the model pushed back before generating. Too many
                AI IDE sessions start with a thousand lines of code that
                quietly assumed something you did not want. Schema came out
                clean:
              </p>
              <Card className="overflow-hidden">
                <pre className="text-xs md:text-sm bg-slate-950 text-slate-100 p-5 overflow-x-auto">
{`// db/schema.ts
import { pgTable, uuid, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";

export const invoiceStatus = pgEnum("invoice_status", [
  "draft",
  "sent",
  "paid",
  "overdue",
  "void",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  clientId: uuid("client_id").references(() => clients.id, { onDelete: "restrict" }).notNull(),
  amountCents: integer("amount_cents").notNull(),
  currency: text("currency").default("usd").notNull(),
  status: invoiceStatus("status").default("draft").notNull(),
  stripeSessionId: text("stripe_session_id"),
  dueAt: timestamp("due_at").notNull(),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});`}
                </pre>
              </Card>
              <p className="text-muted-foreground leading-relaxed">
                Storing money as integer cents, cascade deletes on the user
                scope, a restrict on the client scope so an invoice cannot
                orphan itself — these are all the right defaults and Opus
                defaulted to them without being asked. I lost about ten
                minutes of the hour fixing the Drizzle config because the
                model wrote{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  dialect: &quot;postgres&quot;
                </code>{" "}
                when it should be{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  dialect: &quot;postgresql&quot;
                </code>
                . Small but annoying. It is also the kind of error a newer
                model fixed two minor versions ago but the Cursor cache had not
                caught up with.
              </p>
            </div>

            {/* Hour 2 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Hour 2 — Clerk wired in, first protected route
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Asked Cursor to add Clerk, create the middleware, and protect
                <code className="text-xs bg-muted px-1 py-0.5 rounded mx-1">
                  /app/(dashboard)
                </code>
                . This is where Opus shone. It generated the middleware,
                the sign-in and sign-up pages, the{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  ClerkProvider
                </code>{" "}
                wrap in the root layout, and a server-side helper that maps a
                Clerk user to our internal user row — all in one go. Multi-file
                diff, reviewed in Cursor, accepted.
              </p>
              <Card className="overflow-hidden">
                <pre className="text-xs md:text-sm bg-slate-950 text-slate-100 p-5 overflow-x-auto">
{`// lib/get-current-user.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (existing[0]) return existing[0];

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const [created] = await db
    .insert(users)
    .values({
      clerkId: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
    })
    .returning();

  return created;
}`}
                </pre>
              </Card>
              <p className="text-muted-foreground leading-relaxed">
                That helper is the load-bearing piece of the whole app. Every
                Server Action calls it first, bails if it returns null, and
                uses the returned row&apos;s id to scope the query. The model
                wrote it correctly on the first try, including the lazy-create
                on first login. I sanity-checked it, added a unit test the
                next hour, and moved on.
              </p>
            </div>

            {/* Hour 3 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Hour 3 — Clients CRUD and the first wrong turn
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Clients are the simple table. Create, list, soft delete. I
                asked Cursor for a Server Action pattern and it delivered —
                until it invented a form state hook that does not exist in
                Next.js 15. Specifically, it wrote{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  import {"{"} useFormState {"}"} from &quot;react-dom&quot;;
                </code>{" "}
                which was renamed to{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  useActionState
                </code>{" "}
                and moved into the{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  react
                </code>{" "}
                package. Classic training-data-gap error. Build failed, I
                pasted the error back, Opus corrected it in one turn. Cost me
                about six minutes.
              </p>
              <Card className="overflow-hidden">
                <pre className="text-xs md:text-sm bg-slate-950 text-slate-100 p-5 overflow-x-auto">
{`// app/(dashboard)/clients/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { getCurrentUser } from "@/lib/get-current-user";

const ClientInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().email(),
});

export type ClientFormState = {
  error?: string;
  ok?: boolean;
};

export async function createClient(
  _prev: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const parsed = ClientInput.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });
  if (!parsed.success) return { error: "Invalid input" };

  await db.insert(clients).values({
    userId: user.id,
    name: parsed.data.name,
    email: parsed.data.email,
  });

  revalidatePath("/clients");
  return { ok: true };
}`}
                </pre>
              </Card>
              <p className="text-muted-foreground leading-relaxed">
                The Zod-validated Server Action pattern is boilerplate-heavy
                but safe. Every mutation does auth-then-validate-then-write,
                then revalidates the list path. I kept this as the template
                for every subsequent action.
              </p>
            </div>

            {/* Hour 4 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Hour 4 — Invoice creation + Stripe Checkout session
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                This is the hour where the model&apos;s strengths actually
                paid for themselves. The invoice create flow is non-trivial:
                insert the row as draft, call Stripe to create a Checkout
                session with a one-shot price built from{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  price_data
                </code>
                , store the session id, flip the invoice to{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  sent
                </code>
                , return the hosted URL. Opus wrote the whole pipeline as one
                action, including setting a sensible{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  success_url
                </code>{" "}
                and{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  cancel_url
                </code>{" "}
                and a{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  client_reference_id
                </code>{" "}
                equal to the invoice id. Reviewed, accepted, deployed to a
                preview branch.
              </p>
              <Card className="overflow-hidden">
                <pre className="text-xs md:text-sm bg-slate-950 text-slate-100 p-5 overflow-x-auto">
{`// lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function createInvoiceCheckout(params: {
  invoiceId: string;
  clientEmail: string;
  amountCents: number;
  currency: string;
  description: string;
}) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: params.clientEmail,
    client_reference_id: params.invoiceId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: params.currency,
          unit_amount: params.amountCents,
          product_data: { name: params.description },
        },
      },
    ],
    success_url: \`\${process.env.APP_URL}/invoices/\${params.invoiceId}?paid=1\`,
    cancel_url: \`\${process.env.APP_URL}/invoices/\${params.invoiceId}\`,
  });
}`}
                </pre>
              </Card>
              <p className="text-muted-foreground leading-relaxed">
                The one thing the model got subtly wrong here was the API
                version pin. It defaulted to an older dated version which then
                started emitting deprecation warnings in my terminal. Pinned
                it to the current one, done.
              </p>
            </div>

            {/* Hour 5 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Hour 5 — Webhook handler, and the signature bug that ate 20 minutes
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Stripe webhooks are the single most common place AI-written
                code fails silently. You need the raw request body to verify
                the signature, which means you cannot call{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  request.json()
                </code>
                . Opus knew this and reached for{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  request.text()
                </code>
                , which is correct. What it got wrong was doing{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  JSON.parse
                </code>{" "}
                on the raw body and then passing the parsed object back into
                the signature check. The check obviously failed. Webhook 400s
                for twenty minutes while I stared at the code.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I asked the Stripe CLI to replay, looked at the raw payload,
                realized the mistake, told Cursor, it fixed itself. The fixed
                version:
              </p>
              <Card className="overflow-hidden">
                <pre className="text-xs md:text-sm bg-slate-950 text-slate-100 p-5 overflow-x-auto">
{`// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { invoices } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new NextResponse("Missing signature", { status: 400 });

  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const invoiceId = session.client_reference_id;
    if (invoiceId) {
      await db
        .update(invoices)
        .set({ status: "paid", paidAt: new Date() })
        .where(eq(invoices.id, invoiceId));
    }
  }

  return NextResponse.json({ received: true });
}`}
                </pre>
              </Card>
              <p className="text-muted-foreground leading-relaxed">
                Notice: raw body string in, signature from the header, parsed
                event comes out of{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  constructEvent
                </code>
                , never from our own{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  JSON.parse
                </code>
                . This is the one pattern you want AI agents to memorize. Until
                it does, use the Stripe CLI to test.
              </p>
            </div>

            {/* Hour 6 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Hour 6 — Dashboard UI with Tailwind v4
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Dashboard is three cards — outstanding, paid this month,
                overdue — and a table of recent invoices with status badges. I
                gave Cursor a one-sentence brief: &quot;build a clean,
                information-dense freelancer dashboard with three summary cards
                and a recent-invoice table, using Tailwind v4 and the shadcn
                Card component.&quot; It produced a layout that was — honestly
                — better than my instinct. The summary card component it made
                was reused across all three stats without me asking.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What Opus still does not do well is pick nice numerical
                formatting defaults. It rendered cents as integers. I had to
                ask for{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  Intl.NumberFormat
                </code>{" "}
                with the right currency and locale. After that it was fine.
              </p>
              <Card className="overflow-hidden border-dashed border-2">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center text-muted-foreground text-sm">
                  Screenshot: dashboard with 3 summary cards + invoice table
                </div>
              </Card>
            </div>

            {/* Hour 7 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Hour 7 — Overdue detection and the broken cron
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Invoices go overdue automatically when{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  due_at &lt; now()
                </code>{" "}
                and status is still{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  sent
                </code>
                . I asked Cursor to set this up as a Vercel cron. The agent
                created the{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  vercel.json
                </code>{" "}
                with a schedule, wrote the route handler, and added a bearer
                token check. One detail it missed: the cron handler is hit by
                Vercel with a specific{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  Authorization: Bearer CRON_SECRET
                </code>{" "}
                header when{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  CRON_SECRET
                </code>{" "}
                is set — but it invented a different env var name. I caught
                this by reading the generated code before deploying; would not
                have caught it if I had rubber-stamped the diff.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Lesson: the model generates the right pattern, not always the
                right constant. Always eyeball the env var names.
              </p>
            </div>

            {/* Hour 8 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Hour 8 — End-to-end test, polish, ship
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Signed up as a test user, added a client, created a $240
                invoice, clicked the hosted link, paid it with the{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  4242
                </code>{" "}
                test card, watched the webhook fire, watched the dashboard flip
                the invoice to paid in about 300ms. Shipped to Vercel prod.
                Full cycle worked end-to-end. 847 lines were generated in the
                final hour alone, almost all of it UI polish and the overdue
                badge pill.
              </p>
              <Card className="overflow-hidden border-dashed border-2">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center text-muted-foreground text-sm">
                  Screenshot: end-to-end Stripe test payment, dashboard updating
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What worked / what broke */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              What worked. What broke.
            </h2>
            <p className="text-muted-foreground">
              No softening. Both columns are what actually happened.
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
                      "Clarifying question before the schema — the model asked about partial payments instead of assuming. That kind of behavior is worth the Opus price tier on its own.",
                      "Clerk + Server Actions integration was flawless. The get-current-user helper with lazy-create on first login was correct on first pass.",
                      "Stripe Checkout session creation — including price_data, client_reference_id, and correct success/cancel URLs — generated in one turn.",
                      "Dashboard layout. Three-card summary with a reusable component, information-dense table, sensible spacing. Better than what I would have thrown together in an hour.",
                      "Multi-file diffs in Cursor. Reviewing a 9-file change as a single coherent diff is a massive quality-of-life improvement over terminal-only agents.",
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
                      "Drizzle dialect typo — wrote \"postgres\" instead of \"postgresql\". Ten minutes lost.",
                      "useFormState vs. useActionState — training-data-gap error, fixed in one correction turn but shipped-to-build-fail.",
                      "Stripe webhook signature bug — parsed the body before verifying. Twenty minutes of staring at 400s.",
                      "Invented env var name for the Vercel cron secret. Would have silently failed in production if I had not read the diff.",
                      "Money formatting defaulted to raw integer cents in the UI. Needed an explicit Intl.NumberFormat pass.",
                      "Pinned an outdated Stripe API version — spammed deprecation warnings until I corrected it.",
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

      {/* Takeaways */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              What I am taking away from this
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">
                  Opus 4.6 is worth the cost for boundary code.
                </strong>{" "}
                Auth, webhooks, payment flows, anything where a silent wrong
                guess costs you real time — Opus earned its per-token price
                here. I would not use it for CSS nudging. Drop to Sonnet for
                that.
              </p>
              <p>
                <strong className="text-foreground">
                  Cursor&apos;s multi-file diff is the real product.
                </strong>{" "}
                The model is good. What makes the combination productive is
                being able to see a nine-file change as a single reviewable
                unit before accepting it. I caught the cron-secret env var
                mistake because the diff was right there.
              </p>
              <p>
                <strong className="text-foreground">
                  Always read the diff.
                </strong>{" "}
                Two of the biggest time sinks in the day — the cron-secret
                invention and the webhook signature parse — would have been
                caught by thirty seconds of actually reading the code. The
                temptation to rubber-stamp is the real failure mode of agent
                workflows, not the model itself.
              </p>
              <p>
                <strong className="text-foreground">
                  Give it the right amount of spec.
                </strong>{" "}
                Three paragraphs of product spec, one sentence of UI brief. Not
                a thousand-line prompt. The model filled the gaps sensibly
                when the scope was small and the constraints were clear.
              </p>
              <p>
                <strong className="text-foreground">
                  A one-day SaaS is a real thing now.
                </strong>{" "}
                Not a polished, multi-tenant, SOC-2-ready thing — but a
                working product with auth, payments, a database, and a
                dashboard, deployed to a real URL. Eight hours, one person,
                one subscription. The ratio of what used to take a week to
                what now takes a day is the story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When this stack makes sense */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              When Cursor + Claude Opus 4.6 is the right pick
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Use it when
                </h3>
                <ul className="space-y-3">
                  {[
                    "You are building something that touches auth, payments, or third-party webhooks and cannot afford silent wrong guesses.",
                    "You want to see, review, and accept multi-file diffs in an editor rather than scrolling terminal output.",
                    "Your scope fits in one day and the spec fits on a napkin — the model shines when constraints are clear.",
                    "You already know the stack well enough to catch wrong-but-plausible constants (env var names, API versions, etc.).",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Skip it when
                </h3>
                <ul className="space-y-3">
                  {[
                    "You just want fast UI iteration — Sonnet 4.x is cheaper and often just as good for Tailwind work.",
                    "You are not going to read the diffs. The whole value is the review step.",
                    "The scope is enormous and vague — the model will confidently ship the wrong product at scale.",
                    "You need deterministic output for CI — this is agent-paired development, not a codegen pipeline.",
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
              There is no magic here. There is a good editor, a capable model,
              and a small spec. The difference between this taking eight hours
              and eight days is the review loop — not the model.
            </p>
            <Button asChild variant="outline">
              <Link href="/reviews/cursor">
                See the full Cursor review <ArrowRight className="ml-2 h-4 w-4" />
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
              Every Watch Me Build entry goes deeper on one tool-and-model
              combination. Here is where to go next.
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <Badge variant="purple">Review</Badge>
                  <h3 className="font-semibold text-sm leading-snug">
                    Cursor deep-dive review
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Pricing, model picker, agent panel, and whether it
                    replaces VS Code.
                  </p>
                  <Link
                    href="/reviews/cursor"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Read the full Cursor review <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <Badge variant="orange">Review</Badge>
                  <h3 className="font-semibold text-sm leading-snug">
                    Claude Opus 4.6 in practice
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    When Opus earns the cost step-up over Sonnet — and when it
                    does not.
                  </p>
                  <Link
                    href="/reviews/claude-opus"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Read the Claude Opus review <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <Badge variant="blue">Comparison</Badge>
                  <h3 className="font-semibold text-sm leading-snug">
                    Cursor vs Claude Code
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Agent IDE vs terminal agent. Which one fits which job?
                  </p>
                  <Link
                    href="/compare/cursor-vs-claude-code"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Cursor vs Claude Code <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <Badge variant="secondary">Build</Badge>
                  <h3 className="font-semibold text-sm leading-snug">
                    Build #01 — Local business scraper
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The previous Watch Me Build: Claude Code plus Bright Data.
                  </p>
                  <Link
                    href="/watch-me-build/local-business-scraper-claude-code"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Read Build #01 <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <Badge variant="green">Guide</Badge>
                  <h3 className="font-semibold text-sm leading-snug">
                    Getting started with AI pair programming
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The review-the-diff habit, prompt scoping, and the traps to
                    watch out for.
                  </p>
                  <Link
                    href="/guides/getting-started-ai-pair-programming"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Read the guide <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <Badge variant="blue">Guide</Badge>
                  <h3 className="font-semibold text-sm leading-snug">
                    How to choose an AI coding agent
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Agent IDE, terminal agent, or inline completion? Pick the
                    right tool for the job.
                  </p>
                  <Link
                    href="/guides/how-to-choose-ai-coding-agent"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Read the guide <ArrowRight className="h-3 w-3" />
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

      {/* Final CTA strip */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="border-purple-300 dark:border-purple-700/50 bg-purple-50/50 dark:bg-purple-950/20">
              <CardContent className="p-8 text-center space-y-4">
                <h2 className="text-xl md:text-2xl font-bold">
                  Want to try this stack yourself?
                </h2>
                <p className="text-muted-foreground">
                  Cursor has a free tier; Claude Opus 4.6 is selectable in the
                  model picker on any paid plan. Next.js 15 and Drizzle are
                  free.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Button asChild size="lg">
                    <a
                      href="https://cursor.com"
                      target="_blank"
                      rel="noopener"
                    >
                      Open Cursor →
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a
                      href="https://nextjs.org/docs"
                      target="_blank"
                      rel="noopener"
                    >
                      Next.js docs →
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </article>
  );
}
