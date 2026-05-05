import { SVGIllustrationProps } from "@/types";

interface ShipModule {
  y: number;
  label: string;
  dim: string;
  ship: string;
  color: string;
  w: number;
}

const modules: ShipModule[] = [
  { y: 20, label: "Reactor Pressure Vessel", dim: "~3.5m dia × 10m", ship: "Oversize flatbed / rail", color: "var(--color-orange)", w: 280 },
  { y: 75, label: "sCO₂ Turbine-Generator Skid", dim: "~2.4m × 6m", ship: "Standard heavy-haul truck", color: "var(--color-cyan)", w: 220 },
  { y: 130, label: "Recuperator + Heat Exchangers", dim: "Modular sub-units", ship: "1–2 standard flatbeds", color: "var(--color-teal-light)", w: 200 },
  { y: 185, label: "Control & Electrical Systems", dim: "Standard ISO containers", ship: "Standard container truck", color: "var(--color-gold)", w: 160 },
  { y: 240, label: "Fuel Handling & Aux Systems", dim: "Containerized modules", ship: "Standard container truck", color: "var(--color-purple)", w: 180 },
];

export function ModularShippingSVG({ animate }: SVGIllustrationProps) {
  return (
    <svg
      viewBox="0 0 600 310"
      style={{ width: "100%", maxWidth: 560 }}
      aria-hidden="true"
    >
      {modules.map((m, i) => (
        <g
          key={i}
          opacity={animate ? 1 : 0.15}
          style={{ transition: `opacity 0.5s ease ${i * 0.12}s` }}
        >
          <rect
            x="20"
            y={m.y}
            width={m.w}
            height="40"
            rx="6"
            fill="var(--color-dark-card)"
            stroke={m.color}
            strokeWidth="1.5"
          />
          <text x="30" y={m.y + 17} fill={m.color} fontSize="10" fontWeight="700">
            {m.label}
          </text>
          <text x="30" y={m.y + 31} fill="var(--color-text)" fontSize="8" opacity="0.7">
            {m.dim}
          </text>
          <text x={m.w + 40} y={m.y + 24} fill="var(--color-steel)" fontSize="9">
            → {m.ship}
          </text>
        </g>
      ))}
      <text x="300" y="295" textAnchor="middle" fill="var(--color-text)" fontSize="10">
        All components designed within road/rail transport envelopes
      </text>
    </svg>
  );
}
