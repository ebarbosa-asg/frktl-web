"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { HeroScene } from "@/components/HeroScene";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background glow moves at 0.3× scroll rate (subtle parallax)
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div
      ref={ref}
      id="hero"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
        background: "var(--color-dark)",
      }}
    >
      {/* Spline 3D scene fills the background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.7,
        }}
      >
        <HeroScene className="w-full h-full" />
      </div>

      {/* Parallax background glow — overlays the scene */}
      <motion.div
        style={{
          y: glowY,
          background: "radial-gradient(circle, var(--color-teal) 0%, transparent 70%)",
          opacity: 0.08,
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Hero content — above background layers */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Hex logo mark */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-teal), var(--color-cyan))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            boxShadow: "0 0 40px rgba(13,115,119,0.4)",
            animation: "float 4s ease-in-out infinite",
          }}
        >
          <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
            <polygon points="20,4 36,14 36,26 20,36 4,26 4,14" fill="none" stroke="#fff" strokeWidth="2" />
            <circle cx="20" cy="20" r="5" fill="#fff" />
          </svg>
        </div>

        {/* Tag label */}
        <p
          className="tag-label"
          style={{ color: "var(--color-cyan)", marginBottom: 16 }}
        >
          FRKTL ENERGY
        </p>

        {/* Hero headline — T08 will apply .hero-title class */}
        <h1
          className="hero-title"
          style={{
            fontSize: "clamp(32px, 5.5vw, 60px)",
            color: "var(--color-text-bright)",
            maxWidth: 720,
            marginBottom: 20,
            fontFamily: "var(--font-instrument-serif, serif)",
            fontWeight: 400,
            lineHeight: 1.1,
          }}
        >
          How We Turn Atoms Into Clean Energy
        </h1>

        <p
          style={{
            fontFamily: "var(--font-dm-sans, sans-serif)",
            fontSize: 16,
            color: "var(--color-text)",
            maxWidth: 560,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          From fuel particles to factory production to first criticality — the complete technical and operational roadmap for FRKTL&apos;s modular nuclear reactor.
        </p>

        <div style={{ display: "flex", gap: 4, marginBottom: 40 }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 32,
                height: 3,
                borderRadius: 2,
                background: "var(--color-teal-light)",
                opacity: 0.3 + i * 0.15,
              }}
            />
          ))}
        </div>

        <div
          style={{
            color: "var(--color-steel)",
            fontSize: 13,
            animation: "pulse 2s infinite",
            letterSpacing: "2px",
          }}
        >
          ↓ SCROLL TO EXPLORE
        </div>
      </div>
    </div>
  );
}
