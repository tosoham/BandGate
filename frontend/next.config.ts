import type { NextConfig } from "next";

// No `output: "standalone"` — that mode is for self-hosting/Docker and makes Vercel
// look for a static output directory. Vercel builds the Next.js app natively.
const nextConfig: NextConfig = {};

export default nextConfig;
