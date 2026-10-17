import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/community',
                destination: '/news',
                permanent: true,
            },
            {
                source: '/notice',
                destination: '/news',
                permanent: true,
            },
            {
                source: '/location',
                destination: '/guide',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
