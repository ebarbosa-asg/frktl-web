import { SVGIllustrationProps } from "@/types";

interface Stage {
  label: string;
  desc: string;
  sub: string;
  color: string;
  icon: string;
}

const stages: Stage[] = [
  { label: "Separate Effects", desc: "Individual component tests", sub: "sCO₂ loop, HX prototypes", color: "var(--color-gold)", icon: "⚗️" },
  { label: "Integral Effects", desc: "Combined system behavior", sub: "INL / NRIC facilities", color: "var(--color-orange)", icon: "🔧" },
  { label: "Non-Nuclear Hot", desc: "Full thermal loop, electric heat", sub: "Factory test stand", color: "var(--color-teal-light)", icon: "🔥" },
  { label: "Zero-Power Critical", desc: "First neutrons, no heat", sub: "FOAK reactor on site", color: "var(--color-cyan)", icon: "⚛️" },
  { label: "Power Ascension", desc: "Stepwise to full power", sub: "NRC-witnessed", color: "var(--color-green)", icon: "⚡" },
];

export function TestingPipelineSVG({ animate }: SVGIllustrationProps) {
  return (
    <svg
      viewBox="0 0 680 200"
      style={{ width: "100%", maxWidth: 660 }}
      aria-hidden="true"
    >
      {/* Connecting arrows */}
      {animate &&
        stages.slice(0, -1).map((_, i) => (
          <line
            key={`c${i}`}
            x1={i * 135 + 115}
            y1="60"
            x2={i * 135 + 130}
            y2="60"
            stroke="var(--color-slate)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-7"
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
            <rect
              x={x}
              y="20"
              width="108"
              height="85"
              rx="10"
              fill="var(--color-dark-card)"
              stroke={s.color}
              strokeWidth="1.5"
            />
            <text x={x + 54} y="42" textAnchor="middle" fontSize="18">
              {s.icon}
            </text>
            <text x={x + 54} y="60" textAnchor="middle" fill={s.color} fontSize="9" fontWeight="700">
              {s.label}
            </text>
            <text x={x + 54} y="75" textAnchor="middle" fill="var(--color-text)" fontSize="7.5">
              {s.desc}
            </text>
            <text x={x + 54} y="95" textAnchor="middle" fill="var(--color-steel)" fontSize="7">
              {s.sub}
            </text>
            {/* Step number */}
            <circle cx={x + 54} cy="125" r="9" fill={s.color} opacity="0.15" />
            <text x={x + 54} y="129" textAnchor="middle" fill={s.color} fontSize="9" fontWeight="700">
              {i + 1}
            </text>
          </g>
        );
      })}

      <text x="340" y="158" textAnchor="middle" fill="var(--color-text)" fontSize="10">
        Each stage generates qualification data for the next — no skipping steps
      </text>
      <text x="340" y="178" textAnchor="middle" fill="var(--color-teal-light)" fontSize="9" fontWeight="600">
        Testing validates safety case before fuel ever enters the reactor
      </text>
    </svg>
  );
}
