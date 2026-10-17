"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Award, BookOpen, GraduationCap, Medal, Stethoscope, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DoctorChoiPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const sections = [
    {
      title: "학력 및 주요 경력",
      icon: GraduationCap,
      items: [
        "서울대학교병원 인턴",
        "서울대학교병원 마취통증의학과 전공의",
        "서울대학교병원 통증센터 임상강사",
        "분당서울대학교병원 통증치료실 전임의",
        "분당서울대학교병원 교수(촉탁)",
        "마취통증의학과 전문의",
        "통증의학 세부전문의",
        "차의과대학교 대체의학 석사",
        "경희대학교 동서의학 박사(現)"
      ]
    },
    {
      title: "학회 및 학술 활동",
      icon: BookOpen,
      items: [
        "대한통증학회 서울시 학술위원",
        "대한척추통증학회 개원의 이사",
        "대한마취통증의학회 정회원",
        "대한통증연구학회 정회원",
        "대한IMS학회 정회원"
      ]
    },
    {
      title: "사회 활동",
      icon: Users,
      items: [
        "강북경찰서 행정발전위원(前)",
        "(주)메디브라더스 대표이사(前)"
      ]
    },
    {
      title: "수상 및 인증",
      icon: Medal,
      items: [
        "서울대학교 병원 우수 협력병원 선정(2010)",
        "대한민국 파워브랜드 혁신한국인 선정(의료부문)",
        "대한민국 고객감동 경영대상(의료부문)",
        "국민건강보험공단 이사장 우수협력병원 감사장",
        "강북경찰서 우수지역병원 감사장",
        "지역사랑 강북구청 표창장",
        "모범납세자 국세청 표창장",
        "기부나눔 서울특별시장 표창장"
      ]
    },
    {
      title: "저서 및 미디어",
      icon: Stethoscope,
      items: [
        "통증의학서적 &quot;근골격계 영상유도 중재적 시술&quot; 공저 및 논문 다수 발표",
        "세계통증학회 및 국내 각종 의학회 초청강연 및 학술강의 다수",
        "MBC, KBS, SBS, 국내 주요신문, 건강잡지 등 다수 소개"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 pt-32 pb-24">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-12"
        >
          <Button asChild variant="ghost" className="mb-8 group">
            <Link href="/intro#doctors">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              의료진 리스트로 돌아가기
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start bg-white p-12 rounded-[3rem] shadow-xl border border-primary/5">
            <div className="w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
              <img 
                src="/doctor-choi.jpg" 
                alt="최용민 대표원장" 
                className="w-full h-full object-cover object-[60%_0%]"
              />
            </div>
            <div className="flex-grow">
              <div className="mb-8 pb-8 border-b border-zinc-100">
                <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Founding Director</span>
                <h1 className="text-5xl font-serif font-bold text-foreground mb-4">최용민 대표원장</h1>
                <p className="text-xl text-muted-foreground font-light">비수술 통증치료의 전문성과 20년의 임상 경험으로 <br />당신의 일상을 치유합니다.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {sections.map((section, idx) => (
                  <motion.div 
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <section.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-zinc-700 text-sm leading-relaxed">
                          <div className="w-1 h-1 rounded-full bg-primary/40 mt-2" />
                          <span className="break-keep">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
