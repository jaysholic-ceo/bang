"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Award, HeartHandshake, ShieldCheck, Stethoscope, ImageIcon } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CLINIC_YEARS } from "@/lib/clinic";

// 진료 시설 안내 — image 를 비워 두면 16:9 자리표시 박스로 표시됩니다.
// 실제 원내 사진이 준비되면 해당 항목에 image: "/images/facility/fac-01-lobby.webp" 처럼 경로만 넣으세요 (스톡 사진은 쓰지 않습니다).
const FACILITIES: { title: string; sub: string; image?: string }[] = [
    { title: "로비 및 대기실", sub: "따뜻하고 편안한 분위기의 공간" },
    { title: "정밀 진단실", sub: "대학병원급 C-arm 및 초음파 장비" },
    { title: "도수치료 센터", sub: "전문 치료사의 1:1 맞춤 근골격계 교정" },
    { title: "프라이빗 입원실", sub: "회복에 집중할 수 있는 독립된 공간" },
    { title: "체외충격파실", sub: "고해상도 집중형 ESWT 시스템" },
    { title: "시술 및 처치실", sub: "무균 정밀 시술 시스템 완비" },
];

export default function IntroClient() {
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-32">
            {/* 1. Immersive Hero Section */}
            <PageHero
                eyebrow="본원소개"
                title="본원 소개"
                description="단순한 통증 치료를 넘어, 당신의 일상이 다시 빛날 수 있도록 진심을 다합니다."
            />

            {/* 2. Philosophy & Greeting (Editorial Layout) */}
            <section className="py-12 md:py-24 px-4 relative">
                {/* Decorative background shape */}

                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-8 md:gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeUp}
                            className="relative"
                        >
                            <div className="relative aspect-[3/4] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-premium bg-secondary border border-border">
                                <img
                                    src="/doctor-choi.jpg"
                                    alt="최용민 대표원장"
                                    className="w-full h-full object-cover object-[60%_0%]"
                                />
                            </div>
                        </motion.div>

                        <div className="space-y-8 md:space-y-12">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                            >
                                <motion.div variants={fadeUp} className="space-y-4 md:space-y-6">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="w-8 md:w-10 h-[1px] bg-primary" />
                                        <span className="text-primary text-[11px] md:text-xs font-bold uppercase tracking-[0.2em]">Our Philosophy</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-foreground leading-[1.2]">
                                        교과서적인 진료, <br />
                                        <span className="text-primary italic">진심을 다하는 치료</span>
                                    </h2>
                                </motion.div>

                                <motion.div variants={fadeUp} className="mt-6 md:mt-10 space-y-4 md:space-y-8 text-foreground leading-[1.7] md:leading-[1.8] font-normal text-base md:text-xl break-keep">
                                    <p>
                                        2008년, 강북구 수유동의 작은 통증클리닉으로 시작했습니다. <br />
                                        당시만 해도 통증의학과는 생소한 분야였지만, <br />
                                        저희는 오직 <span className="text-foreground font-bold italic underline decoration-primary/20 underline-offset-4">환자의 고통</span>에만 집중했습니다.
                                    </p>
                                    <p>
                                        지난 {CLINIC_YEARS}년 동안 <strong className="text-foreground font-bold tracking-tight">전국 80만 명</strong> 이상의 환자분들이 <br />
                                        지인을 믿고 찾아주셨습니다. <br />
                                        제주도에서까지 찾아오시는 발걸음을 보며, <br />
                                        우리가 지켜온 <span className="text-primary font-bold">&apos;비수술 원칙&apos;</span>의 진심을 확신했습니다.
                                    </p>
                                </motion.div>

                                <motion.div variants={fadeUp} className="pt-8 md:pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                    {[
                                        { icon: ShieldCheck, label: `${CLINIC_YEARS}년의 신뢰`, sub: "Since 2008" },
                                        { icon: Award, label: "80만명 방문", sub: "검증된 전문성" },
                                        { icon: HeartHandshake, label: "맞춤형 진료", sub: "비수술 우선 상담" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col gap-2 md:gap-3 p-5 md:p-6 rounded-2xl bg-background border border-border shadow-sm">
                                            <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                            <div>
                                                <p className="font-bold text-foreground text-sm md:text-base">{item.label}</p>
                                                <p className="text-[11px] md:text-xs text-muted-foreground">{item.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Professional Medical Team */}
            <section id="doctors" className="py-12 md:py-24 bg-background px-4">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        className="text-center mb-12 md:mb-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 inline-block">Medical Specialists</span>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 md:mb-8 tracking-tight">의료진 소개</h3>
                        <p className="text-base md:text-xl text-foreground font-normal max-w-2xl mx-auto break-keep italic">대학병원 교수 출신 전문의 3인의 정밀 협진 시스템</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                        {[
                            {
                                name: "최용민",
                                role: "대표원장",
                                specialty: "통증의학과 전문의",
                                image: "/doctor-choi.jpg",
                                imageClass: "object-[60%_0%]",
                                history: [
                                    "서울대학교병원 전문의",
                                    "서울대병원 통증센터 임상강사",
                                    "분당서울대병원 통증치료실 전임의",
                                    "분당서울대학교병원 교수(촉탁)",
                                    "대한마취통증의학회 정회원"
                                ],
                                showMore: true,
                                detailHref: "/intro/doctor-choi"
                            },
                            {
                                name: "이석면",
                                role: "원장",
                                specialty: "통증의학과 전문의",
                                image: "/doctor-lee.jpg",
                                imageClass: "object-[50%_24%]",
                                history: [
                                    "서울대학교병원 전문의",
                                    "서울대병원 통증센터 임상강사",
                                    "서울대학교병원 암센터 전임의",
                                    "분당서울대병원 통증치료실 임상강사",
                                    "대한통증학회 정회원"
                                ],
                                showMore: true,
                                detailHref: "/intro/doctor-lee"
                            },
                            {
                                name: "정희진",
                                role: "원장",
                                specialty: "통증의학과 전문의",
                                image: "/doctor-junghj.jpg",
                                imageClass: "object-[50%_0%]",
                                history: [
                                    "서울대학교병원 전문의",
                                    "서울대병원 통증센터 임상강사",
                                    "서울대학교병원 암센터 전임의",
                                    "서울대병원 마취통증의학과 교수(촉탁)",
                                    "수도병원 통증센터장"
                                ],
                                showMore: true,
                                detailHref: "/intro/doctor-jung"
                            }
                        ].map((doc, idx) => (
                            <motion.div
                                key={idx}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-premium border border-border hover:border-primary/20 transition-all duration-500"
                            >
                                <div className="aspect-[4/5] relative overflow-hidden bg-background">
                                    <img
                                        src={doc.image}
                                        alt={doc.name}
                                        className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${doc.imageClass || ''}`}
                                    />
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="p-8 md:p-10">
                                    <div className="mb-4 md:mb-6">
                                        <h4 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-1 tracking-tight">{doc.name}</h4>
                                        <p className="text-primary text-[11px] md:text-xs font-bold uppercase tracking-widest">{doc.role} / {doc.specialty}</p>
                                    </div>
                                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                                        {doc.history.map((h, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground transition-colors">
                                                <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary/20 mt-1.5" />
                                                <span className="break-keep">{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {doc.showMore && (
                                        <Link 
                                            href={doc.detailHref || '#'} 
                                            className="inline-flex min-h-11 items-center gap-2 text-primary font-bold text-[11px] md:text-xs uppercase tracking-widest hover:underline group/link"
                                        >
                                            자세히 보기
                                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Hospital Tour Gallery */}
            <section id="tour" className="py-12 md:py-24 bg-white px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6">
                        <div>
                            <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 inline-block">Hospital Tour</span>
                            <h3 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">진료 시설 안내</h3>
                        </div>
                        <p className="text-muted-foreground max-w-md font-normal leading-relaxed text-sm md:text-base break-keep">
                            지하 1층부터 5층까지, 환자의 동선과 편의를 최우선으로 고려한 최신 의료 환경을 제공합니다.
                        </p>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {FACILITIES.map((item, idx) => (
                            <li key={item.title} className="overflow-hidden rounded-lg border border-border bg-card">
                                {item.image ? (
                                    <img src={item.image} alt={item.title} width={960} height={540} loading="lazy" className="aspect-video w-full object-cover" />
                                ) : (
                                    <div className="aspect-video w-full bg-secondary flex items-center justify-center">
                                        <ImageIcon size={44} strokeWidth={1.5} className="text-muted-foreground" aria-hidden="true" />
                                    </div>
                                )}
                                <div className="p-6 md:p-8">
                                    <p className="text-sm font-bold text-primary">{String(idx + 1).padStart(2, "0")}</p>
                                    <h4 className="mt-1 font-serif text-xl md:text-2xl font-bold text-foreground">{item.title}</h4>
                                    <p className="mt-2 text-base text-muted-foreground break-keep">{item.sub}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
