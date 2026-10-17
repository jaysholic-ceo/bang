import { Metadata } from "next";
import GuideClient from "./GuideClient";

export const metadata: Metadata = {
    title: "진료 및 오시는 길",
    description: "지인마취통증의학과 강북점의 진료 시간, 예약 안내 및 화계역 인근 상세 위치를 안내합니다.",
};

export default function GuidePage() {
    return <GuideClient />;
}
