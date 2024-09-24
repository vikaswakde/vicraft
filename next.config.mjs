/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'assets.example.com',
            port: '',
            pathname: '/account123/**',
          },
          {
            protocol: 'https',
            hostname: 'nextjs.org',
            port: '',
            pathname: '/icons/**',
          },
          {
            protocol: 'https',
            hostname: 'github.githubassets.com',
            port: '',
            pathname: '/assets/**',
          },
        ],
      },
};

export default nextConfig;
