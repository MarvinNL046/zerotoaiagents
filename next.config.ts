import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Image optimization (Vercel handles this natively)
  images: {
    unoptimized: false,
  },
};

export default withNextIntl(nextConfig);
