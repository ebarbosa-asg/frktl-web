"use client";

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

const SECTION_BG = ["#0C0804", "#181008"] as const;

const WIDE_VISUALS = new Set(["sco2","factory","shipping","quality","testing","facilities"]);

function SectionVisual({ visual, animate }: { visual: string | null; animate: boolean }) {
  switch (visual) {
    case "triso":      return <TrisoParticleSVG animate={animate} />;
    case "block":      return <PrismaticBlockSVG animate={animate} />;
    case "reactor":    return <ReactorCoreSVG animate={animate} />;
    case "sco2":       return <SCO2CycleSVG animate={animate} />;
    case "factory":    return <FactoryLineSVG animate={animate} />;
    case "shipping":   return <ModularShippingSVG animate={animate} />;
    case "quality":    return <QualitySVG animate={animate} />;
    case "testing":    return <TestingPipelineSVG animate={animate} />;
    case "facilities": return <FacilityMapSVG animate={animate} />;
    default:           return null;
  }
}

function SectionText({
  section,
  counter,
  large = false,
}: {
  section: { tag: string; accent: string; title: string; body: string };
  counter?: string;
  large?: boolean;
}) {
  const accent = section.accent ?? "#F5820A";
  return (
    <div>
      {/* Counter + tag row */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        {counter && (
          <span style={{
            fontFamily: "var(--font-space-mono, monospace)",
            fontSize: 11,
            color: "rgba(122,106,85,0.5)",
            letterSpacing: "1px",
          }}>{counter}</span>
        )}
        <span style={{
          display: "inline-block",
          width: 32,
          height: 1,
          background: accent,
          opacity: 0.7,
          flexShrink: 0,
        }} />
        <p className="tag-label" style={{ color: accent }}>
          {section.tag}
        </p>
      </div>

      <h2 style={{
        fontFamily: "var(--font-instrument-serif, serif)",
        fontSize: large ? "clamp(36px, 5vw, 68px)" : "clamp(30px, 4vw, 54px)",
        color: "#FFF8EE",
        fontWeight: 400,
        lineHeight: 1.1,
        marginBottom: 24,
        letterSpacing: "-0.01em",
      }}>
        {section.title}
      </h2>

      <p style={{
        fontFamily: "var(--font-dm-sans, sans-serif)",
        fontSize: 16,
        lineHeight: 1.85,
        color: "rgba(237,224,200,0.65)",
        whiteSpace: "pre-line",
        maxWidth: 640,
      }}>
        {section.body}
      </p>
    </div>
  );
}

export default function Home() {
  const contentSections = sections.filter(s => !["safety","why"].includes(s.id));
  let counter = 0;

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsStrip />

        {contentSections.map((section, i) => {
          const bg = SECTION_BG[i % 2];
          const hasVisual = Boolean(section.visual);
          const isWide = WIDE_VISUALS.has(section.visual ?? "");
          const isPhase = section.id.startsWith("phase") || section.id === "roadmap" || section.id === "intro";
          if (!isPhase) counter++;
          const counterStr = !isPhase ? `0${counter}` : undefined;

          if (section.id === "roadmap") {
            return (
              <SectionWrapper
                key={section.id}
                id={section.id}
                style={{
                  background: bg,
                  borderTop: "1px solid #3A2818",
                }}
              >
                {isInView => (
                  <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 2rem" }}>
                    <RoadmapSection section={section} animate={isInView} />
                  </div>
                )}
              </SectionWrapper>
            );
          }

          return (
            <SectionWrapper
              key={section.id}
              id={section.id}
              style={{ background: bg, borderTop: "1px solid #3A2818" }}
            >
              {isInView => (
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 2rem" }}>
                  {isWide ? (
                    <>
                      <SectionText section={section} counter={counterStr} />
                      {hasVisual && (
                        <div style={{ display: "flex", justifyContent: "center", marginTop: 56 }}>
                          <SectionVisual visual={section.visual} animate={isInView} />
                        </div>
                      )}
                    </>
                  ) : (
                    <div
                      className="content-grid"
                      style={{
                        display: "flex",
                        gap: 80,
                        alignItems: "center",
                      }}
                    >
                      <div style={{
                        flex: hasVisual ? "1 1 52%" : "1 1 100%",
                        maxWidth: hasVisual ? 580 : 860,
                      }}>
                        <SectionText section={section} counter={counterStr} />
                      </div>
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
                          <SectionVisual visual={section.visual} animate={isInView} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </SectionWrapper>
          );
        })}

        <ComparisonTable />
        <LearningCurve />
        <SafetySection />

        {sections
          .filter(s => s.id === "why")
          .map(section => (
            <SectionWrapper
              key={section.id}
              id={section.id}
              style={{ background: "#181008", borderTop: "1px solid #3A2818" }}
            >
              {() => (
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 2rem" }}>
                  <div style={{ maxWidth: 900 }}>
                    <SectionText section={section} large />
                  </div>
                </div>
              )}
            </SectionWrapper>
          ))}

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
