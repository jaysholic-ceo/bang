import type { NextConfig } from "next";

// 보안 헤더 (2026-10-17). 기본 헤더와 위험도가 낮은 CSP 지시어만 강제하고,
// 전체 CSP 는 Report-Only 로 먼저 둡니다. 브라우저 콘솔에 위반 보고가 없는 것을 확인한 뒤 강제로 바꿉니다.
const CSP_ENFORCED = [
    "frame-ancestors 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
].join("; ");

const CSP_REPORT_ONLY = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://wcs.naver.net",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.g.doubleclick.net https://www.google.com https://wcs.naver.com https://wcs.naver.net",
    "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://td.doubleclick.net https://www.googletagmanager.com",
    "media-src 'self' blob: https:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
].join("; ");

const SECURITY_HEADERS = [
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
    { key: "Strict-Transport-Security", value: "max-age=63072000" },
    { key: "Content-Security-Policy", value: CSP_ENFORCED },
    { key: "Content-Security-Policy-Report-Only", value: CSP_REPORT_ONLY },
];

const nextConfig: NextConfig = {
    async headers() {
        return [{ source: "/:path*", headers: SECURITY_HEADERS }];
    },
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
