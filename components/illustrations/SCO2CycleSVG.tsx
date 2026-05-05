import { SVGIllustrationProps } from "@/types";

export function SCO2CycleSVG({ animate }: SVGIllustrationProps) {
  return (
    <svg
      viewBox="0 0 440 320"
      style={{ width: "100%", maxWidth: 420 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="turbGrad">
          <stop offset="0%" stopColor="var(--color-atomic-orange)" />
          <stop offset="100%" stopColor="var(--color-gold)" />
        </linearGradient>
        <linearGradient id="compGrad">
          <stop offset="0%" stopColor="var(--color-teal)" />
          <stop offset="100%" stopColor="var(--color-cyan)" />
        </linearGradient>
      </defs>

      {/* Heat Exchanger */}
      <rect
        x="20"
        y="40"
        width="90"
        height="70"
        rx="10"
        fill="var(--color-dark-card)"
        stroke="var(--color-atomic-orange)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <text
        x="65"
        y="70"
        textAnchor="middle"
        fill="var(--color-atomic-orange)"
        fontSize="10"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        Heat
      </text>
      <text
        x="65"
        y="86"
        textAnchor="middle"
        fill="var(--color-atomic-orange)"
        fontSize="10"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        Exchanger
      </text>

      {/* Turbine */}
      <rect
        x="175"
        y="20"
        width="90"
        height="80"
        rx="10"
        fill="var(--color-dark-card)"
        stroke="url(#turbGrad)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <text
        x="220"
        y="55"
        textAnchor="middle"
        fill="var(--color-atomic-orange)"
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        TURBINE
      </text>
      <text
        x="220"
        y="72"
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize="9"
        fontFamily="var(--font-dm-sans, sans-serif)"
      >
        Expansion
      </text>
      {animate && (
        <circle cx="220" cy="86" r="4" fill="var(--color-atomic-orange)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 220 55;360 220 55"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Generator */}
      <rect
        x="330"
        y="30"
        width="90"
        height="65"
        rx="10"
        fill="var(--color-dark-card)"
        stroke="var(--color-gold)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <text
        x="375"
        y="58"
        textAnchor="middle"
        fill="var(--color-gold)"
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        GEN
      </text>
      <text
        x="375"
        y="75"
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize="9"
        fontFamily="var(--font-dm-sans, sans-serif)"
      >
        Electricity
      </text>

      {/* Recuperator */}
      <rect
        x="175"
        y="150"
        width="90"
        height="65"
        rx="10"
        fill="var(--color-dark-card)"
        stroke="var(--color-teal-light)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <text
        x="220"
        y="178"
        textAnchor="middle"
        fill="var(--color-teal-light)"
        fontSize="10"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        Recuperator
      </text>
      <text
        x="220"
        y="196"
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize="8"
        fontFamily="var(--font-dm-sans, sans-serif)"
      >
        Heat Recovery
      </text>

      {/* Pre-Cooler */}
      <rect
        x="20"
        y="155"
        width="90"
        height="55"
        rx="10"
        fill="var(--color-dark-card)"
        stroke="var(--color-cyan)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <text
        x="65"
        y="180"
        textAnchor="middle"
        fill="var(--color-cyan)"
        fontSize="10"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        Pre-Cooler
      </text>

      {/* Compressor */}
      <rect
        x="20"
        y="245"
        width="90"
        height="55"
        rx="10"
        fill="var(--color-dark-card)"
        stroke="url(#compGrad)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <text
        x="65"
        y="270"
        textAnchor="middle"
        fill="var(--color-teal-light)"
        fontSize="10"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        Compressor
      </text>
      <text
        x="65"
        y="287"
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize="8"
        fontFamily="var(--font-dm-sans, sans-serif)"
      >
        Re-pressurize
      </text>

      {/* Flow arrows and animated particle */}
      {animate && (
        <>
          <line
            x1="110"
            y1="65"
            x2="175"
            y2="53"
            stroke="var(--color-atomic-orange)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="265"
            y1="57"
            x2="330"
            y2="57"
            stroke="var(--color-gold)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="220"
            y1="100"
            x2="220"
            y2="150"
            stroke="var(--color-atomic-orange)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
            strokeDasharray="5 4"
          />
          <line
            x1="175"
            y1="185"
            x2="110"
            y2="182"
            stroke="var(--color-teal-light)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <line
            x1="65"
            y1="210"
            x2="65"
            y2="245"
            stroke="var(--color-cyan)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 65 245 Q 65 230 110 165"
            fill="none"
            stroke="var(--color-teal)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
            strokeDasharray="5 4"
          />
          <line
            x1="110"
            y1="272"
            x2="175"
            y2="192"
            stroke="var(--color-teal)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
            strokeDasharray="5 4"
          />
          <path
            d="M 220 150 Q 180 130 110 80"
            fill="none"
            stroke="var(--color-teal-light)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
            strokeDasharray="5 4"
          />
          <circle r="5" fill="var(--color-atomic-orange)">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M 65 75 L 220 50 L 350 55 L 220 180 L 65 180 L 65 272 L 220 170 L 65 75"
            />
          </circle>
        </>
      )}

      <text
        x="220"
        y="310"
        textAnchor="middle"
        fill="var(--color-text-bright)"
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        Supercritical CO&#8322; Brayton Cycle
      </text>
    </svg>
  );
}
