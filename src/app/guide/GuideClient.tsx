"use client";

import { motion, Variants } from "framer-motion";
import { Clock, MapPin, Phone, Car, Train, Bus, ChevronRight, Navigation, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { trackNaverMap, trackKakaoMap, trackPhoneCall } from "@/lib/gtag";
import { naverTrackMap, naverTrackPhoneCall } from "@/lib/naver-wcs";
import { PageHero } from "@/components/layout/PageHero";

export default function GuideClient() {
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
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
                staggerChildren: 0.15
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-32">
            <PageHero
                overlap
                eyebrow="진료안내"
                title={<>진료 안내 <br /><span className="text-primary whitespace-nowrap">& 오시는 길</span></>}
                description={<>강북구 수유동의 통증 주치의 — 지인마취통증의학과 강북점으로 오시는 가장 편안한 길을 안내해 드립니다.</>}
            />

            {/* 2. Concentrated Info Cards */}
            <section className="container mx-auto max-w-7xl px-4 -mt-10 md:-mt-16 relative z-20">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {/* Hours Card */}
                    <motion.div variants={fadeUp} className="bg-white p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-premium border border-slate-100 flex flex-col">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-primary shadow-sm">
                            <Clock size={28} className="md:w-8 md:h-8" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-6 md:mb-8 tracking-tight">진료 시간</h3>
                        <div className="space-y-4 md:space-y-5">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                <span className="text-sm md:text-base font-bold text-muted-foreground uppercase tracking-widest">평일</span>
                                <span className="text-lg md:text-xl font-bold font-serif">09:00 – 19:00</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                <span className="text-sm md:text-base font-bold text-primary uppercase tracking-widest">토요일</span>
                                <span className="text-lg md:text-xl font-bold font-serif text-primary">09:00 – 14:00</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">점심시간</span>
                                <span className="text-xs md:text-sm font-bold text-slate-500">13:00 – 14:00</span>
                            </div>
                            <p className="text-[10px] md:text-xs text-destructive font-bold pt-2 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-destructive" />
                                매주 일요일 및 공휴일은 휴진입니다.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Card */}
                    <motion.div variants={fadeUp} className="bg-white p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-premium border border-slate-100 flex flex-col">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-primary shadow-sm">
                            <Phone size={28} className="md:w-8 md:h-8" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-6 md:mb-8 tracking-tight">상담 안내</h3>
                        <div className="space-y-6 md:space-y-8">
                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-primary tracking-widest uppercase mb-3 px-3 py-1 bg-primary/5 rounded-full w-fit">Main Number</p>
                                <p className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight">
                                    <a href="tel:02-6431-1234" onClick={() => { trackPhoneCall("guide_main_number"); naverTrackPhoneCall(); }}>02-6431-1234</a>
                                </p>
                            </div>
                            <div className="pt-6 border-t border-slate-50">
                                <p className="text-[10px] md:text-xs font-bold text-muted-foreground tracking-widest uppercase mb-2">Fax Number</p>
                                <p className="text-lg md:text-xl font-bold text-slate-600 font-serif">02-986-4494</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Location Info Card */}
                    <motion.div variants={fadeUp} className="bg-white p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-premium border border-slate-100 flex flex-col">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-primary shadow-sm">
                            <MapPin size={28} className="md:w-8 md:h-8" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-6 md:mb-8 tracking-tight">오시는 길</h3>
                        <div className="space-y-4 md:space-y-6">
                            <p className="text-lg md:text-xl font-serif font-bold leading-relaxed break-keep tracking-tight">
                                서울 강북구 삼양로 319 <br />
                                <span className="text-primary italic">지인통증빌딩 (수유동)</span>
                            </p>
                            <p className="text-muted-foreground font-normal leading-relaxed text-xs md:text-sm break-keep">
                                우이신설선 화계역 2번 출구에서 좌측 방향 도보 3분(230m) 거리에 위치하고 있습니다.
                            </p>
                            <div className="pt-2 md:pt-4 space-y-2 md:space-y-3 mt-auto">
                                <Button variant="outline" className="w-full h-12 rounded-full border-slate-100 bg-slate-50/50 hover:bg-slate-100 text-slate-700 font-bold transition-all text-xs md:text-sm" onClick={() => { trackNaverMap("guide_page"); naverTrackMap(); window.open('https://map.naver.com/v5/search/%EC%A7%80%EC%9D%B8%EB%A7%88%EC%B7%A8%ED%86%B5%EC%A6%9D%EC%9D%98%ED%95%99%20%EA%B0%95%EB%B6%81%EC%A0%90'); }}>
                                    <Navigation className="mr-2 w-4 h-4" /> 네이버 지도 열기
                                </Button>
                                <Button variant="outline" className="w-full h-12 rounded-full border-slate-100 bg-slate-50/50 hover:bg-slate-100 text-slate-700 font-bold transition-all text-xs md:text-sm" onClick={() => { trackKakaoMap("guide_page"); naverTrackMap(); window.open('https://map.kakao.com/link/search/%EC%A7%80%EC%9D%B8%EB%A7%88%EC%B7%A8%ED%86%B5%EC%A6%9D%EC%9D%98%ED%95%99%20%EA%B0%95%EB%B6%81%EC%A0%90'); }}>
                                    카카오 맵으로 보기
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* 2.5 Non-covered Price Link Banner */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="mt-8 md:mt-12 bg-white p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-premium border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10"
                >
                    <div className="flex items-center gap-5 md:gap-8 w-full md:w-auto">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                            <FileText size={28} className="md:w-8 md:h-8" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg md:text-2xl font-serif font-bold text-foreground mb-1.5 md:mb-2 tracking-tight">비급여 수가표 안내</h3>
                            <p className="text-xs md:text-sm text-muted-foreground font-normal leading-relaxed break-keep opacity-90">
                                지인마취통증의학과 강북점은 환자의 알 권리를 위해 <br className="hidden lg:block" />
                                모든 비급여 진료 항목과 비용을 투명하게 공개하고 있습니다.
                            </p>
                        </div>
                    </div>
                    <Link href="/policy/price" className="w-full md:w-auto flex-shrink-0 flex">
                        <Button className="w-full md:w-auto h-12 md:h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-lg shadow-primary/20 text-xs md:text-sm group tracking-wide">
                            비급여 수가표 확인하기 <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* 3. Immersive Map Section */}
            <section className="py-12 md:py-24 container mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 md:gap-16 items-start">
                    {/* Map Area */}
                    <motion.div
                        className="relative rounded-xl overflow-hidden border border-border bg-secondary"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <img
                            src="/images/illust/map-schematic-mobile.svg"
                            alt="화계역 2번 출구에서 수유역 방향으로 약 230m, 도보 약 3분 거리의 지인통증병원 위치 개략도"
                            width={640}
                            height={420}
                            className="block w-full h-auto md:hidden"
                        />
                        <img
                            src="/images/illust/map-schematic.svg"
                            alt=""
                            aria-hidden="true"
                            width={1000}
                            height={400}
                            className="hidden w-full h-auto md:block"
                        />
                    </motion.div>

                    {/* Detailed Transport Guide */}
                    <div className="space-y-8 md:space-y-12 py-2">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="space-y-8 md:space-y-12"
                        >
                            <div className="space-y-3">
                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground tracking-tight">교통수단별 안내</h3>
                                <div className="w-10 h-1 bg-primary/40 rounded-full" />
                            </div>

                            {/* Subway */}
                            <motion.div variants={fadeUp} className="flex gap-4 md:gap-6 items-start">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-100 flex-shrink-0 shadow-sm">
                                    <Train size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="space-y-2 md:space-y-3">
                                    <h4 className="font-bold text-lg md:text-xl flex items-center gap-2 tracking-tight">
                                        지하철 이용 시
                                        <span className="text-[9px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded tracking-widest uppercase">Wooi-Sinseol</span>
                                    </h4>
                                    <p className="text-muted-foreground font-normal text-sm md:text-base leading-relaxed break-keep">
                                        우이신설선 <strong className="text-foreground font-bold underline decoration-primary/20 underline-offset-4">화계역 2번 출구</strong>로 나오셔서 왼쪽(수유역 방향)으로 약 230m 정도 직진하시면 우측 지인통증빌딩 입구가 보입니다.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bus */}
                            <motion.div variants={fadeUp} className="flex gap-4 md:gap-6 items-start">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-100 flex-shrink-0 shadow-sm">
                                    <Bus size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="space-y-2 md:space-y-4">
                                    <h4 className="font-bold text-lg md:text-xl tracking-tight">버스 이용 시</h4>
                                    <div className="space-y-3 md:space-y-4">
                                        <div className="flex items-start gap-3">
                                            <span className="text-[10px] md:text-[11px] font-bold bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded tracking-widest uppercase border border-blue-100 mt-0.5">간선</span>
                                            <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">104, 109, 144, 152, 1128 <br className="md:hidden" /> (삼양동사거리 하차)</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-[10px] md:text-[11px] font-bold bg-green-50 text-green-600 px-2.5 py-0.5 rounded tracking-widest uppercase border border-green-100 mt-0.5">지선</span>
                                            <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">1165, 11116, 1144, 1166 <br className="md:hidden" /> (삼양동사거리 하차)</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Parking */}
                            <motion.div variants={fadeUp} className="flex gap-4 md:gap-6 items-start">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-100 flex-shrink-0 shadow-sm">
                                    <Car size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="space-y-2 md:space-y-3">
                                    <h4 className="font-bold text-lg md:text-xl tracking-tight">자가용 이용 시</h4>
                                    <p className="text-muted-foreground font-normal text-sm md:text-base leading-relaxed break-keep">
                                        내비게이션 <strong className="text-foreground font-bold underline decoration-primary/20 underline-offset-4">&apos;지인마취통증의학과 강북점&apos;</strong> 검색 <br />
                                        건물 1층 및 기계식 주차장에 <span className="text-primary font-bold italic">발렛 주차 서비스</span>를 지원합니다.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
