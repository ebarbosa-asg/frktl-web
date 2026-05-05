"use client";

import { AtomicStarburst } from "@/components/ui/AtomicStarburst";

const safetyPoints = [
  {
    label: "No Water in the Core",
    detail: "Eliminates hydrogen explosions and steam failures entirely.",
  },
  {
    label: "Inert Helium Coolant",
    detail: "Cannot become radioactive, cannot react chemically with anything.",
  },
  {
    label: "TRISO Fuel: 1,800°C Tested",
    detail: "Core operates below 1,000°C — an 800°C built-in safety margin.",
  },
  {
    label: "Negative Temp Coefficient",
    detail: "Physics forces the reaction to slow as temperature rises. No override possible.",
  },
  {
    label: "No Active Safety Systems",
    detail: "Passive decay heat removal. No pumps, no power, no operator needed.",
  },
  {
    label: "Walk-Away Safe",
    detail: "Under total loss of coolant flow, the reactor shuts itself down on its own.",
  },
];

export function SafetySection() {
  return (
    <section
      id="safety"
      style={{
        position: "relative",
        padding: "80px 24px",
        background: "var(--color-dark)",
        overflow: "hidden",
      }}
    >
      {/* Danger-tape stripe — decorative background */}
      <div
        className="danger-tape-bg"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {/* Starburst decoration — top left */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 48,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <AtomicStarburst
          points={8}
          color="var(--color-teal-light)"
          opacity={0.06}
          size={180}
        />
      </div>

      {/* Starburst decoration — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          right: 48,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <AtomicStarburst
          points={12}
          color="var(--color-orange)"
          opacity={0.05}
          size={220}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p
            className="tag-label"
            style={{ color: "var(--color-orange)", marginBottom: 16 }}
          >
            BUT IS IT SAFE?
          </p>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif, serif)",
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "var(--color-text-bright)",
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: 20,
            }}
          >
            Addressing the Elephant in the Room
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans, sans-serif)",
              fontSize: 15,
              color: "var(--color-text)",
              lineHeight: 1.8,
              maxWidth: 680,
              margin: "0 auto",
            }}
          >
            Every nuclear accident in history — Three Mile Island, Chernobyl,
            Fukushima — involved water-cooled reactors with fundamentally
            different physics. FRKTL&apos;s HTGR is a completely different animal.
          </p>
        </div>

        {/* Safety points grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginBottom: 48,
          }}
        >
          {safetyPoints.map((point, i) => (
            <div
              key={i}
              style={{
                background: "var(--color-dark-card)",
                border: "1px solid var(--color-slate)",
                borderLeft: "4px solid var(--color-teal-light)",
                borderRadius: 8,
                padding: "24px 20px",
              }}
            >
              {/* Check mark + label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-space-mono, monospace)",
                    fontSize: 16,
                    color: "var(--color-teal-light)",
                    lineHeight: 1,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  +
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans, sans-serif)",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.3,
                  }}
                >
                  {point.label}
                </p>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans, sans-serif)",
                  fontSize: 13,
                  color: "var(--color-text)",
                  lineHeight: 1.7,
                  paddingLeft: 28,
                }}
              >
                {point.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div
          style={{
            background: "rgba(20,163,168,0.08)",
            border: "1px solid var(--color-teal)",
            borderRadius: 12,
            padding: "28px 32px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-space-mono, monospace)",
              fontSize: 13,
              color: "var(--color-teal-light)",
              lineHeight: 1.8,
              letterSpacing: "0.5px",
            }}
          >
            Under any credible design-basis scenario — including total loss of
            coolant flow — the fuel physically cannot reach failure temperature.
            The reactor shuts itself down through physics alone.
          </p>
          <p
            className="tag-label"
            style={{ color: "var(--color-cyan)", marginTop: 16, fontSize: 12 }}
          >
            NRC Part 53 — Designed for exactly this.
          </p>
        </div>
      </div>
    </section>
  );
}
