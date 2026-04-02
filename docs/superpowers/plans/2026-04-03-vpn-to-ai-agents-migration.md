# VPN → AI Coding Agents Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the VPN comparison site into an AI Coding Agents comparison + educational platform focused on AdSense approval.

**Architecture:** Surgical rename of existing Next.js 16 App Router codebase. Keep all infrastructure (i18n, shadcn/ui, Drizzle, admin, SEO). Rename VPN references, simplify navigation, redesign homepage as magazine layout, create 15 content pages.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Drizzle ORM, Neon PostgreSQL, next-intl, next-themes

---

## Task 1: Deactivate non-English locales

**Files:**
- Modify: `src/i18n/routing.ts`

- [ ] **Step 1: Update routing config to English only**

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds (warnings OK, no errors)

- [ ] **Step 3: Commit**

```bash
git add src/i18n/routing.ts
git commit -m "chore: deactivate non-English locales for AdSense-first launch"
```

---

## Task 2: Remove conversion components from layout

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Remove imports and usage of ExitIntentPopup, StickyCTABar**

In `src/app/[locale]/layout.tsx`, remove these imports:
```typescript
import { ExitIntentPopup } from "@/components/conversion/exit-intent-popup";
import { StickyCTABar } from "@/components/conversion/sticky-cta-bar";
```

And remove these lines from the JSX:
```typescript
<ExitIntentPopup />
<StickyCTABar />
```

Keep `<NewsletterPopup />` — newsletter is part of the spec.

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/layout.tsx
git commit -m "chore: remove exit-intent popup and sticky CTA bar"
```

---

## Task 3: Simplify header navigation

**Files:**
- Modify: `src/components/header.tsx`

- [ ] **Step 1: Rewrite header to match spec navigation**

Replace the entire content of `src/components/header.tsx` with a simplified version that has only these nav items:
- Reviews → `/reviews`
- Compare → `/compare`
- Guides → `/guides`
- About → `/about`

Remove: Home link, Best AI Agents dropdown, Use Cases link, Deals link, LanguageSwitcher component.
Keep: Logo, ThemeToggle, mobile menu.

The desktop nav should be simple links (no dropdowns). The mobile nav should be a simple list.

Remove unused imports: `DropdownMenu*`, `Star`, `Zap`, `Tag`, `ChevronDown`, `Trophy`, `Briefcase`, `Wrench`, `HeadphonesIcon`, `Sparkles`, `BookOpen`, `LanguageSwitcher`.

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/header.tsx
git commit -m "feat: simplify header to Reviews, Compare, Guides, About"
```

---

## Task 4: Simplify footer

**Files:**
- Modify: `src/components/footer.tsx`

- [ ] **Step 1: Rewrite footer to 4-column layout per spec**

Replace footer content with 4 columns:

**Column 1: Reviews**
- Cursor Review → `/reviews/cursor`
- Copilot Review → `/reviews/github-copilot`
- Windsurf Review → `/reviews/windsurf`
- Claude Code Review → `/reviews/claude-code`
- Devin Review → `/reviews/devin`

**Column 2: Guides**
- What Are AI Coding Agents? → `/guides/what-are-ai-coding-agents`
- How to Choose → `/guides/how-to-choose-ai-coding-agent`
- Getting Started → `/guides/getting-started-ai-pair-programming`
- Beginners vs Experienced → `/guides/ai-coding-agents-beginners-vs-experienced`
- Free vs Paid → `/guides/free-vs-paid-ai-coding-agents`

**Column 3: Company**
- About → `/about`
- Contact → `/contact`
- Privacy Policy → `/privacy-policy`
- Terms → `/terms`

**Column 4: Newsletter** (reuse existing `<NewsletterFooter />`)

Remove: Quick Links column, Categories column, Legal column (merge into Company), affiliate-disclosure link, blog link, deals link, use-cases link, best-agents links.

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/footer.tsx
git commit -m "feat: simplify footer to Reviews, Guides, Company, Newsletter columns"
```

---

## Task 5: Create guide pages

**Files:**
- Create: `src/app/[locale]/guides/what-are-ai-coding-agents/page.tsx`
- Create: `src/app/[locale]/guides/how-to-choose-ai-coding-agent/page.tsx`
- Create: `src/app/[locale]/guides/getting-started-ai-pair-programming/page.tsx`
- Create: `src/app/[locale]/guides/ai-coding-agents-beginners-vs-experienced/page.tsx`
- Create: `src/app/[locale]/guides/free-vs-paid-ai-coding-agents/page.tsx`
- Modify: `src/app/[locale]/guides/page.tsx` (update listing)

- [ ] **Step 1: Study existing guide page pattern**

Read one existing guide (e.g., `src/app/[locale]/guides/what-is-ai-agent/page.tsx`) to understand the pattern: metadata generation, layout structure, content format.

- [ ] **Step 2: Create `what-are-ai-coding-agents` guide**

Create `src/app/[locale]/guides/what-are-ai-coding-agents/page.tsx`.
Content focus: What AI coding agents are, how they differ from regular AI chatbots, examples (Cursor, Copilot, etc.), why developers use them.
Minimum 1000 words of original content. Include:
- H1 title, meta description, breadcrumb schema
- Table of contents
- Structured sections with H2/H3 headings
- FAQ section at bottom

- [ ] **Step 3: Create `how-to-choose-ai-coding-agent` guide**

Same pattern. Content: Decision framework for choosing between coding agents. Factors: budget, IDE preference, language support, team size, use case.

- [ ] **Step 4: Create `getting-started-ai-pair-programming` guide**

Same pattern. Content: Beginner tutorial on AI pair programming. How to set up, best practices, tips, common mistakes.

- [ ] **Step 5: Create `ai-coding-agents-beginners-vs-experienced` guide**

Same pattern. Content: Which agents work best for different skill levels. Beginner-friendly vs power-user tools.

- [ ] **Step 6: Create `free-vs-paid-ai-coding-agents` guide**

Same pattern. Content: Free tier comparison across all 5 agents. What you get for free vs paid. When to upgrade.

- [ ] **Step 7: Update guides listing page**

Update `src/app/[locale]/guides/page.tsx` to list only the 5 new guides with correct titles, descriptions, and links.

- [ ] **Step 8: Delete old guide pages**

Remove directories for guides not in the spec:
- `src/app/[locale]/guides/what-is-ai-agent/`
- `src/app/[locale]/guides/choosing-ai-agent/`
- `src/app/[locale]/guides/ai-agent-security/`
- `src/app/[locale]/guides/building-ai-workflows/`
- `src/app/[locale]/guides/ai-agent-integrations/`
- `src/app/[locale]/guides/ai-agent-pricing/`
- `src/app/[locale]/guides/ai-agents-for-business/`
- `src/app/[locale]/guides/how-ai-agents-work/`

- [ ] **Step 9: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 10: Commit**

```bash
git add -A src/app/[locale]/guides/
git commit -m "feat: create 5 coding-focused guide pages, remove old guides"
```

---

## Task 6: Redesign homepage as magazine/content hub

**Files:**
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Rewrite homepage**

Replace the current homepage with the magazine/content hub layout:

**Hero Section:**
- Dark gradient background (`from-slate-900 to-slate-800`)
- H1: "Zero to AI Agents"
- Subtitle: "Learn, compare, and master AI coding agents"
- Client-side search input that filters content cards below
- No CTA buttons to affiliate links

**Content Grid:**
- 3-column responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Content cards for all 15 pages (5 reviews + 5 comparisons + 5 guides)
- Each card has:
  - Colored type badge: Review (indigo), Guide (amber), Comparison (green)
  - Title
  - Short description (1-2 sentences)
  - Estimated read time
  - Link to the page
- Featured/newest content first

**Why Trust Us Section:**
- Brief section explaining expertise (E-E-A-T signal)
- "Hands-on testing", "Independent reviews", "Updated regularly"

**Newsletter Section:**
- Reuse existing `NewsletterFooter` or similar component

Remove: HeroIllustration, Featured Agents cards, ComparisonTable, Categories, Use Cases, How It Works, FAQ, CTA sections.
Remove unused imports accordingly.

- [ ] **Step 2: Make search client-interactive**

The search needs client interactivity. Extract the content grid into a client component (e.g., `src/components/content-grid.tsx`) that accepts the content items as props and filters them based on search input and type filter tabs (All / Reviews / Guides / Comparisons).

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/page.tsx src/components/content-grid.tsx
git commit -m "feat: redesign homepage as magazine/content hub with search"
```

---

## Task 7: Handle three-way comparison route

**Files:**
- Modify: `src/app/[locale]/compare/[comparison]/page.tsx`

- [ ] **Step 1: Update comparison slug parser**

The current `parseComparisonSlug` only handles two agents. The spec includes `cursor-vs-windsurf-vs-copilot`. Update the parser to handle 2 or 3 agents:

```typescript
function parseComparisonSlug(comparison: string): { slugs: string[] } | null {
  const parts = comparison.split("-vs-");
  if (parts.length < 2 || parts.length > 3 || parts.some(p => !p)) {
    return null;
  }
  return { slugs: parts };
}
```

Update the rest of the page to handle both 2-agent and 3-agent comparisons. For 3 agents, show a three-column comparison table.

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/compare/[comparison]/page.tsx
git commit -m "feat: support three-way agent comparisons"
```

---

## Task 8: Rename admin VPN routes to agents

**Files:**
- Move: `src/app/admin/vpns/` → `src/app/admin/agents/`
- Rename: `vpn-form.tsx` → `agent-form.tsx`
- Move: `src/app/api/admin/vpns/` → `src/app/api/admin/agents/`
- Move: `.github/workflows/vpn-scrape.yml` → `.github/workflows/agent-scrape.yml`

- [ ] **Step 1: Move admin page directory**

```bash
mv src/app/admin/vpns src/app/admin/agents
mv src/app/admin/agents/vpn-form.tsx src/app/admin/agents/agent-form.tsx
```

Update the import in `src/app/admin/agents/page.tsx` from `./vpn-form` to `./agent-form`.

- [ ] **Step 2: Move API route directory**

```bash
mv src/app/api/admin/vpns src/app/api/admin/agents
```

- [ ] **Step 3: Rename workflow file**

```bash
mv .github/workflows/vpn-scrape.yml .github/workflows/agent-scrape.yml
```

- [ ] **Step 4: Update all internal references**

Search for `"/api/admin/vpns"` and replace with `"/api/admin/agents"` in:
- `src/app/admin/agents/page.tsx`
- `src/app/admin/agents/agent-form.tsx`
- Any other files referencing this API path

Search for `"/admin/vpns"` and replace with `"/admin/agents"` in admin navigation/dashboard.

- [ ] **Step 5: Rename VPN comparison tool component**

```bash
mv src/components/conversion/vpn-comparison-tool.tsx src/components/conversion/agent-comparison-tool.tsx
```

Update any imports of this component across the codebase.

- [ ] **Step 6: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: rename all VPN references to agent"
```

---

## Task 9: Clean up VPN assets and unused pages

**Files:**
- Delete: `public/vpn-images/` directory
- Delete: `public/logos/` (VPN logos — agent logos can be added later)
- Delete: `scripts/take-vpn-screenshots.ts`
- Delete: `scripts/retry-screenshots.ts`

- [ ] **Step 1: Remove VPN image assets**

```bash
rm -rf public/vpn-images/
rm -rf public/logos/
rm scripts/take-vpn-screenshots.ts scripts/retry-screenshots.ts
```

- [ ] **Step 2: Remove pages not in spec**

These pages are not linked from the new navigation but still exist. Remove to avoid thin content issues for AdSense:

```bash
rm -rf src/app/[locale]/deals/
rm -rf src/app/[locale]/coupons/
rm -rf src/app/[locale]/use-cases/
rm -rf src/app/[locale]/best/
rm -rf src/app/[locale]/quiz/
rm -rf src/app/[locale]/affiliate-disclosure/
```

Also remove their associated components:
```bash
rm -rf src/components/coupons/
rm -rf src/components/quiz/
rm -rf src/components/tools/
rm -rf src/components/conversion/exit-intent-popup.tsx
rm -rf src/components/conversion/sticky-cta-bar.tsx
```

And data files:
```bash
rm src/lib/coupon-data.ts
rm src/lib/use-case-data.ts
rm -rf src/lib/use-case-translations/
```

- [ ] **Step 3: Fix any broken imports**

Run `npm run build` and fix any import errors caused by deleted files. Most likely in:
- `src/app/[locale]/layout.tsx` (already handled in Task 2)
- `src/app/[locale]/page.tsx` (already handled in Task 6)
- `src/components/header.tsx` (already handled in Task 3)
- `src/components/footer.tsx` (already handled in Task 4)

- [ ] **Step 4: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove VPN assets, unused pages and components"
```

---

## Task 10: Update en.json translations

**Files:**
- Modify: `src/messages/en.json`

- [ ] **Step 1: Update translation keys**

Update `src/messages/en.json` to reflect the new site focus. Key changes:

- `nav`: Remove `home`, `best`, `deals`, `useCases`. Keep `reviews`, `compare`, `guides`. Add `about`.
- `hero`: Update to "Zero to AI Agents" / "Learn, compare, and master AI coding agents"
- `footer`: Update column headings and link labels to match the 4-column spec
- `comparisonTool`: Replace `addVpn` → `addAgent`, `noVpnsSelected` → `noAgentsSelected`
- Remove unused namespaces: `exitIntent`, `stickyBar`, any VPN-specific keys
- Keep: `comparison`, `review`, `cta`, `newsletter`, `metadata`

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/messages/en.json
git commit -m "feat: update translations for AI coding agents focus"
```

---

## Task 11: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update CLAUDE.md to reflect current state**

Key updates:
- Change "PostgreSQL via Prisma" → "PostgreSQL via Drizzle ORM"
- Remove Prisma commands, add Drizzle commands
- Update directory structure to reflect renamed paths (`admin/agents/` not `admin/vpns/`)
- Remove references to Short.io affiliate links (disabled for now)
- Update "Supported Locales" to just English
- Remove "Pending Work" items that are done
- Add note about AdSense-first revenue model

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md to reflect current project state"
```

---

## Task 12: Final build verification and cleanup

- [ ] **Step 1: Full production build**

Run: `npm run build 2>&1 | tail -40`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Check all spec pages render**

Start dev server and verify these routes return 200:
- `/` (homepage)
- `/reviews` (listing)
- `/reviews/cursor`
- `/reviews/github-copilot`
- `/reviews/windsurf`
- `/reviews/claude-code`
- `/reviews/devin`
- `/compare` (listing)
- `/compare/cursor-vs-github-copilot`
- `/compare/cursor-vs-windsurf`
- `/compare/github-copilot-vs-claude-code`
- `/compare/cursor-vs-windsurf-vs-copilot`
- `/compare/devin-vs-claude-code`
- `/guides` (listing)
- `/guides/what-are-ai-coding-agents`
- `/guides/how-to-choose-ai-coding-agent`
- `/guides/getting-started-ai-pair-programming`
- `/guides/ai-coding-agents-beginners-vs-experienced`
- `/guides/free-vs-paid-ai-coding-agents`
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms`

- [ ] **Step 3: Verify no 404 links in navigation**

Check that every link in the header and footer resolves to an existing page.

- [ ] **Step 4: Run linting**

Run: `npm run lint`
Fix any lint errors.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final cleanup and verification"
```
