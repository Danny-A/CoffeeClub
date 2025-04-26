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
      {
        hostname: "www.gravatar.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
