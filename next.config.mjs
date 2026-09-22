/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  ...(isProduction ? { output: "export" } : {}),
  ...(isProduction ? { basePath: "/love-offering-frontend" } : {}),
};

export default nextConfig;