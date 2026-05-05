"use client";

import dynamic from "next/dynamic";
import { HeroSceneFallback } from "./HeroSceneFallback";

// Lazy-load the R3F scene — never blocks LCP, ssr: false required for Three.js
const FRKTLScene = dynamic(
  () => import("./FRKTLScene").then((m) => ({ default: m.FRKTLScene })),
  {
    ssr: false,
    loading: () => <HeroSceneFallback />,
  }
);

interface HeroSceneProps {
  className?: string;
}

export function HeroScene({ className }: HeroSceneProps) {
  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", minHeight: 420, position: "relative" }}
    >
      {/* Mobile: static SVG (no WebGL overhead) */}
      <div className="block md:hidden w-full h-full">
        <HeroSceneFallback className="w-full h-full" />
      </div>

      {/* Desktop: live 3D scene */}
      <div className="hidden md:flex w-full h-full items-center justify-center">
        <FRKTLScene className="w-full h-full" />
      </div>
    </div>
  );
}
