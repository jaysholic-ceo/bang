import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// 의료진 상세 페이지는 클라이언트 컴포넌트라 메타데이터를 여기(서버 레이아웃)에서 지정합니다.
// 설명 문구는 페이지 상단 소개 문장을 그대로 씁니다.
export const metadata: Metadata = pageMetadata({
  title: "이석면 원장",
  description: "지인마취통증의학과 강북점 이석면 원장. 환자의 고통을 깊이 공감하며, 최상의 비수술 통증치료 솔루션을 제공합니다.",
  path: "/intro/doctor-lee",
});

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
