"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/* Nuclear Balloon SVG — inspired by rounded reactor-tower balloon shapes */
function NuclearBalloonScene() {
  return (
    <svg
      viewBox="0 0 480 520"
      width="100%"
      height="100%"
      style={{ maxWidth: 520, display: "block" }}
      aria-hidden="true"
    >
      <defs>
        {/* Balloon gradient — warm sage + cream */}
        <radialGradient id="ballA" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#C8E8D0" />
          <stop offset="55%" stopColor="#7DAF8F" />
          <stop offset="100%" stopColor="#3D7055" />
        </radialGradient>
        <radialGradient id="ballB" cx="40%" cy="28%" r="60%">
          <stop offset="0%" stopColor="#F0DEB8" />
          <stop offset="55%" stopColor="#C8A06A" />
          <stop offset="100%" stopColor="#8A6030" />
        </radialGradient>
        <radialGradient id="ballC" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#F5C8A0" />
          <stop offset="50%" stopColor="#E07840" />
          <stop offset="100%" stopColor="#8B3A10" />
        </radialGradient>
        {/* Ring stripe gradient */}
        <linearGradient id="stripeA" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3D7055" stopOpacity="0.6"/>
          <stop offset="50%" stopColor="#3D7055" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#3D7055" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="stripeB" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8A6030" stopOpacity="0.6"/>
          <stop offset="50%" stopColor="#8A6030" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#8A6030" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="stripeC" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B3A10" stopOpacity="0.6"/>
          <stop offset="50%" stopColor="#8B3A10" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#8B3A10" stopOpacity="0.6"/>
        </linearGradient>
        {/* Ambient glow behind balloons */}
        <radialGradient id="glowAmber" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5820A" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#F5820A" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowSage" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7DAF8F" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#7DAF8F" stopOpacity="0"/>
        </radialGradient>
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Background ambient glows */}
      <ellipse cx="160" cy="220" rx="130" ry="180" fill="url(#glowSage)" filter="url(#softBlur)" />
      <ellipse cx="340" cy="260" rx="110" ry="150" fill="url(#glowAmber)" filter="url(#softBlur)" />

      {/* ─── Balloon A (left, sage green — tallest) ─── */}
      <g style={{ animation: "floatB 6s ease-in-out infinite" }}>
        {/* Main body — rounded reactor cylinder */}
        <ellipse cx="150" cy="185" rx="62" ry="85" fill="url(#ballA)" />
        {/* Dome cap top */}
        <ellipse cx="150" cy="104" rx="62" ry="28" fill="#C8E8D0" />
        {/* Dome cap bottom knot */}
        <ellipse cx="150" cy="268" rx="62" ry="22" fill="#2A5040" />
        {/* Rings — cooling stripe detail */}
        {[130, 160, 190, 220].map((y, i) => (
          <rect key={i} x="88" y={y} width="124" height="7" rx="3.5" fill="url(#stripeA)" opacity={0.55} />
        ))}
        {/* Highlight sheen */}
        <ellipse cx="122" cy="145" rx="18" ry="32" fill="white" opacity="0.12" />
        {/* Knot/string attachment point */}
        <ellipse cx="150" cy="290" rx="10" ry="5" fill="#1A3028" />
        {/* String */}
        <path d="M150 295 Q148 340 152 390" stroke="#3D7055" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="4,3"/>
      </g>

      {/* ─── Balloon B (center, warm cream/gold — medium) ─── */}
      <g style={{ animation: "float 5s ease-in-out infinite", animationDelay: "-2s" }}>
        <ellipse cx="268" cy="210" rx="52" ry="72" fill="url(#ballB)" />
        <ellipse cx="268" cy="141" rx="52" ry="23" fill="#F0DEB8" />
        <ellipse cx="268" cy="281" rx="52" ry="19" fill="#5A3A10" />
        {[173, 200, 228, 255].map((y, i) => (
          <rect key={i} x="216" y={y} width="104" height="6" rx="3" fill="url(#stripeB)" opacity={0.5} />
        ))}
        <ellipse cx="246" cy="175" rx="15" ry="26" fill="white" opacity="0.13" />
        <ellipse cx="268" cy="300" rx="8" ry="4" fill="#3A2008" />
        <path d="M268 304 Q272 348 265 400" stroke="#C8A06A" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="4,3"/>
      </g>

      {/* ─── Balloon C (right, amber/rust — smallest) ─── */}
      <g style={{ animation: "floatC 7s ease-in-out infinite", animationDelay: "-4s" }}>
        <ellipse cx="372" cy="235" rx="44" ry="62" fill="url(#ballC)" />
        <ellipse cx="372" cy="175" rx="44" ry="20" fill="#F5C8A0" />
        <ellipse cx="372" cy="296" rx="44" ry="17" fill="#4A1A05" />
        {[200, 225, 250, 273].map((y, i) => (
          <rect key={i} x="328" y={y} width="88" height="5" rx="2.5" fill="url(#stripeC)" opacity={0.5} />
        ))}
        <ellipse cx="354" cy="202" rx="13" ry="22" fill="white" opacity="0.12" />
        <ellipse cx="372" cy="313" rx="7" ry="3.5" fill="#2A0D02" />
        <path d="M372 317 Q368 358 374 408" stroke="#E07840" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="4,3"/>
      </g>

      {/* ─── Ground: pine tree silhouettes ─── */}
      <g opacity="0.5">
        {/* Left cluster */}
        <polygon points="45,430 60,395 75,430" fill="#1A2A1A" />
        <polygon points="55,445 72,400 89,445" fill="#1E301E" />
        <polygon points="68,438 82,408 96,438" fill="#1A2A1A" />
        {/* Right cluster */}
        <polygon points="380,440 393,408 406,440" fill="#1A2A1A" />
        <polygon points="400,448 415,412 430,448" fill="#1E301E" />
        <polygon points="418,435 430,406 442,435" fill="#1A2A1A" />
        {/* Center sparse */}
        <polygon points="220,452 230,428 240,452" fill="#1A2A1A" opacity="0.6"/>
        <polygon points="295,448 307,420 319,448" fill="#1A2A1A" opacity="0.7"/>
        {/* Ground line */}
        <rect x="20" y="452" width="440" height="4" rx="2" fill="#1E301E" opacity="0.4" />
        <rect x="0" y="456" width="480" height="64" rx="0" fill="#0F1A0F" opacity="0.25" />
      </g>

      {/* Steam wisps from balloon tops */}
      {[[150,96],[268,133],[372,167]].map(([x,y],i) => (
        <g key={i} opacity="0.3">
          <path d={`M${x-8} ${y} Q${x-12} ${y-14} ${x-6} ${y-26}`} stroke="#E8D5B0" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d={`M${x} ${y-4} Q${x+6} ${y-18} ${x+2} ${y-32}`} stroke="#E8D5B0" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </g>
      ))}
    </svg>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY    = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <div
      ref={ref}
      id="hero"
      className="mesh-bg"
      style={{
        minHeight: "calc(100dvh - 72px)",
        display: "flex",
        alignItems: "center",
        padding: "80px 2rem 100px",
        position: "relative",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      {/* Extra warm glow behind visual */}
      <div
        style={{
          position: "absolute",
          right: "-5%",
          top: "5%",
          width: "55%",
          height: "90%",
          background: "radial-gradient(ellipse at 60% 40%, rgba(245,130,10,0.09) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Subtle grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(46,34,24,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(46,34,24,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.4,
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* ── Split layout container ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* ── Left: Text ── */}
        <motion.div style={{ y: textY }}>
          {/* Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#F5820A",
                boxShadow: "0 0 10px #F5820A",
                animation: "glow 2s ease-in-out infinite",
              }}
            />
            <span
              className="tag-label"
              style={{ color: "#F5820A" }}
            >
              FRKTL ENERGY
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-title"
            style={{ color: "#FFF8EE", marginBottom: 28 }}
          >
            Atoms.<br />
            Modules.<br />
            <em style={{ fontStyle: "italic", color: "#F5820A" }}>Power.</em>
          </h1>

          {/* Body */}
          <p
            style={{
              fontFamily: "var(--font-dm-sans, sans-serif)",
              fontSize: 17,
              color: "rgba(237,224,200,0.75)",
              lineHeight: 1.75,
              maxWidth: 480,
              marginBottom: 44,
            }}
          >
            Factory-built modular nuclear reactors — delivered by truck, assembled in months, running for decades on a thimble of fuel. Zero carbon. Any continent.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 36px",
                background: "#F5820A",
                color: "#0A0703",
                fontFamily: "var(--font-dm-sans, sans-serif)",
                fontWeight: 800,
                fontSize: 15,
                borderRadius: 8,
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#FAA020";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#F5820A";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Get in touch
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#fuel"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 32px",
                background: "rgba(245,130,10,0.08)",
                border: "1px solid rgba(245,130,10,0.3)",
                color: "#EDE0C8",
                fontFamily: "var(--font-dm-sans, sans-serif)",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 8,
                textDecoration: "none",
                letterSpacing: "0.03em",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,130,10,0.6)";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,130,10,0.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,130,10,0.3)";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,130,10,0.08)";
              }}
            >
              Explore the tech ↓
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "var(--color-muted)",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1px solid rgba(122,106,85,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "pulse 2s infinite",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M5 1v8M2 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-space-mono, monospace)",
                fontSize: 10,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Scroll to explore
            </span>
          </div>
        </motion.div>

        {/* ── Right: Nuclear Balloon Illustration ── */}
        <motion.div
          style={{ y: visualY, display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <NuclearBalloonScene />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, transparent, var(--color-bg))",
          pointerEvents: "none",
          zIndex: 5,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
