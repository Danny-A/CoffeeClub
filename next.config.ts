import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
