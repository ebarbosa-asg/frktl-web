# Internal Research: Dependencies
## Source: /Users/loko/FRKTL/frktl-explainer.jsx

---

## Current Dependencies (frktl-explainer.jsx)

The existing component has exactly **one import**:

```js
import { useState, useEffect, useRef } from "react";
```

No npm packages beyond React itself. No routing library, no CSS framework, no animation library, no image optimization, no metadata API. Everything is:
- Inline styles (all layout and theming)
- Inline SVG (all illustrations)
- SMIL animations (SVG-native)
- CSS injected via `<style>` tag inside the component
- Google Fonts loaded via `@import` in that style tag

The component is a self-contained React SPA fragment — it could be dropped into any React host.

---

## What a Next.js Project Will Need

### Core Dependencies

| Package | Version | Purpose |
|---|---|---|
| next | 15.x | Framework, routing, static export, metadata API |
| react | 19.x | Component runtime |
| react-dom | 19.x | DOM rendering |
| typescript | 5.x | Type safety |

### Dev Dependencies

| Package | Purpose |
|---|---|
| @types/react | TypeScript types |
| @types/react-dom | TypeScript types |
| @types/node | TypeScript types for Node |
| eslint | Linting |
| eslint-config-next | Next.js ESLint ruleset |

### Styling

**Option A (recommended): Tailwind CSS v4**
```
@tailwindcss/postcss   (PostCSS plugin — replaces tailwind.config.js)
tailwindcss            v4.x
```
Tailwind v4 uses CSS-first config (`@import "tailwindcss"` in globals.css). No config file needed. Design tokens declared as CSS custom properties. This is the cleanest path to replace the current inline-style color constants.

**Option B: CSS Modules**
No extra dependency. Next.js supports `.module.css` natively. More verbose than Tailwind but zero overhead.

### Animation (choose one)

| Package | Bundle | Notes |
|---|---|---|
| motion (Framer Motion v11+) | ~32KB | React-native, useInView hook replaces IntersectionObserver, scroll-linked animations via useScroll |
| gsap + @gsap/react | ~35KB (core+ScrollTrigger) | More powerful timelines, framework-agnostic |
| No library | 0KB | Keep existing SMIL + CSS transition approach for SVGs |

### Font Loading

Replace Google Fonts `@import` with `next/font/google`:
```ts
import { Space_Mono, DM_Sans, Instrument_Serif } from 'next/font/google'
```
Benefits: self-hosted, no FOIT, no external request, zero CLS from font swaps. Critical for Core Web Vitals on a public-facing site.

### Image Optimization

No raster images currently exist in the component. When adding:
- Photos/renders: use `next/image` (automatic WebP/AVIF, lazy load, blur placeholder)
- SVG files: import as React components (`*.svg?react` with a loader, or inline)
- OG image: generate with `next/og` (`ImageResponse`) in `app/opengraph-image.tsx`

### Metadata / SEO

Next.js App Router metadata API (no extra package):
```ts
// app/layout.tsx or app/page.tsx
export const metadata: Metadata = {
  title: 'FRKTL Energy — Modular Nuclear for a Clean World',
  description: '...',
  openGraph: { ... },
  twitter: { ... },
}
```

### Deployment

| Tool | Notes |
|---|---|
| vercel (CLI) | Zero-config Next.js deployment, automatic preview URLs |
| Custom domain | DNS A/CNAME records at domain registrar → Vercel dashboard |

**For static export** (if desired — no server needed):
```js
// next.config.js
module.exports = { output: 'export' }
```
This generates `/out` directory. Can be deployed to Vercel, Netlify, Cloudflare Pages, or any static host. Limitation: no ISR, no server actions, no API routes.

---

## Project Structure for Next.js App Router

```
/Users/loko/frktl-web/
├── app/
│   ├── layout.tsx          ← Root layout, metadata, font setup
│   ├── page.tsx            ← Home page (the explainer)
│   ├── globals.css         ← Tailwind import + CSS custom properties
│   └── opengraph-image.tsx ← Auto-generated OG image
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── FuelSection.tsx
│   │   └── ...             ← One file per section
│   ├── illustrations/
│   │   ├── TrisoParticleSVG.tsx
│   │   ├── SCO2CycleSVG.tsx
│   │   └── ...             ← Each SVG component isolated
│   ├── NavDots.tsx
│   ├── StatsStrip.tsx
│   ├── ComparisonTable.tsx
│   └── LearningCurve.tsx
├── data/
│   └── sections.ts         ← Content data array extracted from JSX
├── lib/
│   └── tokens.ts           ← Color constants → CSS custom properties
├── public/
│   └── favicon.ico
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## No External API Dependencies

The current component is 100% static content. No CMS, no database, no authentication, no contact form (yet). The Next.js site can be fully statically generated at build time.

**Future additions that would require server-side:**
- Contact / investor inquiry form (will need API route or form service like Resend/Formspark)
- Analytics (Vercel Analytics is zero-config, or Plausible for privacy-first)
- CMS for content updates (Sanity, Contentful — if non-technical team members need to update copy)
