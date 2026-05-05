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

  // Preserve the 3-second cycling behavior from the original
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhase((p) => (p + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="content-grid" style={{ display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 380px", minWidth: 270 }}>
        <p
          className="tag-label"
          style={{ color: section.accent, marginBottom: 12 }}
        >
          {section.tag}
        </p>
        <h2
          className="section-title"
          style={{
            fontSize: "clamp(22px, 3.2vw, 34px)",
            color: "var(--color-text-bright)",
            marginBottom: 20,
          }}
        >
          {section.title}
        </h2>
        <div className="body-text">{section.body}</div>
      </div>
      <div
        className="visual-col"
        style={{
          flex: "0 1 480px",
          minWidth: 260,
          display: "flex",
          justifyContent: "center",
          background: "var(--color-dark-mid)",
          border: "1px solid var(--color-slate)",
          borderRadius: 16,
          padding: "24px 10px",
          overflowX: "auto",
        }}
      >
        <RoadmapTimelineSVG animate={animate} activePhase={activePhase} />
      </div>
    </div>
  );
}
