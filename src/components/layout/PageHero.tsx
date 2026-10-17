import type { ReactNode } from "react";

interface PageHeroProps {
    /** 짧은 한국어 소제목 (예: "진료안내") */
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
    breadcrumb?: ReactNode;
    /** 제목 위에 가운데로 놓는 보조 요소. 예: 아이콘 */
    aside?: ReactNode;
    /** 아래 카드가 히어로 위로 겹쳐 올라오는 페이지(진료안내)용 여백 */
    overlap?: boolean;
}

/**
 * 하위 페이지 공통 상단 영역.
 * 사진·그라데이션·장식 문구 없이, 차분한 밝은 면 + 제목 + 한두 줄 설명만 둡니다.
 * 글은 화면 가운데 정렬입니다(좌우 여백이 같게). 본문 컨테이너 폭과 맞출 필요가 없어
 * 페이지마다 폭 클래스를 따로 받지 않습니다.
 */
export function PageHero({
    eyebrow,
    title,
    description,
    breadcrumb,
    aside,
    overlap = false,
}: PageHeroProps) {
    return (
        <section
            className={`w-full border-b border-border bg-secondary px-4 pt-12 md:pt-16 text-center ${
                overlap ? "pb-20 md:pb-28" : "pb-12 md:pb-16"
            }`}
        >
            <div className="mx-auto flex max-w-3xl flex-col items-center">
                {breadcrumb}
                {aside}
                {eyebrow && <p className="mb-3 text-sm font-bold text-primary">{eyebrow}</p>}
                <h1 className="break-keep font-serif text-4xl font-bold leading-[1.2] text-foreground md:text-5xl lg:text-6xl">
                    {title}
                </h1>
                {description && (
                    <p className="mx-auto mt-5 max-w-2xl break-keep text-base leading-relaxed text-muted-foreground md:text-xl">
                        {description}
                    </p>
                )}
            </div>
        </section>
    );
}
