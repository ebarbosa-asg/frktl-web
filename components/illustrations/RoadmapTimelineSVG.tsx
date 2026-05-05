import { RoadmapSVGProps } from "@/types";

interface Phase {
  year: string;
  label: string;
  color: string;
}

const phases: Phase[] = [
  { year: "2026",    label: "FOUNDATION",     color: "var(--color-gold)" },
  { year: "2027–28", label: "DESIGN & TEST",  color: "var(--color-atomic-orange)" },
  { year: "2029–30", label: "NRC & PROTOTYPE", color: "var(--color-teal-light)" },
  { year: "2031–32", label: "FOAK BUILD",     color: "var(--color-cyan)" },
  { year: "2033",    label: "CRITICALITY",    color: "var(--color-green)" },
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
        strokeWidth="3"
        strokeLinecap="round"
      />
      {animate && (
        <line
          x1="90"
          y1={padTop}
          x2="90"
          y2={padTop + phases.length * rowH - 20}
          stroke="var(--color-teal)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-11"
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
            {/* Timeline node */}
            <circle
              cx="90"
              cy={cy}
              r={isActive ? 11 : 9}
              fill={isActive ? p.color : "var(--color-dark-card)"}
              stroke={p.color}
              strokeWidth="3.5"
              strokeLinecap="round"
              style={{ transition: "all 0.3s" }}
            />
            {/* Active pulse ring */}
            {isActive && (
              <circle
                cx="90"
                cy={cy}
                r="15"
                fill="none"
                stroke={p.color}
                strokeWidth="2"
                opacity="0.4"
              >
                <animate
                  attributeName="r"
                  values="15;20;15"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.4;0.1;0.4"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Year label */}
            <text
              x="72"
              y={cy + 5}
              textAnchor="end"
              fill={p.color}
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-space-mono, monospace)"
            >
              {p.year}
            </text>

            {/* Phase label */}
            <text
              x="118"
              y={cy - 3}
              fill={p.color}
              fontSize="10"
              fontWeight="700"
              letterSpacing="2"
              fontFamily="var(--font-space-mono, monospace)"
            >
              {p.label}
            </text>

            {/* Horizontal connector bar */}
            <rect
              x="118"
              y={cy + 7}
              width={isActive ? 500 : 400}
              height="3"
              rx="2"
              fill={p.color}
              opacity={isActive ? 0.5 : 0.15}
              style={{ transition: "all 0.3s" }}
            />
          </g>
        );
      })}
    </svg>
  );
}
