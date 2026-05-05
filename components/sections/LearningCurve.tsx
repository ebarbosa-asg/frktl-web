"use client";

import { learningCurveCards } from "@/data/learningCurve";

export function LearningCurve() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "var(--color-dark-mid)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p
            className="tag-label"
            style={{ color: "var(--color-gold)", marginBottom: 16 }}
          >
            MANUFACTURING ECONOMICS
          </p>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif, serif)",
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "var(--color-text-bright)",
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            The Learning Curve Advantage
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans, sans-serif)",
              fontSize: 15,
              color: "var(--color-text)",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Every unit off the line is cheaper than the last. The first reactor
            funds the factory. The factory funds the fleet.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
          }}
        >
          {learningCurveCards.map((card, i) => {
            const blobClasses = ["card-blob-1", "card-blob-2", "card-blob-3", "card-blob-4"];
            const blobClass = blobClasses[i % blobClasses.length];

            return (
              <div
                key={i}
                className={blobClass}
                style={{
                  background: "var(--color-dark-card)",
                  border: `2px solid ${card.color}`,
                  padding: "32px 24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Unit number — large background numeral */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: -10,
                    right: 12,
                    fontFamily: "var(--font-space-mono, monospace)",
                    fontSize: 80,
                    fontWeight: 700,
                    color: card.color,
                    opacity: 0.06,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {i + 1}
                </div>

                {/* Phase tag */}
                <p
                  className="tag-label"
                  style={{
                    color: card.color,
                    marginBottom: 8,
                    fontSize: 11,
                  }}
                >
                  {card.phase}
                </p>

                {/* Unit range */}
                <p
                  style={{
                    fontFamily: "var(--font-space-mono, monospace)",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--color-text-bright)",
                    marginBottom: 12,
                  }}
                >
                  {card.unit}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans, sans-serif)",
                    fontSize: 13,
                    color: "var(--color-text)",
                    lineHeight: 1.7,
                  }}
                >
                  {card.desc}
                </p>

                {/* Bottom color bar */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: card.color,
                    opacity: 0.5,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
