// 홈 "방송·영상 자료" 가로 스크롤 카드와 히어로 영상에 쓰이는 정적 데이터입니다.
//
// ▶ 방송/영상을 추가하려면 아래 DEFAULT_MEDIA_POSTS 배열에 broadcast(...) 한 줄만 넣으세요.
//   YouTube 주소(youtu.be / watch?v= / shorts / embed)를 그대로 붙여 넣으면 영상 ID 와
//   썸네일을 자동으로 만듭니다. 가장 첫 번째 "영상" 항목은 홈 히어로 배경 영상으로도 쓰입니다.
//   예)  broadcast({ url: "https://youtu.be/XXXXXXXXXXX", title: "KBS 생생정보 ○○○", date: "2026.10.01", category: "방송" }),
//
// ▶ image 를 비워 두면 스톡 사진 대신 병원 로고 카드로 표시됩니다 (실제 사진이 생기면 image 에 경로를 넣으세요).
// ▶ 첫 항목(MBN)은 /news/[id] 상세(src/data/news.ts)와 같은 id 를 씁니다.

export interface MediaPost {
  id?: string;
  category: string;
  title: string;
  date: string;
  image?: string;
  type: "video" | "post";
  videoId?: string;
  description: string;
}

/** YouTube 주소나 11자리 ID 에서 영상 ID 를 뽑습니다. 못 찾으면 undefined. */
export function youtubeId(input: string): string | undefined {
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m =
    s.match(/youtu\.be\/([\w-]{11})/) ||
    s.match(/[?&]v=([\w-]{11})/) ||
    s.match(/youtube\.com\/(?:embed|shorts|live)\/([\w-]{11})/);
  return m ? m[1] : undefined;
}

/** 방송·영상 카드 한 장을 만듭니다. */
export function broadcast(opts: {
  url: string;
  title: string;
  date: string; // "2026.10.01"
  category?: string; // 기본 "방송"
  description?: string;
  id?: string; // 상세 글(/news/[id])이 있으면 연결
}): MediaPost {
  const videoId = youtubeId(opts.url);
  return {
    id: opts.id,
    category: opts.category ?? "방송",
    title: opts.title,
    date: opts.date,
    image: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined,
    type: "video",
    videoId,
    description: opts.description ?? "",
  };
}

export const DEFAULT_MEDIA_POSTS: MediaPost[] = [
  {
    id: "0943ed0e-2017-4a18-9f8b-eb44ae2917a5",
    category: "Media",
    title: "MBN 특집 다큐 '통증 없는 노후' 지인마취통증의학과",
    date: "2026.09.22",
    image: "https://img.youtube.com/vi/VmHK-TZ_INg/hqdefault.jpg",
    type: "video",
    videoId: "VmHK-TZ_INg",
    description:
      "MBN 특집 다큐멘터리 '통증 없는 노후'에 지인마취통증의학과가 자문 출연하였습니다. 자세한 내용은 영상을 통해 확인해 주세요.",
  },
  {
    category: "Seminar",
    title: "수유동 주민센터 '100세 시대 척추 건강' 강좌",
    date: "2026.03.10",
    type: "post",
    description:
      "지인마취통증의학과 강북점의 전문 의료진이 지역 사회와 국민 건강을 위해 기여하는 모습을 확인하세요.",
  },
  {
    category: "Media",
    title: "조선일보 선정 '비수술 통증치료 우수 의료기관'",
    date: "2025.08.22",
    type: "post",
    description:
      "지인마취통증의학과 강북점의 전문 의료진이 지역 사회와 국민 건강을 위해 기여하는 모습을 확인하세요.",
  },
];
