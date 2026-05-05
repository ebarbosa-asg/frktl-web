import { HeroSection } from "@/components/sections/HeroSection";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { LearningCurve } from "@/components/sections/LearningCurve";
import { SafetySection } from "@/components/sections/SafetySection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { CTASection } from "@/components/sections/CTASection";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AtomicStarburst } from "@/components/ui/AtomicStarburst";
import {
  TrisoParticleSVG,
  PrismaticBlockSVG,
  ReactorCoreSVG,
  SCO2CycleSVG,
  FactoryLineSVG,
  ModularShippingSVG,
  QualitySVG,
  TestingPipelineSVG,
  FacilityMapSVG,
} from "@/components/illustrations";
import { sections } from "@/data/sections";

// Alternating background colors for visual rhythm
const sectionBg = (i: number) =>
  i % 2 === 0 ? "var(--color-dark)" : "var(--color-dark-mid)";

// Map section visual key to the appropriate SVG component
function SectionVisual({
  visual,
  animate,
}: {
  visual: string | null;
  animate: boolean;
}) {
  switch (visual) {
    case "triso":
      return <TrisoParticleSVG animate={animate} />;
    case "block":
      return <PrismaticBlockSVG animate={animate} />;
    case "reactor":
      return <ReactorCoreSVG animate={animate} />;
    case "sco2":
      return <SCO2CycleSVG animate={animate} />;
    case "factory":
      return <FactoryLineSVG animate={animate} />;
    case "shipping":
      return <ModularShippingSVG animate={animate} />;
    case "quality":
      return <QualitySVG animate={animate} />;
    case "testing":
      return <TestingPipelineSVG animate={animate} />;
    case "facilities":
      return <FacilityMapSVG animate={animate} />;
    default:
      return null;
  }
}

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* ── Hero ── */}
        <HeroSection />

        {/* ── Stats strip ── */}
        <StatsStrip />

        {/* ── Content sections 1–13 (intro → phase5) ── */}
        {sections
          .filter((s) => !["safety", "why"].includes(s.id))
          .map((section, i) => {
            // Roadmap section is a special client component that manages activePhase cycling
            if (section.id === "roadmap") {
              return (
                <SectionWrapper
                  key={section.id}
                  id={section.id}
                  style={{ background: sectionBg(i) }}
                >
                  {(isInView) => (
                    <div
                      style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        padding: "80px 24px",
                      }}
                    >
                      <RoadmapSection section={section} animate={isInView} />
                    </div>
                  )}
                </SectionWrapper>
              );
            }

            const hasVisual = Boolean(section.visual);
            const isWideVisual =
              section.visual === "sco2" ||
              section.visual === "factory" ||
              section.visual === "shipping" ||
              section.visual === "quality" ||
              section.visual === "testing" ||
              section.visual === "facilities";

            return (
              <SectionWrapper
                key={section.id}
                id={section.id}
                style={{ background: sectionBg(i) }}
              >
                {(isInView) => (
                  <div
                    style={{
                      maxWidth: 1100,
                      margin: "0 auto",
                      padding: isWideVisual ? "80px 24px" : "80px 24px",
                    }}
                  >
                    {/* Wide-visual sections: content on top, visual full-width below */}
                    {isWideVisual ? (
                      <>
                        <div style={{ marginBottom: 40, maxWidth: 720 }}>
                          <p
                            className="tag-label"
                            style={{
                              color: section.accent,
                              marginBottom: 14,
                            }}
                          >
                            {section.tag}
                          </p>
                          <h2
                            style={{
                              fontFamily: "var(--font-instrument-serif, serif)",
                              fontSize: "clamp(28px, 3.5vw, 48px)",
                              color: "var(--color-text-bright)",
                              fontWeight: 400,
                              lineHeight: 1.2,
                              marginBottom: 20,
                            }}
                          >
                            {section.title}
                          </h2>
                          <p className="body-text">{section.body}</p>
                        </div>
                        {hasVisual && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              padding: "8px 0",
                            }}
                          >
                            <SectionVisual
                              visual={section.visual}
                              animate={isInView}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      /* Standard sections: text left, visual right (when visual exists) */
                      <div
                        className="content-grid"
                        style={{
                          display: "flex",
                          gap: 56,
                          alignItems: "center",
                        }}
                      >
                        {/* Text column */}
                        <div
                          style={{
                            flex: hasVisual ? "1 1 50%" : "1 1 100%",
                            maxWidth: hasVisual ? 560 : 820,
                          }}
                        >
                          <p
                            className="tag-label"
                            style={{
                              color: section.accent,
                              marginBottom: 14,
                            }}
                          >
                            {section.tag}
                          </p>
                          <h2
                            style={{
                              fontFamily: "var(--font-instrument-serif, serif)",
                              fontSize: "clamp(28px, 3.5vw, 48px)",
                              color: "var(--color-text-bright)",
                              fontWeight: 400,
                              lineHeight: 1.2,
                              marginBottom: 20,
                            }}
                          >
                            {section.title}
                          </h2>
                          <p className="body-text">{section.body}</p>
                        </div>

                        {/* Visual column */}
                        {hasVisual && (
                          <div
                            className="visual-col"
                            style={{
                              flex: "1 1 40%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              minWidth: 0,
                            }}
                          >
                            <SectionVisual
                              visual={section.visual}
                              animate={isInView}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </SectionWrapper>
            );
          })}

        {/* ── Comparison table ── */}
        <ComparisonTable />

        {/* ── Learning curve ── */}
        <LearningCurve />

        {/* ── Safety section (with danger-tape decoration) ── */}
        <SafetySection />

        {/* ── "Why This Matters" — final content section ── */}
        {sections
          .filter((s) => s.id === "why")
          .map((section) => (
            <SectionWrapper
              key={section.id}
              id={section.id}
              style={{ background: "var(--color-dark-mid)", position: "relative" }}
            >
              {(isInView) => (
                <>
                  {/* Starburst accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 24,
                      right: 48,
                      pointerEvents: "none",
                      zIndex: 0,
                    }}
                  >
                    <AtomicStarburst
                      points={12}
                      color="var(--color-cyan)"
                      opacity={0.05}
                      size={200}
                    />
                  </div>

                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      maxWidth: 1100,
                      margin: "0 auto",
                      padding: "80px 24px",
                    }}
                  >
                    <div style={{ maxWidth: 820 }}>
                      <p
                        className="tag-label"
                        style={{ color: section.accent, marginBottom: 14 }}
                      >
                        {section.tag}
                      </p>
                      <h2
                        style={{
                          fontFamily: "var(--font-instrument-serif, serif)",
                          fontSize: "clamp(28px, 3.5vw, 48px)",
                          color: "var(--color-text-bright)",
                          fontWeight: 400,
                          lineHeight: 1.2,
                          marginBottom: 20,
                        }}
                      >
                        {section.title}
                      </h2>
                      <p className="body-text">{section.body}</p>
                    </div>
                  </div>
                </>
              )}
            </SectionWrapper>
          ))}

        {/* ── CTA / Contact ── */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
