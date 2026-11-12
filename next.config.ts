import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/website' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
  poweredByHeader: false,
  reactStrictMode: true,
};

export default createNextIntlPlugin('./src/i18n/request.ts')(nextConfig);
