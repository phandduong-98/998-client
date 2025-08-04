import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",

      }, {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      }
    ],
  },
}

export default nextConfig
