import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a1628",
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 32 32" width={28} height={28}>
          <polygon
            points="16,3 28,10 28,22 16,29 4,22 4,10"
            fill="none"
            stroke="#14a3a8"
            strokeWidth="2"
          />
          <circle cx="16" cy="16" r="4" fill="#00d4aa" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
