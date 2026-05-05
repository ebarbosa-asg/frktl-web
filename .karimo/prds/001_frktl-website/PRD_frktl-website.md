# PRD: FRKTL Website
**Slug:** frktl-website  
**Status:** Approved  
**Created:** 2026-05-05  
**Tasks:** 11 | **Complexity:** 27 points | **Waves:** 4

---

## Executive Summary

FRKTL Energy needs a public-facing website at frktlpower.com that serves two audiences simultaneously: investors evaluating a pre-seed nuclear startup, and general public visitors discovering the company for the first time. The current asset is a single-file React JSX explainer (627 lines, zero npm dependencies) that tells the FRKTL story from fuel to criticality across 17 narrative sections. The goal is to migrate and fully redesign this content as a Next.js 15 App Router site — not an MVP cleanup, but a go-all-out visual statement. The new site fuses three aesthetic layers into a unified "Nuclear Optimism" design language: 50s atomic-age editorial, cute 3D isometric illustration, and modern tech-startup grid discipline. The site ships with a custom-designed FRKTL wordmark (no logo asset exists), a Spline 3D hero scene, Motion-powered spring animations, full SEO metadata, and deploys to Vercel under the frktlpower.com domain.

---

## Vision and Goals

**Vision:** A website that looks like it was designed by someone who loves 1950s atomic optimism and contemporary product design equally — executed without irony, with full technical credibility.

**Goals:**

1. Serve as the canonical investor demo URL — link-shareable, fast, mobile-responsive, SEO-complete.
2. Tell the FRKTL technology story (fuel → reactor → power conversion → shipping → roadmap) in a visually immersive scroll experience.
3. Stand out visually from every other SMR startup website (Kairos, NuScale, TerraPower all use identical corporate photography templates).
4. Convert visitor intent into direct contact via a clear CTA to eduardo@frktlpower.com.
5. Achieve Core Web Vitals green: LCP < 2.5s, CLS < 0.1, INP < 200ms.

**Non-Goals (explicit out-of-scope):**

- No CMS or content management system
- No authentication or gated investor portal
- No API routes or server-side data fetching
- No contact form (mailto link only for v1)
- No multi-page routing (single-page scroll, v1 only)
- No analytics beyond Vercel Analytics
- No video embeds or media hosting

---

## Scope

### In Scope

- Next.js 15 App Router project with Tailwind CSS v4
- Full port of 17 content sections from frktl-explainer.jsx to typed TypeScript data structures
- Port of all 10 SVG illustration components to isolated TypeScript files
- Complete visual redesign: 50s atomic-age editorial + cute 3D isometric + modern grid fusion
- Custom FRKTL wordmark designed as CSS/SVG (no external logo asset)
- Spline 3D isometric hero scene (cute nuclear factory, lazy-loaded)
- Motion (Framer Motion v11+) scroll animations with spring physics, replacing IntersectionObserver
- Responsive sticky header with mobile hamburger navigation
- Fixed dot navigation (desktop) + mobile-friendly alternative
- Stats strip, comparison table, learning curve sections (all ported + redesigned)
- CTA section: "Get in touch" with mailto:eduardo@frktlpower.com
- SEO: metadata, OG image (opengraph-image.tsx), robots.ts, sitemap.ts, JSON-LD Organization schema
- Favicon and apple-touch-icon
- Vercel Analytics integration
- Vercel deployment with frktlpower.com custom domain

### Explicitly Out of Scope

- CMS integration
- Auth / investor portal
- Server actions or API routes
- Multi-page routing (/, /technology, /investors, etc.)
- Contact form with backend
- A/B testing
- Blog or news section
- Localization / i18n

---

## Design Direction

### The "Nuclear Optimism" Visual Language

The FRKTL site fuses three aesthetic registers that coexist without tension. Each layer has a distinct role in the visual system.

#### Layer 1 — 50s Atomic-Age Editorial

**Inspiration:** Life Magazine nuclear feature spreads, U.S. government atomic energy pamphlets (1955), the i Magazine Nuclear Reactor Testing Dribbble shot (dribbble.com/shots/1949351).

**Palette role:** Warm orange (#FF6B35, already in codebase), gold (#FBBF24), cream (#FFF8EE), and rust as accent colors layered over the existing dark navy base (#0A1628). The navy is the "modern" layer; the warm tones are the "50s" layer.

**Typography:** The Atomic Age font (Google Fonts) for chapter markers and decorative section labels. Bebas Neue or bold condensed DM Sans for large editorial pull quotes. The existing Space Mono stays for technical monospace labels and stats values.

**Illustration style:** Section SVGs redesigned with 3–4px stroke width, rounded linecaps, filled color regions (not just outlines). Hand-drawn editorial quality rather than engineering diagram precision.

**Decorative elements:** Atomic starburst shapes (SVG radial lines or CSS clip-path) as section background accents. Halftone dot overlay (CSS radial-gradient repeat) on selected dark sections. "Chapter marker" style for section TAG labels — large, proud, uppercase.

#### Layer 2 — Cute 3D Isometric

**Inspiration:** Nuclear Powerplant Dribbble shot (dribbble.com/shots/2769670), Nuclear Balloons (dribbble.com/shots/13445207), DNA Technology Landing Page 3D Animation (dribbble.com/shots/27262791).

**Hero scene:** A Spline 3D isometric render of a miniature FRKTL nuclear factory complex. Small modular reactor buildings, a tiny delivery truck, a cooling tower with soft puff clouds, workers at human scale relative to the building. "Toy town" aesthetic — everything friendly, nothing ominous. Lazy-loaded via React.lazy + Suspense with a static illustration fallback.

**Visual register:** Low-poly isometric projection. Saturated but soft colors — warm greens, terracotta, powder blue. Rounded forms. The plant looks like it belongs in a well-funded board game, not an industrial site.

**Micro-illustrations:** Small decorative spot illustrations throughout the page: a smiling atom, a friendly TRISO particle, a cooling tower character. These add moments of delight without disrupting technical credibility.

#### Layer 3 — Modern Tech-Startup Grid

**Inspiration:** Innovative technology website — kontlodon (dribbble.com/shots/23238724), Vercel homepage, Linear product page.

**Layout:** Maximum 1100px content width. Strong editorial grid. Generous whitespace. The stats strip uses numbers as heroes at large display scale. The comparison table uses clean borders and subtle tinting.

**Typography at this layer:** DM Sans 700 at large sizes (currently used at moderate size — push to 80–100px for hero). The "numbers as heroes" approach from the kontlodon reference applied to the stats strip (large Space Mono numerals, small DM Sans labels below).

**Motion:** Spring physics on entrance animations (Motion's `type: "spring"` with slight bounce). Current site uses `ease` — upgrading to spring adds cartoon physics delight. Hover states have slight overshoot on scale/lift.

### Wordmark Design Directive

No logo file exists. The wordmark must be designed from scratch as a CSS/SVG asset.

**Direction:** "FRKTL" is deliberately vowel-stripped — industrial, compressed, efficient. The wordmark should feel technical and confident, not playful. 

Options to explore (designer discretion):
- Tight letter-spacing with a custom ligature or connection between R and K
- Atomic starburst or atom orbit mark as a prefix glyph
- The word "FRKTL" in a bold condensed face with a distinctive treatment on the F (referencing "fractal" / fission)
- A monogram hexagonal mark (referencing the prismatic fuel block geometry) placed left of the letterforms

The wordmark must work in: white on dark, orange on dark, and dark on light (for print/documents).

### Color System (CSS Custom Properties)

All existing JS color constants migrate to CSS custom properties on `:root` in globals.css, available as Tailwind v4 theme tokens:

| Token | Value | Role |
|---|---|---|
| --color-teal | #0d7377 | Primary brand |
| --color-teal-light | #14a3a8 | Accent, labels |
| --color-teal-dark | #0a5c5f | Borders, subtle |
| --color-cyan | #00d4aa | Highlights |
| --color-dark | #0a1628 | Page background |
| --color-dark-mid | #0f2035 | Section alternate bg |
| --color-dark-card | #111d30 | Card background |
| --color-slate | #1a2a42 | Borders, dividers |
| --color-text | #c8dce8 | Body text |
| --color-text-bright | #e8f4f8 | Headings |
| --color-orange | #ff6b35 | 50s accent, heat |
| --color-gold | #fbbf24 | Warning, fuel |
| --color-cream | #fff8ee | Editorial warm white |
| --color-steel | #8899aa | Muted text |
| --color-purple | #a78bfa | Quality/licensing |
| --color-green | #34d399 | Success, criticality |

---

## Research Findings

### Codebase Analysis

The source file (`/Users/loko/FRKTL/frktl-explainer.jsx`, 627 lines) is a self-contained React component with zero npm dependencies beyond React. All styling is inline or injected via a `<style>` tag. The file contains: 10 SVG illustration components (lines 20–341), a 17-section content data array (lines 343–430), and the main component (lines 432–627).

**Key technical findings:**

- All colors are module-level JS constants — must migrate to CSS custom properties for Tailwind v4 compatibility.
- Scroll animations use a single IntersectionObserver watching 17 section refs at threshold 0.15. The SVG components receive an `animate: boolean` prop and use CSS opacity transitions + SMIL animations internally.
- SMIL animation types used: `<animate>` (attribute), `<animateTransform>` (rotation), `<animateMotion>` (path-following). All must be preserved after port — do not convert to CSS keyframes.
- Three fonts loaded via `@import` in the style tag: Space Mono, DM Sans, Instrument Serif. Must migrate to `next/font/google` for performance.
- Mobile responsiveness is minimal: a single media query flips content-grid to column layout. All other sizing uses `clamp()`.
- Navigation dots have no keyboard accessibility and no URL hash updating. Must be addressed in the new header/nav task.
- The `activePhase` state in the Roadmap section cycles phases on a 3-second interval — preserve this demo mode behavior.
- A malformed file (`final explainer .jsx` with a trailing space before `.jsx`) reportedly exists in the source directory — do not reference it.

**Three blocks exist outside the sections array** and must be ported separately: Stats Strip (8 stats), Comparison Table (9 rows × 4 columns), Learning Curve (4 cards).

### External Research

- **App Router is correct.** Next.js 15 App Router provides colocated metadata API, RSC for static sections, and file-based OG image generation — all needed for this project.
- **Vercel without static export.** `output: 'export'` disables `next/image` optimization, `next/og`, and Vercel Analytics. Deploy to Vercel without static export; the site is effectively static with zero server-side data fetching.
- **`next/font/google` is critical.** Replacing the `@import` with `next/font/google` self-hosts fonts at build time, eliminating FOIT and CLS. Expected LCP improvement: 200–400ms.
- **Motion `useInView` replaces IntersectionObserver.** The `motion/react` package (v11+) provides `useInView` with `once: true, amount: 0.15` that matches current behavior plus adds spring physics support.
- **Inline SVG is correct for animated illustrations.** SMIL animations do not work in `<img>` src SVGs. All 10 illustration components remain inline JSX.
- **SEO package:** Organization JSON-LD schema, self-referencing canonical, robots.txt allowing all, single-entry sitemap for v1.

### Competitor Differentiation

Kairos Power, NuScale, and TerraPower all use identical corporate photography templates — clean blue/white palettes, CAD renders, conservative typography. FRKTL's "Nuclear Optimism" visual language is a deliberate departure: warm palette, editorial typography, playful illustration, 3D cute hero. This is the visual differentiator that makes the site memorable to investors and press.

---

## Task Descriptions and Acceptance Criteria

### T01 — Scaffold Next.js 15 + Tailwind v4 + Project Foundation
**Complexity:** 2 | **Priority:** Must | **Wave:** 1

Initialize the Next.js 15 App Router project at `/Users/loko/frktl-web` with TypeScript, Tailwind CSS v4, and the complete project directory structure. Configure `next.config.ts`, `tsconfig.json`, `.eslintrc.json`, and `globals.css` (with Tailwind v4 CSS-first import and CSS custom property tokens). Set up `app/layout.tsx` with placeholder metadata and font imports. Create directory structure: `app/`, `components/sections/`, `components/illustrations/`, `components/ui/`, `data/`, `lib/`, `public/`.

**Acceptance Criteria:**
- `npm run dev` starts without errors
- `npm run build` completes without errors
- Tailwind v4 utility classes apply correctly to a test element
- All 19 CSS custom property color tokens declared on `:root` in `globals.css` (16 brand + 3 atomic-age)
- Directory structure exists: `app/`, `components/sections/`, `components/illustrations/`, `components/ui/`, `data/`, `lib/`, `public/`, `types/`
- `tsconfig.json` has `strict: true` and path aliases configured (`@/` → root)
- `.eslintrc.json` uses `eslint-config-next` ruleset

---

### T02 — Port Explainer Content to TypeScript
**Complexity:** 3 | **Priority:** Must | **Wave:** 2 | **Depends on:** T01

Extract the `sections` data array, stats strip data, comparison table rows, and learning curve cards from `frktl-explainer.jsx` into typed TypeScript data files. Define strict TypeScript interfaces for all data shapes. Migrate the 16 color constants to CSS custom properties (already declared in T01's globals.css) and create a `lib/tokens.ts` file that exports the token names as typed constants for use in JSX (avoids magic strings).

**Acceptance Criteria:**
- `data/sections.ts` exports a typed `Section[]` array with all 17 sections, preserving all content (id, tag, accent, visual, title, body)
- `data/stats.ts` exports the 8 stats as a typed `Stat[]` array
- `data/comparison.ts` exports the 9-row × 4-column comparison table as typed data
- `data/learningCurve.ts` exports the 4-card learning curve as typed data
- `lib/tokens.ts` exports typed CSS variable name constants (e.g., `TOKENS.teal = 'var(--color-teal)'`)
- All TypeScript interfaces are in `types/index.ts`, exported for use across components
- Zero `any` types; `tsc --noEmit` passes

---

### T03 — Port All 10 SVG Components to Isolated TypeScript Files
**Complexity:** 2 | **Priority:** Must | **Wave:** 2 | **Depends on:** T01

Extract each of the 10 SVG illustration components from the monolithic `frktl-explainer.jsx` into individual TypeScript files under `components/illustrations/`. Each component must accept the `animate: boolean` prop (matching the source), use CSS custom properties instead of inline JS color constants, and preserve all SMIL animations exactly. Add proper TypeScript interfaces and `aria-hidden="true"` accessibility attributes.

**Components to port:**
1. `TrisoParticleSVG.tsx` — 5 concentric circles, kernel pulse SMIL, opacity stagger
2. `PrismaticBlockSVG.tsx` — hex polygon, 26 circles, channel glow SMIL
3. `ReactorCoreSVG.tsx` — 15 fuel rects, coolant lines, opacity stagger
4. `SCO2CycleSVG.tsx` — 7 component boxes, turbine rotate SMIL, animateMotion particle
5. `FactoryLineSVG.tsx` — 6 stations, dash march SMIL, animateMotion module
6. `ModularShippingSVG.tsx` — 5 rect rows, opacity stagger
7. `QualitySVG.tsx` — 6 cards, bar fill SMIL
8. `RoadmapTimelineSVG.tsx` — spine + 5 nodes, pulse ring SMIL, accepts `activePhase: number` prop
9. `TestingPipelineSVG.tsx` — 5 stage cards, connecting dashes SMIL
10. `FacilityMapSVG.tsx` — 6 site pins, HQ pulse SMIL

**Acceptance Criteria:**
- Each SVG component renders in isolation without errors
- All SMIL animations preserved and functional
- `animate={false}` shows opacity-0 / static state; `animate={true}` triggers all transitions
- `RoadmapTimelineSVG` correctly highlights the phase specified by `activePhase` prop
- Inline JS color references replaced with CSS custom property values
- `aria-hidden="true"` on each SVG root element
- Each file is under 200 lines (split further if needed)

---

### T04 — Metadata, OG Image, robots.ts, sitemap.ts, Favicon, JSON-LD
**Complexity:** 2 | **Priority:** Must | **Wave:** 2 | **Depends on:** T01

Implement full SEO and metadata infrastructure using Next.js App Router APIs. Generate a static OG image using `next/og`. Add JSON-LD Organization schema. Create favicon and apple-touch-icon assets.

**Acceptance Criteria:**
- `app/layout.tsx` exports a complete `Metadata` object:
  - `title: "FRKTL Energy — Modular Nuclear Reactor | HTGR Technology"`
  - `description`: ~155 chars including "modular nuclear", "HTGR", "sCO₂ Brayton"
  - `openGraph`: title, description, url (`https://frktlpower.com`), type `website`, image reference
  - `twitter`: card `summary_large_image`, title, description
  - `canonical`: `https://frktlpower.com`
- `app/opengraph-image.tsx` generates 1200×630 OG image with FRKTL branding using `ImageResponse`
- `app/robots.ts` returns: `{ rules: { userAgent: '*', allow: '/' }, sitemap: 'https://frktlpower.com/sitemap.xml' }`
- `app/sitemap.ts` returns single entry for `/` with `lastModified: new Date()`
- `app/layout.tsx` includes a JSON-LD `<script type="application/ld+json">` block with Organization schema (name, url, sameAs)
- `public/favicon.ico` (32×32) present
- `public/apple-touch-icon.png` (180×180) present
- `<html lang="en">` set in root layout

---

### T05 — FRKTL Wordmark — Custom CSS/SVG Logotype
**Complexity:** 2 | **Priority:** Must | **Wave:** 2 | **Depends on:** T01

Design and implement a custom FRKTL wordmark as an SVG component. No external logo asset exists — this is a greenfield design task. The wordmark must convey industrial confidence, vowel-stripped compression, and subtle nuclear/energy references without being literal. Implement as a React component (`components/ui/FRKTLWordmark.tsx`) that accepts `color` and `size` props.

**Design direction (all approaches valid — designer has latitude):**
- Tight letter-spacing, bold condensed face, possible custom ligature at R-K junction
- Possible atom orbit or starburst glyph as prefix mark
- Hexagonal accent element referencing the prismatic fuel block geometry
- Optional: underline treatment with energy/wave motif

**Required variants (all in one component via props):**
- White on transparent (default — for dark backgrounds)
- Orange on transparent (accent variant — for editorial chapter markers)
- Dark on transparent (for light backgrounds / print)

**Acceptance Criteria:**
- `<FRKTLWordmark />` renders without external font dependency (all paths/shapes inline in SVG)
- Scales cleanly from 80px wide to 240px wide without pixelation
- Three color variants work via `variant="light" | "orange" | "dark"` prop
- No external assets referenced (self-contained SVG paths)
- Wordmark is distinctive enough to read as a logo, not just text
- Works on the dark navy background and passes 4.5:1 contrast in white variant

---

### T06 — Responsive Sticky Header + Mobile Nav
**Complexity:** 2 | **Priority:** Must | **Wave:** 3 | **Depends on:** T02, T05

Build a sticky header component that uses the FRKTL wordmark and provides navigation for both desktop and mobile. Desktop: sticky header with wordmark left + fixed dot navigation on right side of viewport. Mobile: sticky header with wordmark + hamburger button that opens a full-screen slide-down nav menu. The dot navigation must be accessible (keyboard navigable, ARIA labels).

**Acceptance Criteria:**
- `components/ui/Header.tsx` renders the wordmark and navigation
- Header is `position: sticky; top: 0` with `z-index` above all content sections
- Desktop dot navigation: 17 dots, one per section, highlights the active section as user scrolls
- Dot navigation uses `aria-label` with section title on each dot
- Dot click calls `scrollIntoView({ behavior: 'smooth' })` on the corresponding section
- Keyboard navigation: dots are focusable, Enter/Space activates
- Mobile (< 768px): dot nav hidden, hamburger button visible in header
- Mobile nav menu: full-screen overlay, lists all 17 sections as links, closes on selection or Esc key
- Header background transitions from transparent to `--color-dark/90` with backdrop blur on scroll
- `useActiveSection` hook tracks active section and updates dot highlight

---

### T07 — Replace IntersectionObserver with Motion Scroll Animations + Spring Physics
**Complexity:** 2 | **Priority:** Must | **Wave:** 3 | **Depends on:** T02, T03

Replace the existing IntersectionObserver + CSS class toggle scroll animation system with Motion (`motion/react` v11+) `useInView` and `motion.div` wrappers. Upgrade entrance animations from linear `ease` to spring physics with slight bounce. Add scroll-linked parallax to the hero section. Preserve the one-shot trigger behavior (`once: true`).

**Acceptance Criteria:**
- `motion/react` installed and `package.json` updated
- All 17 section entrance animations use `motion.div` with `useInView({ once: true, amount: 0.15 })`
- Entrance animation: `initial={{ opacity: 0, y: 60 }}` → `animate={{ opacity: 1, y: 0 }}` with `transition={{ type: 'spring', stiffness: 100, damping: 20 }}`
- SVG components still receive `animate: boolean` prop — the Motion wrapper sets this when in view
- Staggered child animations use `variants` with `staggerChildren: 0.08`
- Hero section has a subtle parallax: hero background or floating element moves at 0.3× scroll speed using `useScroll` + `useTransform`
- `activePhase` roadmap cycling (3-second interval) is preserved
- No IntersectionObserver calls remain in the codebase
- Lighthouse performance score not degraded (Motion tree-shakes well)

---

### T08 — Visual Redesign: 50s Atomic-Age Layer
**Complexity:** 5 | **Priority:** Must | **Wave:** 3 | **Depends on:** T02, T03, T05

This is the central design task. Apply the full "Nuclear Optimism" visual language across the entire page. Three sub-layers:

**8a. Typography upgrades:**
- Add Atomic Age font via `next/font/google` for chapter section TAG markers
- Push hero headline to 80–100px desktop, `clamp(48px, 8vw, 100px)`
- Section TAG labels redesigned as large editorial chapter markers (Atomic Age or Bebas Neue, orange/cream color)
- Stats strip: large Space Mono numerals at 64px+ with small DM Sans labels below

**8b. Decorative system:**
- Atomic starburst SVG component (`components/ui/AtomicStarburst.tsx`): configurable points, colors, used as section background accents
- Halftone CSS overlay pattern: subtle dot grid on alternating dark sections
- Boomerang/amoeba `border-radius` blob shapes as card backgrounds on learning curve section
- "DANGER tape" diagonal stripe component for the safety comparison section

**8c. SVG illustration redesign:**
- Redesign all 10 SVG components with 3–4px stroke width, rounded linecaps, filled color regions
- Replace thin technical lines with bold, editorial illustration style
- Add warm color fills (orange, gold, cream) to key illustration elements
- Preserve all SMIL animation logic — only visual style changes

**Acceptance Criteria:**
- Atomic Age font renders on all 17 section TAG labels
- Hero headline is visually dominant at 80px+ on desktop
- AtomicStarburst component renders in at least 3 section backgrounds
- Halftone overlay visible on at least 2 alternating sections (non-destructive, low opacity)
- All 10 SVG illustrations have stroke-width >= 3, rounded linecaps, and at least one filled color region per illustration
- Learning curve cards have blob/amoeba border-radius treatment
- Safety section has diagonal stripe background element
- Stats strip numerals are 64px+ with clear label hierarchy below

---

### T09 — Spline 3D Isometric Hero Scene
**Complexity:** 4 | **Priority:** Must | **Wave:** 2 | **Depends on:** T01

Create or integrate a Spline 3D isometric hero scene featuring a miniature FRKTL nuclear factory complex. The scene should feel like a friendly toy model: small modular reactor buildings, a delivery truck, a cooling tower with puffy cloud smoke, tiny human-scale workers. Warm greens, terracotta, powder blue palette. Lazy-load via `React.lazy` + `Suspense` with a static SVG illustration fallback while loading.

**Scene elements (minimum):**
- 1–2 modular reactor building blocks (isometric)
- 1 cooling tower with smoke puff
- 1 delivery truck or flatbed trailer
- Ground plane with subtle green/grass texture
- Soft ambient lighting — golden hour feel

**Acceptance Criteria:**
- `components/HeroScene.tsx` wraps the Spline scene in `React.lazy` + `Suspense`
- Fallback: a static SVG isometric illustration renders immediately while Spline loads
- Scene is fully loaded only when user is above the fold (intersection observer or eager load with low priority)
- Scene does not block LCP — fallback SVG is the LCP target
- Scene renders on Chrome, Safari, Firefox without WebGL errors
- On mobile (< 768px): scene is either simplified or replaced with the static fallback (Spline is heavy on mobile GPU)
- `@splinetool/react-spline` added to package.json
- Hero section height: 100dvh, scene fills available space with `object-fit: contain` behavior

---

### T10 — CTA Section
**Complexity:** 1 | **Priority:** Must | **Wave:** 3 | **Depends on:** T02

Build the "Get in touch" CTA section at the bottom of the page, before the footer. Investor-pitch context text, primary CTA mailto link. Editorial design consistent with the 50s atomic layer.

**Section copy (production-ready):**
- Eyebrow: "READY TO POWER THE FUTURE?"
- Headline: "Get in touch."
- Body: "FRKTL is building the modular nuclear reactor that data centers, the DoD, and remote industrial customers have been waiting for. If you're an investor, partner, or potential customer — we want to hear from you."
- CTA button: "Contact Eduardo" → `mailto:eduardo@frktlpower.com`
- Secondary line: "Or email directly: eduardo@frktlpower.com" (plain text link)

**Acceptance Criteria:**
- `components/sections/CTASection.tsx` renders as the penultimate section (before footer)
- CTA button uses `<a href="mailto:eduardo@frktlpower.com">` — no JavaScript email obfuscation
- Section uses the warm orange/cream editorial palette (distinct from the dark navy sections)
- Atomic starburst decoration present in section background
- Section is accessible: heading hierarchy correct (h2), button has descriptive label
- On mobile: single column, button full-width

---

### T11 — Vercel Analytics + Vercel Deploy + frktlpower.com Custom Domain
**Complexity:** 2 | **Priority:** Must | **Wave:** 4 | **Depends on:** T01–T10

Deploy the completed site to Vercel, connect the frktlpower.com custom domain, and enable Vercel Analytics. Configure environment and build settings. Verify Core Web Vitals pass in Vercel's Speed Insights dashboard.

**Acceptance Criteria:**
- `@vercel/analytics` installed and `<Analytics />` component added to `app/layout.tsx`
- `vercel.json` present (if any custom headers/rewrites needed)
- Site deploys successfully from `main` branch via Vercel GitHub integration
- frktlpower.com and www.frktlpower.com both route to the Vercel deployment
- HTTPS: automatic, verified green in browser
- Vercel Speed Insights shows LCP < 2.5s on the production URL
- `npm run build` output has no warnings about missing env vars
- OG image verified working via opengraph.xyz or similar checker
- robots.txt accessible at `https://frktlpower.com/robots.txt`
- sitemap.xml accessible at `https://frktlpower.com/sitemap.xml`

---

## Dependency Graph

```
T01 (Scaffold)
  ├── T02 (Content Port)       ──────────────────┐
  ├── T03 (SVG Components)     ──────────────────┤
  ├── T04 (SEO/Metadata)       ─────────────────┐│
  ├── T05 (Wordmark)           ──────────────┐  ││
  └── T09 (Spline Hero)        ─────────┐   │  ││
                                        │   │  ││
T05 + T02 ──────────────────────────────┼───┘  ││
  └── T06 (Header/Nav)                  │      ││
                                        │      ││
T02 + T03 ──────────────────────────────┼──────┘│
  ├── T07 (Motion Animations)           │       │
  ├── T08 (Visual Redesign)             │       │
  └── T10 (CTA Section)                 │       │
                                        │       │
T09 ────────────────────────────────────┘       │
T04 ────────────────────────────────────────────┘
                                        │
All T01–T10 ────────────────────────────┘
  └── T11 (Deploy)
```

**Wave Summary:**
- Wave 1: T01
- Wave 2: T02, T03, T04, T05, T09 (parallel)
- Wave 3: T06, T07, T08, T10 (parallel)
- Wave 4: T11

---

## Risks

### R01 — Spline Scene Requires Design Time (High)
The Spline 3D hero scene (T09) requires either original 3D modeling in Spline or sourcing a suitable pre-built isometric nuclear scene. If no suitable Spline scene is available, the task degrades to a high-quality static SVG isometric illustration — still valuable but not 3D. Mitigation: design the static SVG fallback first; the Spline integration is additive.

### R02 — Wordmark Design is Subjective (Medium)
The custom wordmark (T05) has no existing design brief, no brand standards, and no external designer. The agent executing T05 must make aesthetic judgments. The acceptance criteria are functional (renders, scales, has variants) but the quality of the design is inherently subjective. Mitigation: document multiple design approaches in the SVG source, build in a human review gate after T05 completes.

### R03 — SVG Redesign Scope is Large (Medium)
T08 requires redesigning all 10 SVG illustrations with the 50s editorial style while preserving all SMIL animation logic. This is the highest-complexity task (complexity 5) and involves visual design judgment alongside code. Risk: the redesigned illustrations may lose the technical clarity of the originals. Mitigation: keep the original component files alongside redesigned versions during development; switch via a feature flag or prop.

### R04 — No Logo Asset (Low, already mitigated)
The site has no existing logo. This is mitigated by T05 creating a custom wordmark. Risk is low because the project explicitly scopes the wordmark as a deliverable.

### R05 — Vercel Free Tier Limits (Low)
If the Spline scene or OG image generation causes large function execution times, the site may hit Vercel's free tier limits. Mitigation: the site has zero server-side data fetching; only OG image generation uses a function, and it executes once at build time with `generateStaticParams`.

---

## Open Questions

1. Does Eduardo have access to a Spline account for T09? If not, should we use a third-party 3D asset or design a static SVG isometric scene?
2. Is there a preferred font for the wordmark letterforms in T05, or is the agent free to choose from Google Fonts?
3. For the comparison table (ported in T02, redesigned in T08): should the table include a "vs. SMR competitors" column, or keep the existing FRKTL / LWR / Solar+Battery comparison?
4. Domain registrar: where is frktlpower.com registered? DNS access will be needed for T11.
