"use client";

interface FRKTLWordmarkProps {
  variant?: "light" | "orange" | "dark";
  size?: number; // Width in pixels, default 160
  className?: string;
}

const VARIANT_COLORS = {
  light: "#e8f4f8",
  orange: "#e8521a",
  dark: "#0a1628",
} as const;

export function FRKTLWordmark({
  variant = "light",
  size = 160,
  className,
}: FRKTLWordmarkProps) {
  const color = VARIANT_COLORS[variant];
  const height = size / 4;

  return (
    <svg
      viewBox="0 0 160 40"
      width={size}
      height={height}
      className={className}
      aria-label="FRKTL Energy"
      role="img"
    >
      {/* Hexagon mark — references prismatic fuel block geometry */}
      {/* Outer hex */}
      <polygon
        points="8,20 14,9 26,9 32,20 26,31 14,31"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* UCO kernel dot */}
      <circle cx="20" cy="20" r="3" fill={color} />
      {/* Small orbit ring */}
      <ellipse
        cx="20"
        cy="20"
        rx="7"
        ry="3.5"
        fill="none"
        stroke={color}
        strokeWidth="0.75"
        opacity="0.6"
        transform="rotate(-30 20 20)"
      />

      {/* F — two horizontal bars, vertical stem */}
      <path
        d="M 42 10 L 42 30 M 42 10 L 56 10 M 42 19 L 54 19"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="square"
        fill="none"
      />

      {/* R — rounded arch top right, diagonal leg */}
      <path
        d="M 62 10 L 62 30 M 62 10 L 72 10 Q 77 10 77 16 Q 77 22 72 22 L 62 22 M 70 22 L 77 30"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="square"
        fill="none"
      />

      {/* K — vertical, upper diagonal in, lower diagonal out */}
      <path
        d="M 83 10 L 83 30 M 83 20 L 94 10 M 85 18 L 94 30"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="square"
        fill="none"
      />

      {/* T — crossbar and vertical drop */}
      <path
        d="M 100 10 L 114 10 M 107 10 L 107 30"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="square"
        fill="none"
      />

      {/* L — vertical with bottom foot */}
      <path
        d="M 120 10 L 120 30 L 134 30"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="square"
        fill="none"
      />

      {/* Energy underline accent — fission-wave motif */}
      <path
        d="M 42 33 Q 75 36 107 33 Q 125 31 134 33"
        stroke={color}
        strokeWidth="0.75"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

export default FRKTLWordmark;
