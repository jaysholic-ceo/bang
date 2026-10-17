/**
 * 네이버 검색광고 전환추적 (wcs_do) 유틸리티
 * - 사이트 ID는 환경변수로 관리 (NEXT_PUBLIC_NAVER_WCS_ID)
 * - 추후 원장님으로부터 실제 s_XXXX ID 수령 후 .env.local에서 교체
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    wcs: any;
    wcs_add: any;
    wcs_do: (nasa?: any) => void;
    _nasa: any;
  }
}

export const NAVER_WCS_ID = process.env.NEXT_PUBLIC_NAVER_WCS_ID || "";

/** 네이버 페이지뷰 전송 */
export function naverPageview() {
  if (!NAVER_WCS_ID || typeof window === "undefined" || !window.wcs) return;
  if (!window.wcs_add) window.wcs_add = {};
  window.wcs_add["wa"] = NAVER_WCS_ID;
  window.wcs.inflow();
  window.wcs_do();
}

/**
 * 네이버 전환 이벤트 전송
 * @param type 전환 유형 (1: 구매, 2: 회원가입, 3: 장바구니, 4: 기타)
 * @param value 전환 값 (optional)
 */
export function naverConversion(type: string = "4", value: string = "0") {
  if (!NAVER_WCS_ID || typeof window === "undefined" || !window.wcs) return;
  const _nasa: any = {};
  _nasa["cnv"] = window.wcs.cnv("send", type);
  if (!window.wcs_add) window.wcs_add = {};
  window.wcs_add["wa"] = NAVER_WCS_ID;
  window.wcs.inflow();
  window.wcs_do(_nasa);
}

// ── 미리 정의된 전환 이벤트 헬퍼 ──

/** 전화 걸기 전환 */
export function naverTrackPhoneCall() {
  naverConversion("4", "0");
}

/** 지도 열기 전환 */
export function naverTrackMap() {
  naverConversion("4", "0");
}

/** 예약하기 전환 */
export function naverTrackBooking() {
  naverConversion("4", "0");
}
