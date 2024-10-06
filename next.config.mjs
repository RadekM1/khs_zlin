/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/khs-zlin/**',
      },
    ],
  },
  
    productionBrowserSourceMaps: true, 
  
  
};

export default nextConfig;
