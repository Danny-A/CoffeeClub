import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = bundleAnalyzer({
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "http",
      },
      {
        hostname: "*.supabase.co",
        protocol: "https",
      },
      {
        hostname: "127.0.0.1",
        protocol: "http",
      },
      {
        hostname: "www.gravatar.com",
        protocol: "https",
      },
    ],
  },
});

export default nextConfig;
