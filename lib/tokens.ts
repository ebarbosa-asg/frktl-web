// lib/tokens.ts
// Typed CSS custom property name constants.
// Use these instead of magic strings like "var(--color-teal)".

export const TOKENS = {
  teal: "var(--color-teal)",
  tealLight: "var(--color-teal-light)",
  tealDark: "var(--color-teal-dark)",
  cyan: "var(--color-cyan)",
  dark: "var(--color-dark)",
  darkMid: "var(--color-dark-mid)",
  darkCard: "var(--color-dark-card)",
  slate: "var(--color-slate)",
  text: "var(--color-text)",
  textBright: "var(--color-text-bright)",
  orange: "var(--color-orange)",
  gold: "var(--color-gold)",
  cream: "var(--color-cream)",
  steel: "var(--color-steel)",
  purple: "var(--color-purple)",
  green: "var(--color-green)",
  redSoft: "var(--color-red-soft)",
  // 50s atomic-age tokens (declared by T01 for T08)
  atomicOrange: "var(--color-atomic-orange)",
  atomicCream: "var(--color-atomic-cream)",
  atomicRust: "var(--color-atomic-rust)",
} as const;

export type TokenKey = keyof typeof TOKENS;
