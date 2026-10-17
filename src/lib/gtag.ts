/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Google Analytics 4 (GA4) + Google Ads 전환추적 유틸리티
 * - GA4 측정 ID: NEXT_PUBLIC_GA_ID (G-XXXXXXXXXX)
 * - Google Ads 전환 ID: NEXT_PUBLIC_GOOGLE_ADS_ID (AW-XXXXXXXXX)
 * - 전환 라벨: 전화/지도/예약 각각 별도 라벨
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";

// 전환 라벨 (구글 애즈 전환 액션별)
const GADS_LABELS = {
  call: process.env.NEXT_PUBLIC_GADS_CALL_LABEL || "",
  map: process.env.NEXT_PUBLIC_GADS_MAP_LABEL || "",
  booking: process.env.NEXT_PUBLIC_GADS_BOOKING_LABEL || "",
};

// ── GA4 기본 함수 ──

/** 페이지뷰 전송 */
export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

/** 커스텀 이벤트 전송 (GA4) */
export function event(
  action: string,
  {
    event_category,
    event_label,
    value,
  }: {
    event_category: string;
    event_label?: string;
    value?: number;
  }
) {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag("event", action, {
    event_category,
    event_label,
    value,
  });
}

// ── 구글 애즈 전환 전송 ──

/** 구글 애즈 전환 이벤트 전송 */
function adsConversion(label: string) {
  if (!GOOGLE_ADS_ID || !label) return;
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
  });
}

// ── 통합 전환 헬퍼 (GA4 + 구글 애즈 동시 발송) ──

/** 전화 걸기 클릭 */
export function trackPhoneCall(location: string) {
  event("phone_call_click", {
    event_category: "conversion",
    event_label: location,
  });
  adsConversion(GADS_LABELS.call);
}

/** 네이버 지도 열기 */
export function trackNaverMap(location: string) {
  event("naver_map_click", {
    event_category: "conversion",
    event_label: location,
  });
  adsConversion(GADS_LABELS.map);
}

/** 카카오 맵 열기 */
export function trackKakaoMap(location: string) {
  event("kakao_map_click", {
    event_category: "conversion",
    event_label: location,
  });
  adsConversion(GADS_LABELS.map);
}

/** 예약하기 버튼 클릭 */
export function trackBooking(location: string) {
  event("booking_click", {
    event_category: "conversion",
    event_label: location,
  });
  adsConversion(GADS_LABELS.booking);
}

/** 오시는 길 클릭 */
export function trackDirections(location: string) {
  event("directions_click", {
    event_category: "navigation",
    event_label: location,
  });
}

/** 진료시간 클릭 */
export function trackHours(location: string) {
  event("clinic_hours_click", {
    event_category: "navigation",
    event_label: location,
  });
}

