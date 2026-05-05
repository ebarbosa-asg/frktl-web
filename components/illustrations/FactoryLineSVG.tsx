import { SVGIllustrationProps } from "@/types";

interface Station {
  x: number;
  label: [string, string];
  sub: string;
  color: string;
}

const stations: Station[] = [
  { x: 30,  label: ["TRISO Fuel", "Fabrication"],   sub: "BWXT",          color: "var(--color-gold)" },
  { x: 145, label: ["Graphite Block", "Machining"],  sub: "CNC Lines",     color: "var(--color-teal-light)" },
  { x: 260, label: ["RPV Module", "Welding & NDE"],  sub: "ASME III",      color: "var(--color-atomic-orange)" },
  { x: 375, label: ["PCU Skid", "Integration"],      sub: "sCO₂ Turbo",    color: "var(--color-cyan)" },
  { x: 490, label: ["Factory", "Acceptance Test"],   sub: "Full Systems",  color: "var(--color-purple)" },
  { x: 605, label: ["Ship to", "Site"],              sub: "Heavy-Haul",    color: "var(--color-text-bright)" },
];

export function FactoryLineSVG({ animate }: SVGIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 260"
      style={{ width: "100%", maxWidth: 700 }}
      aria-hidden="true"
    >
      {/* Conveyor base track */}
      <line
        x1="30"
        y1="140"
        x2="690"
        y2="140"
        stroke="var(--color-slate)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Animated dash line */}
      <line
        x1="30"
        y1="140"
        x2="690"
        y2="140"
        stroke="var(--color-teal)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="14 7"
        opacity={animate ? 1 : 0.3}
      >
        {animate && (
          <animate
            attributeName="stroke-dashoffset"
            values="0;-21"
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
          {/* Station box */}
          <rect
            x={s.x}
            y="55"
            width="95"
            height="70"
            rx="10"
            fill="var(--color-dark-card)"
            stroke={s.color}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Connector to track */}
          <line
            x1={s.x + 47}
            y1="125"
            x2={s.x + 47}
            y2="140"
            stroke={s.color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx={s.x + 47}
            cy="140"
            r="6"
            fill="var(--color-dark)"
            stroke={s.color}
            strokeWidth="3"
          />

          {/* Station labels */}
          {s.label.map((line, li) => (
            <text
              key={li}
              x={s.x + 47}
              y={75 + li * 15}
              textAnchor="middle"
              fill={s.color}
              fontSize="9"
              fontWeight="700"
              fontFamily="var(--font-space-mono, monospace)"
            >
              {line}
            </text>
          ))}
          <text
            x={s.x + 47}
            y="116"
            textAnchor="middle"
            fill="var(--color-text)"
            fontSize="8"
            opacity="0.7"
            fontFamily="var(--font-dm-sans, sans-serif)"
          >
            {s.sub}
          </text>

          {/* Step number circle */}
          <circle cx={s.x + 47} cy="42" r="13" fill={s.color} opacity="0.18" />
          <text
            x={s.x + 47}
            y="47"
            textAnchor="middle"
            fill={s.color}
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-space-mono, monospace)"
          >
            {i + 1}
          </text>
        </g>
      ))}

      {/* Animated product block on track */}
      {animate && (
        <rect
          width="22"
          height="16"
          rx="4"
          fill="var(--color-teal)"
          opacity="0.9"
        >
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M 30 132 L 690 132"
          />
        </rect>
      )}

      {/* Bottom stats */}
      <text
        x="360"
        y="175"
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize="10"
        fontWeight="600"
        fontFamily="var(--font-dm-sans, sans-serif)"
      >
        Parallel Production Lines — Multiple Units Simultaneously
      </text>
      <g opacity={animate ? 0.9 : 0}>
        <rect
          x="140"
          y="192"
          width="180"
          height="30"
          rx="8"
          fill="var(--color-dark-card)"
          stroke="var(--color-teal-dark)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text
          x="230"
          y="211"
          textAnchor="middle"
          fill="var(--color-cyan)"
          fontSize="10"
          fontWeight="700"
          fontFamily="var(--font-space-mono, monospace)"
        >
          Factory Build: ~12–18 Mo
        </text>
        <rect
          x="400"
          y="192"
          width="180"
          height="30"
          rx="8"
          fill="var(--color-dark-card)"
          stroke="var(--color-teal-dark)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text
          x="490"
          y="211"
          textAnchor="middle"
          fill="var(--color-gold)"
          fontSize="10"
          fontWeight="700"
          fontFamily="var(--font-space-mono, monospace)"
        >
          Site Assembly: ~3–6 Mo
        </text>
      </g>
      <text
        x="360"
        y="248"
        textAnchor="middle"
        fill="var(--color-teal-light)"
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        vs. Traditional: 10–15 YEARS site construction
      </text>
    </svg>
  );
}
