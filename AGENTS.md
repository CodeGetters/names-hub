<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Names Hub Project

## Overview

AI-powered baby name generator website with cross-cultural focus (Chinese-English names as primary differentiation).

## Tech Stack

- **Framework**: Next.js 16.2.6 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **Deployment**: Cloudflare Pages (via OpenNext adapter)
- **Package Manager**: pnpm

## Current Implementation State

### Implemented
- 5 pages: Home (`/`), Generator (`/generator`), Boy (`/boy`), Girl (`/girl`), Name Detail (`/name/[slug]`)
- Static fallback data for name generation (no real AI yet)
- Gender filtering (boy/girl/all)
- Style filtering (classic/modern/nature/scholarly/elegant)
- Starting letter filter
- Tailwind CSS v4 with CSS variables

### Not Yet Implemented
- `/api/generate` endpoint (generator page falls back to static data)
- `/api/names` endpoints
- Cloudflare D1 database
- AI integration (Gemini Flash / DeepSeek)
- Rate limiting middleware
- Server components (all pages are `"use client"`)

## Architecture

```
src/app/                    # App Router pages
  page.tsx                  # Home with inline generator
  generator/page.tsx        # Dedicated generator (calls /api/generate)
  boy/page.tsx              # Boy names listing
  girl/page.tsx             # Girl names listing
  name/[slug]/page.tsx      # Individual name detail

src/components/            # React components (ui/, generator/, layout/)
src/lib/names/             # Name data utilities
src/data/                  # Static name data
```

## Design System

Custom palette via CSS variables in `globals.css`:
- `--primary: #e85d4c` (brand red)
- `--secondary: #6b8f71` (sage green)
- `--boy: #5b9bd5` / `--girl: #e86d9a` (gender colors)
- `--background`, `--foreground`, `--muted`, `--border`, `--card`

Use semantic color classes: `text-primary`, `bg-boy`, `text-girl`, etc.

## Key Decisions

1. **Zero Login**: No authentication required
2. **SSG First**: Static pages for SEO, dynamic generation for personalization
3. **Cross-cultural**: Chinese-English names as primary differentiator
4. **Fallback First**: UI works with static data; AI is enhancement not requirement

## Content Strategy

- 50+ static pre-generated pages planned
- Full AI generation (no manual editing)
- Light content: 100-char info cards only
- SEO-optimized: Each page targets specific keyword combinations
