import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Taruh di ROOT, BUKAN di dalam 'experimental'
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.100.170:3000", 
    "192.168.100.170"
  ],

  // Kalau lo punya config lain (kayak images, redirects, dll), taruh di bawah sini
  // ...
};

export default nextConfig;