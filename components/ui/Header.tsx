"use client";

import { useEffect, useState } from "react";
import { FRKTLWordmark } from "./FRKTLWordmark";
import { MobileNav } from "./MobileNav";
import { sections } from "@/data/sections";

const NAV_LINKS = [
  { label: "Technology", href: "#fuel" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "About", href: "#why" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
          background: scrolled ? "rgba(10,7,3,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(46,34,24,0.8)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 2rem",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Wordmark */}
          <a href="#" aria-label="FRKTL Energy — Back to top" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <FRKTLWordmark variant="light" size={110} />
          </a>

          {/* Desktop nav */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: 8 }}
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-dm-sans, sans-serif)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(237,224,200,0.7)",
                  textDecoration: "none",
                  padding: "8px 14px",
                  borderRadius: 6,
                  letterSpacing: "0.03em",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFF8EE";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,130,10,0.08)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(237,224,200,0.7)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}

            {/* CTA pill */}
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-dm-sans, sans-serif)",
                fontSize: 13,
                fontWeight: 700,
                color: "#0A0703",
                background: "#F5820A",
                textDecoration: "none",
                padding: "9px 20px",
                borderRadius: 6,
                letterSpacing: "0.04em",
                marginLeft: 8,
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#FAA020";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#F5820A";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Contact
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Mobile hamburger */}
            <div style={{ display: "none" }} className="mobile-nav-wrapper">
              <MobileNav sections={sections} />
            </div>
          </nav>
        </div>
      </header>

      {/* Spacer so content starts below fixed header */}
      <div style={{ height: 72 }} aria-hidden="true" />
    </>
  );
}
