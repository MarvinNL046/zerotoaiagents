# Design: VPN → AI Coding Agents Migration

**Date:** 2026-04-03
**Status:** Approved
**Approach:** Surgical Rename (reuse existing infrastructure)

---

## 1. Site Identity & Positioning

- **Domain:** zerotoaiagents.com
- **Tagline:** "Learn, compare, and master AI coding agents"
- **Target audience:** Developers (beginner to senior) evaluating or learning to use AI coding tools
- **Language:** English only at launch (i18n infrastructure retained for future expansion)
- **Revenue model:** Phase 1 = Google AdSense. Phase 2 = affiliate links.

### AdSense Approval Requirements

- Original, in-depth content (no thin pages)
- Clear navigation and site structure
- Privacy Policy, Terms, About, Contact pages (already exist)
- No aggressive affiliate CTAs at launch
- Professional design, good UX
- Minimum ~15-20 quality pages

---

## 2. Content Structure (20 Pages)

### 5 Agent Review Pages (Pillar Content)

| Route | Agent | Key Info |
|-------|-------|----------|
| `/reviews/cursor` | Cursor AI Editor | AI-first IDE, $20/mo |
| `/reviews/github-copilot` | GitHub Copilot | Most popular, $10/mo |
| `/reviews/windsurf` | Windsurf (Codeium) | Free tier, Cursor alternative |
| `/reviews/claude-code` | Claude Code | Anthropic CLI agent |
| `/reviews/devin` | Devin | First AI software engineer |

**Review template:** Introduction → Key Features → Pricing → Pros/Cons → Verdict → Rating (1-5 scale)

### 5 Comparison Pages

| Route | Matchup |
|-------|---------|
| `/compare/cursor-vs-github-copilot` | Most searched matchup |
| `/compare/cursor-vs-windsurf` | Direct IDE competitors |
| `/compare/github-copilot-vs-claude-code` | Different approaches (IDE vs CLI) |
| `/compare/cursor-vs-windsurf-vs-copilot` | Three-way comparison |
| `/compare/devin-vs-claude-code` | Autonomous agents |

**Comparison template:** Side-by-side table → Category winners (price, features, performance) → Verdict

### 5 Guide Pages (Educational)

| Route | Topic |
|-------|-------|
| `/guides/what-are-ai-coding-agents` | Beginner introduction |
| `/guides/how-to-choose-ai-coding-agent` | Decision framework |
| `/guides/getting-started-ai-pair-programming` | Practical getting started |
| `/guides/ai-coding-agents-beginners-vs-experienced` | Audience-specific advice |
| `/guides/free-vs-paid-ai-coding-agents` | Price comparison guide |

### Existing Pages (Retained)

- `/about` — About the site + author (E-E-A-T)
- `/contact`
- `/privacy-policy`
- `/terms`

---

## 3. Homepage Design — Magazine / Content Hub

### Hero Section
- Dark gradient background
- Heading: "Zero to AI Agents"
- Subtitle: "Learn, compare, and master AI coding agents"
- Search bar (client-side filtering by title and type — no backend search needed for 15 pages)

### Content Grid
- 3-column grid (responsive to 1 column on mobile)
- Each card has a colored type-label:
  - **Review** (indigo) — agent reviews
  - **Guide** (amber) — educational guides
  - **Comparison** (green) — comparisons
- Cards show: type-label, title, short description, read time
- Most recent/featured content at top

### Below the Grid
- "Why Trust Us" section (E-E-A-T signal for Google)
- Newsletter signup (reuse existing component)

### Not Included at Launch
- No affiliate CTAs
- No sticky bars
- No exit-intent popups

---

## 4. Navigation

### Header
```
Logo (Zero to AI Agents)  |  Reviews  |  Compare  |  Guides  |  About  |  [dark/light toggle]
```

### Footer
```
Column 1: Reviews          Column 2: Guides              Column 3: Company
- Cursor Review            - What Are AI Agents?          - About
- Copilot Review           - How to Choose                - Contact
- Windsurf Review          - Getting Started              - Privacy Policy
- Claude Code Review       - Beginners vs Experienced     - Terms
- Devin Review             - Free vs Paid

Column 4: Newsletter signup
```

**Rule:** Every link in header/footer has a corresponding page. Zero 404s.

---

## 5. Technical Migration Plan

### Stack (Unchanged)
- Next.js 16 + App Router + Turbopack
- Tailwind CSS v4 + shadcn/ui
- Drizzle ORM + Neon PostgreSQL
- next-themes (dark/light mode)
- next-intl (config retained, only `en` active)
- Admin dashboard structure
- Newsletter system + Resend
- SEO components (JSON-LD, breadcrumbs, sitemap)

### Rename (VPN → Agent)
- `/admin/vpns/` → `/admin/agents/`
- `vpn-form.tsx` → `agent-form.tsx`
- `vpn-comparison-tool.tsx` → `agent-comparison-tool.tsx`
- All `vpn` references in code → `agent`

### Remove
- `/public/vpn-images/` — VPN provider logos
- VPN-specific form fields: servers, countries, protocols, encryption, killSwitch, noLogs, netflixSupport, torrentSupport
- Sticky CTA bar component
- Exit-intent popup component
- Affiliate link components (temporarily)
- Non-English translations deactivated: update `src/i18n/routing.ts` to only expose `en` locale (translation files kept for future re-activation)

### Modify
- Homepage → Magazine/Content Hub layout
- Navigation → Reviews, Compare, Guides, About
- `en.json` translations → rewrite for AI agents context
- `CLAUDE.md` → update to reflect actual state (Drizzle not Prisma, etc.)

### Add
- 15 content pages (5 reviews + 5 comparisons + 5 guides)
- Homepage content grid component
- Agent review page template
- Comparison page template
- Guide page template
- AdSense `<script>` tag placeholder in head (activated after approval)

---

## 6. Content Quality Standards

All content must meet Google AdSense quality requirements:

- **Original content** — no AI-generated filler, each page offers unique value
- **Expert perspective** — hands-on experience with each tool, specific examples
- **Minimum length** — reviews: 1500+ words, comparisons: 1200+ words, guides: 1000+ words
- **Structured content** — proper heading hierarchy (H1-H3), table of contents for long pages
- **Visual elements** — screenshots, comparison tables, rating widgets
- **Updated information** — pricing and features reflect current state (2026)
- **E-E-A-T signals** — author bio on About page, methodology explanation, "last updated" dates

---

## 7. Content Source

Content for the 15 pages will be written with hands-on expertise. The existing content pipeline (scrape/generate in admin) can assist with gathering factual data (pricing, features), but all reviews, opinions, and editorial content must reflect genuine experience. No pure AI-generated filler — Google penalizes thin, auto-generated content.
