"use client";

import { comparisonTable } from "@/data/comparison";

const FRKTL_WINS = new Set(["40–50%","~95%","Zero","No (physics)","Yes — modular","4–8 /line/yr","~7 yrs (program)"]);

export function ComparisonTable() {
  return (
    <section
      id="comparison"
      style={{
        padding: "96px 2rem",
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="tag-label" style={{ color: "#F5820A", marginBottom: 16 }}>
            Head-to-Head
          </p>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif, serif)",
              fontSize: "clamp(32px, 4vw, 56px)",
              color: "#FFF8EE",
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            How We Stack Up
          </h2>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: 520 }}>
            <thead>
              <tr>
                {comparisonTable.headers.map((header, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "14px 22px",
                      textAlign: i === 0 ? "left" : "center",
                      fontFamily: "var(--font-space-mono, monospace)",
                      fontSize: 10,
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      color: i === 2 ? "#F5820A" : "var(--color-muted)",
                      background: i === 2 ? "rgba(245,130,10,0.07)" : "var(--color-bg-alt)",
                      borderBottom: `2px solid ${i === 2 ? "#F5820A" : "var(--color-border-light)"}`,
                      borderTopLeftRadius: i === 0 ? 8 : 0,
                      borderTopRightRadius: i === comparisonTable.headers.length - 1 ? 8 : 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonTable.rows.map((row, i) => {
                const isLast = i === comparisonTable.rows.length - 1;
                const isFrktlWin = FRKTL_WINS.has(row.frktl);

                return (
                  <tr
                    key={i}
                    style={{ background: i % 2 === 0 ? "var(--color-bg-card)" : "var(--color-bg)" }}
                  >
                    {/* Feature */}
                    <td style={{
                      padding: "13px 22px",
                      fontFamily: "var(--font-dm-sans, sans-serif)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#FFF8EE",
                      borderBottom: isLast ? "none" : "1px solid var(--color-border)",
                      borderLeft: "1px solid var(--color-border)",
                      borderBottomLeftRadius: isLast ? 8 : 0,
                    }}>{row.feature}</td>

                    {/* LWR */}
                    <td style={{
                      padding: "13px 22px",
                      textAlign: "center",
                      fontFamily: "var(--font-space-mono, monospace)",
                      fontSize: 12,
                      color: "var(--color-muted)",
                      borderBottom: isLast ? "none" : "1px solid var(--color-border)",
                      borderLeft: "1px solid var(--color-border)",
                      borderRight: "1px solid var(--color-border)",
                    }}>{row.lwr}</td>

                    {/* FRKTL — highlighted column */}
                    <td style={{
                      padding: "13px 22px",
                      textAlign: "center",
                      fontFamily: "var(--font-space-mono, monospace)",
                      fontSize: 12,
                      fontWeight: 700,
                      color: isFrktlWin ? "#F5820A" : "#EDE0C8",
                      background: "rgba(245,130,10,0.06)",
                      borderBottom: isLast ? "none" : "1px solid rgba(245,130,10,0.12)",
                      borderLeft: "1px solid rgba(245,130,10,0.4)",
                      borderRight: "1px solid rgba(245,130,10,0.4)",
                    }}>{row.frktl}</td>

                    {/* Solar */}
                    <td style={{
                      padding: "13px 22px",
                      textAlign: "center",
                      fontFamily: "var(--font-space-mono, monospace)",
                      fontSize: 12,
                      color: "var(--color-muted)",
                      borderBottom: isLast ? "none" : "1px solid var(--color-border)",
                      borderLeft: "1px solid var(--color-border)",
                      borderRight: "1px solid var(--color-border)",
                      borderBottomRightRadius: isLast ? 8 : 0,
                    }}>{row.solar}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p style={{
          marginTop: 14,
          fontFamily: "var(--font-space-mono, monospace)",
          fontSize: 10,
          color: "var(--color-muted)",
          lineHeight: 1.6,
          letterSpacing: "0.5px",
          opacity: 0.7,
        }}>
          * {comparisonTable.footnote}
        </p>
      </div>
    </section>
  );
}
