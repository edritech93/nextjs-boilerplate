/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api.tanyo.id",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api.tanyoapp.com",
        pathname: "**",
      },
    ],
  },
  output: "standalone",
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default nextConfig;
