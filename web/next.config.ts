import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Pindahkan ke sini (root), jangan di dalam experimental
  allowedDevOrigins: ['192.168.100.170'],
};

export default nextConfig;