import { Metadata } from "next";
import MedicalDetailClient from "./MedicalDetailClient";

type Props = {
    params: Promise<{ slug: string }>;
};

const DISEASES: Record<string, { title: string; description: string }> = {
    disc: { title: "디스크", description: "지인마취통증의학과 강북점의 디스크 비수술 치료 안내입니다." },
    stenosis: { title: "척추관협착증", description: "지인마취통증의학과 강북점의 척추관협착증 보존적 치료 안내입니다." },
    shingles: { title: "대상포진", description: "지인마취통증의학과 강북점의 대상포진 및 신경통 치료 안내입니다." },
    "frozen-shoulder": { title: "오십견", description: "지인마취통증의학과 강북점의 오십견 비수술 재활 치료 안내입니다." },
    "rotator-cuff": { title: "회전근개파열", description: "지인마취통증의학과 강북점의 회전근개파열 비수술 치료 안내입니다." },
    arthritis: { title: "퇴행성관절염", description: "지인마취통증의학과 강북점의 퇴행성관절염 맞춤형 관리 안내입니다." },
    "carpal-tunnel": { title: "손목터널증후군", description: "지인마취통증의학과 강북점의 손목터널증후군 비수술 치료 안내입니다." },
    "tennis-elbow": { title: "테니스엘보우", description: "지인마취통증의학과 강북점의 테니스엘보우 보존적 치료 안내입니다." },
    "balloon-neuroplasty": { title: "풍선신경성형술", description: "지인마취통증의학과 강북점의 풍선신경성형술 (비수술 치료) 안내입니다." },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const disease = DISEASES[slug];
    
    return {
        title: disease ? `${disease.title} | 주요질환` : "주요질환 안내",
        description: disease?.description || "지인마취통증의학과 강북점의 주요 질환 치료 안내입니다.",
    };
}

export default function MedicalDetailPage() {
    return <MedicalDetailClient />;
}
