import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NoticeDetailClient from "./NoticeDetailClient";
import { getNewsPost, getNewsPosts } from "@/data/posts";
import { pageMetadata } from "@/lib/seo";

// 정적 데이터만 사용하므로 빌드 시점에 모든 상세 페이지를 생성합니다.
export const dynamicParams = false;

export function generateStaticParams() {
  return getNewsPosts().map((post) => ({ id: post.id }));
}

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").trim();

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const post = getNewsPost(id);
  if (!post) return { title: "Post Not Found" };

  return pageMetadata({
    title: post.title,
    description: stripHtml(post.content || post.excerpt || "").substring(0, 160),
    path: `/news/${post.id}`,
    image: post.thumbnail || undefined,
  });
}

export default async function NoticeDetail(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const post = getNewsPost(id);
  if (!post) notFound();

  const serializedPost = {
    ...post,
    boardType: post.category,
    createdAt: post.date,
    updatedAt: post.date,
    thumbnailUrl: post.thumbnail,
  };

  return <NoticeDetailClient post={serializedPost} />;
}
