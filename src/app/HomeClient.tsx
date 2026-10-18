"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Users, HeartPulse, Play, Pause, Calendar } from "lucide-react";
import { BODY_PART_GROUPS } from "@/data/body-parts";
import StatsBand from "@/components/home/StatsBand";
import { CLINIC_YEARS } from "@/lib/clinic";

// 연혁 — 연도별로 묶어 표시합니다. 항목을 추가/수정할 때는 이 배열만 고치면 됩니다.
// (2010 "서울대병원 우수협력병원 선정"은 /intro/doctor-choi 의 수상 목록 연도를 따랐습니다.)
const MILESTONES: { year: string; items: string[] }[] = [
  { year: "2008", items: ["환자·지역주민과 함께하는 '지인통증의 밤' 개최"] },
  { year: "2010", items: ["서울대병원 우수협력병원 선정"] },
  { year: "2014", items: ["건강보험공단 우수병원 감사장"] },
  { year: "2017", items: ["모범납세자 국세청장 표창", "지하 1층 · 지상 5층 단일규모 최대 통증클리닉 신축 이전"] },
  { year: "2018", items: ["생명사랑실천 병원 강북구 보건소 협약", "경찰의 날 감사장"] },
  { year: "2020", items: ["사랑의열매 표창"] },
  { year: "2021", items: ["강북구청장 표창"] },
  { year: "2022", items: ["서울시장 표창", "경찰의 날 감사장"] },
];

export default function HomeClient({ mediaPosts }: { mediaPosts: any[] }) {
  const [playingVideoIdx, setPlayingVideoIdx] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // 배경 영상: "모션 줄이기" 설정이면 처음부터 틀지 않고, 그 밖에는 정지 버튼으로 멈출 수 있습니다(WCAG 2.2.2).
  // 멈추면 영상을 내리고 바탕 레이어(단색, 정지 이미지가 들어오면 그 이미지)만 보입니다.
  const prefersReducedMotion = useReducedMotion();
  const [heroVideoPaused, setHeroVideoPaused] = useState(false);
  const hasHeroVideo = Boolean(mediaPosts && mediaPosts.length > 0 && mediaPosts[0].videoId);
  const showHeroVideo = hasHeroVideo && !prefersReducedMotion && !heroVideoPaused;

  // 방송·영상 가로 스크롤: 카드 한 장 + 간격만큼 이동 (scroll-smooth 는 모션 줄이기 설정을 따릅니다)
  const scrollMedia = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 24) });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section: Cinematic Video Background */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center px-4 py-12 md:py-24 overflow-hidden bg-black group">
        
        {/* 바탕 레이어 — 영상이 늦게 뜨거나 실패해도 보이는 자리. 영상 유무와 상관없이 항상 그립니다. */}
        <div className="absolute inset-0 bg-foreground z-0">
          {/*
            TODO: public/images/hero/ 에 정지 이미지(WebP)가 들어오면 아래 주석을 풉니다.
            <picture>
              <source media="(min-width: 768px)" srcSet="/images/hero/hero-desktop.webp" />
              <img src="/images/hero/hero-mobile.webp" alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
            </picture>
          */}
        </div>

        {/* Background Video */}
        {showHeroVideo ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1.5 }} className="absolute w-[300%] h-[300%] lg:w-[150%] lg:h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
            <iframe
              src={`https://www.youtube.com/embed/${mediaPosts[0].videoId}?autoplay=1&mute=1&loop=1&playlist=${mediaPosts[0].videoId}&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3`}
              title="배경 영상 (장식)"
              aria-hidden="true"
              tabIndex={-1}
              className="w-full h-full scale-[1.3]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </motion.div>
        ) : null}
        
        <div className="absolute inset-0 bg-[#283038]/70 z-0 transition-colors duration-700" />
        
        <motion.div
          className="container mx-auto max-w-6xl relative z-10 text-white"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-6 md:mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Since 2008 • Jiin Pain Medicine Clinic</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="font-serif text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-5 md:mb-6 tracking-tight break-keep"
          >
            교과서적인 진료, <br />
            <span className="text-[#F0B88C] italic relative inline-block">
              진심을 다하는 최선의 치료
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-sm md:text-xl text-white/90 max-w-xl mb-8 md:mb-10 font-normal leading-relaxed break-keep"
          >
            전국에서 찾아오시는 환자분들과 {CLINIC_YEARS}년간 쌓아온 신뢰의 무게. <br />
            단순한 통증 완화를 넘어, <br className="hidden md:block" />
            <span className="font-bold italic underline decoration-primary/70 underline-offset-4 md:underline-offset-8 text-white">당신의 삶의 질을 높이는 수준 높은 비수술 치료</span>를 약속합니다.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
            <Button asChild size="lg" className="h-16 rounded-full px-10 text-lg font-medium bg-primary text-white hover:bg-primary/90 transition-all border-none">
              <Link href="/intro">
                병원 소개
              </Link>
            </Button>
            {mediaPosts && mediaPosts.length > 0 && mediaPosts[0].videoId && (
              <Button asChild size="lg" variant="outline" className="h-16 rounded-full px-10 text-lg font-medium border-white/30 hover:bg-white/20 bg-white/10 transition-all text-white hover:text-white">
                <Link href={`/news/${mediaPosts[0].id}`} className="flex items-center gap-2">
                  <Play className="w-5 h-5 fill-white" />
                  영상 원본 시청
                </Link>
              </Button>
            )}
          </motion.div>
        </motion.div>

        {hasHeroVideo && !prefersReducedMotion && (
          <button
            type="button"
            onClick={() => setHeroVideoPaused((paused) => !paused)}
            aria-pressed={heroVideoPaused}
            className="absolute bottom-4 right-4 z-20 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/30 bg-[#283038]/70 px-4 text-xs font-bold text-white transition-colors hover:bg-[#283038] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0B88C]"
          >
            {heroVideoPaused ? <Play className="size-3.5 fill-white" aria-hidden="true" /> : <Pause className="size-3.5 fill-white" aria-hidden="true" />}
            {heroVideoPaused ? "배경 영상 재생" : "배경 영상 정지"}
          </button>
        )}
      </section>

      {/* 1-b. 증상 우선 진입: 부위별 질환 바로가기 (정적, 애니메이션 없음)
          구성: 모바일 세로 카드 / 태블릿(md) 3열 / 데스크톱(lg) 5열. Claude Design 시안 B(2026-10-08)를 따랐습니다.
          부위 그림은 src/data/body-parts.ts 의 icon 경로(public/images/illust/part-*.webp)입니다. */}
      <section aria-labelledby="symptom-heading" className="px-4 py-14 md:px-10 md:py-20 lg:px-4 lg:py-24 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-7 md:mb-12 md:flex md:items-end md:justify-between md:gap-6">
            <div>
              <p className="text-sm font-bold text-primary mb-3 md:mb-4 leading-snug">주요 질환 바로가기</p>
              <h2 id="symptom-heading" className="font-serif text-[32px] md:text-[40px] lg:text-[44px] leading-[1.3] font-bold text-foreground break-keep">
                어디가 불편하세요?
              </h2>
            </div>
            <Link
              href="/medical"
              className="hidden md:inline-flex items-center gap-2 min-h-11 text-base font-bold text-primary hover:underline underline-offset-4"
            >
              전체 질환 보기 <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
            {BODY_PART_GROUPS.map((group) => (
              <li
                key={group.name}
                className="flex flex-col rounded-[12px] border border-border bg-card px-5 pt-5 pb-1 md:px-6 md:pt-7 md:pb-2"
              >
                <div className="mb-4 flex items-center gap-4 md:mb-0 md:flex-col md:items-start md:gap-0">
                  <span
                    aria-hidden="true"
                    className="flex size-20 shrink-0 items-center justify-center rounded-[10px] bg-secondary md:size-28 md:rounded-[14px]"
                  >
                    <img
                      src={group.icon}
                      alt=""
                      width={92}
                      height={92}
                      loading="lazy"
                      decoding="async"
                      className="size-[68px] object-contain md:size-[92px]"
                    />
                  </span>
                  <h3 className="text-xl md:text-[22px] md:my-5 font-bold leading-snug text-foreground">{group.name}</h3>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group/row flex min-h-12 md:min-h-[52px] items-center justify-between gap-2 border-t border-border text-[15px] font-medium leading-snug text-foreground hover:text-primary transition-colors"
                      >
                        <span>{item.label}</span>
                        <ArrowRight
                          className="size-4 shrink-0 text-muted-foreground transition-colors group-hover/row:text-primary"
                          strokeWidth={2.2}
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <Link
            href="/medical"
            className="mt-4 flex md:hidden items-center gap-2 min-h-12 text-base font-bold text-primary hover:underline underline-offset-4"
          >
            전체 질환 보기 <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 2. Medical Philosophy (Premium Editorial) */}
      <section className="py-12 md:py-24 px-4 bg-white relative overflow-hidden">

        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-8 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-premium group"
            >
              <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-colors duration-700" />
              <img
                src="/doctor-choi.jpg"
                alt="최용민 대표원장"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 object-[60%_0%]"
              />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 p-5 md:p-8 bg-card rounded-lg border border-border max-w-full md:max-w-[80%] shadow-premium">
                <p className="font-serif italic text-base md:text-2xl text-foreground mb-3">&quot;지인(知人)은 환자를 진료 대상이 아닌 한 사람으로 알아가며, 진심을 다하겠다는 저희의 정체성입니다.&quot;</p>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 md:w-12 h-[1px] bg-primary" />
                  <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest">Founding Directors</span>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4 md:space-y-8"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="w-8 md:w-10 h-[1px] bg-accent" />
                  <span className="text-accent text-[11px] md:text-[12px] font-bold uppercase tracking-[0.3em]">Our Philosophy</span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.2] break-keep">
                  전국 80만 명이 <br />
                  지인을 선택한 <br />
                  <span className="text-primary relative italic">
                    단 하나의 이유
                    <motion.svg 
                      viewBox="0 0 100 10" 
                      className="absolute -bottom-1 md:-bottom-4 left-0 w-full h-1.5 md:h-4 text-accent/40"
                    >
                      <motion.path 
                        d="M0 5 Q 25 0 50 5 T 100 5" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </motion.svg>
                  </span>
                </h2>
                <p className="text-base md:text-xl text-foreground font-normal leading-relaxed break-keep max-w-xl">
                  저희는 화려한 인테리어나 과장된 광고보다, 통증의 근본 원인을 정확히 찾아내는 <strong className="font-bold text-foreground underline decoration-primary/30 underline-offset-4">교과서적인 진료</strong>에 집중합니다. 2008년 개원 이후 한결같이 지켜온 이 원칙이 오늘의 지인을 만들었습니다.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {[
                  { title: "비수술 우선 원칙", desc: "교과서적인 진단과 치료로, 불필요한 수술 대신 체계적인 보존치료와 재활·운동에 집중합니다." },
                  { title: "정밀 협진", desc: "서울대병원 통증센터 출신 통증의학 세부전문의 3인의 세밀한 분석을 결합합니다." },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-border shadow-premium hover:border-primary/30 transition-all duration-500 group/card"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/5 flex items-center justify-center mb-4 md:mb-6 text-primary group-hover/card:bg-primary group-hover/card:text-white transition-colors duration-500">
                      <HeartPulse className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <h4 className="font-bold text-lg md:text-xl mb-2 md:mb-3 text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground text-[13px] md:text-sm font-normal leading-relaxed break-keep">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Button asChild variant="link" className="text-lg p-0 h-auto group text-primary font-bold">
                  <Link href="/intro" className="flex items-center gap-2">
                    지인의 이야기 더 보기
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 수치 띠 — 철학 섹션 다음, 본원소식 앞 (숫자 모션) */}
      <StatsBand />

      {/* 3. Media & Broadcasts — 페이지 중간, 가로 스크롤 */}
      <section aria-labelledby="media-heading" className="py-16 md:py-24 px-4 bg-background overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
            <div className="max-w-xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-primary font-bold tracking-widest text-xs uppercase mb-4"
              >
                Media Appearances
              </motion.div>
              <motion.h2 
                id="media-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight break-keep"
              >
                각계 전문가와 언론도 <br className="hidden md:block" />
                <span className="text-primary">지인의 진료 모델</span>에 주목합니다.
              </motion.h2>
            </div>
            <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollMedia(-1)}
                aria-label="이전 영상 보기"
                className="size-11 rounded-md border border-border bg-card text-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollMedia(1)}
                aria-label="다음 영상 보기"
                className="size-11 rounded-md border border-border bg-card text-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button asChild variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5">
                <Link href="/news" className="flex items-center gap-2">
                  전체 소식 보기
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
            </div>
          </div>

          <p className="md:hidden text-sm text-muted-foreground mb-3">좌우로 밀어서 더 보기</p>

          <div
            ref={scrollerRef}
            role="region"
            aria-label="방송·영상 자료 목록 (좌우로 스크롤)"
            tabIndex={0}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-4 px-4 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {mediaPosts.map((media, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group cursor-pointer snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[calc((100%-3rem)/3)]"
                onClick={() => {
                  if (media.type === "video") {
                    setPlayingVideoIdx(idx);
                  }
                }}
              >
                <div className={`relative h-64 rounded-[2rem] overflow-hidden mb-6 shadow-premium flex items-center justify-center ${media.image ? "bg-foreground" : "bg-secondary border border-border"}`}>
                  {playingVideoIdx === idx && media.type === "video" ? (
                    media.videoId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${media.videoId}?autoplay=1`}
                        title={media.title}
                        className="w-full h-full border-0 absolute inset-0 z-30"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : media.videoUrl ? (
                      <video 
                        src={media.videoUrl} 
                        controls 
                        autoPlay 
                        className="w-full h-full object-cover absolute inset-0 z-30"
                      />
                    ) : null
                  ) : (
                    <>
                      {media.type === "video" && (
                        <button
                          type="button"
                          onClick={() => setPlayingVideoIdx(idx)}
                          aria-label={`${media.title} 영상 재생`}
                          className="absolute inset-0 z-30 rounded-[2rem] focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white"
                        />
                      )}
                      {media.image ? (
                        <>
                          <img src={media.image} alt={media.title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-[#283038]/45 group-hover:bg-[#283038]/60 transition-colors duration-500" />
                        </>
                      ) : (
                        <img src="/images/logo-header.png" alt="" aria-hidden="true" className="h-12 w-auto opacity-90" />
                      )}

                      {media.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white border shadow-lg transition-colors duration-300 ${media.image ? "bg-[#283038]/60 border-white/30 group-hover:bg-primary/90" : "bg-primary border-primary group-hover:bg-primary/90"}`}>
                            <Play className="w-6 h-6 md:w-7 md:h-7 ml-1 fill-white" />
                          </div>
                        </div>
                      )}

                      <div className="absolute top-6 left-6 flex gap-2 z-20">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${media.image ? "bg-[#283038]/70 text-white" : "bg-card border border-border text-primary"}`}>{media.category}</span>
                      </div>
                      <div className={`absolute bottom-6 left-6 flex items-center gap-2 z-20 ${media.image ? "text-white/90" : "text-muted-foreground"}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{media.date}</span>
                      </div>
                    </>
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-bold leading-snug group-hover:text-primary transition-colors mb-2 break-keep">
                  {media.id ? (
                    <Link href={`/news/${media.id}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{media.title}</Link>
                  ) : (
                    media.title
                  )}
                </h3>
                <p className="text-muted-foreground text-[13px] md:text-sm line-clamp-2 leading-relaxed break-keep">{media.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CSR / Community (Premium Timeline & Testimonials) */}
      <section className="py-16 md:py-24 bg-background px-4 relative overflow-hidden">

        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent font-bold tracking-[0.2em] text-[11px] uppercase mb-6"
            >
              <HeartPulse className="w-4 h-4" />
              <span>Community Impact</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-foreground leading-[1.15] break-keep"
            >
              환자와 함께 성장한 <br className="hidden md:block" />
              <span className="text-primary italic">{CLINIC_YEARS}년의 정직한 동행</span>
            </motion.h2>
          </div>

          <ol className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {MILESTONES.map((m, idx) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 2) * 0.1, duration: 0.6 }}
                className="border-l-2 border-primary/30 pl-5"
              >
                <p className="font-serif text-3xl font-black text-primary leading-none mb-3">{m.year}</p>
                <ul className="space-y-1.5">
                  {m.items.map((text) => (
                    <li key={text} className="text-base md:text-lg text-foreground leading-snug break-keep">{text}</li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>

          <div className="grid lg:grid-cols-[4fr_6fr] gap-8 md:gap-12 items-center">
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="space-y-4 md:space-y-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-[1.3] tracking-tight break-keep">
                  환자분들의 <br />
                  <span className="text-primary italic">진심</span>이 담긴 목소리
                </h3>
                <p className="text-muted-foreground text-sm md:text-base font-normal leading-relaxed break-keep max-w-sm">
                  {CLINIC_YEARS}년간 환자분들과 쌓아온 신뢰는 저희의 가장 큰 자부심입니다. 보내주신 격려에 따뜻한 치료로 답하겠습니다.
                </p>
              </div>
              <div className="flex gap-1.5 mt-2 md:mt-4">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <div className="w-2 h-1 bg-primary/20 rounded-full" />
                <div className="w-2 h-1 bg-primary/20 rounded-full" />
              </div>
            </div>

            <div className="relative mt-10 md:mt-0">
              <div className="flex flex-col gap-4 md:gap-5">
                {[
                  {
                    name: "김영희님 (수유동, 68세)",
                    text: "다리가 저려서 잠도 못 잤는데, 원장님께서 정밀하게 진단해주시고 주사 한 번에 싹 낫게 해주셨어요. 매번 갈 때마다 친절하게 설명해주셔서 친아들처럼 느껴져요.",
                    tag: "척추관 협착증"
                  },
                  {
                    name: "박철수님 (우이동, 52세)",
                    text: "오십견 때문에 팔을 아예 못 올렸습니다. 대학병원에서는 수술을 권했는데 여기서 비수술 치료 받고 지금은 테니스도 칩니다. 제 인생의 은인이세요.",
                    tag: "오십견"
                  }
                ].map((review, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-premium border border-border relative group overflow-hidden"
                  >
                    {/* Subtle Background Quotes */}
                    <span className="absolute -top-1 left-3 font-serif text-[4rem] text-primary/[0.03] leading-none select-none pointer-events-none">&ldquo;</span>
                    
                    <p className="font-serif italic text-[15px] md:text-lg text-foreground font-medium leading-[1.7] mb-6 relative z-10 break-keep">
                      {review.text}
                    </p>
                    <div className="flex items-center justify-between relative z-10 border-t border-border pt-5">
                      <div className="flex items-center gap-2.5 md:gap-3">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-[13px] md:text-sm">{review.name}</p>
                          <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Patient Story</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-background text-muted-foreground text-[11px] font-bold border border-border">{review.tag}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>




    </div>
  );
}
