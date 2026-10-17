// 병원 기본 사실 — 문구에서 "N년"을 말할 때는 이 값을 씁니다.
// 개원 연도(2008)만 사실로 두고, 햇수는 거기서 계산합니다. 해가 바뀌면 문구를 손으로 고칠 필요가 없습니다.
// (개원 '월'은 반영하지 않은 연도 차이입니다. 월까지 정확히 맞추려면 개원일을 알려 주세요.)
export const OPENED_YEAR = 2008;
export const CLINIC_YEARS = new Date().getFullYear() - OPENED_YEAR;
