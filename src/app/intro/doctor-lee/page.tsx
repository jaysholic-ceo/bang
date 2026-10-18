"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Award, BookOpen, GraduationCap, Medal, Stethoscope, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DoctorLeePage() {
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
        "서울대학교병원 암센터 전임의",
        "분당서울대학교병원 통증치료실 임상강사",
        "분당서울대학교병원 척추센터 전임의",
        "수도병원 통증센터장",
        "마취통증의학과 전문의",
        "통증의학 세부전문의"
      ]
    },
    {
      title: "학회 및 학술 활동",
      icon: BookOpen,
      items: [
        "대한마취통증의학회 정회원",
        "대한통증학회 정회원",
        "대한척추통증학회 정회원",
        "대한통증연구학회 정회원",
        "대한IMS학회 정회원"
      ]
    },
    {
        title: "전문 교육 및 이수",
        icon: Medal,
        items: [
          "대한통증학회 중재적신경블록 과정 이수",
          "대한통증학회 초음파 워크샵 이수",
          "대한통증학회 TPI 과정 이수",
          "대한통증학회 IMS 과정 이수",
          "대한IMS학회 IMS 과정 이수"
        ]
      },
    {
      title: "주요 경력 및 사회 활동",
      icon: Users,
      items: [
        "(주)메디브라더스 이사"
      ]
    },
    {
      title: "저서 및 미디어",
      icon: Stethoscope,
      items: [
        "통증의학서적 &quot;최소침습 경피적 척추시술법&quot; 공저 및 논문 다수 발표",
        "대한통증학회 시민강좌 강연, 분당서울대학교병원 초청강연"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
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
          
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start bg-white p-12 rounded-[3rem] shadow-premium border border-border">
            <div className="w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-premium flex-shrink-0">
              <img 
                src="/doctor-lee.jpg" 
                alt="이석면 원장" 
                className="w-full h-full object-cover object-[50%_32%]"
              />
            </div>
            <div className="flex-grow">
              <div className="mb-8 pb-8 border-b border-border">
                <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Founding Director</span>
                <h1 className="text-5xl font-serif font-bold text-foreground mb-4">이석면 원장</h1>
                <p className="text-xl text-muted-foreground font-light">환자의 고통을 깊이 공감하며, <br />최상의 비수술 통증치료 솔루션을 제공합니다.</p>
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
                        <li key={i} className="flex items-start gap-3 text-foreground text-sm leading-relaxed">
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
