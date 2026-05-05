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
          <stop offset="0%" stopColor="var(--color-orange)" />
          <stop offset="100%" stopColor="var(--color-gold)" />
        </radialGradient>
        <radialGradient id="bufferGrad" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#555" />
          <stop offset="100%" stopColor="#222" />
        </radialGradient>
        <radialGradient id="ipycGrad" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#666" />
          <stop offset="100%" stopColor="#333" />
        </radialGradient>
        <radialGradient id="sicGrad" cx="45%" cy="40%">
          <stop offset="0%" stopColor="var(--color-teal-light)" />
          <stop offset="100%" stopColor="var(--color-teal-dark)" />
        </radialGradient>
        <radialGradient id="opycGrad" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#777" />
          <stop offset="100%" stopColor="#444" />
        </radialGradient>
      </defs>
      <circle
        cx="150"
        cy="150"
        r="120"
        fill="url(#opycGrad)"
        opacity={animate ? 1 : 0.5}
        style={{ transition: "opacity 0.6s ease 0.5s" }}
      />
      <circle
        cx="150"
        cy="150"
        r="100"
        fill="url(#sicGrad)"
        opacity={animate ? 1 : 0.5}
        style={{ transition: "opacity 0.6s ease 0.4s" }}
      />
      <circle
        cx="150"
        cy="150"
        r="78"
        fill="url(#ipycGrad)"
        opacity={animate ? 1 : 0.5}
        style={{ transition: "opacity 0.6s ease 0.3s" }}
      />
      <circle
        cx="150"
        cy="150"
        r="58"
        fill="url(#bufferGrad)"
        opacity={animate ? 1 : 0.5}
        style={{ transition: "opacity 0.6s ease 0.2s" }}
      />
      <circle
        cx="150"
        cy="150"
        r="35"
        fill="url(#kernelGrad)"
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
      <text x="150" y="155" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
        UCO Kernel
      </text>
      <text x="150" y="195" textAnchor="middle" fill="#ddd" fontSize="9">
        Buffer
      </text>
      <text x="150" y="225" textAnchor="middle" fill="#fff" fontSize="9">
        Inner PyC
      </text>
      <text x="150" y="250" textAnchor="middle" fill="var(--color-text-bright)" fontSize="9" fontWeight="600">
        SiC Barrier
      </text>
      <text x="150" y="275" textAnchor="middle" fill="#ccc" fontSize="9">
        Outer PyC
      </text>
    </svg>
  );
}
