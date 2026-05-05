interface AtomicStarburstProps {
  points?: number; // Default 8
  innerRadius?: number; // Default 40
  outerRadius?: number; // Default 60
  color?: string; // Default var(--color-orange)
  opacity?: number; // Default 0.15
  size?: number; // SVG size in px, default 120
  className?: string;
  style?: React.CSSProperties;
}

export function AtomicStarburst({
  points = 8,
  innerRadius = 40,
  outerRadius = 60,
  color = "var(--color-orange)",
  opacity = 0.15,
  size = 120,
  className,
  style,
}: AtomicStarburstProps) {
  const cx = 100;
  const cy = 100;
  const viewSize = 200;

  // Generate starburst points — alternating outer/inner radius
  const pathPoints: [number, number][] = [];
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    pathPoints.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
  }

  const d =
    pathPoints
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
      .join(" ") + " Z";

  return (
    <svg
      viewBox={`0 0 ${viewSize} ${viewSize}`}
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={d} fill={color} opacity={opacity} />
    </svg>
  );
}
