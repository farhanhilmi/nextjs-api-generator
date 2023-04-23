/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_URL: 'https://nextjs-api-generator.vercel.app/api',
    },
};

module.exports = nextConfig;
