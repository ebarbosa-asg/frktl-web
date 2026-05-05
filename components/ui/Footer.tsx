import { FRKTLWordmark } from "./FRKTLWordmark";

const LINKS = [
  { label: "Technology", href: "#fuel" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "About", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer
      style={{
        padding: "72px 2rem 48px",
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        <FRKTLWordmark variant="light" size={120} />

        <p
          style={{
            fontFamily: "var(--font-instrument-serif, sans-serif)",
            fontSize: 20,
            color: "rgba(237,224,200,0.5)",
            fontStyle: "italic",
            letterSpacing: "0.02em",
          }}
        >
          Energizing the Globe.
        </p>

        <nav
          style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}
          aria-label="Footer navigation"
        >
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-dm-sans, sans-serif)",
                fontSize: 13,
                color: "var(--color-muted)",
                textDecoration: "none",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#EDE0C8"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-muted)"}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div
          style={{
            width: "100%",
            height: 1,
            background: "var(--color-border)",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-space-mono, monospace)",
            fontSize: 10,
            color: "rgba(122,106,85,0.5)",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          © 2026 FRKTL Energy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
