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
  { x: 120, y: 50, label: "BWXT — Lynchburg, VA", desc: "TRISO fuel fabrication", color: "var(--color-gold)", r: 8 },
  { x: 280, y: 130, label: "INL — Idaho Falls, ID", desc: "NRIC testing, integral effects", color: "var(--color-orange)", r: 10 },
  { x: 180, y: 170, label: "FRKTL HQ — Austin, TX", desc: "Engineering, design, ops", color: "var(--color-cyan)", r: 10 },
  { x: 350, y: 80, label: "Sandia / NETL", desc: "sCO₂ test loops, DOE GAIN", color: "var(--color-teal-light)", r: 7 },
  { x: 450, y: 160, label: "Factory Site — TBD", desc: "Module production facility", color: "var(--color-green)", r: 9 },
  { x: 500, y: 60, label: "NRC — Rockville, MD", desc: "Part 53 licensing", color: "var(--color-purple)", r: 7 },
];

export function FacilityMapSVG({ animate }: SVGIllustrationProps) {
  return (
    <svg
      viewBox="0 0 600 260"
      style={{ width: "100%", maxWidth: 580 }}
      aria-hidden="true"
    >
      {/* Connection lines from HQ */}
      {animate && (
        <>
          <line x1="180" y1="170" x2="120" y2="50" stroke="var(--color-slate)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <line x1="180" y1="170" x2="280" y2="130" stroke="var(--color-slate)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <line x1="180" y1="170" x2="350" y2="80" stroke="var(--color-slate)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <line x1="180" y1="170" x2="450" y2="160" stroke="var(--color-slate)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <line x1="180" y1="170" x2="500" y2="60" stroke="var(--color-slate)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <line x1="280" y1="130" x2="350" y2="80" stroke="var(--color-slate)" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />
        </>
      )}

      {sites.map((s, i) => (
        <g
          key={i}
          opacity={animate ? 1 : 0.12}
          style={{ transition: `opacity 0.5s ease ${i * 0.1}s` }}
        >
          <circle cx={s.x} cy={s.y} r={s.r} fill={s.color} opacity="0.2" />
          <circle cx={s.x} cy={s.y} r={s.r * 0.6} fill={s.color} />
          {/* HQ pulse ring */}
          {animate && i === 2 && (
            <circle cx={s.x} cy={s.y} r={s.r} fill="none" stroke={s.color} strokeWidth="1" opacity="0.5">
              <animate
                attributeName="r"
                values={`${s.r};${s.r + 6};${s.r}`}
                dur="2s"
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
          <text x={s.x} y={s.y + s.r + 14} textAnchor="middle" fill={s.color} fontSize="8.5" fontWeight="700">
            {s.label}
          </text>
          <text x={s.x} y={s.y + s.r + 26} textAnchor="middle" fill="var(--color-text)" fontSize="7.5" opacity="0.7">
            {s.desc}
          </text>
        </g>
      ))}

      <text x="300" y="248" textAnchor="middle" fill="var(--color-text)" fontSize="9">
        Distributed model — FRKTL coordinates, specialists execute
      </text>
    </svg>
  );
}
