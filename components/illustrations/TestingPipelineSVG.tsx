import { SVGIllustrationProps } from "@/types";

interface Stage {
  label: string;
  desc: string;
  sub: string;
  color: string;
}

const stages: Stage[] = [
  { label: "Separate Effects", desc: "Individual component tests",    sub: "sCO₂ loop, HX prototypes",  color: "var(--color-gold)" },
  { label: "Integral Effects", desc: "Combined system behavior",      sub: "INL / NRIC facilities",     color: "var(--color-atomic-orange)" },
  { label: "Non-Nuclear Hot",  desc: "Full thermal loop, elec. heat", sub: "Factory test stand",        color: "var(--color-teal-light)" },
  { label: "Zero-Power Crit.", desc: "First neutrons, no heat",       sub: "FOAK reactor on site",      color: "var(--color-cyan)" },
  { label: "Power Ascension",  desc: "Stepwise to full power",        sub: "NRC-witnessed",             color: "var(--color-green)" },
];

export function TestingPipelineSVG({ animate }: SVGIllustrationProps) {
  return (
    <svg
      viewBox="0 0 680 200"
      style={{ width: "100%", maxWidth: 660 }}
      aria-hidden="true"
    >
      {/* Connecting arrows between stages */}
      {animate &&
        stages.slice(0, -1).map((_, i) => (
          <line
            key={`c${i}`}
            x1={i * 135 + 116}
            y1="62"
            x2={i * 135 + 132}
            y2="62"
            stroke="var(--color-teal)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="5 4"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-9"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>
        ))}

      {stages.map((s, i) => {
        const x = i * 135 + 10;
        return (
          <g
            key={i}
            opacity={animate ? 1 : 0.12}
            style={{ transition: `opacity 0.5s ease ${i * 0.12}s` }}
          >
            {/* Stage card */}
            <rect
              x={x}
              y="20"
              width="108"
              height="88"
              rx="10"
              fill="var(--color-dark-card)"
              stroke={s.color}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Stage number */}
            <circle
              cx={x + 54}
              cy="44"
              r="14"
              fill={s.color}
              opacity="0.18"
            />
            <text
              x={x + 54}
              y="49"
              textAnchor="middle"
              fill={s.color}
              fontSize="12"
              fontWeight="700"
              fontFamily="var(--font-space-mono, monospace)"
            >
              {i + 1}
            </text>

            {/* Stage label */}
            <text
              x={x + 54}
              y="67"
              textAnchor="middle"
              fill={s.color}
              fontSize="9"
              fontWeight="700"
              fontFamily="var(--font-space-mono, monospace)"
            >
              {s.label}
            </text>
            {/* Description */}
            <text
              x={x + 54}
              y="81"
              textAnchor="middle"
              fill="var(--color-text)"
              fontSize="7.5"
              fontFamily="var(--font-dm-sans, sans-serif)"
            >
              {s.desc}
            </text>
            {/* Sub-label */}
            <text
              x={x + 54}
              y="96"
              textAnchor="middle"
              fill="var(--color-steel)"
              fontSize="7"
              fontFamily="var(--font-dm-sans, sans-serif)"
            >
              {s.sub}
            </text>
          </g>
        );
      })}

      <text
        x="340"
        y="154"
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize="10"
        fontFamily="var(--font-dm-sans, sans-serif)"
      >
        Each stage generates qualification data for the next — no skipping steps
      </text>
      <text
        x="340"
        y="174"
        textAnchor="middle"
        fill="var(--color-teal-light)"
        fontSize="9"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        Testing validates safety case before fuel ever enters the reactor
      </text>
    </svg>
  );
}
