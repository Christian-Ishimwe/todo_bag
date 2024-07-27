/** @type {import('next').NextConfig} */
import "dotenv/config"
const nextConfig = {
  reactStrictMode: true,
  env:{
    DATABASE_URL: process.env.DATABASE_URL
  }
};

export default nextConfig;
