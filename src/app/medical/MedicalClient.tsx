"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
import { getBodyPartBySlug } from "@/data/body-parts";

type Disease = {
    slug: string;
    title: string;
    /** 묶음 카드의 제목 둘째 줄 */
    titleExtra?: string;
    eng: string;
    desc: string;
    links?: { slug: string; label: string }[];
};

const diseases: Disease[] = [
    // links 가 있으면 카드 하나에 질환 링크 여러 개를 싣는 묶음 카드입니다(카드 전체는 링크가 아님).
    {
        slug: "disc",
        title: "디스크",
        titleExtra: "척추관협착증",
        eng: "Disc · Spinal Stenosis",
        desc: "",
        links: [
            { slug: "disc", label: "디스크" },
            { slug: "stenosis", label: "척추관협착증" },
        ],
    },
    { slug: "shingles", title: "대상포진", eng: "Herpes Zoster", desc: "초기 적극적인 신경치료로 극심한 만성 신경통 이환 방지" },
    { slug: "frozen-shoulder", title: "오십견", eng: "Frozen Shoulder", desc: "관절 운동 범위 제한을 회복하는 1:1 맞춤형 재활 중심" },
    { slug: "rotator-cuff", title: "회전근개파열", eng: "Rotator Cuff", desc: "정확한 병변 진단하에 근본적인 힘줄 재생과 강화 도모" },
    { slug: "arthritis", title: "퇴행성관절염", eng: "Osteoarthritis", desc: "노화된 연골의 기능을 보존하고 통증 없는 일상생활 회복" },
    { slug: "carpal-tunnel", title: "손목터널증후군", eng: "Carpal Tunnel", desc: "저림과 통증을 유발하는 정중신경의 압박을 정교하게 해소" },
    { slug: "tennis-elbow", title: "테니스엘보우", eng: "Tennis Elbow", desc: "수술 없이 팔꿈치 인대의 미세 손상을 치유하는 재생 치료" },
    { slug: "balloon-neuroplasty", title: "풍선신경성형술", eng: "Balloon Neuroplasty", desc: "좁아진 척추관을 넓히고 유착을 박리하는 핵심 비수술 치료" },
];

export default function MedicalClient() {
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
        },
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-32">
            <PageHero
                eyebrow="주요 질환"
                title={<>지인 <span className="text-primary whitespace-nowrap">주요 질환</span></>}
                description="지인마취통증의학과 강북점은 수술 없는 통증 치료를 위해, 비수술적 정밀 시술과 재활 프로그램을 결합한 최적의 치료 솔루션을 제공합니다."
            />

            {/* 2. Professional Grid Display */}
            <section className="py-12 md:py-24 px-4 relative bg-white">
                
                <div className="container mx-auto max-w-7xl px-0 md:px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {diseases.map((disease, i) => {
                            const linked = !disease.links;
                            const cardClass =
                                "group relative flex h-full flex-col p-8 md:p-10 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-premium transition-all duration-300 overflow-hidden";
                            const inner = (
                                <>
                                    {/* Top Header: 부위 픽토그램(홈 카드와 같은 회색 상자) & 번호 */}
                                    <div className="flex items-start justify-between mb-4 md:mb-6">
                                        <div className="flex size-20 md:size-24 items-center justify-center rounded-[10px] md:rounded-[14px] bg-secondary transition-colors duration-300 group-hover:bg-primary/10">
                                            <img
                                                src={getBodyPartBySlug(disease.slug)?.icon}
                                                alt=""
                                                aria-hidden="true"
                                                width={76}
                                                height={76}
                                                loading="lazy"
                                                decoding="async"
                                                className="size-[64px] md:size-[76px] object-contain"
                                            />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-bold font-sans text-slate-300 uppercase tracking-widest group-hover:text-primary/40 transition-colors">
                                            No. 0{i + 1}
                                        </span>
                                    </div>

                                    {/* Content Area */}
                                    <div className="pt-4">
                                        <p className="text-[10px] font-bold tracking-[0.2em] text-primary/60 uppercase mb-3 md:mb-4 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                            {disease.eng}
                                        </p>
                                        <h3 className={`text-2xl md:text-3xl font-serif font-bold text-foreground mb-4 tracking-tight transition-colors ${linked ? "group-hover:text-primary" : ""}`}>
                                            {disease.title}
                                            {disease.titleExtra && (
                                                <>
                                                    <span className="sr-only">, </span>
                                                    <br />
                                                    {disease.titleExtra}
                                                </>
                                            )}
                                        </h3>
                                        {disease.desc && (
                                            <p className="text-slate-500 text-sm md:text-[15px] leading-relaxed font-normal break-keep group-hover:text-slate-700 transition-colors min-h-[4rem]">
                                                {disease.desc}
                                            </p>
                                        )}
                                    </div>
                                </>
                            );

                            return (
                                <motion.div
                                    key={disease.slug}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    transition={{ delay: i * 0.05 }}
                                    className="h-full"
                                >
                                    {disease.links ? (
                                        <div className={cardClass}>
                                            {inner}
                                            {/* 묶음 카드: 질환별 바로가기 (홈 카드와 같은 줄 모양) */}
                                            <ul className="mt-auto pt-2">
                                                {disease.links.map((l) => (
                                                    <li key={l.slug}>
                                                        <Link
                                                            href={`/medical/${l.slug}`}
                                                            className="group/row flex min-h-12 md:min-h-[52px] items-center justify-between gap-2 border-t border-border text-[15px] font-medium text-foreground hover:text-primary transition-colors"
                                                        >
                                                            {l.label}
                                                            <ArrowRight strokeWidth={2.2} aria-hidden="true" className="size-4 text-muted-foreground group-hover/row:text-primary transition-colors" />
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <Link href={`/medical/${disease.slug}`} className={cardClass}>
                                            {inner}

                                            {/* Floating Read More button */}
                                            <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                                                    <ArrowRight strokeWidth={2} className="w-4 h-4 md:w-5 md:h-5" />
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* 하단 안내 배너: 평평한 라이트 카드 (장식 그라데이션/원형 요소 제거) */}
                    <div className="mt-16 md:mt-24 p-8 md:p-14 rounded-xl bg-secondary border border-border">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 md:gap-12">
                            <div className="max-w-3xl">
                                <p className="text-sm font-bold text-primary mb-4">지인의 약속</p>
                                <h3 className="text-2xl md:text-4xl font-serif font-bold mb-5 md:mb-6 leading-[1.35] break-keep tracking-tight text-foreground">
                                    우리의 목표는 단순한 치료가 아닌, <br className="hidden lg:block" />
                                    당신의 건강한 일상을 되찾는 것입니다.
                                </h3>
                                <p className="text-muted-foreground text-sm md:text-lg leading-relaxed break-keep max-w-2xl">
                                    지인은 결코 서둘러 수술을 권하지 않습니다. 교과서에 충실한 안전한 보존적 치료로도 충분히 회복할 수 있는 길을 먼저 찾습니다.
                                </p>
                            </div>

                            <Button asChild size="lg" className="h-14 rounded-md px-8 text-base font-bold flex-shrink-0">
                                <Link href="/policy/price" className="flex items-center gap-2">
                                    비급여 안내 보기
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
