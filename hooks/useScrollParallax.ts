"use client";

import { useScroll, useTransform, MotionValue } from "motion/react";
import { useRef, RefObject } from "react";

interface UseScrollParallaxOptions {
  speed?: number; // 0.3 = moves at 30% of scroll speed
  direction?: "y" | "x";
}

export function useScrollParallax(
  options: UseScrollParallaxOptions = {}
): {
  ref: RefObject<HTMLElement | null>;
  value: MotionValue<string>;
} {
  const { speed = 0.3, direction = "y" } = options;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const range = speed * 100;
  const value = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "y" ? [`0%`, `${range}%`] : [`0%`, `${range}%`]
  );

  return { ref, value };
}
