"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface SectionWrapperProps {
  children: (isInView: boolean) => React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

// Variants for staggered children (used by sections with multiple cards/items)
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

export function SectionWrapper({ children, className, id, style }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Children receive the isInView boolean to pass to SVG components as animate prop */}
      {children(isInView)}
    </motion.section>
  );
}
