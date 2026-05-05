# Internal Research: Component Patterns
## Source: /Users/loko/FRKTL/frktl-explainer.jsx

---

## 1. Color Token Constants

All colors are declared as module-level `const` strings at the top of the file (lines 3–18). There is no CSS custom property or theme system — colors are JS values referenced inline. Palette:

| Token | Value | Role |
|---|---|---|
| TEAL | #0d7377 | Primary brand |
| TEAL_LIGHT | #14a3a8 | Accent, labels |
| TEAL_DARK | #0a5c5f | Borders, subtle |
| CYAN | #00d4aa | Highlights, CTA-like |
| DARK | #0a1628 | Page background |
| DARK_MID | #0f2035 | Section alternate bg |
| DARK_CARD | #111d30 | Card background |
| SLATE | #1a2a42 | Borders, dividers |
| TEXT | #c8dce8 | Body text |
| TEXT_BRIGHT | #e8f4f8 | Headings |
| ORANGE | #ff6b35 | Heat/danger emphasis |
| GOLD | #fbbf24 | Warning / fuel |
| STEEL | #8899aa | Muted text |
| PURPLE | #a78bfa | Quality/licensing |
| GREEN | #34d399 | Success / criticality |
| RED_SOFT | #f87171 | Declared but unused |

**Pattern implication for Next.js:** These constants should become CSS custom properties in a `:root` block (or Tailwind v4 theme tokens), enabling runtime theming and eliminating inline-style dependency on JS variable references.

---

## 2. IntersectionObserver Scroll Animation Pattern

The main component (`FRKTLExplainer`) sets up a single `IntersectionObserver` in `useEffect` that watches all section DOM nodes via `sectionRefs.current`:

```
threshold: 0.15  — fires when 15% of section is visible
```

On intersection:
- Sets `isVisible[idx] = true` (sticky — never resets to false)
- Sets `activeSection` to current idx (for nav dot highlight)

Each section root element carries `className="section-enter"` which transitions to `section-visible` when `isVisible[idx]` is truthy. The CSS classes are injected via a `<style>` tag inside the component:

```css
.section-enter { opacity: 0; transform: translateY(50px); transition: opacity 0.8s ease, transform 0.8s ease; }
.section-visible { opacity: 1; transform: translateY(0); }
```

**Each SVG child** receives `animate={vis}` prop (where `vis = isVisible[idx]`). The SVG components use the `animate` boolean to:
- Toggle opacity from 0.15/0.2/0.3 to 1 with staggered CSS transitions (`transition: opacity 0.5s ease ${i * 0.12}s`)
- Conditionally render SVG `<animate>` elements (SMIL animations) that only exist when `animate` is true

**Pattern note:** This creates a one-shot entrance animation — elements appear once when scrolled into view and stay visible. The SMIL animations (`<animate>`, `<animateTransform>`, `<animateMotion>`) loop continuously once triggered.

---

## 3. SVG Animation Techniques Used

Three distinct animation approaches coexist:

### 3a. CSS Transition (opacity/transform) on SVG elements
```jsx
<circle ... opacity={animate ? 1 : 0.3} style={{ transition: "opacity 0.6s ease 0.5s" }} />
```
Used in: TrisoParticleSVG, PrismaticBlockSVG, ReactorCoreSVG, ModularShippingSVG, QualitySVG, RoadmapTimelineSVG, TestingPipelineSVG, FacilityMapSVG, FactoryLineSVG.

### 3b. SMIL `<animate>` (attribute animation loops)
```jsx
<animate attributeName="r" values="35;37;35" dur="2s" repeatCount="indefinite" />
<animate attributeName="stroke-dashoffset" values="0;-18" dur="0.8s" repeatCount="indefinite" />
```
Used for: UCO kernel pulse, dashed-line conveyor, dashboard offset marching ants effect.

### 3c. SMIL `<animateTransform>` (rotation)
```jsx
<animateTransform attributeName="transform" type="rotate" values="0 220 55;360 220 55" dur="1s" repeatCount="indefinite" />
```
Used in: SCO2CycleSVG turbine spinning circle.

### 3d. SMIL `<animateMotion>` (path-following movement)
```jsx
<circle r="4" fill={ORANGE}><animateMotion dur="4s" repeatCount="indefinite" path="M 65 75 L ..." /></circle>
```
Used in: SCO2CycleSVG (flowing sCO₂ particle), FactoryLineSVG (moving module block along conveyor).

### 3e. CSS keyframe animations (global style tag)
```css
@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
```
Used on: hero "SCROLL" indicator (pulse), hero FRKTL logo circle (float).

---

## 4. Section Data Array Pattern

All content sections are encoded in a flat `sections` array (lines 344–430) with shape:
```js
{
  id: string,        // anchor / key
  tag: string,       // uppercase monospace label
  accent: COLOR,     // per-section accent color
  visual: string|null, // maps to SVG component name
  title: string,
  body: string,      // multi-paragraph, uses \n\n separators
}
```

The render loop at line 504 maps this array to JSX. Visual selection is done via string-matching switch:
```jsx
{section.visual === "triso" && <TrisoParticleSVG animate={vis} />}
{section.visual === "block" && <PrismaticBlockSVG animate={vis} />}
// ... etc
```

**Pattern implication:** This is well-suited for a Next.js `page.tsx` — the array can move to a `data/sections.ts` file and be imported. Each section could become its own component in a `sections/` directory for code splitting and easier isolated redesign.

---

## 5. Navigation Pattern

Fixed right-side dot navigation (`position: fixed; right: 12px; top: 50%`). Dots are rendered from the `sections` array and use `activeSection` state for the `.active` class. Click handler calls `sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" })`. No URL hash updating. No keyboard accessibility. No mobile treatment.

---

## 6. Responsive Design Pattern

Very minimal responsiveness. A single media query in the style tag:
```css
@media (max-width: 768px) {
  .content-grid { flex-direction: column !important; }
  .visual-col { order: -1 !important; margin-bottom: 24px !important; }
}
```

All other sizing uses `clamp()` for font-size:
```jsx
fontSize: "clamp(32px, 5.5vw, 60px)"
fontSize: "clamp(22px, 3.2vw, 34px)"
```

No mobile navigation. Fixed nav dots persist on mobile (right: 12px). The stats grid and learning curve grid use `repeat(auto-fit, minmax(..., 1fr))`. Otherwise all layout is inline flexbox/grid.

---

## 7. Font Loading Pattern

Fonts are loaded via a `@import` inside the `<style>` tag in the component (line 466):
```
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif&display=swap');
```

Three typefaces:
- **Space Mono** (400, 700) — mono labels, nav, stats values
- **DM Sans** (400, 500, 600, 700) — body text, section titles
- **Instrument Serif** — hero headline only

The `fontFamily` fallback in the root `<div>` is `'Söhne', 'Helvetica Neue', Helvetica, sans-serif` — Söhne is a paid font not declared in the import. This will silently fall back to Helvetica Neue in most environments.

---

## 8. Roadmap Phase Cycling Pattern

An `activePhase` state cycles 0→4 on a 3-second interval via `setInterval` in `useEffect`. This drives the `RoadmapTimelineSVG` component to highlight different phases with a pulse animation. This is a "demo mode" for when users don't scroll through each phase individually.

---

## 9. Out-of-Band Sections

Three content blocks exist outside the `sections` array, rendered after the section loop:

1. **Stats Strip** (lines 537–557) — 8-stat grid with monospace values, teal/cyan color coding
2. **Comparison Table** (lines 559–590) — FRKTL HTGR vs Traditional LWR vs Solar+Battery across 9 dimensions
3. **Learning Curve** (lines 592–615) — 4-card grid: Unit 1-2 / Unit 3-10 / Unit 11-50 / Unit 50+
4. **Footer** (lines 617–624) — FRKTL logo mark + tagline

These are purely inline JSX, no data array driving them. The comparison table uses hardcoded rows.
