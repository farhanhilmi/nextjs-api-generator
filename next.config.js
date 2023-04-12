/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_URL: 'http://localhost:9000/api',
    },
};

module.exports = nextConfig;
