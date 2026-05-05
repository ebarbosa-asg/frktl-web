"use client";

import { motion } from "motion/react";

// AtomicStarburst will be imported from T08 — use inline fallback until T08 runs
function StarburstDecor({
  size,
  points,
  opacity,
  color,
  className,
}: {
  size: number;
  points: number;
  opacity: number;
  color: string;
  className?: string;
}) {
  const cx = 100;
  const cy = 100;
  const outerRadius = 60;
  const innerRadius = 36;
  const pathPoints: [number, number][] = [];
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    pathPoints.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
  }
  const d =
    pathPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ") + " Z";

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path d={d} fill={color} opacity={opacity} />
    </svg>
  );
}

export function CTASection() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "96px 24px",
        overflow: "hidden",
        background: "var(--color-dark-mid)",
      }}
    >
      {/* AtomicStarburst background decoration — large center */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <StarburstDecor
          points={16}
          color="var(--color-orange)"
          opacity={0.07}
          size={400}
        />
      </div>

      {/* Secondary starburst — top right */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 32,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <StarburstDecor
          points={8}
          color="var(--color-gold)"
          opacity={0.05}
          size={200}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <p
          className="tag-label"
          style={{
            color: "var(--color-orange)",
            marginBottom: 20,
            fontFamily: "var(--font-atomic-age, cursive)",
          }}
        >
          READY TO POWER THE FUTURE?
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-instrument-serif, serif)",
            fontSize: "clamp(40px, 6vw, 72px)",
            color: "var(--color-text-bright)",
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Get in touch.
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans, sans-serif)",
            fontSize: 16,
            color: "var(--color-text)",
            lineHeight: 1.85,
            maxWidth: 600,
            margin: "0 auto 24px",
          }}
        >
          FRKTL is building the modular nuclear reactor that data centers, the
          DoD, and remote industrial customers have been waiting for. If
          you&apos;re an investor, partner, or potential customer — we want to
          hear from you.
        </p>

        {/* Investor-specific line */}
        <p
          style={{
            fontFamily: "var(--font-space-mono, monospace)",
            fontSize: 11,
            color: "var(--color-steel)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          For deck requests and partnership inquiries.
        </p>

        {/* Primary CTA button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <motion.a
            href="mailto:eduardo@frktlpower.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Contact Eduardo at FRKTL Energy via email"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "18px 48px",
              background: "linear-gradient(135deg, var(--color-teal), var(--color-cyan))",
              color: "white",
              fontFamily: "var(--font-dm-sans, sans-serif)",
              fontWeight: 700,
              fontSize: 16,
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: "0.05em",
              boxShadow: "0 0 40px rgba(0,212,170,0.2)",
            }}
          >
            Contact Eduardo
          </motion.a>
        </div>

        {/* Secondary plain email link */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans, sans-serif)",
            fontSize: 13,
            color: "var(--color-steel)",
            marginTop: 4,
          }}
        >
          Or email directly:{" "}
          <a
            href="mailto:eduardo@frktlpower.com"
            style={{
              color: "var(--color-teal-light)",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            eduardo@frktlpower.com
          </a>
        </p>
      </div>
    </section>
  );
}
