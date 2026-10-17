"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { CLINIC_YEARS, OPENED_YEAR } from "@/lib/clinic";

// 수치 띠 — 홈 중간의 숫자 모션 구간입니다.
// 사이트 본문에 이미 적혀 있는 수치만 씁니다. 값을 바꾸거나 새 수치를 넣을 때는 병원 확인을 먼저 받으세요.
//   · "N년"    2008년 개원 기준. 햇수는 @/lib/clinic 의 CLINIC_YEARS(= 올해 − 2008)로 계산합니다.
//   · "80만 명" 철학 섹션 제목("전국 80만 명이 …"), 메타 설명
//   · "3인"    철학 섹션 '정밀 협진' 카드(서울대병원 통증센터 출신 통증의학 세부전문의 3인)
//   · "다수 출연" 의료진 프로필("MBC, KBS, SBS 등 다수 소개")과 병원 방송 자료 폴더(KBS·MBC·MBN·SBS·TV조선 등)에 근거.
//              횟수를 적지 않는 표현이라 숫자가 올라가는 모션 없이 글자만 나타납니다(`text`).
//              "출연"이라는 표현은 병원 확인 대기(프로필 문구는 "소개").
const STATS: { value: number; text?: string; unit: string; label: string }[] = [
  { value: CLINIC_YEARS, unit: "년", label: `${OPENED_YEAR}년 개원 이후 쌓아온 신뢰` },
  { value: 80, unit: "만 명", label: "전국에서 지인을 선택한 환자분들" },
  { value: 3, unit: "인", label: "서울대병원 통증센터 출신 세부전문의" },
  { value: 0, text: "다수", unit: "출연", label: "KBS·MBC·SBS·MBN 등 주요 방송" },
];

function Stat({ value, text, unit, label, index }: { value: number; text?: string; unit: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || text) return;
    // 모션 줄이기 설정이어도 숫자는 올라갑니다(글자가 바뀌는 것이라 어지럼을 일으키는 움직임이 아님).
    // 대신 아래 래퍼의 이동·페이드는 없애고, 시간만 조금 짧게 합니다.
    const controls = animate(0, value, {
      duration: reduce ? 1.2 : 2,
      delay: reduce ? 0 : index * 0.12,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, text, index]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col-reverse justify-end items-center text-center lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-white/10 px-2"
    >
      <dt className="mt-3 text-[15px] md:text-base leading-snug text-[#CBD2D9] break-keep max-w-[14rem]">{label}</dt>
      <dd className="m-0 flex items-baseline justify-center font-bold leading-none text-white">
        <span aria-hidden="true" className={`tabular-nums tracking-tight ${text ? "text-[44px] md:text-[56px]" : "text-[56px] md:text-[72px]"}`}>
          {text ?? n}
        </span>
        <span aria-hidden="true" className="ml-1.5 text-2xl md:text-3xl text-[#F0B88C]">
          {unit}
        </span>
        {/* 화면 낭독기에는 애니메이션 중간값 대신 최종 값만 읽힙니다 */}
        <span className="sr-only">
          {text ? `${text} ` : value}
          {unit}
        </span>
      </dd>
    </motion.div>
  );
}

export default function StatsBand() {
  return (
    <section aria-label="지인통증병원 한눈에 보기" className="bg-[#283038] px-4 py-14 md:py-20">
      <dl className="container mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
        {STATS.map((s, i) => (
          <Stat key={s.label} index={i} {...s} />
        ))}
      </dl>
    </section>
  );
}
