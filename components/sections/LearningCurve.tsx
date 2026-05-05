"use client";

const CARDS = [
  {
    unit: "Unit 1–2",
    phase: "FOAK",
    desc: "Highest cost — tooling, procedures, NRC ITAAC. But factory-built, not field-built.",
    color: "#C23B22",
    bg: "rgba(194,59,34,0.07)",
  },
  {
    unit: "Unit 3–10",
    phase: "Early Production",
    desc: "Procedures locked. Workforce trained. Weld cycles drop 20–30%.",
    color: "#F5820A",
    bg: "rgba(245,130,10,0.07)",
  },
  {
    unit: "Unit 11–50",
    phase: "Serial Production",
    desc: "Full learning curve. Second line online. Per-unit cost approaches NOAK.",
    color: "#F5C518",
    bg: "rgba(245,197,24,0.07)",
  },
  {
    unit: "Unit 50+",
    phase: "Fleet Scale",
    desc: "NOAK economics. Shared fuel services. Cost competitive with natural gas.",
    color: "#6FA884",
    bg: "rgba(111,168,132,0.07)",
  },
];

const BLOB = ["card-blob-1","card-blob-2","card-blob-3","card-blob-4"] as const;

export function LearningCurve() {
  return (
    <section
      style={{
        padding: "96px 2rem",
        background: "var(--color-bg-alt)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="tag-label" style={{ color: "#F5C518", marginBottom: 16 }}>
            Manufacturing Economics
          </p>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif, serif)",
              fontSize: "clamp(32px, 4vw, 56px)",
              color: "#FFF8EE",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            The Learning Curve Advantage
          </h2>
          <p style={{
            fontFamily: "var(--font-dm-sans, sans-serif)",
            fontSize: 16,
            color: "rgba(237,224,200,0.65)",
            lineHeight: 1.75,
            maxWidth: 580,
            margin: "0 auto",
          }}>
            Every unit off the line is cheaper than the last. The first reactor funds the factory. The factory funds the fleet.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 24,
        }}>
          {CARDS.map((card, i) => (
            <div
              key={i}
              className={BLOB[i]}
              style={{
                background: card.bg,
                border: `1.5px solid ${card.color}`,
                padding: "36px 28px",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"}
            >
              {/* Ghost numeral */}
              <div aria-hidden="true" style={{
                position: "absolute",
                top: -8,
                right: 12,
                fontFamily: "var(--font-space-mono, monospace)",
                fontSize: 88,
                fontWeight: 700,
                color: card.color,
                opacity: 0.07,
                lineHeight: 1,
                userSelect: "none",
              }}>{i + 1}</div>

              <p className="tag-label" style={{ color: card.color, marginBottom: 10, fontSize: 10 }}>
                {card.phase}
              </p>
              <p style={{
                fontFamily: "var(--font-space-mono, monospace)",
                fontSize: 20,
                fontWeight: 700,
                color: "#FFF8EE",
                marginBottom: 14,
              }}>{card.unit}</p>
              <p style={{
                fontFamily: "var(--font-dm-sans, sans-serif)",
                fontSize: 14,
                color: "rgba(237,224,200,0.65)",
                lineHeight: 1.7,
              }}>{card.desc}</p>

              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: card.color,
                opacity: 0.6,
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
