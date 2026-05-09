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
src/app/                    # App Router pages
  page.tsx                  # Home page with inline generator
  generator/page.tsx        # Dedicated generator page (uses /api/generate)
  boy/page.tsx              # Boy names listing
  girl/page.tsx             # Girl names listing
  name/[slug]/page.tsx      # Individual name detail page

src/components/            # React components
  ui/                       # Base UI components
  generator/                # Generator-specific components
  layout/                  # Layout components

src/lib/names/              # Name data utilities (only lib subdirectory present)

src/data/                   # Static name data

src/app/globals.css         # Tailwind v4 CSS-first config + CSS variables
```

**No API routes yet.** `generator/page.tsx` calls `/api/generate` but that endpoint does not exist.

---

## Styling Conventions

Tailwind CSS v4 uses CSS-first configuration. Theme variables are defined in `globals.css`:

```css
:root {
  --primary: #e85d4c;        /* Main brand color */
  --secondary: #6b8f71;     /* Secondary color */
  --boy: #5b9bd5;           /* Gender color */
  --girl: #e86d9a;          /* Gender color */
  --background: #faf9f7;
  /* ... */
}
```

Color classes work as `text-primary`, `bg-boy`, `text-girl`, etc. (NOT `text-[#xxx]`).

---

## Key Implementation Notes

1. All pages use `"use client"` directive (no server components yet)
2. Static fallback data in `generator/page.tsx` provides names when API fails
3. Gender filtering: `boy` | `girl` | `all`
4. Style options: `classic` | `modern` | `nature` | `scholarly` | `elegant`
5. Pinyin romanization included for all Chinese names
