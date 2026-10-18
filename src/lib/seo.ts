import type { Metadata } from "next";
import { CLINIC_YEARS, SITE_NAME } from "@/lib/clinic";

/** 사이트 기본 설명 (홈·루트 메타). 문구는 기존 그대로입니다. */
export const SITE_DESCRIPTION = `${CLINIC_YEARS}년의 신뢰, 전국 80만 명이 선택한 비수술 보존 치료의 명가. 정밀한 진료와 따뜻한 회복을 약속합니다. 서울 강북구 수유동 통증의학과.`;

// 페이지별 메타데이터를 만듭니다.
// Next.js 는 하위 페이지의 openGraph 를 루트 값과 합치지 않고 통째로 바꾸므로,
// 공유 이미지·사이트 이름 같은 공통 값을 여기서 같이 넣어 줍니다.
// path 는 "/intro" 처럼 사이트 안 경로이며, layout.tsx 의 metadataBase(SITE_URL) 기준으로 절대 주소가 됩니다.
export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  /** 브라우저 탭 제목. layout 의 template 으로 " | 지인마취통증의학과 강북점" 이 뒤에 붙습니다. 없으면 기본 제목. */
  title?: string;
  description: string;
  path: string;
  /** 공유 이미지. 없으면 기본 공유 이미지(/og-image.jpg). */
  image?: string;
}): Metadata {
  const ogTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      images: [image ? { url: image } : DEFAULT_OG_IMAGE],
    },
  };
}
