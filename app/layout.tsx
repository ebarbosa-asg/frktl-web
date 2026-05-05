import type { Metadata } from "next";
import { Space_Mono, DM_Sans, Instrument_Serif, Atomic_Age } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const atomicAge = Atomic_Age({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-atomic-age",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FRKTL Energy — Modular Nuclear Reactor | HTGR Technology",
  description:
    "FRKTL Energy builds modular HTGR nuclear reactors using TRISO fuel and sCO₂ Brayton cycle power conversion. Factory-built, road-transported, walk-away safe. Targeting first criticality 2033.",
  metadataBase: new URL("https://frktlpower.com"),
  alternates: {
    canonical: "https://frktlpower.com",
  },
  openGraph: {
    title: "FRKTL Energy — Modular Nuclear Reactor | HTGR Technology",
    description:
      "Factory-built modular nuclear reactors. TRISO fuel. sCO₂ Brayton cycle. Walk-away safe. First criticality 2033.",
    url: "https://frktlpower.com",
    siteName: "FRKTL Energy",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FRKTL Energy — Modular Nuclear Reactor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FRKTL Energy — Modular Nuclear Reactor | HTGR Technology",
    description:
      "Factory-built modular nuclear reactors. TRISO fuel. sCO₂ Brayton cycle. Walk-away safe. First criticality 2033.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FRKTL Energy",
  url: "https://frktlpower.com",
  description:
    "FRKTL Energy builds modular high-temperature gas-cooled reactors (HTGR) using TRISO fuel and supercritical CO₂ power conversion. Factory-manufactured, road-transportable, walk-away safe.",
  sameAs: [] as string[],
  contactPoint: {
    "@type": "ContactPoint",
    email: "eduardo@frktlpower.com",
    contactType: "investor relations",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${dmSans.variable} ${instrumentSerif.variable} ${atomicAge.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
