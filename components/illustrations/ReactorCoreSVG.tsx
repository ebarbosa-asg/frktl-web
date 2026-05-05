import { SVGIllustrationProps } from "@/types";

export function ReactorCoreSVG({ animate }: SVGIllustrationProps) {
  const fuelRows: [number, number][] = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2],
    [3, 0], [3, 1], [3, 2],
    [4, 0], [4, 1], [4, 2],
  ];
  const coolantY = [90, 160, 230];

  return (
    <svg
      viewBox="0 0 360 400"
      style={{ width: "100%", maxWidth: 340 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vesselGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a5568" />
          <stop offset="100%" stopColor="#2d3748" />
        </linearGradient>
      </defs>
      <rect
        x="60"
        y="30"
        width="240"
        height="320"
        rx="20"
        fill="url(#vesselGrad)"
        stroke="#718096"
        strokeWidth="3"
      />
      <rect
        x="80"
        y="50"
        width="200"
        height="280"
        rx="12"
        fill="var(--color-dark)"
        stroke="var(--color-teal-dark)"
        strokeWidth="2"
      />
      {fuelRows.map(([row, col]) => (
        <rect
          key={`${row}-${col}`}
          x={100 + col * 55}
          y={65 + row * 50}
          width="48"
          height="42"
          rx="3"
          fill="#2a2a2a"
          stroke="var(--color-teal-dark)"
          strokeWidth="1"
          opacity={animate ? 0.9 : 0.3}
          style={{
            transition: `opacity 0.5s ease ${(row * 3 + col) * 0.05}s`,
          }}
        />
      ))}
      {animate &&
        coolantY.map((y, i) => (
          <g key={`a${i}`}>
            <line
              x1="85"
              y1={y}
              x2="85"
              y2={y - 30}
              stroke="var(--color-orange)"
              strokeWidth="2"
              opacity="0.6"
            >
              <animate
                attributeName="y1"
                values={`${y};${y - 10};${y}`}
                dur="2s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="275"
              y1={y}
              x2="275"
              y2={y - 30}
              stroke="var(--color-cyan)"
              strokeWidth="2"
              opacity="0.6"
            >
              <animate
                attributeName="y1"
                values={`${y};${y - 10};${y}`}
                dur="2s"
                repeatCount="indefinite"
                begin="0.5s"
              />
            </line>
          </g>
        ))}
      <text
        x="55"
        y="200"
        textAnchor="middle"
        fill="var(--color-orange)"
        fontSize="9"
        transform="rotate(-90,55,200)"
        fontWeight="600"
      >
        HOT He ↑ 700°C+
      </text>
      <text
        x="305"
        y="200"
        textAnchor="middle"
        fill="var(--color-cyan)"
        fontSize="9"
        transform="rotate(90,305,200)"
        fontWeight="600"
      >
        COOL He ↓ 250°C
      </text>
      <text
        x="180"
        y="375"
        textAnchor="middle"
        fill="var(--color-text-bright)"
        fontSize="13"
        fontWeight="600"
      >
        Reactor Pressure Vessel
      </text>
      <text x="180" y="393" textAnchor="middle" fill="var(--color-text)" fontSize="10">
        Prismatic blocks + helium coolant
      </text>
    </svg>
  );
}
