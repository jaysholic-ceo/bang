import { Metadata } from "next";
import MedicalDetailClient from "./MedicalDetailClient";
import { BODY_PART_GROUPS } from "@/data/body-parts";
import { pageMetadata } from "@/lib/seo";

type Props = {
    params: Promise<{ slug: string }>;
};

// 메타 설명은 상세 페이지 상단 소개 문장(MedicalDetailClient 의 DISEASES.description)을 그대로 씁니다.
// 상세 문구가 아직 없는 질환(풍선신경성형술)은 기존 안내 문장을 유지합니다.
const DISEASES: Record<string, { title: string; description: string }> = {
    disc: { title: "디스크", description: "척추 통증의 가장 대표적인 원인인 디스크 탈출증은 수술 없이도 충분히 호전될 수 있는 질환입니다. (지인마취통증의학과 강북점)" },
    stenosis: { title: "척추관협착증", description: "나이가 들면서 발생하는 퇴행성 척추 질환으로, 보존적 치료를 통해 통증을 완화하고 기능을 회복할 수 있습니다. (지인마취통증의학과 강북점)" },
    shingles: { title: "대상포진", description: "심각한 신경통으로 이환될 수 있는 대상포진은 초기 적극적인 신경치료가 만성 합병증 예방의 핵심입니다. (지인마취통증의학과 강북점)" },
    "frozen-shoulder": { title: "오십견", description: "관절 운동 범위의 제한과 통증이 동반되는 오십견은 체계적인 보존 요법을 통해 90% 이상 회복 가능합니다. (지인마취통증의학과 강북점)" },
    "rotator-cuff": { title: "회전근개파열", description: "어깨 힘줄의 손상은 정확한 진단하에 맞춤형 보존 치료를 시행하면 수술 없이도 통증 감소와 기능 회복이 가능합니다. (지인마취통증의학과 강북점)" },
    arthritis: { title: "퇴행성관절염", description: "노화로 인한 관절의 변화는 적절한 관리와 비수술적 치료를 동반하면 통증 없이 일상생활을 유지할 수 있습니다. (지인마취통증의학과 강북점)" },
    "carpal-tunnel": { title: "손목터널증후군", description: "손목의 신경 압박으로 발생하는 저림과 통증은 정교한 주사 치료와 생활 습관 교정으로 대부분 완쾌됩니다. (지인마취통증의학과 강북점)" },
    "tennis-elbow": { title: "테니스엘보우", description: "팔꿈치 힘줄의 손상은 충분한 휴식과 적절한 재생 치료를 통해 90% 이상의 높은 완치율을 보입니다. (지인마취통증의학과 강북점)" },
    "balloon-neuroplasty": { title: "풍선신경성형술", description: "지인마취통증의학과 강북점의 풍선신경성형술 (비수술 치료) 안내입니다." },
};

// 질환 목록(body-parts.ts)에 있는 주소만 빌드 시점에 만들고, 그 밖의 주소는 404 로 둡니다.
export const dynamicParams = false;

export function generateStaticParams() {
    return BODY_PART_GROUPS.flatMap((group) =>
        group.items.map((item) => ({ slug: item.href.replace("/medical/", "") }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const disease = DISEASES[slug];

    return pageMetadata({
        title: disease ? `${disease.title} | 주요질환` : "주요질환 안내",
        description: disease?.description || "지인마취통증의학과 강북점의 주요 질환 치료 안내입니다.",
        path: `/medical/${slug}`,
    });
}

export default function MedicalDetailPage() {
    return <MedicalDetailClient />;
}
