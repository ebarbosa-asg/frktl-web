import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FRKTL Energy",
  description: "Modular nuclear reactor startup.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
