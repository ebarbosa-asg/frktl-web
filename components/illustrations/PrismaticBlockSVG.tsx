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
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      <polygon
        points="160,30 260,87 260,203 160,260 60,203 60,87"
        fill="url(#blockGrad)"
        stroke="var(--color-teal)"
        strokeWidth="2"
        opacity={animate ? 1 : 0.3}
        style={{ transition: "opacity 0.8s ease" }}
      />
      {coolantHoles.map(([cx, cy], i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy={cy}
            r="10"
            fill="var(--color-dark)"
            stroke="var(--color-teal-light)"
            strokeWidth="1.5"
            opacity={animate ? 1 : 0}
            style={{ transition: `opacity 0.4s ease ${0.05 * i}s` }}
          />
          {animate && (
            <circle cx={cx} cy={cy} r="4" fill="var(--color-cyan)" opacity="0.6">
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
      {fuelCompacts.map(([cx, cy], i) => (
        <circle
          key={`f${i}`}
          cx={cx}
          cy={cy}
          r="5"
          fill="var(--color-gold)"
          opacity={animate ? 0.7 : 0.1}
          style={{ transition: `opacity 0.4s ease ${0.03 * i + 0.3}s` }}
        />
      ))}
      <text
        x="160"
        y="300"
        textAnchor="middle"
        fill="var(--color-text-bright)"
        fontSize="13"
        fontWeight="600"
      >
        Prismatic Graphite Block
      </text>
      <text x="160" y="320" textAnchor="middle" fill="var(--color-text)" fontSize="10">
        <tspan fill="var(--color-cyan)">● Coolant</tspan>
        {"   "}
        <tspan fill="var(--color-gold)">● Fuel Compacts</tspan>
      </text>
    </svg>
  );
}
