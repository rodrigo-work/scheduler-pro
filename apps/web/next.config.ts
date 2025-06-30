/** @type {import('next').NextConfig} */

import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  // devIndicators: true,
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default nextConfig
