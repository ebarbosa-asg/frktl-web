"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseActiveSectionOptions {
  sectionIds: string[];
  threshold?: number; // default 0.15, matches original
}

export function useActiveSection({
  sectionIds,
  threshold = 0.15,
}: UseActiveSectionOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold }
    );

    sections.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [sectionIds, threshold]);

  const scrollToSection = useCallback(
    (index: number) => {
      const id = sectionIds[index];
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    },
    [sectionIds]
  );

  return { activeIndex, scrollToSection };
}
