import type { Metadata } from "next";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { MobileQuickMenu } from "@/components/layout/MobileQuickMenu";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import NaverAnalytics from "@/components/analytics/NaverAnalytics";
import { CLINIC_YEARS } from "@/lib/clinic";

const sans = Noto_Sans_KR({
  variable: "--font-sans",
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const serif = Noto_Serif_KR({
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jiin-clinic-gangbuk.com"),
  title: {
    default: "지인마취통증의학과 강북점",
    template: "%s | 지인마취통증의학과 강북점"
  },
  description: `${CLINIC_YEARS}년의 신뢰, 전국 80만 명이 선택한 비수술 보존 치료의 명가. 정밀한 진료와 따뜻한 회복을 약속합니다. 서울 강북구 수유동 통증의학과.`,
  keywords: ["통증의학과", "강북구 통증의학과", "수유동 통증의학과", "도수치료", "디스크치료", "대상포진", "오십견", "체외충격파"],
  authors: [{ name: "지인마취통증의학과 강북점" }],
  creator: "지인마취통증의학과 강북점",
  publisher: "지인마취통증의학과 강북점",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "지인마취통증의학과 강북점",
    description: `${CLINIC_YEARS}년의 신뢰, 전문성에 따뜻함을 더한 수준 높은 비수술 통증 진료. 서울 강북구 수유동 통증의학과.`,
    url: "https://jiin-gangbuk.com", // 임시 도메인
    siteName: "지인마취통증의학과 강북점",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "지인마취통증의학과 강북점",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "지인마취통증의학과 강북점",
    "alternateName": "Jiin Pain Clinic Gangbuk",
    "image": "https://jiin-gangbuk.com/images/hospital-exterior.jpg", // 임시 경로
    "@id": "https://jiin-gangbuk.com",
    "url": "https://jiin-gangbuk.com",
    "telephone": "02-6431-1234",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "삼양로 319 (수유동)",
      "addressLocality": "강북구",
      "addressRegion": "서울특별시",
      "postalCode": "01053",
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.6321, // 추정 좌표 (수유동 삼양로)
      "longitude": 127.0234
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "areaServed": {
      "@type": "City",
      "name": "강북구"
    },
    "medicalSpecialty": ["PainManagement", "PhysicalTherapy"],
    "sameAs": [
      "https://blog.naver.com/jiinclinic", // 임시 소셜 링크
    ]
  };

  return (
    <html lang="ko">
      <head>
        <GoogleAnalytics />
        <NaverAnalytics />
        <meta name="theme-color" content="#A8531F" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${sans.variable} ${serif.variable} ${sans.className} antialiased selection:bg-primary/20 bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-black focus:shadow-lg"
        >
          본문 바로가기
        </a>
        <Header />
        <div className="pt-24"> {/* Header height compensation: 24 (96px) matches initial Header height */}
          <main id="main-content" tabIndex={-1} className="min-h-screen pb-safe outline-none">
            {children}
          </main>
        </div>
        <Footer />
        <MobileQuickMenu />
      </body>
    </html>
  );
}
