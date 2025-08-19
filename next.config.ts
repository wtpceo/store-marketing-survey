import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 빌드 시 ESLint 오류를 무시 (Vercel 배포를 위함)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 빌드 시 TypeScript 오류를 무시 (Vercel 배포를 위함)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
