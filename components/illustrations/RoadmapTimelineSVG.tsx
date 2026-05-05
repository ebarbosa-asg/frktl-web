import { RoadmapSVGProps } from "@/types";

interface Phase {
  year: string;
  label: string;
  color: string;
}

const phases: Phase[] = [
  { year: "2026", label: "FOUNDATION", color: "var(--color-gold)" },
  { year: "2027–28", label: "DESIGN & TEST", color: "var(--color-orange)" },
  { year: "2029–30", label: "NRC & PROTOTYPE", color: "var(--color-teal-light)" },
  { year: "2031–32", label: "FOAK BUILD", color: "var(--color-cyan)" },
  { year: "2033", label: "CRITICALITY", color: "var(--color-green)" },
];

const W = 700;
const rowH = 58;
const padTop = 20;

export function RoadmapTimelineSVG({ animate, activePhase }: RoadmapSVGProps) {
  const totalHeight = padTop + phases.length * rowH + 30;

  return (
    <svg
      viewBox={`0 0 ${W} ${totalHeight}`}
      style={{ width: "100%", maxWidth: 680 }}
      aria-hidden="true"
    >
      {/* Vertical spine */}
      <line
        x1="90"
        y1={padTop}
        x2="90"
        y2={padTop + phases.length * rowH - 20}
        stroke="var(--color-slate)"
        strokeWidth="2"
      />
      {animate && (
        <line
          x1="90"
          y1={padTop}
          x2="90"
          y2={padTop + phases.length * rowH - 20}
          stroke="var(--color-teal)"
          strokeWidth="2"
          strokeDasharray="4 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-8"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {phases.map((p, i) => {
        const cy = padTop + i * rowH + 20;
        const isActive = activePhase === i;
        return (
          <g
            key={i}
            opacity={animate ? 1 : 0.15}
            style={{ transition: `opacity 0.5s ease ${i * 0.12}s` }}
          >
            {/* Node */}
            <circle
              cx="90"
              cy={cy}
              r={isActive ? 10 : 8}
              fill={isActive ? p.color : "var(--color-dark-card)"}
              stroke={p.color}
              strokeWidth="2.5"
              style={{ transition: "all 0.3s" }}
            />
            {isActive && (
              <circle cx="90" cy={cy} r="14" fill="none" stroke={p.color} strokeWidth="1" opacity="0.4">
                <animate attributeName="r" values="14;18;14" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Year label */}
            <text
              x="70"
              y={cy + 4}
              textAnchor="end"
              fill={p.color}
              fontSize="11"
              fontWeight="700"
              fontFamily="'Space Mono', monospace"
            >
              {p.year}
            </text>
            {/* Phase label */}
            <text x="115" y={cy - 2} fill={p.color} fontSize="10" fontWeight="700" letterSpacing="1.5">
              {p.label}
            </text>
            {/* Connector bar */}
            <rect
              x="115"
              y={cy + 6}
              width={isActive ? 500 : 400}
              height="2"
              rx="1"
              fill={p.color}
              opacity={isActive ? 0.4 : 0.15}
              style={{ transition: "all 0.3s" }}
            />
          </g>
        );
      })}
    </svg>
  );
}
