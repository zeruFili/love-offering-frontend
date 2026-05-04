/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  output: "export",

  basePath: "/love-offering-frontend", // ← ADD THIS
};

export default nextConfig;