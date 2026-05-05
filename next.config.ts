import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No output: 'export' — deploy to Vercel with SSR runtime
  // This preserves next/image, next/og, and Vercel Analytics
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
