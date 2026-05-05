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
  { y: 20,  label: "Reactor Pressure Vessel",       dim: "~3.5m dia × 10m",     ship: "Oversize flatbed / rail",    color: "var(--color-atomic-orange)", w: 280 },
  { y: 78,  label: "sCO₂ Turbine-Generator Skid",   dim: "~2.4m × 6m",          ship: "Standard heavy-haul truck",  color: "var(--color-cyan)",          w: 220 },
  { y: 136, label: "Recuperator + Heat Exchangers",  dim: "Modular sub-units",    ship: "1–2 standard flatbeds",     color: "var(--color-teal-light)",    w: 200 },
  { y: 194, label: "Control & Electrical Systems",   dim: "Standard ISO containers", ship: "Standard container truck", color: "var(--color-gold)",         w: 160 },
  { y: 252, label: "Fuel Handling & Aux Systems",    dim: "Containerized modules", ship: "Standard container truck", color: "var(--color-purple)",        w: 180 },
];

export function ModularShippingSVG({ animate }: SVGIllustrationProps) {
  return (
    <svg
      viewBox="0 0 600 320"
      style={{ width: "100%", maxWidth: 560 }}
      aria-hidden="true"
    >
      {modules.map((m, i) => (
        <g
          key={i}
          opacity={animate ? 1 : 0.15}
          style={{ transition: `opacity 0.5s ease ${i * 0.12}s` }}
        >
          {/* Module bar */}
          <rect
            x="20"
            y={m.y}
            width={m.w}
            height="44"
            rx="8"
            fill="var(--color-dark-card)"
            stroke={m.color}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Left accent */}
          <rect
            x="20"
            y={m.y}
            width="6"
            height="44"
            rx="4"
            fill={m.color}
            opacity="0.6"
          />
          {/* Label */}
          <text
            x="36"
            y={m.y + 18}
            fill={m.color}
            fontSize="10"
            fontWeight="700"
            fontFamily="var(--font-space-mono, monospace)"
          >
            {m.label}
          </text>
          <text
            x="36"
            y={m.y + 33}
            fill="var(--color-text)"
            fontSize="8"
            opacity="0.75"
            fontFamily="var(--font-dm-sans, sans-serif)"
          >
            {m.dim}
          </text>
          {/* Shipping note */}
          <text
            x={m.w + 36}
            y={m.y + 26}
            fill="var(--color-steel)"
            fontSize="9"
            fontFamily="var(--font-dm-sans, sans-serif)"
          >
            &#x2192; {m.ship}
          </text>
        </g>
      ))}

      <text
        x="300"
        y="308"
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize="10"
        fontFamily="var(--font-dm-sans, sans-serif)"
      >
        All components designed within road/rail transport envelopes
      </text>
    </svg>
  );
}
