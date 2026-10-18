"use client";

import { useParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { ChevronRight, BookOpen, Clock, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { trackBooking, trackPhoneCall } from "@/lib/gtag";
import { naverTrackBooking, naverTrackPhoneCall } from "@/lib/naver-wcs";
import { PageHero } from "@/components/layout/PageHero";
import { BODY_PART_GROUPS, getBodyPartBySlug } from "@/data/body-parts";

const DISEASES: Record<string, {
    title: string;
    engTitle: string;
    description: string;
    treatmentTitle: string;
    treatmentContent: string;
    source: string;
}> = {
    disc: {
        title: "디스크",
        engTitle: "Lumbar Herniated Intervertebral Disc",
        description: "척추 통증의 가장 대표적인 원인인 디스크 탈출증은 수술 없이도 충분히 호전될 수 있는 질환입니다.",
        treatmentTitle: "디스크의 치료",
        treatmentContent: "교과서적으로 추간판탈출증은 안정과 휴식을 취하면서 약물치료, 물리치료, 신경치료 등의 보존적 치료를 우선시행 하게 되어 있습니다.\n\n80~90% 이상의 환자들은 비수술적 요법으로 대개 2개월내 증상이 호전되며, 수술을 필요로 하는 환자는 전체의 3~5% 정도에 불과한 것으로 알려져 있습니다.\n\n증상 초기 3개월내는 수술을 피하는 것이 좋은데, 대부분 이 기간을 지내면 증상이 호전되기 때문입니다. 수술 전 주된 증상이 요통일 경우는 추간판 절제 수술을 하여도 호전이 적은 것으로 알려져 있습니다.",
        source: "추간판탈출증[lumbar herniated intervertebral disc] (국가건강정보포털 의학정보, 서울대학교병원 의학정보)",
    },
    stenosis: {
        title: "척추관협착증",
        engTitle: "Spinal Stenosis",
        description: "나이가 들면서 발생하는 퇴행성 척추 질환으로, 보존적 치료를 통해 통증을 완화하고 기능을 회복할 수 있습니다.",
        treatmentTitle: "척추관협착증의 치료",
        treatmentContent: "척추관협착증 환자는 급격한 증상의 악화나 기능의 저하가 드물기에 먼저 보존적 치료를 시행합니다. 보존적 치료 방법에는 생활습관교정, 적절한 운동, 물리치료, 신경치료 등 다양한 방법이 사용됩니다.\n\n급격히 다리의 힘이 약해지고 대소변 기능의 장애가 발생하는 등 신경 증상이 악화되는 환자가 아니면 척추관협착증 환자에서 수술은 응급하게 시행하지 않아도 됩니다. 수술을 해야 하는 경우는 신경 증상이 악화되는 경우, 보존적 치료로 통증이 완화되지 않는 경우, 지속적인 장애, 일상생활의 제한이 있는 경우입니다.\n\nLarequi-Lauber 등은 척추관협착증 수술환자 328명의 적응증이 적절하였는지 분석하였는데 38%에서는 적응증이 부적절하였다고 보고하였습니다. 척추관협착증에 해당하는 증상의 과거력, 신체 검진소견, 방사선학적 소견이 없는 환자는 비수술적 치료가 우선권고되고 있습니다.",
        source: "척추관협착증[spinal stenosis] (국가건강정보포털 의학정보, 서울대학교병원 의학정보)",
    },
    shingles: {
        title: "대상포진",
        engTitle: "Postherpetic Neuralgia",
        description: "심각한 신경통으로 이환될 수 있는 대상포진은 초기 적극적인 신경치료가 만성 합병증 예방의 핵심입니다.",
        treatmentTitle: "대상포진의 치료",
        treatmentContent: "가장 중요한 치료는 수포발생 3일 내 항바이러스제를 복용하는 것입니다. 초기에 신경치료를 시행하는 것이 만성통증으로의 이환을 줄일 수 있으며, 특히 심한 신경증상을 동반한 통증 및 이질통 등이 생기는 경우 특수카테터를 이용한 지속적 경막외신경치료 등이 도움이 될 수 있습니다.",
        source: "대상포진 후 신경통[postherpetic neuralgia] (서울대학교병원 의학정보)",
    },
    "frozen-shoulder": {
        title: "오십견",
        engTitle: "Frozen Shoulder",
        description: "관절 운동 범위의 제한과 통증이 동반되는 오십견은 체계적인 보존 요법을 통해 90% 이상 회복 가능합니다.",
        treatmentTitle: "오십견의 치료",
        treatmentContent: "치료원칙은 물리치료, 운동치료, 신경치료 등 보존적 치료가 우선이며 수동적 관절 운동을 통한 관절 운동 범위를 회복시키는 것입니다.\n\n견갑상 신경치료, 관절강내 수압팽창술, 상완신경총 마취하 도수조작(brisement manipulation) 등의 보조요법이 도움이 될 수 있습니다. 체계적인 보존 요법은 환자의 90%에서 만족할만한 임상 결과를 보이며, 6개월 이상의 체계적인 치료에도 불구하고 회복의 징후가 보이지 않을 경우 수술 등이 필요할 수 있습니다.",
        source: "오십견[frozen shoulder] (국가건강정보포털 의학정보, 서울대학교병원 건강칼럼)",
    },
    "rotator-cuff": {
        title: "회전근개파열",
        engTitle: "Rotator Cuff Tear",
        description: "어깨 힘줄의 손상은 정확한 진단하에 맞춤형 보존 치료를 시행하면 수술 없이도 통증 감소와 기능 회복이 가능합니다.",
        treatmentTitle: "회전근개파열의 치료",
        treatmentContent: "보존적 치료가 우선이며 운동치료, 물리치료, 신경치료, 인대강화치료(DNA주사, 태반주사) 등이 통증 조절과 관절 기능을 회복하는데 도움을 주며 일상생활을 가능하게 합니다. 그러나 3개월가량의 보존치료에도 증상이 지속되는 경우 수술을 생각해 볼 수 있습니다.\n\n고령, 힘줄파열의 정도가 심한 경우, 근육위축이 동반된 경우에는 수술 예후가 좋지 않은 것으로 알려져 있으며, 한국 보건의료연구원의 최근 연구에 의하면(서울소재 3개 대학병원에서 2008년부터 2013년까지 1~3CM의 회전근개파열로 치료받은 50세 이상 환자 대상의 연구), 수술치료군과 보존치료군 모두 시간 경과에 따라 통증이 감소하는 경향을 보였고, 1년후에는 치료법에 따른 통증감소 정도에 차이가 없었으며, 평균 관절가동범위도 치료에 따른 유의한 효과 차이가 없다고 보고하였습니다.",
        source: "회전근개파열 (한국보건의료연구원, 서울대학교병원 의학정보)",
    },
    arthritis: {
        title: "퇴행성관절염",
        engTitle: "Degenerative Arthritis",
        description: "노화로 인한 관절의 변화는 적절한 관리와 비수술적 치료를 동반하면 통증 없이 일상생활을 유지할 수 있습니다.",
        treatmentTitle: "퇴행성관절염의 치료",
        treatmentContent: "퇴행성관절염은 관절 연골의 퇴행성 변화로 인해 발생하는 질환으로, 비수술적 보존 치료가 우선 권고됩니다. 물리치료, 운동치료, 약물치료, 신경치료, 관절강내 주사(히알루론산, PRP) 등의 다양한 보존적 치료법이 활용되며, 적절한 체중 관리와 근력 강화 운동이 중요합니다. 장기간의 보존적 치료에도 호전이 없는 경우 수술적 치료를 고려할 수 있습니다.",
        source: "퇴행성관절염[degenerative arthritis] (서울대학교병원 의학정보)",
    },
    "carpal-tunnel": {
        title: "손목터널증후군",
        engTitle: "Carpal Tunnel Syndrome",
        description: "손목의 신경 압박으로 발생하는 저림과 통증은 정교한 주사 치료와 생활 습관 교정으로 대부분 완쾌됩니다.",
        treatmentTitle: "손목터널증후군의 치료",
        treatmentContent: "비수술적 보존치료법으로 염증이 발생한 정중신경을 직접 치료하는 정중신경 치료와 약물치료, 물리치료, 운동치료 등이 있으며, 대부분 비수술적인 방법으로 호전되나 장기간의 보존치료에 호전이 없는 경우, 힘이 약해지거나 근육이 위축되는 경우에는 수술 대상이 될 수 있습니다.",
        source: "수근관 증후군[carpal tunnel syndrome] (서울대학교병원 의학정보, 서울대학교병원 건강칼럼)",
    },
    "tennis-elbow": {
        title: "테니스엘보우",
        engTitle: "Epicondylitis",
        description: "팔꿈치 힘줄의 손상은 충분한 휴식과 적절한 재생 치료를 통해 90% 이상의 높은 완치율을 보입니다.",
        treatmentTitle: "테니스엘보우의 치료",
        treatmentContent: "가장 중요한 것은 관절의 휴식이며, 물리치료, 운동치료, 신경치료, 인대강화치료(DNA주사, 태반주사) 등의 보존적 요법으로 90% 이상 회복되지만, 6개월 이상 충분한 휴식을 가지고 보존적 치료를 하였음에도 듣지 않는다면 수술적 치료가 필요할 수 있습니다.",
        source: "상과염[epicondylitis] (서울대학교병원 의학정보)",
    },
};

// 사이드바 목록: 헤더 메뉴/홈과 같은 데이터(body-parts.ts)를 씁니다.
const ALL_DISEASES = BODY_PART_GROUPS.flatMap((group) =>
    group.items.map((item) => ({ slug: item.href.replace("/medical/", ""), label: item.label }))
);

export default function MedicalDetailClient() {
    const params = useParams();
    const slug = params.slug as string;
    const disease = DISEASES[slug];

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    if (!disease) {
        // 목록에는 있으나 상세 안내문이 아직 없는 질환(예: 풍선신경성형술)은 안내 문구를 보여줍니다.
        const listed = ALL_DISEASES.find((d) => d.slug === slug);
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <h1 className="text-3xl font-serif font-bold mb-4 break-keep">
                    {listed ? `${listed.label} 안내를 준비하고 있습니다` : "페이지를 찾을 수 없습니다"}
                </h1>
                {listed && (
                    <p className="text-muted-foreground mb-6 break-keep">
                        자세한 진료 상담은 전화(02-6431-1234)로 문의해 주세요.
                    </p>
                )}
                <Link href="/medical" className="inline-flex items-center min-h-11 text-primary font-bold hover:underline underline-offset-4">
                    주요 질환 목록으로 돌아가기
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background pb-32">
            <PageHero
                breadcrumb={
                    <nav aria-label="현재 위치" className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Link href="/medical" className="inline-flex min-h-6 items-center hover:text-primary transition-colors">주요 질환</Link>
                        <ChevronRight size={14} aria-hidden="true" />
                        <span aria-current="page" className="font-bold text-foreground">{disease.title}</span>
                    </nav>
                }
                eyebrow={disease.engTitle}
                title={disease.title}
                description={disease.description}
                aside={
                    <div className="mb-5 hidden size-24 shrink-0 items-center justify-center rounded-[14px] border border-border bg-card lg:flex" aria-hidden="true">
                        <img
                            src={getBodyPartBySlug(slug)?.icon}
                            alt=""
                            width={76}
                            height={76}
                            decoding="async"
                            className="size-[76px] object-contain"
                        />
                    </div>
                }
            />

            {/* 2. Content Section with Sidebar */}
            <section className="py-16 md:py-24 px-4 relative z-20">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-20">
                        {/* Main Content Area */}
                        <article>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="space-y-16"
                            >
                                {/* Treatment Box */}
                                <div>
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-1.5 h-10 bg-primary rounded-full" />
                                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground italic">{disease.treatmentTitle}</h2>
                                    </div>
                                    
                                    <div className="prose prose-zinc prose-lg max-w-none">
                                        <div className="bg-card rounded-xl p-6 md:p-12 border border-border relative overflow-hidden">
                                            {disease.treatmentContent.split("\n\n").map((paragraph, i) => (
                                                <p key={i} className="text-base md:text-xl text-foreground leading-[1.8] mb-6 md:mb-8 last:mb-0 font-normal break-keep">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Philosophy Card */}
                                <div className="p-8 md:p-12 rounded-lg bg-secondary border border-border text-foreground">
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-1.5 h-8 bg-primary rounded-full" />
                                            <h3 className="text-2xl md:text-3xl font-serif font-bold">지인의 치료 약속</h3>
                                        </div>
                                        <p className="text-xl text-muted-foreground font-normal leading-relaxed break-keep mb-12 max-w-3xl">
                                            지인마취통증의학과 강북점은 <strong className="text-foreground font-bold">&apos;20년의 경험&apos;</strong>과 <strong className="text-foreground font-bold">&apos;교과서적 원칙&apos;</strong>을 결합합니다. <br className="hidden md:block" />
                                            무분별한 수술보다 통증의 근본 원인을 해결하는 정밀한 비수술 보존 치료를 지향합니다.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-border pt-12">
                                            <div className="space-y-3">
                                                <p className="text-sm font-bold text-primary">경력</p>
                                                <p className="text-lg font-medium">20년 임상 경력</p>
                                            </div>
                                            <div className="space-y-3">
                                                <p className="text-sm font-bold text-primary">원칙</p>
                                                <p className="text-lg font-medium">비수술 원칙 중심</p>
                                            </div>
                                            <div className="space-y-3">
                                                <p className="text-sm font-bold text-primary">장비</p>
                                                <p className="text-lg font-medium">대학병원급 첨단 장비</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Source & CTA */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-10 border-t border-border">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <BookOpen size={16} />
                                        <p>출처: {disease.source}</p>
                                    </div>
                                    <a href="tel:02-6431-1234" onClick={() => { trackBooking(`medical_detail_${slug}`); naverTrackBooking(); }}>
                                        <Button size="lg" className="h-14 rounded-md px-10 bg-primary hover:bg-primary/90 transition-colors text-lg font-bold">
                                            지금 바로 예약하기 <CalendarCheck className="ml-3 w-5 h-5" />
                                        </Button>
                                    </a>
                                </div>
                            </motion.div>
                        </article>

                        {/* Sidebar */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-32 space-y-10">
                                <div className="p-8 bg-card border border-border rounded-xl">
                                    <h3 className="text-xl font-serif font-bold text-foreground mb-6">주요 질환 리스트</h3>
                                    <nav className="space-y-2">
                                        {ALL_DISEASES.map((d) => (
                                            <Link
                                                key={d.slug}
                                                href={`/medical/${d.slug}`}
                                                className={`group flex items-center justify-between px-5 py-3 min-h-11 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                    d.slug === slug
                                                        ? "bg-primary text-white"
                                                        : "text-muted-foreground hover:text-primary hover:bg-secondary"
                                                }`}
                                            >
                                                {d.label}
                                                <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${d.slug === slug ? 'opacity-100' : ''}`} />
                                            </Link>
                                        ))}
                                    </nav>
                                </div>

                                {/* Clinic Hours Sidebar Mini */}
                                <div className="p-8 bg-secondary border border-border rounded-xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Clock size={20} className="text-primary" />
                                        <h4 className="font-bold text-sm">진료 및 예약 문의</h4>
                                    </div>
                                    <a href="tel:02-6431-1234" onClick={() => { trackPhoneCall("medical_sidebar"); naverTrackPhoneCall(); }}>
                                        <p className="text-2xl font-serif font-bold text-foreground mb-4">02-6431-1234</p>
                                    </a>
                                    <p className="text-xs text-muted-foreground leading-relaxed font-light">
                                        평일 09:00 - 19:00 <br />
                                        토욜 09:00 - 14:00 (점심시간 없음)
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
