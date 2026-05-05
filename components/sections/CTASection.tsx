"use client";

import { motion } from "motion/react";

export function CTASection() {
  return (
    <section
      id="contact"
      className="mesh-bg"
      style={{
        position: "relative",
        padding: "120px 2rem",
        overflow: "hidden",
        background: "var(--color-bg-alt)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      {/* Warm gradient blob */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(245,130,10,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 720,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          className="tag-label"
          style={{ color: "#F5820A", marginBottom: 24 }}
        >
          Ready to Power the Future?
        </p>

        <h2
          style={{
            fontFamily: "var(--font-instrument-serif, serif)",
            fontSize: "clamp(48px, 7vw, 88px)",
            color: "#FFF8EE",
            fontWeight: 400,
            lineHeight: 1.0,
            marginBottom: 28,
          }}
        >
          Let&apos;s build it<br />
          <em style={{ color: "#F5820A", fontStyle: "italic" }}>together.</em>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-dm-sans, sans-serif)",
            fontSize: 17,
            color: "rgba(237,224,200,0.7)",
            lineHeight: 1.8,
            maxWidth: 560,
            margin: "0 auto 16px",
          }}
        >
          FRKTL is building the modular nuclear reactor that data centers, the DoD, and remote industrial customers have been waiting for.
        </p>

        <p
          style={{
            fontFamily: "var(--font-space-mono, monospace)",
            fontSize: 10,
            color: "var(--color-muted)",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            marginBottom: 48,
          }}
        >
          Investors · Partners · Customers
        </p>

        {/* Primary CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <motion.a
            href="mailto:eduardo@frktlpower.com"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Email Eduardo at FRKTL Energy"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "20px 56px",
              background: "#F5820A",
              color: "#0A0703",
              fontFamily: "var(--font-dm-sans, sans-serif)",
              fontWeight: 800,
              fontSize: 16,
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: "0.04em",
              boxShadow: "0 0 60px rgba(245,130,10,0.25)",
            }}
          >
            Contact Eduardo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>

          <a
            href="mailto:eduardo@frktlpower.com"
            style={{
              fontFamily: "var(--font-dm-sans, sans-serif)",
              fontSize: 13,
              color: "rgba(122,106,85,0.8)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(122,106,85,0.35)",
              paddingBottom: 2,
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#EDE0C8";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(237,224,200,0.5)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(122,106,85,0.8)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(122,106,85,0.35)";
            }}
          >
            eduardo@frktlpower.com
          </a>
        </div>
      </div>
    </section>
  );
}
