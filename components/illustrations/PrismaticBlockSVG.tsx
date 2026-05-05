import { SVGIllustrationProps } from "@/types";

export function PrismaticBlockSVG({ animate }: SVGIllustrationProps) {
  const coolantHoles: [number, number][] = [
    [120, 100], [160, 100], [200, 100],
    [100, 140], [140, 140], [180, 140], [220, 140],
    [120, 180], [160, 180], [200, 180],
    [140, 220], [180, 220],
  ];
  const fuelCompacts: [number, number][] = [
    [130, 120], [150, 120], [170, 120], [190, 120],
    [110, 160], [130, 160], [150, 160], [170, 160], [190, 160], [210, 160],
    [130, 200], [150, 200], [170, 200], [190, 200],
  ];

  return (
    <svg
      viewBox="0 0 320 350"
      style={{ width: "100%", maxWidth: 300 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="blockGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a2e1a" />
          <stop offset="100%" stopColor="#1a1408" />
        </linearGradient>
      </defs>

      {/* Hexagonal block face */}
      <polygon
        points="160,30 260,87 260,203 160,260 60,203 60,87"
        fill="url(#blockGrad)"
        stroke="var(--color-teal)"
        strokeWidth="4"
        strokeLinejoin="round"
        opacity={animate ? 1 : 0.3}
        style={{ transition: "opacity 0.8s ease" }}
      />

      {/* Coolant channels */}
      {coolantHoles.map(([cx, cy], i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy={cy}
            r="10"
            fill="var(--color-dark)"
            stroke="var(--color-teal-light)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={animate ? 1 : 0}
            style={{ transition: `opacity 0.4s ease ${0.05 * i}s` }}
          />
          {animate && (
            <circle cx={cx} cy={cy} r="4" fill="var(--color-cyan)" opacity="0.7">
              <animate
                attributeName="r"
                values="3;6;3"
                dur={`${1.5 + i * 0.1}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;0.2;0.8"
                dur={`${1.5 + i * 0.1}s`}
                repeatCount="indefinite"
              />
            </circle>
          )}
        </g>
      ))}

      {/* Fuel compact dots */}
      {fuelCompacts.map(([cx, cy], i) => (
        <circle
          key={`f${i}`}
          cx={cx}
          cy={cy}
          r="5"
          fill="var(--color-gold)"
          stroke="var(--color-atomic-orange)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={animate ? 0.85 : 0.1}
          style={{ transition: `opacity 0.4s ease ${0.03 * i + 0.3}s` }}
        />
      ))}

      {/* Labels */}
      <text
        x="160"
        y="300"
        textAnchor="middle"
        fill="var(--color-text-bright)"
        fontSize="13"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        Prismatic Graphite Block
      </text>
      <text
        x="160"
        y="322"
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize="10"
        fontFamily="var(--font-dm-sans, sans-serif)"
      >
        <tspan fill="var(--color-cyan)">&#9679; Coolant</tspan>
        {"   "}
        <tspan fill="var(--color-gold)">&#9679; Fuel Compacts</tspan>
      </text>
    </svg>
  );
}
