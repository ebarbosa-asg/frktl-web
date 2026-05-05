import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FRKTL Energy — Modular Nuclear Reactor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a1628",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Radial glow background */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(13,115,119,0.2) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Hexagon mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <svg viewBox="0 0 80 80" width={80} height={80}>
            <polygon
              points="40,8 68,24 68,56 40,72 12,56 12,24"
              fill="none"
              stroke="#14a3a8"
              strokeWidth="3"
            />
            <circle cx="40" cy="40" r="10" fill="#00d4aa" />
          </svg>
        </div>

        {/* FRKTL wordmark */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#e8f4f8",
            letterSpacing: "0.15em",
            marginBottom: 16,
          }}
        >
          FRKTL
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#00d4aa",
            letterSpacing: "0.1em",
            marginBottom: 40,
          }}
        >
          ENERGY
        </div>

        {/* Divider */}
        <div
          style={{
            width: 200,
            height: 2,
            background: "#1a2a42",
            marginBottom: 32,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "#c8dce8",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Modular Nuclear Reactor · HTGR · sCO₂ Brayton Cycle
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 18,
            color: "#8899aa",
          }}
        >
          frktlpower.com
        </div>
      </div>
    ),
    { ...size }
  );
}
