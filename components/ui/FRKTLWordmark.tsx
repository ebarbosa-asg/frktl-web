"use client";

interface FRKTLWordmarkProps {
  variant?: "light" | "amber" | "dark";
  size?: number;
  className?: string;
  showMark?: boolean;
}

const PALETTE = {
  light: { primary: "#FFF8EE", accent: "#F5820A", dim: "rgba(255,248,238,0.35)" },
  amber: { primary: "#F5820A", accent: "#F5C518", dim: "rgba(245,130,10,0.35)" },
  dark:  { primary: "#0A0703", accent: "#C23B22", dim: "rgba(10,7,3,0.35)" },
} as const;

/* Hex module mark — 7 hexagons (flower honeycomb) converging around negative-space energy core */
function HexMark({ color, accent, size = 36 }: { color: string; accent: string; size?: number }) {
  const r = size / 2;
  const hr = r * 0.3;   // hex tile outer radius
  const gap = hr * 2.05; // center-to-center spacing

  /* Center + 6 surrounding positions */
  const positions = [
    { x: r, y: r },                                              // center
    { x: r + gap, y: r },                                        // right
    { x: r + gap * 0.5, y: r - gap * 0.866 },                   // top-right
    { x: r - gap * 0.5, y: r - gap * 0.866 },                   // top-left
    { x: r - gap, y: r },                                        // left
    { x: r - gap * 0.5, y: r + gap * 0.866 },                   // bottom-left
    { x: r + gap * 0.5, y: r + gap * 0.866 },                   // bottom-right
  ];

  const hexPath = (cx: number, cy: number, ir: number) => {
    const pts = Array.from({ length: 6 }, (_, k) => {
      const a = (Math.PI / 180) * (60 * k - 30);
      return `${cx + ir * Math.cos(a)},${cy + ir * Math.sin(a)}`;
    });
    return `M ${pts[0]} ${pts.slice(1).map(p => `L ${p}`).join(" ")} Z`;
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
      <defs>
        <radialGradient id="hexGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer 6 hex tiles — filled, slightly transparent */}
      {positions.slice(1).map((p, i) => (
        <path
          key={i}
          d={hexPath(p.x, p.y, hr * 0.88)}
          fill={color}
          opacity={0.18 + i * 0.02}
        />
      ))}

      {/* Outer 6 hex tiles — stroked */}
      {positions.slice(1).map((p, i) => (
        <path
          key={`s${i}`}
          d={hexPath(p.x, p.y, hr * 0.88)}
          fill="none"
          stroke={color}
          strokeWidth={hr * 0.12}
          opacity={0.7}
        />
      ))}

      {/* Center hex — brighter, solid */}
      <path
        d={hexPath(positions[0].x, positions[0].y, hr * 0.88)}
        fill={color}
        opacity={0.55}
      />
      <path
        d={hexPath(positions[0].x, positions[0].y, hr * 0.88)}
        fill="none"
        stroke={color}
        strokeWidth={hr * 0.15}
      />

      {/* Energy core glow — negative space spark */}
      <circle cx={r} cy={r} r={hr * 0.32} fill={`url(#hexGlow)`} />
      <circle cx={r} cy={r} r={hr * 0.14} fill={accent} />
    </svg>
  );
}

export function FRKTLWordmark({
  variant = "light",
  size = 160,
  className,
  showMark = true,
}: FRKTLWordmarkProps) {
  const { primary: color, accent, dim } = PALETTE[variant];
  const height = size / 4;
  const markSize = height * 1.1;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: Math.max(8, size * 0.055),
      }}
    >
      {showMark && <HexMark color={color} accent={accent} size={markSize} />}

      {/* Wordmark SVG */}
      <svg
        viewBox="0 0 134 32"
        width={size}
        height={height}
        aria-label="FRKTL Energy"
        role="img"
      >
        {/* F */}
        <path d="M 0 4 L 0 28 M 0 4 L 18 4 M 0 16 L 14 16" stroke={color} strokeWidth="3.2" strokeLinecap="square" fill="none" />
        {/* R */}
        <path d="M 24 4 L 24 28 M 24 4 L 36 4 Q 42 4 42 11 Q 42 18 36 18 L 24 18 M 33 18 L 42 28" stroke={color} strokeWidth="3.2" strokeLinecap="square" fill="none" />
        {/* K */}
        <path d="M 48 4 L 48 28 M 48 16 L 60 4 M 50 14 L 60 28" stroke={color} strokeWidth="3.2" strokeLinecap="square" fill="none" />
        {/* T */}
        <path d="M 66 4 L 84 4 M 75 4 L 75 28" stroke={color} strokeWidth="3.2" strokeLinecap="square" fill="none" />
        {/* L */}
        <path d="M 90 4 L 90 28 L 108 28" stroke={color} strokeWidth="3.2" strokeLinecap="square" fill="none" />

        {/* Accent dot — energy spark after L */}
        <circle cx="114" cy="24" r="2.5" fill={accent} />
        <circle cx="122" cy="24" r="1.8" fill={accent} opacity="0.6" />
        <circle cx="128" cy="24" r="1.2" fill={accent} opacity="0.35" />

        {/* Underline wave */}
        <path d="M 0 31 Q 54 33 108 31" stroke={dim} strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  );
}

export default FRKTLWordmark;
