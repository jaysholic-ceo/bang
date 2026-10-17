"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { NAVER_WCS_ID, naverPageview } from "@/lib/naver-wcs";

export default function NaverAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!NAVER_WCS_ID) return;
    // SPA 라우트 변경 시 페이지뷰 재전송
    naverPageview();
  }, [pathname]);

  if (!NAVER_WCS_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://wcs.naver.net/wcslog.js"
        onLoad={() => {
          naverPageview();
        }}
      />
    </>
  );
}
