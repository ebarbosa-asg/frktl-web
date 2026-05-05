# Internal Research: Issues & Gaps
## Source: /Users/loko/FRKTL/frktl-explainer.jsx

---

## Critical Issues (Block Deployment)

### E1: No Metadata / SEO
The component renders no `<title>`, no `<meta description>`, no Open Graph tags, no Twitter card tags, no `<html lang>`, no `<head>` element at all. As a standalone React component it depends entirely on the host app to provide these.

**Impact:** Unfindable by search engines. Social shares (LinkedIn, Twitter/X) will show blank previews. Investor links shared via Slack/email will have no preview card. This is the single most critical omission for a public-facing startup site.

**Fix:** Next.js App Router `metadata` export in `app/page.tsx` + `app/layout.tsx`. Also add `app/opengraph-image.tsx` for dynamic OG image generation.

---

### E2: No Favicon / Brand Assets
No favicon, no apple-touch-icon, no `manifest.json`, no site.webmanifest. The FRKTL hexagonal logo exists only as inline SVG markup inside the component (not extractable as a file).

**Fix:** Export the hexagonal logo as an SVG file, generate `favicon.ico` (16/32/48px), place in `/public/`.

---

### E3: No Domain / Deployment Configuration
No `next.config.ts`, no Vercel configuration, no DNS setup. The site needs to resolve at `frktlpower.com` and `www.frktlpower.com`.

**Fix:** Create `next.config.ts`, deploy to Vercel, add domain in Vercel dashboard, configure DNS records at registrar.

---

### E4: Not a Next.js Project Yet
The existing file is a single React component, not a Next.js app. The repository at `/Users/loko/frktl-web/` currently has only a `README.md`. The Next.js scaffold does not exist.

**Fix:** `npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir` from the `frktl-web` directory.

---

## Significant Issues (Affect Quality)

### E5: No Responsive Navigation
The fixed right-side dot navigation is invisible and barely usable on mobile. 8px dots at right: 12px have no hit target padding, no labels visible on mobile, no hamburger menu, no mobile-friendly section navigation.

**Fix:** Mobile nav either hides the dots or replaces with a floating "section N of 17" progress indicator. Consider a sticky header with the FRKTL logo + a hamburger that shows the section list.

---

### E6: No CTA / Contact
The site has no call-to-action for investors or potential customers. No "Contact Us", no "Request a Deck", no "Join our Mailing List", no investor inquiry form. The footer is purely a logo + tagline.

**Impact:** Any investor who lands on this page has no conversion path. This is a major gap for the site's primary business purpose.

**Fix:** Add a final section before the footer: "Interested in FRKTL?" with an email link (`mailto:`) at minimum, or a simple embedded form (Resend + API route, or Typeform embed).

---

### E7: Missing Paid Font (Söhne)
The root `fontFamily` fallback is `'Söhne', 'Helvetica Neue', Helvetica, sans-serif`. Söhne is a paid typeface from Klim Type Foundry (~$200–400/license). It is not loaded anywhere — the `@import` only loads Space Mono, DM Sans, and Instrument Serif. In all environments, the site renders in Helvetica Neue, not Söhne.

**Fix:** Either purchase a Söhne license and self-host, or replace with a similar free alternative. Candidates: Inter (closest geometric feel), Neue Haas Grotesk (paid alternative), or keep DM Sans for all body text.

---

### E8: Google Fonts @import Inside Component
Loading Google Fonts via `@import` inside a `<style>` tag in the component body is a performance anti-pattern. It is render-blocking, causes FOIT (Flash of Invisible Text), contributes to CLS (Cumulative Layout Shift), and makes an external network request.

**Fix:** Replace with `next/font/google` in `app/layout.tsx`. Fonts are self-hosted at build time, eliminating the external request entirely.

---

### E9: Inline Styles Performance
The entire component uses `style={{...}}` for all layout. This:
- Prevents CSS caching (styles recalculated every render)
- Bloats the JavaScript bundle (style objects included in JS)
- Makes responsive design harder (can't write media queries inline)
- Prevents PostCSS/PurgeCSS optimization

**Fix:** Migrate to Tailwind v4 utility classes or CSS Modules. The color constants become CSS custom properties. The section layout becomes semantic className-based styling.

---

### E10: No `lang` Attribute / Accessibility
The component renders a bare `<div>` root. No `<html lang="en">`, no ARIA landmarks (`<main>`, `<section>`, `<nav>`, `<footer>`), no `aria-label` on nav dots, no skip-to-content link.

**Fix:** Next.js App Router `app/layout.tsx` sets `<html lang="en">`. Section elements should be `<section>` with proper `aria-labelledby`. Nav dots need `aria-label` and keyboard focus handling.

---

### E11: No robots.txt / sitemap.xml
No crawl directives for search engines. No sitemap for indexing the single page.

**Fix:** `app/robots.ts` and `app/sitemap.ts` — generated automatically by Next.js App Router conventions.

---

## Minor Issues

### E12: Hardcoded Sections Array Content
Content is mixed into JSX data. Long-form body text with `\n\n` separators, technical specs, and dates (e.g., "Part 53, finalized March 2026") are all hardcoded strings. No CMS or data layer.

**Impact:** Low for v1. High if non-technical team members need to update copy, or if content needs to be translated.

---

### E13: Phase 3–5 Roadmap Sections Have No Visuals
Sections `phase3` (2029–2030), `phase4` (2031–2032), `phase5` (2033) have `visual: null`. These are the most exciting narrative sections (NRC application, FOAK build, first criticality) but have no accompanying illustrations.

**Impact:** These sections will feel text-heavy compared to the illustrated early sections. Visual redesign should address this.

---

### E14: No Analytics / Performance Monitoring
No analytics tag, no error monitoring, no performance monitoring. For an investor-facing site, knowing which sections get read (scroll depth) and who visits is valuable.

**Fix:** Vercel Analytics (zero-config, privacy-friendly) + optional Posthog or Plausible for full analytics.

---

### E15: No Loading State / Skeleton
The page shows all content blank until JS hydrates and IntersectionObserver triggers. On slow connections, the page will appear empty. No `<noscript>` fallback.

**Fix:** Next.js static generation + server rendering means the HTML is pre-rendered. When migrated to Next.js, sections should render with their visible state at `opacity: 1` for server-rendered HTML and animate only on the client (using `'use client'` directive with an `isClient` check).

---

### E16: SVG Accessibility
None of the SVG illustrations have `<title>`, `<desc>`, or `role="img"` attributes. They are invisible to screen readers and assistive technology.

**Fix:** Add `<title>` elements to each SVG (at minimum). For decorative SVGs, `aria-hidden="true"` is appropriate.

---

## Duplicate File
The directory `/Users/loko/FRKTL/` reportedly contains a file named `final explainer .jsx` (note the space before `.jsx`). This is likely an older version or accidental duplicate. The canonical source file is `frktl-explainer.jsx`. The duplicate should be removed to avoid confusion during the migration process.
