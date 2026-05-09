<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# CLAUDE.md — Names Hub Project

## Overview

AI-powered baby name generator website with cross-cultural focus (Chinese-English names as primary differentiation).

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Deployment**: Cloudflare Pages (via OpenNext adapter)
- **Database**: Cloudflare D1 (SQLite)
- **AI**: Gemini Flash + DeepSeek APIs
- **Package Manager**: pnpm

## Architecture

```
src/
  app/                    # Next.js App Router pages
    api/                  # API routes
      generate/           # Name generation endpoint
      names/              # Name data endpoints
  components/             # React components
    ui/                   # Base UI components
    generator/            # Name generator components
    layout/               # Layout components
  lib/                    # Utilities
    ai/                   # AI generation logic
    db/                   # D1 database utilities
    names/                # Name data utilities
  data/                   # Static name data
  scripts/                # ETL scripts (data import)
```

## Key Decisions

1. **Zero Login**: No authentication required
2. **Rate Limiting**: 5 AI generations per IP per day (client-side + edge middleware)
3. **SSG First**: Static pages for SEO, dynamic generation for personalization
4. **Cross-cultural**: Chinese-English names as primary differentiator

## Content Strategy

- 50+ static pre-generated pages
- Full AI generation (no manual editing)
- Light content: 100-char info cards only
- SEO-optimized: Each page targets specific keyword combinations
