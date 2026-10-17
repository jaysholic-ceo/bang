import { Metadata } from "next";
import IntroClient from "./IntroClient";
import { CLINIC_YEARS } from "@/lib/clinic";

export const metadata: Metadata = {
    title: "본원 소개",
    description: `강북구 수유동에서 ${CLINIC_YEARS}년간 지켜온 신뢰, 지인마취통증의학과 강북점의 의료 철학과 의료진을 소개합니다.`,
};

export default function IntroPage() {
    return <IntroClient />;
}
