import { FRKTLWordmark } from "./FRKTLWordmark";

export function Footer() {
  return (
    <footer
      style={{
        padding: "64px 24px",
        textAlign: "center",
        borderTop: "1px solid var(--color-slate)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <FRKTLWordmark variant="light" size={100} />
        <p
          style={{
            fontFamily: "var(--font-dm-sans, sans-serif)",
            fontSize: 14,
            color: "var(--color-text)",
          }}
        >
          Energizing the Globe.
        </p>
        <p
          style={{
            fontFamily: "var(--font-space-mono, monospace)",
            fontSize: 10,
            color: "var(--color-steel)",
            letterSpacing: "2px",
          }}
        >
          © 2026 FRKTL Energy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
