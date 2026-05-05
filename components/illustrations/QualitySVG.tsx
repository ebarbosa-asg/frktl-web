import { SVGIllustrationProps } from "@/types";

interface QualityItem {
  icon: string;
  label: string;
  desc: string;
}

const items: QualityItem[] = [
  { icon: "🔬", label: "In-Process NDE", desc: "Radiographic + ultrasonic at every weld" },
  { icon: "📐", label: "Digital Twin QC", desc: "Real-time dimensional verification" },
  { icon: "🧪", label: "ASME III NCA/NB", desc: "Nuclear-grade pressure boundary code" },
  { icon: "🔁", label: "Statistical Process", desc: "6σ tolerance on critical dimensions" },
  { icon: "📋", label: "NRC Part 53 ITAAC", desc: "Inspection, Test, Analysis, Acceptance" },
  { icon: "✅", label: "Factory Acceptance", desc: "Full-system hot functional testing" },
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
        const x = 20 + col * 235;
        const y = 15 + row * 100;
        return (
          <g
            key={i}
            opacity={animate ? 1 : 0.15}
            style={{ transition: `opacity 0.5s ease ${i * 0.1}s` }}
          >
            <rect
              x={x}
              y={y}
              width="215"
              height="80"
              rx="10"
              fill="var(--color-dark-card)"
              stroke="var(--color-slate)"
              strokeWidth="1"
            />
            <text x={x + 20} y={y + 32} fontSize="22">
              {item.icon}
            </text>
            <text x={x + 50} y={y + 30} fill="var(--color-text-bright)" fontSize="11" fontWeight="700">
              {item.label}
            </text>
            <text x={x + 50} y={y + 50} fill="var(--color-text)" fontSize="9">
              {item.desc}
            </text>
            {animate && (
              <rect
                x={x}
                y={y + 73}
                width="215"
                height="2"
                rx="1"
                fill="var(--color-teal)"
                opacity="0.3"
              >
                <animate
                  attributeName="width"
                  values="0;215"
                  dur="1s"
                  begin={`${i * 0.15}s`}
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
