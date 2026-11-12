import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { productionBasePath } from './src/config/paths';

const basePath =
  process.env.NODE_ENV === 'production' ? productionBasePath : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default createNextIntlPlugin('./src/i18n/request.ts')(nextConfig);
