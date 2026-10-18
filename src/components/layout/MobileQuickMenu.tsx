"use client";

import Link from "next/link";
import { Phone, Clock, MapPin } from "lucide-react";
import { trackPhoneCall, trackHours, trackDirections } from "@/lib/gtag";
import { naverTrackPhoneCall } from "@/lib/naver-wcs";

/**
 * Mobile bottom action bar (thumb zone).
 * - Full-width, anchored to the bottom edge (not floating) so it never covers content mid-screen.
 * - Primary action = phone reservation (copper, largest target); secondary = hours / directions.
 * - Labels are 14px+ and every target is >= 48px tall.
 * - Footer reserves bottom padding (pb-28 below lg) so the legal text is never hidden behind it.
 */
export function MobileQuickMenu() {
    return (
        <nav
            aria-label="빠른 메뉴"
            className="lg:hidden fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)]"
        >
            <div className="mx-auto flex max-w-xl items-stretch gap-2 p-2">
                <a
                    href="tel:02-6431-1234"
                    aria-label="전화 예약 02-6431-1234"
                    onClick={() => { trackPhoneCall("mobile_floating_bar"); naverTrackPhoneCall(); }}
                    className="flex flex-[2] items-center justify-center gap-2 h-12 rounded-md bg-primary text-primary-foreground text-[17px] font-bold active:opacity-90"
                >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    전화 예약
                </a>
                <Link
                    href="/guide"
                    onClick={() => trackHours("mobile_floating_bar")}
                    className="flex flex-1 flex-col items-center justify-center gap-0.5 h-12 rounded-md border border-border bg-card text-foreground text-sm font-medium"
                >
                    <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
                    진료시간
                </Link>
                <Link
                    href="/guide"
                    onClick={() => trackDirections("mobile_floating_bar")}
                    className="flex flex-1 flex-col items-center justify-center gap-0.5 h-12 rounded-md border border-border bg-card text-foreground text-sm font-medium"
                >
                    <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                    오시는 길
                </Link>
            </div>
        </nav>
    );
}
