# AI Agent Pipeline Implementation

**Date:** 2026-04-04
**Goal:** Replace VPN-copied pipeline stubs with working AI agent scraping, blog generation, affiliate sync, and GitHub Actions workflows.

---

## 1. Convex Schema Additions

Add three tables to `convex/schema.ts`:

### `blogPosts`
| Field | Type | Notes |
|-------|------|-------|
| `slug` | string | Unique, indexed |
| `language` | string | "en" default |
| `title` | string | |
| `excerpt` | string | Max 300 chars |
| `content` | string | Full HTML |
| `seoTitle` | string | Max 70 chars |
| `seoDescription` | string | Max 160 chars |
| `category` | string | "review", "comparison", "guide", "news" |
| `tags` | string[] | |
| `aiModel` | string | Which model generated it |
| `featuredImage` | string? | Optional image URL |
| `published` | boolean | Default false |
| `publishedAt` | string? | ISO date |

Indexes: `by_slug` (slug, language), `by_published` (published), `by_category` (category)

### `pipelineJobs`
| Field | Type | Notes |
|-------|------|-------|
| `type` | string | "scrape-pricing", "scrape-news", "generate-blog", "sync-links" |
| `status` | string | "pending", "running", "completed", "failed" |
| `agentSlug` | string? | For agent-specific jobs |
| `result` | string? | JSON result data |
| `error` | string? | Error message if failed |
| `startedAt` | string | ISO date |
| `completedAt` | string? | ISO date |

Indexes: `by_type_status` (type, status), `by_status` (status)

### `scrapedAgentData`
| Field | Type | Notes |
|-------|------|-------|
| `agentSlug` | string | Indexed |
| `priceMonthly` | number? | |
| `priceYearly` | number? | |
| `hasFreeTier` | boolean? | |
| `freeTierInfo` | string? | |
| `rawContent` | string | Full scraped text |
| `sourceUrl` | string | URL that was scraped |
| `scrapedAt` | string | ISO date |

Indexes: `by_agent` (agentSlug), `by_agent_date` (agentSlug, scrapedAt)

---

## 2. Convex Functions

### `convex/blogPosts.ts`
- **Mutations:** `create`, `publish`, `unpublish`, `remove`
- **Queries:** `getBySlug`, `listPublished`, `listAll`, `getById`

### `convex/pipelineJobs.ts`
- **Mutations:** `create`, `updateStatus`, `complete`, `fail`
- **Queries:** `getById`, `listRecent`, `countByStatus`

### `convex/scrapedAgentData.ts`
- **Mutations:** `upsert` (insert or update by agentSlug)
- **Queries:** `getByAgent`, `listAll`, `getLatestByAgent`

---

## 3. Scraper Implementation (`src/lib/pipeline/scraper.ts`)

Use **Jina Reader API** (free, no key required for basic usage):
- `https://r.jina.ai/{url}` returns clean markdown of any webpage
- Scrape each agent's pricing page (URLs from `aiAgentProviders[].website`)
- Parse pricing info from the markdown output using AI (quick Claude call)
- Store in `scrapedAgentData` via Convex mutation

Functions:
- `scrapeUrl(url)` — fetch via Jina Reader, return markdown
- `scrapeAgentPricing(agentSlug)` — scrape + AI-parse pricing for one agent
- `scrapeAgentNews()` — scrape tech news sites for AI agent mentions
- `saveScrapeResult(data)` — persist to Convex

---

## 4. API Route Implementations

### `POST /api/pipeline/scrape`
Auth: `x-pipeline-key` header. Body: `{ type: "pricing" | "news", agentSlug?: string }`
- Creates pipelineJob, runs scraper, updates job status, returns result.

### `POST /api/pipeline/generate`
Auth: `x-pipeline-key` header. Three phases:
- `phase: "start"` — picks next topic, starts generation, returns `{ jobId }`
- `phase: "status"` — returns job status with `{ status, postId?, error? }`
- `phase: "publish"` — publishes a draft post

Uses existing `content-generator.ts` + `ai-provider.ts`. Saves to Convex `blogPosts`.

### `POST /api/pipeline/sync-links`
Auth: `x-pipeline-key` header.
- Iterates all `aiAgentProviders`, does HEAD request on each `affiliateUrl`
- Returns `{ total, working, broken: [...] }`

### `GET /api/pipeline/status`
Auth: `x-pipeline-key` header.
- Returns recent job counts, last scrape times, blog post counts.

---

## 5. Blog Service (`src/lib/pipeline/blog-service.ts`)

Replace stubs with Convex client calls:
- `getAllPublishedPosts(language)` → query `blogPosts.listPublished`
- `getPostBySlug(slug, language)` → query `blogPosts.getBySlug`
- `getAllPublishedSlugs()` → query for sitemap
- `getPostById(id)` → query `blogPosts.getById`
- `publishPost(id)` → mutation `blogPosts.publish`

Use `fetchQuery`/`fetchMutation` from `convex/nextjs` for server-side calls.

---

## 6. Affiliate Sync (`src/lib/pipeline/affiliate-sync.ts`)

Replace stub with actual implementation:
- Import `aiAgentProviders` from `ai-agent-data.ts`
- For each agent, HEAD request to `affiliateUrl`
- Return `{ synced: workingCount, total: allCount, broken: [...slugs] }`

---

## 7. GitHub Actions Workflow Changes

### `agent-scrape.yml` → Adapted for AI Agents
- **Rename:** "Daily AI Agent Data Scrape & Sync"
- **Tier 1 matrix:** cursor, claude-code, github-copilot, windsurf, devin, replit-agent, chatgpt, gemini
- **Tier 2 array:** remaining 18 agents (amazon-q-developer, claude, gemini, perplexity, n8n-ai, flowise, relevance-ai, make-ai, zapier-central, crewai, autogen, langgraph, agentgpt, salesforce-agentforce, microsoft-copilot-studio, google-vertex-ai-agent-builder, intercom-fin, zendesk-ai, ada-ai, ipvanish → remove non-agents)
- **Remove:** `scrape-countries` job (not relevant for AI agents)
- **Remove:** `scrape-news` job (can add later)
- **Fix:** octal bug — `DAY=$(date +%-j)` instead of `date +%j`
- **Keep:** `sync-links` job, `health-check` job

### `content-generate.yml` → Minor fixes
- Already correct for AI agent content
- No structural changes needed, just needs working backend

### GitHub Secrets
- `SITE_URL` = `https://zerotoaiagents.com`
- `PIPELINE_SECRET` = generated secret

---

## 8. Environment Variables

Add to Vercel + `.env.local`:
- `PIPELINE_SECRET` — shared key for GitHub Actions ↔ API auth

Already configured (from .env.local):
- `NEXT_PUBLIC_CONVEX_URL` — Convex deployment
- `ANTHROPIC_API_KEY` — for content generation

No new API keys needed — Jina Reader free tier doesn't require a key.

---

## 9. Out of Scope

- Image generation (Gemini API) — keep stub
- Email sending (Resend) — keep stub
- Admin dashboard — separate project
- Review persistence to Convex — separate task
- Country-specific data — not relevant for AI agents
