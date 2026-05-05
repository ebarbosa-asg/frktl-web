# External Research: Library Evaluation
## Animation & Visual Libraries for frktl-website

---

## 1. Framer Motion (now: Motion for React)

**Package:** `motion` (v11+, rebranded from `framer-motion`)  
**Bundle:** ~32KB gzipped (full); scroll features ~2.5KB extra  
**License:** MIT  
**Docs:** motion.dev

### What it does
React-native animation library. Declarative API with `<motion.div>`, `useInView`, `useScroll`, `useTransform`. GPU-accelerated via Web Animations API where possible. Scroll-linked animations run off the main thread.

### For FRKTL
- Replaces the current IntersectionObserver + CSS class toggle pattern with `useInView({ once: true, amount: 0.15 })`
- Hero section parallax: 5 lines with `useScroll` + `useTransform`
- Section entrance: `initial={{ opacity: 0, y: 50 }}` → `animate={{ opacity: 1, y: 0 }}` on viewport entry
- Does NOT need to touch the SVG illustrations — SMIL animations stay

### Pros
- Best-in-class React DX — least code to achieve scroll entrance animations
- `useInView` is a direct 1:1 replacement for the existing IntersectionObserver pattern
- GPU-accelerated scroll — no jank on 17+ sections
- Smallest scroll animation footprint (2.5KB) vs GSAP ScrollTrigger (12KB)
- MIT license, actively maintained, Figma/Vercel-backed

### Cons
- React-only (not relevant here, but worth noting)
- Larger than a pure CSS solution
- Overkill if the only animations needed are section entrances (CSS-only would suffice)

### Recommendation
**Primary choice for scroll animations.** Add only if implementing scroll parallax or complex entrance sequences. For simple fade-in-on-scroll, the existing CSS approach can stay.

---

## 2. GSAP (GreenSock Animation Platform)

**Package:** `gsap` + `@gsap/react` (optional wrapper)  
**Bundle:** ~23KB core + ~12KB ScrollTrigger = ~35KB gzipped  
**License:** Standard license free for non-commercial; Club GreenSock for commercial premium plugins  
**Docs:** gsap.com

### What it does
The most powerful JavaScript animation engine. Timeline-based, frame-precise, supports scroll triggers, pinning sections, horizontal scrolling, SVG morph (MorphSVG — paid plugin), text split animations (SplitText — paid plugin).

### For FRKTL
- ScrollTrigger can pin the hero, create scroll-speed effects, and trigger section animations at precise scroll positions
- Could power a "scroll through the reactor layers" animation for the TRISO section
- Significantly more configuration than Motion for the same entrance animations

### Pros
- Unmatched power for complex, timeline-sequenced animations
- SplitText plugin can animate headlines character-by-character (strong for the 50s editorial heading style)
- Works outside React (useful if adding non-React widgets)
- Best option for pinned scroll sections ("scroll to reveal" within a section)

### Cons
- ~40% larger bundle than Motion for equivalent scroll entrance functionality
- Imperative API — more verbose in React compared to Motion's declarative approach
- Premium plugins (SplitText, MorphSVG) require Club GreenSock subscription (~$150/yr)
- JS-based scroll positioning is slightly out-of-sync vs GPU-composited scroll (Motion's advantage)

### Recommendation
**Secondary option.** Use GSAP only if the design calls for complex pinned sections, character-by-character text reveals, or SVG morph transitions. For v1 of the site, Motion handles all needed animations at lower cost.

---

## 3. Lottie (lottie-web / @lottiefiles/react-lottie-player)

**Package:** `@lottiefiles/react-lottie-player` or `lottie-web` directly  
**Bundle:** ~30KB gzipped (lottie-web core)  
**License:** MIT  
**Docs:** lottiefiles.com, lottie.github.io

### What it does
Renders After Effects animations exported as JSON (`.lottie` or `.json`). Used for character animations, mascots, looping illustrations, and interactive icon states.

### For FRKTL
The 50s nuclear mascot concept — a friendly cartoon character that guides users through the sections — is the primary use case. Lottie would be the delivery vehicle for:
- An animated mascot character (designed in Adobe Animate or After Effects, exported to Lottie JSON)
- A looping "nuclear plant with steam towers" cartoon on the hero
- Interactive icon states (e.g., TRISO particle that reacts to hover)

Lottie State Machines (dotLottie format) allow the mascot to react to scroll position, hover, or click events.

### Pros
- Highest quality cartoon character animation — vectors, motion blur, squash/stretch
- Tiny file sizes for complex animations (vector-based)
- LottieFiles marketplace has thousands of ready-made animations including atomic/science themes
- Official MIME type (video/lottie+json) assigned by IANA in 2025
- Can be lazy-loaded with Suspense

### Cons
- Requires an animation to be designed in After Effects or a Lottie-compatible tool
- Custom mascot design is a design/illustration project, not a dev task
- Pre-made Lottie nuclear animations on LottieFiles are generic (not FRKTL-branded)
- If using for hero, must lazy-load to avoid bundle-blocking the LCP

### Recommendation
**High value, requires design work.** If the team invests in a custom 50s-style nuclear mascot (even a simple one), Lottie is the right delivery format. For v1 without a designer, use a pre-made Lottie as a placeholder. The `@lottiefiles/react-lottie-player` package handles lazy loading well.

---

## 4. Three.js / React Three Fiber (R3F)

**Package:** `three` + `@react-three/fiber` + `@react-three/drei`  
**Bundle:** ~250KB gzipped (three.js alone is ~150KB)  
**License:** MIT  
**Docs:** r3f.docs.pmnd.rs, threejs.org

### What it does
WebGL-based 3D rendering in the browser. React Three Fiber wraps Three.js in a React-idiomatic API. Drei provides helpers: `<OrbitControls>`, `<Environment>`, `<Detailed>` (LOD), etc. Can render low-poly isometric 3D scenes matching the Dribbble "nuclear powerplant" reference.

### For FRKTL — The "Low-Poly Cooling Towers" Concept
Creating the cute isometric nuclear plant from the Dribbble reference (dribbble.com/shots/2769670) in R3F would require:
1. Creating or sourcing a low-poly 3D model of a nuclear plant in Blender
2. Exporting as .glb with Draco compression
3. Using `@react-three/drei` `<useGLTF>` to load and render
4. Setting up an isometric camera (orthographic projection)
5. Adding `<Environment>` lighting preset for the warm, lush look

### Pros
- The most faithful path to replicating the isometric 3D cartoon plant aesthetic
- Infinite creative flexibility — can animate the plant, add smoke/steam particles
- Low-poly aesthetics are relatively easy to model in Blender
- WebGPU support now available (Safari 26 shipped September 2025) — future-proof

### Cons
- ~250KB bundle — must lazy-load with Suspense or it will kill LCP score
- Requires Blender modeling skills (or a pre-made model)
- Mobile performance: WebGL scenes with particles/post-processing drop to 30fps on mid-range phones
- Significant complexity for a marketing site hero — high engineering effort
- Accessibility: 3D canvas is opaque to screen readers

### Recommendation
**Optional, deferred.** R3F is the right tool for the "full 3D nuclear plant" vision but it is a significant investment. For v1, consider: (1) start with Spline for the 3D scene (lower effort), or (2) use a high-quality 2D illustration in the 50s style. Upgrade to R3F in v2 if the 3D scene becomes a brand pillar.

---

## 5. Spline (spline.design / @splinetool/react-spline)

**Package:** `@splinetool/react-spline`  
**Bundle:** ~50KB gzipped (viewer only; scene assets streamed separately)  
**License:** Free tier + Pro ($16/mo)  
**Docs:** docs.spline.design

### What it does
Browser-based 3D design tool with React embed component. Create scenes in Spline's editor (like Figma but 3D), then embed via `<Spline scene="https://prod.spline.design/...">`. The scene streams from Spline's CDN.

### For FRKTL — Easiest Path to 3D Hero
Spline enables creating a cute 3D nuclear plant or reactor model without Blender expertise. The editor is drag-and-drop. Built-in physics, scroll events, and hover interactions.

Next.js integration: use `dynamic(() => import('@splinetool/react-spline'), { ssr: false })` to avoid SSR issues and lazy-load the viewer.

A blurred placeholder renders during load (optional via `@splinetool/react-spline/next`).

### Pros
- Dramatically faster iteration than Blender + R3F
- No custom 3D modeling skills required — use Spline's built-in primitives
- Scroll-triggered animations built into the editor (no extra code)
- Scenes stream from CDN — no bundle size impact
- Free tier supports public scenes

### Cons
- Scenes hosted on Spline CDN — external dependency, potential latency
- Scene file is large (Spline scenes are typically 2–10MB): needs lazy loading and low-priority hint
- Less control than R3F for custom shader effects
- Pro features (custom events, code API) require paid plan
- "Spline-made" aesthetic can look generic (many sites use default Spline scenes)

### Recommendation
**Best quick-start for 3D hero.** For v1 on a tight timeline, create a simple cute nuclear plant scene in Spline (cooling towers, graphite blocks, TRISO spheres) and embed it in the hero. Lazy-load with Suspense. Budget 1–2 days of Spline design time. Upgrade to R3F for a fully custom scene in v2.

---

## 6. CSS-Only Retro (No Library)

### What it means
Building the 50s aesthetic purely through CSS: custom SVG illustrations styled with Tailwind, retro color palette, bold editorial typography, geometric shapes with CSS. No 3D, no external animation library.

Techniques:
- CSS `clip-path` for atomic boomerang shapes and starbursts
- CSS `border-radius` for the amoeba / blobby forms
- Bold display font (Atomic Age from Google Fonts — a literal 1950s typeface) for section headers
- Warm color overlay (`background: linear-gradient(...)`) for the retro film poster feel
- CSS `@keyframes` for smooth loops (no SMIL needed)
- SVG illustrations redesigned as flat, thick-outlined, bold-color drawings instead of the current technical diagrams

### Pros
- Zero additional JavaScript
- Fastest loading, best Core Web Vitals
- Complete creative control
- The "retro editorial poster" aesthetic can be fully achieved in CSS + SVG
- No external dependencies to break or update

### Cons
- More illustration design work upfront
- Requires a designer or strong CSS art skills
- Less impressive than 3D for investor "wow" factor
- The "cute 3D cooling towers" look from the Dribbble reference cannot be achieved in CSS alone

### Recommendation
**Strong option if design skill is available.** The 50s atomic editorial aesthetic (Dribbble reference 2 — the i Magazine nuclear illustration) can be realized almost entirely in CSS + redesigned SVGs. This approach has the best performance and most distinctive brand character. Consider a CSS-first approach for the overall page with a single hero illustration (Spline or Lottie) for the 3D/character element.

---

## Overall Recommendation

**Recommended stack for v1:**

| Layer | Choice | Rationale |
|---|---|---|
| Scroll animations | Motion (Framer Motion) | 1:1 IntersectionObserver replacement, lightest option |
| Hero 3D scene | Spline (lazy-loaded) | Fastest path to cute 3D plant, no Blender needed |
| Section illustrations | Existing SVGs redesigned | Keep SMIL animations, redesign visual style |
| Typography display | + Atomic Age (Google Fonts) | Literal 50s typeface, free, adds instant era character |
| Character/mascot | Lottie (v2 or if designer available) | Requires custom illustration work |

**Alternative if 3D is out of scope for v1:**
Drop Spline, use a bold illustrated hero (CSS + SVG art), full CSS-only retro approach. Cleaner, faster, still distinctive.
