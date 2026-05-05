"use client";

import { comparisonTable } from "@/data/comparison";

export function ComparisonTable() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "var(--color-dark)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p
            className="tag-label"
            style={{ color: "var(--color-orange)", marginBottom: 16 }}
          >
            HEAD-TO-HEAD
          </p>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif, serif)",
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "var(--color-text-bright)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            How We Stack Up
          </h2>
        </div>

        {/* Table wrapper — horizontal scroll on mobile */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              minWidth: 520,
            }}
          >
            {/* Column headers */}
            <thead>
              <tr>
                {comparisonTable.headers.map((header, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "14px 20px",
                      textAlign: i === 0 ? "left" : "center",
                      fontFamily: "var(--font-space-mono, monospace)",
                      fontSize: 11,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: i === 2 ? "var(--color-cyan)" : "var(--color-steel)",
                      background:
                        i === 2
                          ? "rgba(0,212,170,0.06)"
                          : "var(--color-dark-mid)",
                      borderBottom: "2px solid",
                      borderColor: i === 2 ? "var(--color-teal)" : "var(--color-slate)",
                      borderTopLeftRadius: i === 0 ? 8 : 0,
                      borderTopRightRadius:
                        i === comparisonTable.headers.length - 1 ? 8 : 0,
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {comparisonTable.rows.map((row, i) => {
                const isLast = i === comparisonTable.rows.length - 1;
                const values = [row.lwr, row.frktl, row.solar];

                // Mark FRKTL (col 2) wins
                const isFrktlWin = (val: string) =>
                  val === row.frktl &&
                  (val.includes("Yes") ||
                    val.includes("Zero") ||
                    val.includes("No (physics)") ||
                    val.includes("Yes —") ||
                    val.includes("4–8") ||
                    val.includes("40–50") ||
                    val.includes("~95"));

                return (
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0 ? "var(--color-dark-card)" : "var(--color-dark)",
                    }}
                  >
                    {/* Feature name */}
                    <td
                      style={{
                        padding: "14px 20px",
                        fontFamily: "var(--font-dm-sans, sans-serif)",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--color-text-bright)",
                        borderBottom: isLast
                          ? "none"
                          : "1px solid var(--color-slate)",
                        borderLeft: "1px solid var(--color-slate)",
                        borderBottomLeftRadius: isLast ? 8 : 0,
                      }}
                    >
                      {row.feature}
                    </td>

                    {/* LWR */}
                    <td
                      style={{
                        padding: "14px 20px",
                        textAlign: "center",
                        fontFamily: "var(--font-space-mono, monospace)",
                        fontSize: 12,
                        color: "var(--color-steel)",
                        borderBottom: isLast
                          ? "none"
                          : "1px solid var(--color-slate)",
                        borderLeft: "1px solid var(--color-slate)",
                        borderRight: "1px solid var(--color-slate)",
                      }}
                    >
                      {row.lwr}
                    </td>

                    {/* FRKTL — highlighted */}
                    <td
                      style={{
                        padding: "14px 20px",
                        textAlign: "center",
                        fontFamily: "var(--font-space-mono, monospace)",
                        fontSize: 12,
                        fontWeight: 700,
                        color: isFrktlWin(row.frktl)
                          ? "var(--color-cyan)"
                          : "var(--color-text-bright)",
                        background: "rgba(0,212,170,0.06)",
                        borderBottom: isLast
                          ? "none"
                          : "1px solid rgba(0,212,170,0.15)",
                        borderLeft: "1px solid var(--color-teal)",
                        borderRight: "1px solid var(--color-teal)",
                      }}
                    >
                      {row.frktl}
                    </td>

                    {/* Solar */}
                    <td
                      style={{
                        padding: "14px 20px",
                        textAlign: "center",
                        fontFamily: "var(--font-space-mono, monospace)",
                        fontSize: 12,
                        color: "var(--color-steel)",
                        borderBottom: isLast
                          ? "none"
                          : "1px solid var(--color-slate)",
                        borderLeft: "1px solid var(--color-slate)",
                        borderRight: "1px solid var(--color-slate)",
                        borderBottomRightRadius: isLast ? 8 : 0,
                      }}
                    >
                      {row.solar}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <p
          style={{
            marginTop: 16,
            fontFamily: "var(--font-space-mono, monospace)",
            fontSize: 10,
            color: "var(--color-steel)",
            lineHeight: 1.6,
            letterSpacing: "0.5px",
          }}
        >
          * {comparisonTable.footnote}
        </p>
      </div>
    </section>
  );
}
