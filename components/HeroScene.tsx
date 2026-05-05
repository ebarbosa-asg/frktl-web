"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { HeroSceneFallback } from "./HeroSceneFallback";

// Replace with your Spline scene URL when available
// Design the scene at spline.design, then paste the published scene URL below
const SPLINE_SCENE_URL =
  "https://prod.spline.design/PLACEHOLDER-SCENE-URL/scene.splinecode";

// Lazy-load Spline — never on mobile, never blocks LCP
const SplineScene = dynamic(
  () => import("@splinetool/react-spline/next"),
  {
    ssr: false, // Never server-render Spline (it requires browser APIs)
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
      style={{
        width: "100%",
        height: "100%",
        minHeight: 400,
        position: "relative",
      }}
    >
      {/* Mobile: only static fallback (< md breakpoint = 768px) */}
      <div className="block md:hidden w-full h-full">
        <HeroSceneFallback className="w-full h-full" />
      </div>

      {/* Desktop: Spline lazy-loaded with fallback */}
      <div className="hidden md:block w-full h-full">
        <Suspense fallback={<HeroSceneFallback className="w-full h-full" />}>
          <SplineScene
            scene={SPLINE_SCENE_URL}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      </div>
    </div>
  );
}
