"use client";

const POINTS = [
  { label: "No Water in the Core", detail: "Eliminates hydrogen explosions and steam failures entirely." },
  { label: "Inert Helium Coolant", detail: "Cannot become radioactive, cannot react chemically with anything." },
  { label: "TRISO Fuel: 1,800°C Tested", detail: "Core operates below 1,000°C — an 800°C built-in safety margin." },
  { label: "Negative Temp Coefficient", detail: "Physics forces the reaction to slow as temperature rises. No override possible." },
  { label: "No Active Safety Systems", detail: "Passive decay heat removal. No pumps, no power, no operator needed." },
  { label: "Walk-Away Safe", detail: "Under total loss of coolant flow, the reactor shuts itself down on its own." },
];

export function SafetySection() {
  return (
    <section
      id="safety"
      style={{
        position: "relative",
        padding: "96px 2rem",
        background: "var(--color-bg)",
        overflow: "hidden",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      {/* Danger tape stripe */}
      <div className="danger-tape-bg" aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Warm glow */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(194,59,34,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="tag-label" style={{ color: "#C23B22", marginBottom: 16 }}>
            But Is It Safe?
          </p>
          <h2 style={{
            fontFamily: "var(--font-instrument-serif, serif)",
            fontSize: "clamp(32px, 4vw, 56px)",
            color: "#FFF8EE",
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: 20,
          }}>
            Addressing the Elephant in the Room
          </h2>
          <p style={{
            fontFamily: "var(--font-dm-sans, sans-serif)",
            fontSize: 16,
            color: "rgba(237,224,200,0.65)",
            lineHeight: 1.8,
            maxWidth: 680,
            margin: "0 auto",
          }}>
            Every nuclear accident in history — Three Mile Island, Chernobyl, Fukushima — involved water-cooled reactors with fundamentally different physics. FRKTL&apos;s HTGR is a completely different animal.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: 16,
          marginBottom: 48,
        }}>
          {POINTS.map((pt, i) => (
            <div key={i} style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderLeft: "3px solid #C23B22",
              borderRadius: 8,
              padding: "24px 22px",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                <span style={{
                  fontFamily: "var(--font-space-mono, monospace)",
                  fontSize: 14,
                  color: "#F5820A",
                  lineHeight: 1,
                  flexShrink: 0,
                  marginTop: 2,
                }}>✦</span>
                <p style={{
                  fontFamily: "var(--font-dm-sans, sans-serif)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#FFF8EE",
                  lineHeight: 1.3,
                }}>{pt.label}</p>
              </div>
              <p style={{
                fontFamily: "var(--font-dm-sans, sans-serif)",
                fontSize: 13,
                color: "rgba(237,224,200,0.6)",
                lineHeight: 1.7,
                paddingLeft: 26,
              }}>{pt.detail}</p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div style={{
          background: "rgba(194,59,34,0.07)",
          border: "1px solid rgba(194,59,34,0.3)",
          borderRadius: 12,
          padding: "32px 36px",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "var(--font-space-mono, monospace)",
            fontSize: 13,
            color: "#EDE0C8",
            lineHeight: 1.9,
            letterSpacing: "0.3px",
            maxWidth: 720,
            margin: "0 auto",
          }}>
            Under any credible design-basis scenario — including total loss of coolant flow — the fuel physically cannot reach failure temperature. The reactor shuts itself down through physics alone.
          </p>
          <p className="tag-label" style={{ color: "#F5820A", marginTop: 18, fontSize: 11 }}>
            NRC Part 53 — Designed for exactly this.
          </p>
        </div>
      </div>
    </section>
  );
}
