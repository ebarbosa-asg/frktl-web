"use client";

import { stats } from "@/data/stats";

export function StatsStrip() {
  return (
    <div
      className="halftone-overlay"
      style={{
        padding: "70px 24px",
        background: "var(--color-dark-mid)",
        borderTop: "1px solid var(--color-slate)",
        borderBottom: "1px solid var(--color-slate)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: 16,
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              background: "var(--color-dark-card)",
              border: "1px solid var(--color-slate)",
              borderRadius: 12,
              padding: "20px 16px",
              textAlign: "center",
              transition: "border-color 0.3s, transform 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-teal-light)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-slate)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            }}
          >
            {/* Large numeral */}
            <div className="stat-numeral" style={{ color: "var(--color-cyan)" }}>
              {stat.value}
              {stat.unit && (
                <span
                  style={{
                    fontFamily: "var(--font-space-mono, monospace)",
                    fontSize: "clamp(14px, 1.5vw, 20px)",
                    color: "var(--color-teal-light)",
                    marginLeft: 4,
                  }}
                >
                  {stat.unit}
                </span>
              )}
            </div>
            {/* Label below */}
            <div
              style={{
                fontFamily: "var(--font-dm-sans, sans-serif)",
                fontSize: 11,
                color: "var(--color-text)",
                marginTop: 8,
                textTransform: "uppercase",
                letterSpacing: "1px",
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
