import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a1628",
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
        }}
      >
        <svg viewBox="0 0 120 120" width={100} height={100}>
          <polygon
            points="60,10 105,35 105,85 60,110 15,85 15,35"
            fill="none"
            stroke="#14a3a8"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="60" r="18" fill="#00d4aa" />
          <circle cx="60" cy="60" r="8" fill="#0a1628" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
