"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface SectionWrapperProps {
  children: (isInView: boolean) => React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

export function SectionWrapper({ children, className, id, style }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  // isInView passed to children for SVG animate props only — section itself is always visible
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={style}
    >
      {children(isInView)}
    </section>
  );
}
