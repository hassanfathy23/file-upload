/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:3000/api/:path*",
  //     },
  //   ];
  // },
  reactStrictMode: true,
}

module.exports = nextConfig
