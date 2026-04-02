# CLAUDE.md - ZeroToAIAgents

This file provides guidance to Claude Code when working with the ZeroToAIAgents codebase.

## Project Overview

ZeroToAIAgents (zerotoaiagents.com) is an AI coding agents comparison and educational platform built with Next.js 16. The site compares different AI agents, provides learning guides, and earns revenue through AdSense (primary monetization). English-only at launch, with infrastructure supporting 9 locales for future expansion.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Internationalization**: next-intl (English only, infrastructure supports 9 locales for future expansion)
- **Database**: PostgreSQL via Drizzle ORM (Neon)
- **Themes**: next-themes (light/dark mode)

## Development Commands

```bash
# Development server (uses Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Drizzle commands
npx drizzle-kit push postgres  # Push schema to database
npx drizzle-kit studio        # Open Drizzle Studio GUI
```

## Project Architecture

### Directory Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes (English only currently)
│   │   ├── page.tsx        # Homepage with AI agent comparisons
│   │   ├── layout.tsx      # Root layout with i18n
│   │   ├── guides/         # AI agent guides and tutorials
│   │   │   ├── page.tsx    # All guides listing
│   │   │   └── [slug]/     # Individual guide pages
│   │   └── reviews/
│   │       ├── page.tsx    # All reviews listing
│   │       └── [slug]/     # Individual agent review pages
│   ├── admin/              # Admin dashboard (outside i18n)
│   │   ├── layout.tsx      # Admin layout with auth
│   │   ├── page.tsx        # Dashboard overview
│   │   ├── agents/         # AI agent management
│   │   ├── reviews/        # Review moderation
│   │   └── settings/       # Admin settings
│   └── api/                # API routes
│       └── reviews/        # Review submission API
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── agents/             # AI agent-specific components
│   └── reviews/            # Review system components
├── lib/
│   ├── ai-agent-data.ts    # AI agent data (database-driven)
│   ├── user-reviews.ts     # Review types and data
│   └── utils.ts            # Utility functions (cn)
├── i18n/
│   ├── routing.ts          # Locale configuration
│   └── request.ts          # i18n request handler
└── messages/               # Translation JSON files (en.json, nl.json, etc.)
```

### Supported Locales

Configured in `src/i18n/routing.ts`:
- **English (en)** - Only active locale at launch
- Dutch (nl), German (de), Spanish (es), French (fr), Chinese (zh), Japanese (ja), Korean (ko), Thai (th) - Translation files preserved for future localization support

### Middleware

The middleware (`src/middleware.ts`) handles i18n routing with exclusions for:
- `/api/*` - API routes
- `/admin/*` - Admin dashboard
- `/_next/*` - Next.js internals
- Static files

## Key Components

### AI Agent Data (`src/lib/ai-agent-data.ts`)

AI coding agents data sourced from PostgreSQL (Drizzle ORM) including:
- Agent name, description, capabilities
- Pricing models and features
- User ratings and reviews

### Review System

- **User reviews**: `src/components/reviews/review-form.tsx` - Public submission form
- **Review list**: `src/components/reviews/user-reviews-list.tsx` - Display component
- **Data types**: `src/lib/user-reviews.ts` - Types and mock data
- **GDPR compliant**: Optional newsletter consent checkbox

### Admin Dashboard (`/admin`)

- Simple localStorage-based authentication (8+ character key)
- AI agent management (`/admin/agents`)
- Review moderation (approve/reject pending user reviews)
- Settings management

## Database Schema

Drizzle ORM schema includes:
- `Agent` - AI agent data with pricing, features, ratings
- `Guide` - Educational guides and tutorials
- `UserReview` - User-submitted reviews with moderation
- `Subscriber` - Newsletter subscribers
- `AdminUser` - Admin dashboard users

## Important Patterns

### Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name> -y
```

Components are installed to `src/components/ui/`.

### Translations

Add translations to `src/messages/{locale}.json`. Access via:
```typescript
import { useTranslations } from "next-intl";
const t = useTranslations("namespace");
```

### Revenue Model

- **Primary**: AdSense integration (to be applied once content is complete)
- **Future**: Affiliate links for AI agent referrals (Phase 2)

### Admin Route Protection

Admin routes are excluded from i18n middleware. The admin layout handles its own authentication via localStorage.

## Current Status

1. **Database**: Connected via Drizzle ORM to Neon PostgreSQL
2. **Reviews API**: Connected to database
3. **AdSense**: Apply after content is complete
4. **Guides**: Educational content being developed
5. **Affiliate Links**: Planned for Phase 2

## Deployment

Deployed on Vercel with:
- Full Next.js capabilities (App Router, server components, API routes)
- Database integration via Neon PostgreSQL
- Environment variables configured in Vercel dashboard
