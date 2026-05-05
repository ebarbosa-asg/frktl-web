import { SVGIllustrationProps } from "@/types";

export function TrisoParticleSVG({ animate }: SVGIllustrationProps) {
  return (
    <svg
      viewBox="0 0 300 300"
      style={{ width: "100%", maxWidth: 280 }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="kernelGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="var(--color-atomic-orange)" />
          <stop offset="100%" stopColor="var(--color-gold)" />
        </radialGradient>
        <radialGradient id="bufferGrad" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#5a4a3a" />
          <stop offset="100%" stopColor="#2a1a0a" />
        </radialGradient>
        <radialGradient id="ipycGrad" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#4a3a2a" />
          <stop offset="100%" stopColor="#1a1008" />
        </radialGradient>
        <radialGradient id="sicGrad" cx="45%" cy="40%">
          <stop offset="0%" stopColor="var(--color-teal-light)" />
          <stop offset="100%" stopColor="var(--color-teal-dark)" />
        </radialGradient>
        <radialGradient id="opycGrad" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#150d06" />
        </radialGradient>
      </defs>

      {/* Outer PyC */}
      <circle
        cx="150"
        cy="150"
        r="120"
        fill="url(#opycGrad)"
        stroke="var(--color-steel)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity={animate ? 1 : 0.5}
        style={{ transition: "opacity 0.6s ease 0.5s" }}
      />
      {/* SiC barrier */}
      <circle
        cx="150"
        cy="150"
        r="100"
        fill="url(#sicGrad)"
        stroke="var(--color-teal-light)"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity={animate ? 1 : 0.5}
        style={{ transition: "opacity 0.6s ease 0.4s" }}
      />
      {/* Inner PyC */}
      <circle
        cx="150"
        cy="150"
        r="78"
        fill="url(#ipycGrad)"
        stroke="var(--color-steel)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity={animate ? 1 : 0.5}
        style={{ transition: "opacity 0.6s ease 0.3s" }}
      />
      {/* Buffer */}
      <circle
        cx="150"
        cy="150"
        r="58"
        fill="url(#bufferGrad)"
        stroke="var(--color-gold)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity={animate ? 1 : 0.5}
        style={{ transition: "opacity 0.6s ease 0.2s" }}
      />
      {/* UCO Kernel */}
      <circle
        cx="150"
        cy="150"
        r="35"
        fill="url(#kernelGrad)"
        stroke="var(--color-atomic-orange)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity={animate ? 1 : 0.5}
        style={{ transition: "opacity 0.6s ease 0.1s" }}
      >
        {animate && (
          <animate
            attributeName="r"
            values="35;37;35"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Labels */}
      <text
        x="150"
        y="155"
        textAnchor="middle"
        fill="var(--color-atomic-cream)"
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        UCO Kernel
      </text>
      <text
        x="150"
        y="193"
        textAnchor="middle"
        fill="var(--color-atomic-cream)"
        fontSize="9"
        fontFamily="var(--font-space-mono, monospace)"
      >
        Buffer
      </text>
      <text
        x="150"
        y="220"
        textAnchor="middle"
        fill="var(--color-atomic-cream)"
        fontSize="9"
        fontFamily="var(--font-space-mono, monospace)"
      >
        Inner PyC
      </text>
      <text
        x="150"
        y="246"
        textAnchor="middle"
        fill="var(--color-teal-light)"
        fontSize="9"
        fontWeight="700"
        fontFamily="var(--font-space-mono, monospace)"
      >
        SiC Barrier
      </text>
      <text
        x="150"
        y="272"
        textAnchor="middle"
        fill="var(--color-atomic-cream)"
        fontSize="9"
        fontFamily="var(--font-space-mono, monospace)"
      >
        Outer PyC
      </text>
    </svg>
  );
}
