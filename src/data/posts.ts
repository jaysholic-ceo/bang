// 뉴스·칼럼 정적 데이터 로더.
//
// - posts.json : 기존 DB(Post 테이블)에서 내보낸 게시글. 비어 있으면 아래 news.ts 의 기본 목록을 사용합니다.
//                내보내는 방법은 docs/DB_REMOVAL_GUIDE.md 를 참고하세요.
// - news.ts    : 저장소에 포함된 기본(레거시) 게시글.
import exported from "./posts.json";
import { newsPosts, type NewsPost } from "./news";

export type { NewsPost };

const exportedPosts = exported as NewsPost[];

/** 전체 게시글 (최신순). posts.json 이 비어 있으면 news.ts 의 기본 목록. */
export function getNewsPosts(): NewsPost[] {
  const list = exportedPosts.length > 0 ? exportedPosts : newsPosts;
  return [...list].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getNewsPost(id: string): NewsPost | undefined {
  return getNewsPosts().find((post) => post.id === id);
}
