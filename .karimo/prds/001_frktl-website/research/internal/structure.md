# Internal Research: Structure Analysis
## Source: /Users/loko/FRKTL/frktl-explainer.jsx (627 lines)

---

## File Organization

Single monolithic React file. No module boundaries, no separate CSS file, no data files. All logic, data, SVGs, and styles live in one export.

### Block layout of the file:

| Lines | Content |
|---|---|
| 1–18 | Imports + color constant declarations |
| 20–341 | SVG illustration components (10 functions) |
| 343–430 | `sections` data array (17 section objects) |
| 432–627 | `FRKTLExplainer` main component |
| 464–483 | Inline `<style>` tag (Google Fonts import + global CSS) |
| 485–496 | Hero section (full-viewport) |
| 498–501 | Fixed nav dots |
| 503–534 | Section render loop |
| 536–557 | Stats strip |
| 559–590 | Comparison table |
| 592–615 | Learning curve cards |
| 617–624 | Footer |

---

## Section Inventory (17 sections in data array)

| idx | id | tag | visual | Description |
|---|---|---|---|---|
| 0 | intro | THE CHALLENGE | null | Hook: global electricity demand, clean energy problem statement |
| 1 | fuel | STEP 1 — THE FUEL | triso | TRISO particle anatomy, UCO kernel, 4 coating layers |
| 2 | compact | STEP 2 — FUEL ASSEMBLY | block | Prismatic graphite blocks, fuel compacts, BWXT |
| 3 | reactor | STEP 3 — THE REACTOR | reactor | Helium-cooled RPV, walk-away safety, negative temp coefficient |
| 4 | sco2 | STEP 4 — POWER CONVERSION | sco2 | sCO₂ Brayton cycle, 5-step cycle description, efficiency comparison |
| 5 | output | STEP 5 — CLEAN POWER | null | 10–50 MWe, modular scaling, fuel lifetime, zero carbon |
| 6 | shipping | STEP 6 — HOW IT SHIPS | shipping | 5 module groups, oversize flatbed, road/rail envelopes |
| 7 | production | STEP 7 — PRODUCTION ENGINEERING | factory | Factory production vs site construction, DFM, parallel lines |
| 8 | quality | STEP 8 — QUALITY & LICENSING | quality | NRC Part 53, ITAAC, digital twin QC, ASME III |
| 9 | roadmap | THE ROAD TO CRITICALITY | roadmap | Overview of 5-phase timeline, dependencies |
| 10 | phase1 | PHASE 1 — 2026 | facilities | Foundation: team, IP, non-dilutive capital, GAIN/SBIR |
| 11 | phase2 | PHASE 2 — 2027–2028 | testing | Detailed design, component testing, seed raise |
| 12 | phase3 | PHASE 3 — 2029–2030 | null | NRC application, integral testing, prototype fabrication |
| 13 | phase4 | PHASE 4 — 2031–2032 | null | FOAK build, fuel load, commissioning |
| 14 | phase5 | PHASE 5 — 2033 | null | First criticality, power ascension, first customer |
| 15 | safety | BUT IS IT SAFE? | null | HTGR safety comparison vs LWRs, passive safety explanation |
| 16 | why | WHY THIS MATTERS | null | Markets: data centers, DoD, remote industrial, developing nations |

**Sections with visuals: 10 of 17**  
**Sections text-only: 7 of 17** (intro, output, phase3, phase4, phase5, safety, why)

---

## SVG Component Inventory (10 components)

| Component | viewBox | Max Width | Complexity | Animation Types |
|---|---|---|---|---|
| TrisoParticleSVG | 300×300 | 280px | Low — 5 concentric circles | CSS opacity transitions (staggered), SMIL kernel pulse |
| PrismaticBlockSVG | 320×350 | 300px | Medium — hex polygon, 26 circles | CSS opacity stagger, SMIL channel glow + pulse |
| ReactorCoreSVG | 360×400 | 340px | Medium — 15 fuel rects, coolant lines | CSS opacity stagger, SMIL line animation |
| SCO2CycleSVG | 440×320 | 420px | High — 7 component boxes, flow lines | SMIL turbine rotate, animateMotion path particle |
| FactoryLineSVG | 720×260 | 700px | High — 6 stations, connecting line | CSS stagger, SMIL dash march, animateMotion module |
| ModularShippingSVG | 600×310 | 560px | Low — 5 rect rows | CSS stagger opacity |
| QualitySVG | 480×320 | 440px | Low — 6 cards 2-col | CSS stagger, SMIL bar fill |
| RoadmapTimelineSVG | 700×(dynamic) | 680px | Medium — spine + 5 nodes | CSS stagger, SMIL pulse ring on activePhase, dash march |
| TestingPipelineSVG | 680×200 | 660px | Medium — 5 stage cards | CSS stagger, SMIL connecting dashes |
| FacilityMapSVG | 600×260 | 580px | Medium — 6 site pins + lines | CSS stagger, SMIL pulse on HQ site |

---

## Non-Section Blocks (rendered after section loop)

### Stats Strip
- 8 statistics in a CSS grid (`auto-fit, minmax(130px, 1fr)`)
- Values: 0g CO₂, 40–50% efficiency, 1800°C+ TRISO, 10–50 MWe, 12–18mo factory, 3–6mo site, 4–8/yr, ~7yrs
- Uses Space Mono for numbers, DM Sans for labels
- `stat-card` class with hover lift effect

### Comparison Table
- 9 rows × 4 columns (label + 3 reactor types)
- FRKTL column has teal background tint and bright text
- Hardcoded data, no data array

### Learning Curve Section
- 4-card grid: Unit 1-2 (FOAK), Unit 3-10, Unit 11-50, Unit 50+
- Each has Space Mono phase label, DM Sans unit range and description
- Left border colored per production stage

### Footer
- FRKTL hexagonal logomark (inline SVG polygon)
- "FRKTL" text in Space Mono, "Energizing the Globe." in DM Sans

---

## Typography Roles

| Font | Usage | CSS class |
|---|---|---|
| Space Mono | Tag labels, nav dots, stats values, footer title | `.tag-label` |
| DM Sans | Section titles, body text, stat labels, table | `.section-title`, `.body-text` |
| Instrument Serif | Hero headline only | `.hero-title` |

---

## Layout Patterns

- **Hero**: Full-viewport flex column, centered
- **Sections**: `maxWidth: 1100`, 2-col flex (`content-grid`): text left (flex 1 1 380px) + visual right (flex 0 1 480px)
- **Stats Strip**: CSS grid auto-fit minmax 130px
- **Comparison**: Full-width table with overflow-x auto
- **Learning Curve**: CSS grid auto-fit minmax 190px
- **Accent line**: `position: absolute; left: 0; width: 3px; linear-gradient` per section

---

## Existing File Issue

A file named `final explainer .jsx` (with trailing space before `.jsx`) reportedly exists in `/Users/loko/FRKTL/`. This would be a problematic filename on some filesystems and CI/CD environments. The canonical file is `frktl-explainer.jsx`.
