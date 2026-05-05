"use client";

import { useState, useEffect } from "react";
import { RoadmapTimelineSVG } from "@/components/illustrations";
import { Section } from "@/types";

interface RoadmapSectionProps {
  section: Section;
  animate: boolean;
}

export function RoadmapSection({ section, animate }: RoadmapSectionProps) {
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActivePhase(p => (p + 1) % 5), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="content-grid" style={{ display: "flex", gap: 56, alignItems: "center", flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 380px", minWidth: 270 }}>
        <p className="tag-label" style={{ color: section.accent ?? "#F5820A", marginBottom: 14 }}>
          {section.tag}
        </p>
        <h2 style={{
          fontFamily: "var(--font-instrument-serif, serif)",
          fontSize: "clamp(28px, 3.5vw, 52px)",
          color: "#FFF8EE",
          fontWeight: 400,
          lineHeight: 1.15,
          marginBottom: 20,
        }}>
          {section.title}
        </h2>
        <p className="body-text" style={{ color: "rgba(237,224,200,0.7)" }}>
          {section.body}
        </p>
      </div>
      <div className="visual-col" style={{
        flex: "0 1 500px",
        minWidth: 260,
        display: "flex",
        justifyContent: "center",
        background: "var(--color-bg-elevated)",
        border: "1px solid var(--color-border-light)",
        borderRadius: 16,
        padding: "28px 12px",
        overflowX: "auto",
      }}>
        <RoadmapTimelineSVG animate={animate} activePhase={activePhase} />
      </div>
    </div>
  );
}
