"use client";

import { Section } from "@/types";
import { useActiveSection } from "@/hooks/useActiveSection";

interface NavDotsProps {
  sections: Section[];
}

export function NavDots({ sections }: NavDotsProps) {
  const sectionIds = sections.map((s) => s.id);
  const { activeIndex, scrollToSection } = useActiveSection({ sectionIds });

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex-col gap-1.5 hidden lg:flex"
    >
      {sections.map((section, i) => (
        <button
          key={section.id}
          aria-label={`Navigate to ${section.tag}: ${section.title}`}
          aria-current={activeIndex === i ? "location" : undefined}
          onClick={() => scrollToSection(i)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              scrollToSection(i);
            }
          }}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            border: `1.5px solid ${activeIndex === i ? "var(--color-cyan)" : "var(--color-slate)"}`,
            background: activeIndex === i ? "var(--color-cyan)" : "transparent",
            cursor: "pointer",
            transition: "all 0.3s",
            transform: activeIndex === i ? "scale(1.5)" : "scale(1)",
            boxShadow: activeIndex === i ? "0 0 8px var(--color-cyan)" : "none",
            outline: "none",
          }}
        />
      ))}
    </nav>
  );
}
