# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

Early-stage prototype. AI name generation falls back to static data when `/api/generate` is unavailable.
Cloudflare D1, AI APIs, and rate limiting are **not yet implemented**.

---

## Develop Commands

```bash
pnpm dev      # Start dev server at localhost:3000
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

---

## Tech Stack

- **Framework**: Next.js 16.2.6 (App Router)
- **Styling**: Tailwind CSS v4 (CSS-first config with `@theme` in globals.css)
- **Fonts**: Geist (via `next/font/google`)
- **Package Manager**: pnpm
- **Deployment Target**: Cloudflare Pages (OpenNext adapter configured)

---

## Architecture

```
src/app/                    # App Router pages (all under [locale]/)
  [locale]/                 # Locale routing: /en, /zh
    page.tsx                # Home page (RSC + InlineGenerator island)
    about/page.tsx         # About page (RSC)
    generator/page.tsx     # Generator page (RSC + GeneratorForm island)
    boy/page.tsx            # Boy names listing (RSC)
    girl/page.tsx           # Girl names listing (RSC)
    name/[slug]/page.tsx    # Name detail page (dynamic, SSG)

src/components/            # React components
  ui/                       # Base UI components (Skeleton, etc.)
  generator/                # Generator client islands (InlineGenerator, GeneratorForm)
  layout/                  # Layout components (LocaleSwitcher)

src/data/                   # Static name data (popular-names.ts)
src/lib/names/              # Name data utilities
```

**No API routes yet.** `GeneratorForm` calls `/api/generate` but that endpoint does not exist.

---

## Key Implementation Notes

1. Home and generator pages are RSC; interactive parts are `"use client"` island components
2. `InlineGenerator` — gender/style/letter form embedded on home page
3. `GeneratorForm` — full generator form with inline error display (no static fallback)
4. Gender filtering: `boy` | `girl` | `all`
5. Style options: `classic` | `modern` | `nature` | `scholarly` | `elegant`
6. Pinyin romanization included for all Chinese names
7. Error boundaries (`error.tsx`), loading skeletons (`loading.tsx`), and not-found pages exist for all routes
8. `notFound()` from `next/navigation` used in name/[slug]/page.tsx
