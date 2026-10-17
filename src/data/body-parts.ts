// 부위별 질환 목록 — 헤더 메뉴, 홈의 "어디가 불편하세요?", 주요 질환 페이지가 함께 씁니다.
// 질환을 추가/수정할 때는 이 파일만 고치면 됩니다.

export interface BodyPartLink {
  label: string;
  href: string;
}

export interface BodyPartGroup {
  name: string;
  /** 부위 그림 (public/images/illust/part-*.webp, 높이 360px·투명 배경). 홈 카드·주요 질환 카드·질환 상세 상단에서 씁니다. */
  icon: string;
  items: BodyPartLink[];
}

export const BODY_PART_GROUPS: BodyPartGroup[] = [
  {
    name: "척추·허리",
    icon: "/images/illust/part-spine.webp",
    items: [
      { label: "디스크", href: "/medical/disc" },
      { label: "척추관협착증", href: "/medical/stenosis" },
    ],
  },
  {
    name: "어깨·팔",
    icon: "/images/illust/part-shoulder.webp",
    items: [
      { label: "오십견", href: "/medical/frozen-shoulder" },
      { label: "회전근개파열", href: "/medical/rotator-cuff" },
      { label: "테니스엘보우", href: "/medical/tennis-elbow" },
    ],
  },
  {
    name: "손·손목",
    icon: "/images/illust/part-hand.webp",
    items: [{ label: "손목터널증후군", href: "/medical/carpal-tunnel" }],
  },
  {
    name: "관절",
    icon: "/images/illust/part-knee.webp",
    items: [{ label: "퇴행성관절염", href: "/medical/arthritis" }],
  },
  {
    name: "신경·통증",
    icon: "/images/illust/part-nerve.webp",
    items: [
      { label: "대상포진", href: "/medical/shingles" },
      { label: "풍선신경성형술", href: "/medical/balloon-neuroplasty" },
    ],
  },
];

/** 질환 slug(예: "disc")로 소속 부위 그룹을 찾습니다. 주요 질환 카드와 상세 상단의 그림에 씁니다. */
export function getBodyPartBySlug(slug: string): BodyPartGroup | undefined {
  return BODY_PART_GROUPS.find((group) =>
    group.items.some((item) => item.href === `/medical/${slug}`)
  );
}
