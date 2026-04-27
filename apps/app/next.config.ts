import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["fcontreras2-ui"],
  experimental: {
    optimizePackageImports: ["lucide-react", "fcontreras2-ui"],
  },
};

export default withNextIntl(nextConfig);
