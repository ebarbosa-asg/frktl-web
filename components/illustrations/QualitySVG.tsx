import { SVGIllustrationProps } from "@/types";

interface QualityItem {
  label: string;
  desc: string;
  color: string;
}

const items: QualityItem[] = [
  { label: "In-Process NDE",      desc: "Radiographic + ultrasonic at every weld",   color: "var(--color-teal-light)" },
  { label: "Digital Twin QC",     desc: "Real-time dimensional verification",          color: "var(--color-cyan)" },
  { label: "ASME III NCA/NB",     desc: "Nuclear-grade pressure boundary code",        color: "var(--color-atomic-orange)" },
  { label: "Statistical Process", desc: "6σ tolerance on critical dimensions",    color: "var(--color-gold)" },
  { label: "NRC Part 53 ITAAC",   desc: "Inspection, Test, Analysis, Acceptance",      color: "var(--color-purple)" },
  { label: "Factory Acceptance",  desc: "Full-system hot functional testing",          color: "var(--color-green)" },
];

export function QualitySVG({ animate }: SVGIllustrationProps) {
  return (
    <svg
      viewBox="0 0 480 320"
      style={{ width: "100%", maxWidth: 440 }}
      aria-hidden="true"
    >
      {items.map((item, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 20 + col * 238;
        const y = 12 + row * 100;
        return (
          <g
            key={i}
            opacity={animate ? 1 : 0.15}
            style={{ transition: `opacity 0.5s ease ${i * 0.1}s` }}
          >
            {/* Card */}
            <rect
              x={x}
              y={y}
              width="218"
              height="82"
              rx="10"
              fill="var(--color-dark-card)"
              stroke={item.color}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Left accent strip */}
            <rect
              x={x}
              y={y}
              width="5"
              height="82"
              rx="4"
              fill={item.color}
              opacity="0.55"
            />

            {/* Step marker */}
            <circle
              cx={x + 28}
              cy={y + 28}
              r="13"
              fill={item.color}
              opacity="0.18"
            />
            <text
              x={x + 28}
              y={y + 33}
              textAnchor="middle"
              fill={item.color}
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-space-mono, monospace)"
            >
              {i + 1}
            </text>

            {/* Label */}
            <text
              x={x + 48}
              y={y + 28}
              fill={item.color}
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-space-mono, monospace)"
            >
              {item.label}
            </text>
            {/* Description */}
            <text
              x={x + 14}
              y={y + 53}
              fill="var(--color-text)"
              fontSize="9"
              fontFamily="var(--font-dm-sans, sans-serif)"
            >
              {item.desc}
            </text>

            {/* Animated progress bar */}
            {animate && (
              <rect
                x={x + 5}
                y={y + 75}
                width="0"
                height="2"
                rx="1"
                fill={item.color}
                opacity="0.4"
              >
                <animate
                  attributeName="width"
                  values="0;208"
                  dur="1.2s"
                  begin={`${i * 0.18}s`}
                  fill="freeze"
                />
              </rect>
            )}
          </g>
        );
      })}
    </svg>
  );
}
