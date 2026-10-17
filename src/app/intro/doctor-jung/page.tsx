"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Award, BookOpen, GraduationCap, Medal, Stethoscope, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DoctorJungPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const sections = [
    {
      title: "학력 및 주요 경력",
      icon: GraduationCap,
      items: [
        "서울대학교병원 마취통증의학과 전공의",
        "서울대학교병원 통증센터 임상강사",
        "서울대학교병원 암센터 전임의",
        "분당서울대학교병원 통증치료실 임상강사",
        "분당서울대학교병원 척추센터 전임의",
        "서울대학교병원 마취통증의학과 교수 (촉탁)",
        "수도병원 통증센터장",
        "마취통증의학과 전문의",
        "통증의학 세부전문의"
      ]
    },
    {
      title: "학위",
      icon: Award,
      items: [
        "이화여자대학교 의학과 석사"
      ]
    },
    {
      title: "학회 및 학술 활동",
      icon: BookOpen,
      items: [
        "대한마취통증의학회 정회원",
        "대한통증학회 정회원",
        "대한척추통증학회 정회원",
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
        "대한IMS학회 IMS 과정 이수"
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
                src="/doctor-junghj.jpg" 
                alt="정희진 원장" 
                className="w-full h-full object-cover object-[50%_0%]"
              />
            </div>
            <div className="flex-grow">
              <div className="mb-8 pb-8 border-b border-zinc-100">
                <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Pain Specialist</span>
                <h1 className="text-5xl font-serif font-bold text-foreground mb-4">정희진 원장</h1>
                <p className="text-xl text-muted-foreground font-light">섬세하고 정교한 비수술 통증치료로 <br />환자분들의 일상 회복을 돕습니다.</p>
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
