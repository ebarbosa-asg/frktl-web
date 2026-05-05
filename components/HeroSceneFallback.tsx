// Static SVG isometric illustration of the nuclear factory
// Renders server-side immediately — this is the LCP element

interface HeroSceneFallbackProps {
  className?: string;
}

export function HeroSceneFallback({ className }: HeroSceneFallbackProps) {
  return (
    <div
      className={className}
      style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}
      aria-label="Isometric illustration of FRKTL modular nuclear factory"
      role="img"
    >
      <svg
        viewBox="0 0 600 420"
        width="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a7a3a" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#2d4a2a" stopOpacity={0.15} />
          </linearGradient>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a3a5a" stopOpacity={0.4} />
            <stop offset="100%" stopColor="transparent" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="buildingFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4714a" />
            <stop offset="100%" stopColor="#a85e3a" />
          </linearGradient>
          <linearGradient id="buildingSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a85e3a" />
            <stop offset="100%" stopColor="#8a4a2e" />
          </linearGradient>
        </defs>

        {/* Sky band */}
        <rect x="0" y="0" width="600" height="200" fill="url(#skyGrad)" />

        {/* Ground plane — isometric rhombus */}
        <polygon
          points="300,360 530,230 300,100 70,230"
          fill="#2d4a2a"
          opacity={0.6}
        />
        <polygon
          points="300,360 530,230 300,100 70,230"
          fill="url(#groundGrad)"
        />

        {/* Ground grid lines for isometric depth */}
        <line x1="300" y1="100" x2="300" y2="360" stroke="#3a5e2a" strokeWidth="0.5" opacity={0.3} />
        <line x1="70" y1="230" x2="530" y2="230" stroke="#3a5e2a" strokeWidth="0.5" opacity={0.3} />

        {/* === MAIN REACTOR BUILDING — isometric box === */}
        {/* Front face (left-facing) */}
        <polygon
          points="170,295 300,365 300,200 170,130"
          fill="url(#buildingFront)"
        />
        {/* Side face (right-facing) */}
        <polygon
          points="300,365 430,295 430,130 300,200"
          fill="url(#buildingSide)"
        />
        {/* Top face */}
        <polygon
          points="170,130 300,200 430,130 300,60"
          fill="#d4845a"
        />

        {/* Roof detail — ventilation dome */}
        <ellipse cx="300" cy="100" rx="28" ry="14" fill="#c4714a" stroke="#b56040" strokeWidth="1" />
        <ellipse cx="300" cy="96" rx="20" ry="10" fill="#d4845a" />

        {/* Window details — front face */}
        <rect x="185" y="200" width="24" height="20" rx="2" fill="#d4aa7a" opacity={0.5} />
        <rect x="218" y="200" width="24" height="20" rx="2" fill="#d4aa7a" opacity={0.5} />
        <rect x="251" y="200" width="24" height="20" rx="2" fill="#d4aa7a" opacity={0.5} />
        {/* Window details — front row 2 */}
        <rect x="185" y="238" width="24" height="18" rx="2" fill="#d4aa7a" opacity={0.35} />
        <rect x="218" y="238" width="24" height="18" rx="2" fill="#d4aa7a" opacity={0.35} />
        <rect x="251" y="238" width="24" height="18" rx="2" fill="#d4aa7a" opacity={0.35} />

        {/* Window details — side face */}
        <rect x="312" y="195" width="20" height="18" rx="2" fill="#b87050" opacity={0.4} />
        <rect x="346" y="195" width="20" height="18" rx="2" fill="#b87050" opacity={0.4} />
        <rect x="312" y="230" width="20" height="16" rx="2" fill="#b87050" opacity={0.3} />
        <rect x="346" y="230" width="20" height="16" rx="2" fill="#b87050" opacity={0.3} />

        {/* Door on front face */}
        <rect x="272" y="295" width="22" height="32" rx="2" fill="#8a4020" opacity={0.6} />
        <rect x="274" y="297" width="8" height="14" rx="1" fill="#d4aa7a" opacity={0.3} />
        <rect x="286" y="297" width="8" height="14" rx="1" fill="#d4aa7a" opacity={0.3} />

        {/* FRKTL signage on front face */}
        <text
          x="228"
          y="278"
          textAnchor="middle"
          fill="white"
          fontSize="11"
          fontWeight="700"
          opacity={0.85}
          style={{ fontFamily: "monospace" }}
        >
          FRKTL
        </text>

        {/* === SMALL ANNEX BUILDING (right side) === */}
        <polygon points="390,310 460,270 460,195 390,235" fill="#a06040" />
        <polygon points="460,270 520,235 520,160 460,195" fill="#8a5035" />
        <polygon points="390,235 460,195 520,160 450,120" fill="#b87050" />

        {/* === COOLING TOWER (upper right) === */}
        {/* Tower body — trapezoid */}
        <polygon
          points="470,235 510,235 502,145 478,145"
          fill="#89b0c4"
          stroke="#6a90a8"
          strokeWidth="1"
        />
        {/* Tower lip */}
        <ellipse cx="490" cy="145" rx="12" ry="5" fill="#9ac0d4" />
        {/* Smoke puffs */}
        <circle cx="490" cy="128" r="16" fill="white" opacity={0.82} />
        <circle cx="477" cy="133" r="12" fill="white" opacity={0.75} />
        <circle cx="504" cy="130" r="14" fill="white" opacity={0.7} />
        <circle cx="490" cy="112" r="10" fill="white" opacity={0.5} />
        <circle cx="480" cy="116" r="7" fill="white" opacity={0.4} />

        {/* === DELIVERY TRUCK (lower left) === */}
        {/* Truck bed */}
        <rect x="55" y="270" width="80" height="34" rx="3" fill="#4a7a8a" stroke="#3a6070" strokeWidth="1" />
        {/* Cab */}
        <rect x="108" y="255" width="28" height="26" rx="3" fill="#3a6070" stroke="#2a5060" strokeWidth="1" />
        {/* Windshield */}
        <rect x="110" y="257" width="20" height="12" rx="1" fill="#89c0d4" opacity={0.6} />
        {/* Wheels */}
        <circle cx="73" cy="308" r="9" fill="#1a1a2a" />
        <circle cx="73" cy="308" r="5" fill="#3a3a4a" />
        <circle cx="118" cy="308" r="9" fill="#1a1a2a" />
        <circle cx="118" cy="308" r="5" fill="#3a3a4a" />
        {/* Cargo label */}
        <text x="95" y="291" textAnchor="middle" fill="#d4f4ff" fontSize="7" fontWeight="600" opacity={0.8}>
          FRKTL RPV
        </text>

        {/* === WORKER SILHOUETTES === */}
        {/* Worker 1 near building entrance */}
        <circle cx="158" cy="305" r="4.5" fill="#1a1a2a" opacity={0.75} />
        <line x1="158" y1="310" x2="158" y2="330" stroke="#1a1a2a" strokeWidth="3" opacity={0.75} />
        <line x1="154" y1="318" x2="162" y2="318" stroke="#1a1a2a" strokeWidth="2" opacity={0.75} />

        {/* Worker 2 */}
        <circle cx="352" cy="310" r="4" fill="#1a1a2a" opacity={0.6} />
        <line x1="352" y1="314" x2="352" y2="332" stroke="#1a1a2a" strokeWidth="2.5" opacity={0.6} />
        <line x1="348" y1="320" x2="356" y2="320" stroke="#1a1a2a" strokeWidth="2" opacity={0.6} />

        {/* === SMALL DETAILS === */}
        {/* Pipes on side of building */}
        <line x1="435" y1="150" x2="435" y2="200" stroke="#8a8080" strokeWidth="3" strokeLinecap="round" />
        <line x1="445" y1="160" x2="445" y2="205" stroke="#8a8080" strokeWidth="2" strokeLinecap="round" />

        {/* Road/path to building */}
        <path d="M 70 320 Q 120 315 160 308" stroke="#5a6a5a" strokeWidth="4" fill="none" strokeLinecap="round" opacity={0.4} />

        {/* Small trees (isometric) */}
        <circle cx="95" cy="255" r="12" fill="#3a6a2a" opacity={0.7} />
        <circle cx="92" cy="252" r="9" fill="#4a7a3a" opacity={0.8} />
        <line x1="95" y1="267" x2="95" y2="280" stroke="#5a3a20" strokeWidth="3" />

        <circle cx="520" cy="280" r="10" fill="#3a6a2a" opacity={0.6} />
        <circle cx="518" cy="277" r="8" fill="#4a7a3a" opacity={0.7} />
        <line x1="520" y1="290" x2="520" y2="302" stroke="#5a3a20" strokeWidth="2.5" />
      </svg>
    </div>
  );
}
