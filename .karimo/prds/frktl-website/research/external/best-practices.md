# External Research: Best Practices
## Next.js Marketing/Explainer Site — 2025

---

## 1. App Router vs Pages Router

**Use App Router.** For a new project started in 2025, there is no reason to use Pages Router. App Router offers:
- Colocated metadata API (`export const metadata`) — eliminates need for `next/head` entirely
- React Server Components — sections with static content render as RSC, reducing client JS
- File-based OG image generation via `opengraph-image.tsx` convention
- Route groups like `(marketing)/` for future multi-page expansion without URL impact

The Pages Router still works but is in maintenance mode. Next.js docs now lead with App Router.

---

## 2. Single-Page vs Multi-Page

**Single-page scroll for v1.** Rationale:
- The explainer is a narrative journey — each section builds on the previous. This is a story, not a reference doc.
- Investors and journalists reading for the first time benefit from the guided scroll experience.
- SEO: a single URL with rich content is easier to rank for "FRKTL modular nuclear" than fragmented pages.
- Simpler architecture: no routing, no navigation between pages, no prefetching logic.

**Multi-page later:** As the company grows, add: `/technology`, `/investors`, `/team`, `/careers`. The v1 long-form explainer stays as the homepage.

---

## 3. Static Export vs Vercel SSR

**Recommendation: Deploy to Vercel without `output: 'export'`.**

Why not static export:
- Static export disables image optimization (`next/image` needs a server or Vercel edge to convert WebP/AVIF)
- Disables `next/og` dynamic image generation
- Disables Vercel Analytics edge middleware

Vercel's free tier fully supports Next.js SSR/ISR with zero configuration. The site will be effectively static (no database queries, no auth) but Vercel handles the runtime. Use `generateStaticParams` and `export const dynamic = 'force-static'` for pages where needed.

---

## 4. Performance Best Practices

### Font Loading
Replace `@import url('https://fonts.googleapis.com')` with `next/font/google`:
```ts
import { Space_Mono, DM_Sans, Instrument_Serif } from 'next/font/google'
```
This self-hosts fonts at build time. Zero network round-trip, no render blocking, eliminates CLS from font swap. This alone can improve LCP by 200–400ms.

### Image Optimization
All raster images (photos, renders, OG image) use `next/image`. Key props:
- `priority` on hero image (above the fold — no lazy load)
- `sizes` attribute for responsive images
- `placeholder="blur"` with `blurDataURL` for perceived performance
- Avoid `next/image` for SVGs — import as React components instead

### Core Web Vitals Targets
- LCP < 2.5s — hero image/text should be server-rendered (RSC), fonts preloaded
- CLS < 0.1 — `next/font` eliminates font CLS; size SVGs with explicit viewBox + CSS width
- INP < 200ms — avoid heavy JS on main thread during scroll; SMIL animations run on GPU

### JavaScript Bundle
The current explainer has 0 npm dependencies beyond React. Migrating to Next.js will add ~100KB gzipped overhead (React 19 + Next.js runtime). Mitigation:
- Use `'use client'` only on components that need browser APIs (IntersectionObserver, scroll events)
- Static sections (text-only) should be React Server Components — no client JS
- Lazy-load any 3D scene (Spline/R3F) via `React.lazy` + `Suspense`

---

## 5. Scroll Animation Approach

For the section entrance animations (replaces current IntersectionObserver + CSS class toggle):

**Option A (recommended): Motion `useInView` + `motion.div`**
```tsx
import { motion } from 'motion/react'
const ref = useRef(null)
const isInView = useInView(ref, { once: true, amount: 0.15 })
return <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} />
```

**Option B: CSS-only with Intersection Observer (no library)**
Keep the current approach but write it in a custom hook. Zero bundle cost.

**For scroll-linked effects** (parallax, progress bars): Motion's `useScroll` + `useTransform` is the lightest option at 2.5KB for scroll features.

---

## 6. SEO for a Nuclear Startup

Primary SEO considerations:
- **Title pattern:** `FRKTL Energy — Modular Nuclear Reactor | HTGR Technology`
- **Meta description:** ~155 chars, include "modular nuclear", "HTGR", "sCO₂ Brayton", "frktlpower.com"
- **Structured data:** Add `Organization` JSON-LD schema in `<head>` with name, url, logo, sameAs (LinkedIn)
- **Canonical:** Self-referencing canonical at `https://frktlpower.com`
- **robots.txt:** Allow all, specify sitemap URL
- **Sitemap:** Single entry for homepage v1; add pages as site grows

---

## 7. SVG Inline vs `<img>` Tag

The existing illustrations are all inline JSX SVGs — this is the correct approach. Inline SVGs:
- Can be animated (SMIL works; CSS transitions work)
- Can be styled with JS variables and CSS custom properties
- Are not separate HTTP requests
- Support `aria-hidden` and accessibility attributes directly

Do NOT put them in `<img>` tags — SMIL animations will not work in `<img>` src SVGs in most browsers.

For any new illustrations created as separate files, import as React components (`import { ReactComponent as MyIcon } from './icon.svg'` pattern, or use SVGR).

---

## 8. Deployment Checklist

- [ ] `app/layout.tsx`: metadata, `<html lang="en">`, font preconnect
- [ ] `app/opengraph-image.tsx`: 1200×630 OG image with FRKTL branding
- [ ] `app/robots.ts`: allow all, sitemap URL
- [ ] `app/sitemap.ts`: homepage entry
- [ ] `/public/favicon.ico`, `/public/apple-touch-icon.png`
- [ ] Vercel project linked to GitHub
- [ ] Domain added in Vercel dashboard (frktlpower.com + www.)
- [ ] DNS: A record → 76.76.21.21 (Vercel IP) or CNAME → cname.vercel-dns.com
- [ ] HTTPS: automatic on Vercel
- [ ] Vercel Analytics: enable in project settings (zero code change)
