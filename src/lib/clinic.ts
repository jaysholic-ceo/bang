// 병원 기본 사실 — 문구에서 "N년"을 말할 때는 이 값을 씁니다.
// 개원 연도(2008)만 사실로 두고, 햇수는 거기서 계산합니다. 해가 바뀌면 문구를 손으로 고칠 필요가 없습니다.
// (개원 '월'은 반영하지 않은 연도 차이입니다. 월까지 정확히 맞추려면 개원일을 알려 주세요.)
export const OPENED_YEAR = 2008;
export const CLINIC_YEARS = new Date().getFullYear() - OPENED_YEAR;

export const SITE_NAME = "지인마취통증의학과 강북점";

// 사이트 주소 — 메타데이터(metadataBase·canonical·공유 주소), sitemap, robots, 구조화 데이터가 모두 이 값을 씁니다.
// 도메인이 아직 확정되지 않았습니다(임시). 확정되면 이 한 줄만 바꾸면 됩니다.
export const SITE_URL = "https://jiin-clinic-gangbuk.com";

// 검색 노출 여부 — 정식 오픈(도메인 연결) 전까지 false 로 둡니다.
// false 이면 모든 페이지에 noindex 가 붙고 robots.txt 에 sitemap 을 싣지 않습니다. 오픈할 때 true 로 바꿉니다.
export const SITE_INDEXABLE = false;
