import { SVGIllustrationProps } from "@/types";

interface Site {
  x: number;
  y: number;
  label: string;
  desc: string;
  color: string;
  r: number;
}

const sites: Site[] = [
  { x: 120, y: 50,  label: "BWXT — Lynchburg, VA", desc: "TRISO fuel fabrication",       color: "var(--color-gold)",          r: 9 },
  { x: 280, y: 130, label: "INL — Idaho Falls, ID",  desc: "NRIC testing, integral effects", color: "var(--color-atomic-orange)", r: 11 },
  { x: 180, y: 175, label: "FRKTL HQ — Austin, TX",  desc: "Engineering, design, ops",      color: "var(--color-cyan)",          r: 12 },
  { x: 355, y: 82,  label: "Sandia / NETL",           desc: "sCO₂ test loops, DOE GAIN",     color: "var(--color-teal-light)",   r: 8 },
  { x: 455, y: 162, label: "Factory Site — TBD",      desc: "Module production facility",    color: "var(--color-green)",         r: 10 },
  { x: 505, y: 60,  label: "NRC — Rockville, MD",     desc: "Part 53 licensing",             color: "var(--color-purple)",        r: 8 },
];

export function FacilityMapSVG({ animate }: SVGIllustrationProps) {
  return (
    <svg
      viewBox="0 0 600 265"
      style={{ width: "100%", maxWidth: 580 }}
      aria-hidden="true"
    >
      {/* Connection lines from HQ (index 2) */}
      {animate && (
        <>
          <line x1="180" y1="175" x2="120" y2="50"  stroke="var(--color-slate)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.35" />
          <line x1="180" y1="175" x2="280" y2="130" stroke="var(--color-slate)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.35" />
          <line x1="180" y1="175" x2="355" y2="82"  stroke="var(--color-slate)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.35" />
          <line x1="180" y1="175" x2="455" y2="162" stroke="var(--color-slate)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.35" />
          <line x1="180" y1="175" x2="505" y2="60"  stroke="var(--color-slate)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.35" />
          <line x1="280" y1="130" x2="355" y2="82"  stroke="var(--color-slate)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" opacity="0.22" />
        </>
      )}

      {sites.map((s, i) => (
        <g
          key={i}
          opacity={animate ? 1 : 0.12}
          style={{ transition: `opacity 0.5s ease ${i * 0.1}s` }}
        >
          {/* Outer glow */}
          <circle cx={s.x} cy={s.y} r={s.r + 5} fill={s.color} opacity="0.12" />
          {/* Inner dot */}
          <circle
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="var(--color-dark-card)"
            stroke={s.color}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx={s.x} cy={s.y} r={s.r * 0.5} fill={s.color} />

          {/* HQ pulse ring */}
          {animate && i === 2 && (
            <circle
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="none"
              stroke={s.color}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
            >
              <animate
                attributeName="r"
                values={`${s.r};${s.r + 8};${s.r}`}
                dur="2s"
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Site label */}
          <text
            x={s.x}
            y={s.y + s.r + 16}
            textAnchor="middle"
            fill={s.color}
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-space-mono, monospace)"
          >
            {s.label}
          </text>
          <text
            x={s.x}
            y={s.y + s.r + 28}
            textAnchor="middle"
            fill="var(--color-text)"
            fontSize="7.5"
            opacity="0.75"
            fontFamily="var(--font-dm-sans, sans-serif)"
          >
            {s.desc}
          </text>
        </g>
      ))}

      <text
        x="300"
        y="252"
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize="9"
        fontFamily="var(--font-dm-sans, sans-serif)"
      >
        Distributed model — FRKTL coordinates, specialists execute
      </text>
    </svg>
  );
}
