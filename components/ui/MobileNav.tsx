"use client";

import { useState, useEffect, useCallback } from "react";
import { Section } from "@/types";

interface MobileNavProps {
  sections: Section[];
}

export function MobileNav({ sections }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const scrollToSection = (id: string) => {
    close();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        onClick={() => setIsOpen((v) => !v)}
        className="lg:hidden"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 40,
          height: 40,
          gap: 5,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span
          style={{
            display: "block",
            width: 24,
            height: 2,
            background: "var(--color-text-bright)",
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(45deg) translateY(7px)" : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: 24,
            height: 2,
            background: "var(--color-text-bright)",
            transition: "opacity 0.2s",
            opacity: isOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            display: "block",
            width: 24,
            height: 2,
            background: "var(--color-text-bright)",
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(-45deg) translateY(-7px)" : "none",
          }}
        />
      </button>

      {/* Full-screen overlay menu */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(10,22,40,0.96)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "1.5rem" }}>
            <button
              aria-label="Close navigation menu"
              onClick={close}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--color-text)",
                fontSize: 24,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
          <nav style={{ flex: 1, overflowY: "auto", padding: "0 2rem 2rem" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {sections.map((section, i) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 8px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      borderBottom: "1px solid var(--color-slate)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-space-mono, monospace)",
                        fontSize: 10,
                        color: "var(--color-steel)",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        marginRight: 8,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")} —
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans, sans-serif)",
                        color: "var(--color-text-bright)",
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                    >
                      {section.tag}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
