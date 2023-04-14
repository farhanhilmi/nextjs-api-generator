/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_URL:
            'https://backend-api-generator.as.r.appspot.com/api',
    },
};

module.exports = nextConfig;
