"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Mail, Instagram, MessageCircle, Heart, ShieldCheck } from "lucide-react";
import { trackPhoneCall } from "@/lib/gtag";
import { naverTrackPhoneCall } from "@/lib/naver-wcs";
import { CLINIC_YEARS } from "@/lib/clinic";

// 사업자등록번호 — 실제 번호를 입력하면 푸터에 자동 표시됩니다 (비어 있으면 숨김).
const BUSINESS_REG_NO = "";

// 소셜 채널 — 주소를 넣으면 푸터에 아이콘이 나타납니다(비어 있으면 숨김).
// 예전에는 주소 없이 "#" 링크로 아이콘만 보였는데, 눌러도 아무 일이 없어 숨겼습니다.
const SOCIAL_LINKS = [
    { label: "인스타그램", href: "", icon: Instagram },
    { label: "카카오톡 채널", href: "", icon: MessageCircle },
    { label: "블로그", href: "", icon: Heart },
].filter((link) => link.href);

const FOOTER_SECTIONS = [
    {
        title: "Navigation",
        items: [
            { label: "병원 소개", href: "/intro" },
            { label: "의료진", href: "/intro#doctors" },
            { label: "주요 질환", href: "/medical" },
            { label: "진료시간 및 오시는길", href: "/guide" },
        ],
    },
    {
        title: "Medical Center",
        items: [
            { label: "척추 통증", href: "/medical/disc" },
            { label: "어깨 · 관절", href: "/medical/frozen-shoulder" },
            { label: "대상포진 클리닉", href: "/medical/shingles" },
            { label: "재활치료실", href: "/intro#tour" },
        ],
    },
    {
        title: "Support",
        items: [
            { label: "비급여 수가표", href: "/policy/price" },
            { label: "개인정보처리방침", href: "/policy/privacy" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="bg-[#283038] text-[#CBD2D9] pt-12 pb-28 lg:pb-8 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* 1. Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                    {/* Brand & Mission Area */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" aria-label="지인마취통증의학과 강북점 홈" className="inline-flex rounded-md bg-background px-4 py-2.5">
                            <Image src="/images/logo-header.png" alt="" width={560} height={121} className="h-9 w-auto" />
                        </Link>
                        
                        <p className="text-[15px] leading-relaxed break-keep max-w-xs text-[#EEF1F4]">
                            &quot;지인은 환자를 아는 사람처럼 진심으로 대합니다.&quot; <br />
                            전국에서 찾아오시는 환자분들과 {CLINIC_YEARS}년간 지켜온 정직한 진료의 무게.
                        </p>

                        {SOCIAL_LINKS.length > 0 && (
                            <div className="flex gap-3">
                                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-[#CBD2D9] hover:text-white hover:bg-primary transition-colors">
                                        <Icon size={16} aria-hidden="true" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Links Navigation Grid */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {FOOTER_SECTIONS.map((section) => (
                            <div key={section.title} className="space-y-4">
                                <h4 className="text-xs font-bold text-white/70 tracking-[0.2em] uppercase">{section.title}</h4>
                                <ul className="space-y-1">
                                    {section.items.map((item) => (
                                        <li key={item.label}>
                                            <Link href={item.href} className="inline-block py-1 text-[15px] font-medium hover:text-white transition-colors">
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Concentrated Contact Details Bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 border-t border-white/10 mb-6">
                    <div className="flex items-start gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F0B88C]">
                            <Phone size={18} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-white/70 tracking-widest uppercase">Consultation</p>
                            <a href="tel:02-6431-1234" onClick={() => { trackPhoneCall("footer"); naverTrackPhoneCall(); }}>
                                <p className="text-[19px] font-serif font-bold text-white tracking-tight">02.6431.1234</p>
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F0B88C]">
                            <MapPin size={18} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-white/70 tracking-widest uppercase">Location</p>
                            <p className="text-[15px] font-bold text-white leading-tight">삼양로 319 지인통증빌딩</p>
                            <p className="text-sm">화계역 2번 출구에서 230m</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F0B88C]">
                            <Clock size={18} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-white/70 tracking-widest uppercase">Hours</p>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <p className="text-[15px] font-bold text-white whitespace-nowrap">평일 09:00 - 19:00</p>
                                    <p className="text-sm text-[#CBD2D9]">점심: 13:00 - 14:00</p>
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold text-white whitespace-nowrap">토요일 09:00 - 14:00</p>
                                    <p className="text-sm text-[#CBD2D9]">일요일 · 공휴일 휴진</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Bottom Legal Area */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pt-6 border-t border-white/10">
                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-3 text-xs font-bold text-[#CBD2D9] border-b border-white/10 pb-4">
                            <div className="flex items-center gap-1">
                                <ShieldCheck size={14} className="text-[#F0B88C]" aria-hidden="true" /> 의료심의필 준수
                            </div>
                            <span className="text-white/20" aria-hidden="true">|</span>
                            <div className="flex items-center gap-1">
                                <ShieldCheck size={14} className="text-[#F0B88C]" aria-hidden="true" /> 비급여 고지의무 준수
                            </div>
                        </div>
                        <div className="text-xs leading-relaxed text-[#CBD2D9] space-y-1">
                            <p>상호명: 지인마취통증의학과 강북점 · 대표자: 최용민, 이석면{BUSINESS_REG_NO ? ` · 사업자번호: ${BUSINESS_REG_NO}` : ""} · 소재지: 서울특별시 강북구 삼양로 319 지인통증빌딩</p>
                            <p>Copyright © {new Date().getFullYear()} JIIN Pain Center. All Rights Reserved. </p>
                        </div>
                    </div>
                    
                    <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-[#CBD2D9]">
                        <Link href="/policy/privacy" className="inline-block py-1 hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
