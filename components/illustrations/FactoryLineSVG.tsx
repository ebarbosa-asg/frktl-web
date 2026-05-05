import { SVGIllustrationProps } from "@/types";

interface Station {
  x: number;
  label: [string, string];
  sub: string;
  color: string;
}

const stations: Station[] = [
  { x: 30, label: ["TRISO Fuel", "Fabrication"], sub: "BWXT", color: "var(--color-gold)" },
  { x: 145, label: ["Graphite Block", "Machining"], sub: "CNC Lines", color: "var(--color-teal-light)" },
  { x: 260, label: ["RPV Module", "Welding & NDE"], sub: "ASME III", color: "var(--color-orange)" },
  { x: 375, label: ["PCU Skid", "Integration"], sub: "sCO₂ Turbo", color: "var(--color-cyan)" },
  { x: 490, label: ["Factory", "Acceptance Test"], sub: "Full Systems", color: "var(--color-purple)" },
  { x: 605, label: ["Ship to", "Site"], sub: "Heavy-Haul", color: "var(--color-text-bright)" },
];

export function FactoryLineSVG({ animate }: SVGIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 260"
      style={{ width: "100%", maxWidth: 700 }}
      aria-hidden="true"
    >
      {/* Conveyor base track */}
      <line x1="30" y1="140" x2="690" y2="140" stroke="var(--color-slate)" strokeWidth="4" strokeLinecap="round" />
      {/* Animated dash */}
      <line
        x1="30"
        y1="140"
        x2="690"
        y2="140"
        stroke="var(--color-teal-dark)"
        strokeWidth="2"
        strokeDasharray="12 6"
        opacity={animate ? 1 : 0.3}
      >
        {animate && (
          <animate
            attributeName="stroke-dashoffset"
            values="0;-18"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
      </line>

      {stations.map((s, i) => (
        <g
          key={i}
          opacity={animate ? 1 : 0.2}
          style={{ transition: `opacity 0.5s ease ${i * 0.15}s` }}
        >
          <rect x={s.x} y="55" width="95" height="70" rx="8" fill="var(--color-dark-card)" stroke={s.color} strokeWidth="1.5" />
          <line x1={s.x + 47} y1="125" x2={s.x + 47} y2="140" stroke={s.color} strokeWidth="2" />
          <circle cx={s.x + 47} cy="140" r="5" fill="var(--color-dark)" stroke={s.color} strokeWidth="2" />
          {s.label.map((line, li) => (
            <text key={li} x={s.x + 47} y={75 + li * 14} textAnchor="middle" fill={s.color} fontSize="9" fontWeight="600">
              {line}
            </text>
          ))}
          <text x={s.x + 47} y="115" textAnchor="middle" fill="var(--color-text)" fontSize="8" opacity="0.7">
            {s.sub}
          </text>
          <circle cx={s.x + 47} cy="42" r="11" fill={s.color} opacity="0.15" />
          <text x={s.x + 47} y="46" textAnchor="middle" fill={s.color} fontSize="10" fontWeight="700">
            {i + 1}
          </text>
        </g>
      ))}

      {animate && (
        <rect width="20" height="14" rx="3" fill="var(--color-teal)" opacity="0.9">
          <animateMotion dur="6s" repeatCount="indefinite" path="M 30 133 L 690 133" />
        </rect>
      )}

      <text x="360" y="175" textAnchor="middle" fill="var(--color-text)" fontSize="10" fontWeight="500">
        Parallel Production Lines — Multiple Units Simultaneously
      </text>
      <g opacity={animate ? 0.8 : 0}>
        <rect x="140" y="195" width="180" height="28" rx="6" fill="var(--color-dark-card)" stroke="var(--color-teal-dark)" strokeWidth="1" />
        <text x="230" y="213" textAnchor="middle" fill="var(--color-cyan)" fontSize="10" fontWeight="600">
          Factory Build: ~12–18 Months
        </text>
        <rect x="400" y="195" width="180" height="28" rx="6" fill="var(--color-dark-card)" stroke="var(--color-teal-dark)" strokeWidth="1" />
        <text x="490" y="213" textAnchor="middle" fill="var(--color-gold)" fontSize="10" fontWeight="600">
          Site Assembly: ~3–6 Months
        </text>
      </g>
      <text x="360" y="250" textAnchor="middle" fill="var(--color-teal-light)" fontSize="11" fontWeight="700">
        vs. Traditional Nuclear: 10–15 YEARS site construction
      </text>
    </svg>
  );
}
