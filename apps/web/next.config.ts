/** @type {import('next').NextConfig} */
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default nextConfig
