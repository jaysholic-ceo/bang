import { Metadata } from "next";
import MedicalClient from "./MedicalClient";

export const metadata: Metadata = {
    title: "주요 질환",
    description: "디스크, 척추관협착증, 대상포진 등 지인마취통증의학과 강북점의 주요 질환과 비수술적 치료법을 안내합니다.",
};

export default function MedicalPage() {
    return <MedicalClient />;
}
