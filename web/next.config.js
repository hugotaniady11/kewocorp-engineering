

const NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kewocorp.com',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = NextConfig
