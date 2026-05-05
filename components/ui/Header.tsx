"use client";

import { useEffect, useState } from "react";
import { FRKTLWordmark } from "./FRKTLWordmark";
import { NavDots } from "./NavDots";
import { MobileNav } from "./MobileNav";
import { sections } from "@/data/sections";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Sticky top header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          width: "100%",
          transition: "background 0.3s, border-color 0.3s",
          background: scrolled ? "rgba(10,22,40,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-slate)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Wordmark */}
          <a href="#" aria-label="FRKTL Energy — Back to top" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <FRKTLWordmark variant="light" size={120} />
          </a>

          {/* Mobile hamburger */}
          <MobileNav sections={sections} />
        </div>
      </header>

      {/* Fixed dot navigation — desktop only */}
      <NavDots sections={sections} />
    </>
  );
}
