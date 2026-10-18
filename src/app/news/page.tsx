import { Suspense } from "react";
import NewsClient from "./NewsClient";
import { getNewsPosts } from "@/data/posts";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "본원 소식",
  description: "지인마취통증의학과 강북점의 새로운 소식과 언론 보도, 그리고 전문의가 직접 작성하는 건강 칼럼을 전해드립니다.",
  path: "/news",
});

export default function NoticeBoardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <NewsClient initialPosts={getNewsPosts()} />
    </Suspense>
  );
}
