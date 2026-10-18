"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BODY_PART_GROUPS } from "@/data/body-parts";
import { trackPhoneCall } from "@/lib/gtag";
import { naverTrackPhoneCall } from "@/lib/naver-wcs";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const NAV_DATA = [
    {
        title: "본원소개",
        href: "/intro",
        items: [
            { label: "지인 이야기", href: "/intro" },
            { label: "의료진 프로필", href: "/intro#doctors" },
            { label: "첨단 장비", href: "/intro#equipment" },
            { label: "시설 보기", href: "/intro#tour" },
        ],
    },
    {
        title: "주요 질환",
        href: "/medical",
        groups: BODY_PART_GROUPS,
    },
    {
        title: "본원소식",
        href: "/news",
        items: [
            { label: "공지사항", href: "/news?category=공지사항" },
            { label: "건강칼럼", href: "/news?category=건강칼럼" },
            { label: "언론보도", href: "/news?category=언론보도" },
            { label: "학술활동", href: "/news?category=학술활동" },
        ],
    },
    {
        title: "진료안내",
        href: "/guide",
        items: [
            { label: "진료시간 및 오시는길", href: "/guide" },
            { label: "비급여 수가표", href: "/policy/price" },
        ],
    },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 z-50 w-full border-b border-border bg-background transition-[height,box-shadow] duration-300 ${
                scrolled ? "h-20 shadow-sm" : "h-24"
            }`}
        >
            <div className="container mx-auto px-6 h-full flex items-center justify-between gap-8">
                {/* Logo Area — real logo asset (transparent PNG, ~64KB) instead of CSS-drawn "Z" */}
                <Link href="/" aria-label="지인마취통증의학과 강북점 홈" className="flex items-center shrink-0">
                    <Image
                        src="/images/logo-header.png"
                        alt=""
                        width={560}
                        height={121}
                        priority
                        className="h-10 md:h-12 w-auto"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav aria-label="주 메뉴" className="hidden lg:flex flex-1 justify-center">
                    <ul className="flex items-center gap-8 xl:gap-10">
                        {NAV_DATA.map((nav) => (
                            <li key={nav.title} className="relative group/nav py-8">
                                <Link
                                    href={nav.href}
                                    aria-current={pathname.startsWith(nav.href) ? "page" : undefined}
                                    className={`inline-block py-1 text-base font-bold transition-colors hover:text-primary ${
                                        pathname.startsWith(nav.href) ? "text-primary" : "text-foreground"
                                    }`}
                                >
                                    {nav.title}
                                </Link>
                                
                                {/* Individual Scroll-down Menu or Mega Menu */}
                                <div className={`absolute top-[80%] left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-4 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto group-focus-within/nav:opacity-100 group-focus-within/nav:translate-y-0 group-focus-within/nav:pointer-events-auto transition-all duration-300 z-50 ${nav.groups ? 'w-[600px]' : 'w-[200px]'}`}>
                                    <div className="p-4 rounded-lg bg-card border border-border shadow-lg">
                                        {nav.groups ? (
                                            <div className="grid grid-cols-3 gap-6 p-2">
                                                {nav.groups.map((group) => (
                                                    <div key={group.name} className="space-y-3">
                                                        <h4 className="text-sm font-bold text-primary border-b border-border pb-1">{group.name}</h4>
                                                        <ul className="flex flex-col gap-1">
                                                            {group.items.map((item) => (
                                                                <li key={item.label}>
                                                                    <Link
                                                                        href={item.href}
                                                                        className="block py-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                                                                    >
                                                                        {item.label}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <ul className="flex flex-col gap-0.5">
                                                {nav.items?.map((item) => (
                                                    <li key={item.label}>
                                                        <Link
                                                            href={item.href}
                                                            className="block px-4 py-2.5 text-[15px] font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <a
                        href="tel:02-6431-1234"
                        onClick={() => { trackPhoneCall("header"); naverTrackPhoneCall(); }}
                        className="hidden lg:flex items-center gap-2 h-11 px-5 rounded-md bg-primary text-primary-foreground text-[15px] font-bold hover:opacity-90 transition-opacity"
                    >
                        <Phone size={16} aria-hidden="true" /> 02-6431-1234
                    </a>

                    {/* Mobile Toggle */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="메뉴 열기" className="lg:hidden size-11 rounded-md">
                                <Menu className="w-6 h-6" aria-hidden="true" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full sm:w-[400px] p-0 bg-background border-l-0">
                            <div className="flex flex-col h-screen overflow-y-auto">
                                <div className="p-8 md:p-10">
                                    <SheetHeader className="mb-10">
                                        <SheetTitle className="text-left">
                                            <Image src="/images/logo-header.png" alt="지인마취통증의학과 강북점" width={560} height={121} className="h-9 w-auto" />
                                        </SheetTitle>
                                        <SheetDescription className="sr-only">사이트 메뉴</SheetDescription>
                                    </SheetHeader>

                                    <div className="flex flex-col gap-10">
                                        {NAV_DATA.map((nav) => (
                                            <div key={nav.title} className="space-y-6">
                                                <h3 className="text-sm font-bold text-primary flex items-center gap-3">
                                                    {nav.title}
                                                    <div className="flex-1 h-[1px] bg-border" />
                                                </h3>
                                                {nav.groups ? (
                                                    <div className="space-y-4">
                                                        {nav.groups.map(group => (
                                                            <div key={group.name} className="space-y-2">
                                                                <h4 className="text-sm font-semibold text-muted-foreground">{group.name}</h4>
                                                                <ul className="grid grid-cols-2 gap-x-4 gap-y-3 pl-2">
                                                                    {group.items.map((item) => (
                                                                        <li key={item.label}>
                                                                            <Link
                                                                                href={item.href}
                                                                                onClick={() => setIsOpen(false)}
                                                                                className="block text-base font-serif font-bold text-foreground hover:text-primary transition-colors break-keep"
                                                                            >
                                                                                {item.label}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <ul className="grid grid-cols-2 gap-x-4 gap-y-4">
                                                        {nav.items?.map((item) => (
                                                            <li key={item.label}>
                                                                <Link
                                                                    href={item.href}
                                                                    onClick={() => setIsOpen(false)}
                                                                    className="block text-lg font-serif font-bold text-foreground hover:text-primary transition-colors break-keep"
                                                                >
                                                                    {item.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-16 pt-10 border-t border-border pb-10">
                                        <div className="space-y-4">
                                            <p className="text-sm font-bold text-muted-foreground">전화 예약</p>
                                            <a
                                                href="tel:02-6431-1234"
                                                onClick={() => { trackPhoneCall("mobile_menu"); naverTrackPhoneCall(); }}
                                                className="block text-3xl font-serif font-bold text-primary"
                                            >
                                                02-6431-1234
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

