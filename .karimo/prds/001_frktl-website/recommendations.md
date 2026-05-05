# Brief Review: frktl-website

Reviewed all 11 task briefs against the PRD, tasks.yaml, config.yaml, and the source file at `/Users/loko/FRKTL/frktl-explainer.jsx`.

---

## Critical Issues

**[C1] config.yaml contradicts T01 and every brief on static export**

`config.yaml` line 45–46 says `strategy: "static_export"` and recommends `output='export'`. Every brief (especially T01) explicitly says the opposite — do NOT use `output: 'export'` because it disables `next/og`, `next/image`, and Vercel Analytics. The briefs are technically correct. The config is wrong. If any orchestrator reads `config.yaml`'s deployment strategy field, it could override what the briefs correctly specify. The config note must be corrected to match the briefs.

Fix: In `config.yaml`, change `strategy: "static_export"` to `strategy: "vercel_ssr"` and update the notes field to match the rationale in T01.

---

**[C2] T04 and T08 both modify `app/layout.tsx` in the same wave — and T08 is in Wave 3 while T04 is in Wave 2, creating a merge conflict risk**

T04 (Wave 2) creates the full `app/layout.tsx` with three fonts. T08 (Wave 3) adds Atomic Age as a fourth font to that same file. This sequencing is correct (T08 runs after T04). However, T04's brief says to leave a comment `{/* T08: Add Atomic Age font here */}` as a coordination marker — that comment is the only thing preventing T08 from clobbering T04's work. This is not a wave-ordering bug but the coordination mechanism is fragile. Flag so the executor is careful.

No fix required on the brief itself, but note it. This is a Warning, not Critical — moving to W1.

---

**[C3] T07 `HeroSection.tsx` code sample uses an invalid `css` prop**

T07 brief line 167 contains `css={{ background: "...", opacity: 0.08, ... }}` on a `motion.div`. The `css` prop is not a valid React/Next.js prop — it is a styled-components/Emotion convention. Standard React/Next.js with Tailwind uses `style={{}}` or className. If an agent copies this code verbatim it will produce a TypeScript error and likely fail `tsc --noEmit`. The styles should be in a `style={{}}` prop or a className.

Fix: In T07.md, change the `css={{ ... }}` prop on the `motion.div` to `style={{ background: "...", opacity: 0.08, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}`.

---

**[C4] T10 `whileHover={{ scale: 1.04, brightness: 1.1 }}` — `brightness` is not a valid Motion animation prop**

T10 brief line 133 uses `brightness: 1.1` inside Motion's `whileHover`. Motion animates CSS transform-like values and SVG properties, not CSS filter functions like `brightness`. This will be silently ignored at best, or cause a TypeScript error at worst. The intent (brightness on hover) requires a CSS filter, not a Motion prop.

Fix: In T10.md, remove `brightness: 1.1` from the `whileHover` object. To achieve brightness increase on hover, add a `style={{ transition: "filter 0.2s" }}` prop and use a CSS class with `hover:brightness-110` (Tailwind), or apply `filter: brightness(1.1)` inside the existing `transition` style property.

---

**[C5] T01 acceptance criteria says "16 original color tokens" but the `globals.css` spec in the same brief declares 19 tokens (16 brand + 3 atomic-age)**

T01 acceptance criteria line 244 says "All 16 original color tokens declared on `:root` in `globals.css` (plus the 3 atomic-age tokens = 19 total)" — this is self-consistent within T01's brief. However, `tasks.yaml` line 36 says "All 16 CSS custom property color tokens declared on :root" with no mention of the 3 atomic-age extras. If T01 is validated against `tasks.yaml`'s criteria, the 3 atomic-age tokens may be considered out-of-scope and omitted, which would break T08's dependency on `--color-atomic-orange`, `--color-atomic-cream`, and `--color-atomic-rust`.

Fix: Update `tasks.yaml` T01 acceptance criteria to say "All 19 CSS custom property color tokens declared on :root (16 brand + 3 atomic-age)".

Note: The `--color-cream` token is declared in `globals.css` (T01 brief) but `CREAM` does NOT exist as a JS constant in the source `frktl-explainer.jsx`. This is fine — the token is new — but the T02 brief (lines 26–44) implies all 16 tokens map to source JS constants. The discrepancy is low-risk because T02 only references the constants that exist, but `--color-cream` was not ported from source — it was designed into the system from scratch. No action needed, observation only.

---

**[C6] T01 acceptance criteria references `/research/internal/dependencies.md` which does not exist**

T01 brief line 245 says "Directory structure matches the plan in `/research/internal/dependencies.md`". The PRD's task descriptions reference a `dependencies.md` but no such file exists anywhere in the project. The executor will be unable to validate this criterion.

Fix: In T01.md, change the acceptance criterion to remove the reference to `/research/internal/dependencies.md` and replace with the explicit directory list already in the brief (the tree shown in Step 10).

---

## Warnings

**[W1] T04 and T08 concurrent modification of `app/layout.tsx` — coordination comment is the only safeguard**

As noted above, T04 creates `app/layout.tsx` in Wave 2 and T08 modifies it in Wave 3 to add Atomic Age font. T04's brief instructs the executor to leave `{/* T08: Add Atomic Age font here */}` as a marker. If T08's executor misses this, it risks rewriting the font section from T04. The brief should be more explicit: T08 should be told exactly which line to insert the new font import after (after `Instrument_Serif` import and before the `metadata` export).

---

**[W2] T06 uses `lg:` breakpoint (1024px) but the spec says "< 768px" for mobile — these are different breakpoints**

T06 brief says mobile nav is for "< 768px" (line 11, 305, 342) but the actual Tailwind classes used are `lg:hidden` (hides above 1024px) and `hidden lg:flex` (shows above 1024px). In Tailwind v4, `lg:` = 1024px and `md:` = 768px. The spec text says 768px but the code implements 1024px. This means on tablets (768–1023px), the dot nav is hidden but the hamburger would show — which may or may not be the desired behavior.

No critical failure here, but the acceptance criteria claim "hidden on mobile (< 768px = `lg:hidden` → `lg:flex`)" is technically wrong — `lg:` is 1024px, not 768px. The code as written works fine but the comment in the acceptance criteria is misleading. Whoever QAs this should know 768px is wrong; 1024px is what the code produces.

---

**[W3] T09 `HeroScene.tsx` includes a JS `isMobile()` check that always returns `false` during SSR**

T09 brief lines 188–195 show `isMobile()` which guards with `typeof window === "undefined"` but the result of this check is used immediately during the first render. Since `HeroScene` is a `"use client"` component, the first render on the server will always set `useFallback = false`, meaning Spline could be instantiated. The brief acknowledges this and provides the preferred CSS media query approach (lines 222–235) — but it lists the JS approach first. An agent may choose the wrong option.

The brief should explicitly mark the JS approach as "do not use" rather than listing it as the primary option.

---

**[W4] T07 and T09 both contribute to `HeroSection.tsx` but T09 is in Wave 2 and T07 is in Wave 3 — no integration spec**

T07 creates `HeroSection.tsx` as a parallax shell (Wave 3). T09 creates `HeroScene.tsx` as the Spline component (Wave 2). T09's brief says "T07's `HeroSection.tsx` imports `<HeroScene />`" — but T09 runs before T07. The integration wiring (importing HeroScene into HeroSection) is described in T09's context but T07 is the task that actually creates HeroSection. Neither brief clearly owns the `import { HeroScene }` statement in HeroSection.tsx. This risks the import being forgotten or done twice.

Fix: Add an explicit line to T07 brief's HeroSection.tsx spec: "Import `HeroScene` from `@/components/HeroScene` and render it in the background layer as shown in T09's integration snippet."

---

**[W5] T10 imports `AtomicStarburst` from T08, but T10 and T08 are both Wave 3 tasks running in parallel**

T10 depends on T02 (per `tasks.yaml`) but its code directly imports `AtomicStarburst` from T08's output file. T08 and T10 run in the same wave. The brief notes this with a "soft dependency" caveat and provides a fallback. This is handled appropriately in the brief's dependency section. However, the hard import at line 43 (`import { AtomicStarburst } from "@/components/ui/AtomicStarburst"`) will cause a TypeScript compilation error if T10 runs before T08.

The brief's guidance (skip or use conditional) is sound but the code sample contradicts it by having an unconditional import. Fix the code sample in T10 to use a conditional import pattern or move `AtomicStarburst` creation to Wave 2.

---

**[W6] T03 SVG components have `aria-hidden="true"` AND `role="img"` simultaneously — this is semantically contradictory**

T03 brief lines 126–127 and the acceptance criteria specify both `aria-hidden="true"` and `role="img"` on every SVG root. `aria-hidden="true"` removes the element from the accessibility tree entirely; `role="img"` adds it back as an image role. These contradict each other — the last attribute wins in most implementations, making `role="img"` effectively useless. For purely decorative illustrations, `aria-hidden="true"` alone is correct. Remove `role="img"` from T03's spec.

---

**[W7] No task is clearly responsible for assembling `app/page.tsx` into the final single-page layout**

`app/page.tsx` is listed as a T01 output (placeholder). T06 says "add `<Header />` to `app/page.tsx`". T10 says "`CTASection` must render as the penultimate section in `app/page.tsx`". T08 creates all section components but doesn't explicitly say it assembles them in page.tsx. T07 creates `SectionWrapper` and `HeroSection` but doesn't assemble either.

There is no task that explicitly owns final assembly of page.tsx — the full component composition (Header + HeroSection + 17 SectionWrapper'd sections + StatsStrip + ComparisonTable + LearningCurve + CTASection + Footer). This could result in only the last task to touch page.tsx having assembled it partially.

Recommend assigning final page.tsx assembly ownership to T08 (as the most comprehensive Wave 3 task) or adding it explicitly to T10's integration step since T10 already specifies the page order.

---

## Observations

**[O1] `CREAM` color token is new — not ported from source**

The source `frktl-explainer.jsx` has 16 JS color constants (lines 3–18): `TEAL`, `TEAL_LIGHT`, `TEAL_DARK`, `CYAN`, `DARK`, `DARK_MID`, `DARK_CARD`, `SLATE`, `TEXT`, `TEXT_BRIGHT`, `ORANGE`, `GOLD`, `STEEL`, `PURPLE`, `GREEN`, `RED_SOFT`. There is no `CREAM` constant in the source. The `--color-cream: #fff8ee` token is a new addition in the design system. T02's brief mentions "16 color constants" from the source but adds `cream` to `lib/tokens.ts` as a 17th (pre-atomic-age) entry. This is intentional and consistent, just worth noting.

---

**[O2] Source file `frktl-explainer.jsx` is confirmed at 627 lines — matches PRD claim**

Verified. The file exists at `/Users/loko/FRKTL/frktl-explainer.jsx`, exactly 627 lines. The section IDs listed in T02 (`intro`, `fuel`, `compact`, `reactor`, `sco2`, `output`, `shipping`, `production`, `quality`, `roadmap`, `phase1`, `phase2`, `phase3`, `phase4`, `phase5`, `safety`, `why`) match the source exactly — 17 sections confirmed.

---

**[O3] `@splinetool/react-spline/next` import path in T09 requires the `/next` subpackage export**

T09 uses `import("@splinetool/react-spline/next")` (the Next.js-specific export from the package). This subpath export exists in the package and is the correct choice for Next.js App Router. Just flagging that the executor should confirm the installed package version supports this subpath.

---

**[O4] Wave 3 has the highest risk of file conflicts — T07, T08, and T09 all touch HeroSection.tsx**

T07 creates it, T08 fills in its content, T09's scene is integrated into it. All three are Wave 3. If these run in strict parallel, the last writer wins and overwrites the others. In practice an orchestrator should sequence these even within the wave, but the briefs don't make this clear. Consider noting explicitly in T08 that it modifies T07's HeroSection.tsx output.

---

**[O5] T11's commit message template hardcodes `Co-Authored-By: Claude <noreply@anthropic.com>` (incomplete email)**

Minor: T11 brief line 133 has `Co-Authored-By: Claude <noreply@anthropic.com>`. The canonical co-author tag should use the specific model's address. This won't cause any execution failure — just a cosmetic note.

---

## Verdict

```
APPROVE_WITH_FIXES
```

Critical issues that must be fixed before execution:
- **C1**: `config.yaml` static export strategy contradicts all briefs — fix the config
- **C3**: Invalid `css` prop in T07 HeroSection code sample — will cause TypeScript error
- **C4**: Invalid `brightness` Motion prop in T10 — will be silently ignored or cause type error
- **C5**: `tasks.yaml` T01 acceptance criteria underspecifies token count (16 vs 19)
- **C6**: T01 references non-existent `/research/internal/dependencies.md`

C2 was re-categorized as W1 (coordination issue, not a blocking failure).

Warnings W1–W7 are recommended fixes that reduce execution risk but will not necessarily cause hard failures.

The overall brief set is well-structured. The wave ordering is sound. The technical choices (no static export, Motion for animations, next/font/google, inline SVG for SMIL) are all correct. The five critical fixes are surgical — none require rethinking the task breakdown.

**Counts:** Critical: 5 | Warnings: 7 | Observations: 5
