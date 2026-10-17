import { Suspense } from "react";
import NewsClient from "./NewsClient";
import { getNewsPosts } from "@/data/posts";

export default function NoticeBoardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <NewsClient initialPosts={getNewsPosts()} />
    </Suspense>
  );
}
