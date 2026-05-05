"use client";

import { stats } from "@/data/stats";

export function StatsStrip() {
  return (
    <div
      className="halftone-overlay"
      style={{
        padding: "80px 2rem",
        background: "var(--color-bg-alt)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 2,
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              padding: "32px 20px",
              textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid var(--color-border)" : "none",
              transition: "background 0.25s",
              cursor: "default",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.background = "rgba(245,130,10,0.05)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.background = "transparent";
            }}
          >
            <div
              className="stat-numeral"
              style={{ color: "#F5820A", lineHeight: 1 }}
            >
              {stat.value}
              {stat.unit && (
                <span
                  style={{
                    fontFamily: "var(--font-space-mono, monospace)",
                    fontSize: "0.38em",
                    color: "#C8A06A",
                    marginLeft: 4,
                    verticalAlign: "middle",
                  }}
                >
                  {stat.unit}
                </span>
              )}
            </div>
            <div
              style={{
                fontFamily: "var(--font-dm-sans, sans-serif)",
                fontSize: 10,
                color: "var(--color-muted)",
                marginTop: 10,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
