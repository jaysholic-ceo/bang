"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Calendar, User, ChevronRight, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

// Types for the passed data
interface PostItem {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    thumbnail: string;
}

const POSTS_PER_PAGE = 5;

export default function NewsClient({ initialPosts }: { initialPosts: PostItem[] }) {
    const searchParams = useSearchParams();
    const categoryFromUrl = searchParams.get("category");
    // 카테고리가 바뀌면 1페이지로 돌아갑니다 (effect 없이 렌더링 중에 계산).
    const [pageState, setPageState] = useState({ category: categoryFromUrl, page: 1 });
    const currentPage = pageState.category === categoryFromUrl ? pageState.page : 1;
    const setCurrentPage = (update: number | ((prev: number) => number)) =>
        setPageState((prev) => {
            const base = prev.category === categoryFromUrl ? prev.page : 1;
            return { category: categoryFromUrl, page: typeof update === "function" ? update(base) : update };
        });

    const filteredPosts = useMemo(() => {
        let posts = [...initialPosts];
        if (categoryFromUrl) {
            posts = posts.filter(post => post.category === categoryFromUrl);
        }
        // Sort by date descending (latest first)
        return posts; 
    }, [categoryFromUrl, initialPosts]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const pageTitle = categoryFromUrl || "본원 소식";
    const pageDesc = categoryFromUrl
        ? `지인마취통증의학과 강북점의 ${categoryFromUrl} 게시글입니다.`
        : "지인마취통증의학과 강북점의 새로운 소식과 언론 보도, 그리고 전문의가 직접 작성하는 건강 칼럼을 전해드립니다.";

    return (
        <div className="flex flex-col min-h-screen bg-background pb-24">
            <PageHero
                eyebrow="본원소식"
                title={pageTitle}
                description="지인마취통증의학과 강북점의 새로운 소식과 언론 보도, 그리고 전문의가 직접 작성하는 건강 칼럼을 전해드립니다."
            />

            {/* Blog List */}
            <section className="max-w-5xl mx-auto px-4 md:px-8 w-full mt-12 md:mt-20 mb-10 md:mb-20">
                {/* Back to all posts (only when filtered) */}
                {categoryFromUrl && (
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8 md:mb-12">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-primary uppercase tracking-widest hover:text-primary/80 transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            전체 소식 보기
                        </Link>
                    </motion.div>
                )}

                {/* Posts */}
                <motion.div
                    key={`${categoryFromUrl || "all"}-${currentPage}`}
                    className="space-y-12 md:space-y-16"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {paginatedPosts.length === 0 ? (
                        <motion.div variants={fadeUp} className="text-center py-20 md:py-32">
                            <p className="text-muted-foreground text-lg">해당 카테고리의 게시글이 없습니다.</p>
                        </motion.div>
                    ) : (
                        paginatedPosts.map((post) => (
                            <motion.article
                                key={post.id}
                                variants={fadeUp}
                                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start pb-12 md:pb-16 border-b border-border last:border-0"
                            >
                                {/* Thumbnail */}
                                <div className="md:col-span-5 aspect-[16/10] md:aspect-[4/3] relative rounded-xl overflow-hidden bg-secondary border border-border">
                                    <Link href={`/news/${post.id}`} className="absolute inset-0 z-30">
                                        <span className="sr-only">{post.title} 읽기</span>
                                    </Link>
                                    
                                    {/* Main Uncropped Image */}
                                    <img
                                        src={post.thumbnail || "/images/placeholder.jpg"}
                                        alt={post.title}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = "/images/placeholder.jpg";
                                        }}
                                        className="relative z-10 w-full h-full object-contain bg-transparent transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                    
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-card text-primary font-bold px-3 py-1 rounded-md text-[11px] md:text-xs border border-border">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="md:col-span-7 flex flex-col h-full py-1">
                                    <div className="flex items-center text-[11px] md:text-xs text-muted-foreground font-bold uppercase tracking-[0.2em] mb-3 md:mb-4 gap-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={12} className="text-primary/40" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="hidden md:flex items-center gap-1.5">
                                            <User size={12} className="text-primary/40" />
                                            <span>{post.author}</span>
                                        </div>
                                    </div>

                                    <Link href={`/news/${post.id}`} className="block group-hover:text-primary transition-colors">
                                        <h2 className="text-xl md:text-3xl font-serif font-bold text-foreground leading-[1.2] mb-4 md:mb-6 tracking-tight text-balance break-keep group-hover:underline decoration-primary/20 underline-offset-4">
                                            {post.title}
                                        </h2>
                                    </Link>
                                    <p className="text-muted-foreground font-normal text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 md:mb-8 break-keep opacity-80">
                                        {post.excerpt}
                                    </p>

                                    <Link 
                                        href={`/news/${post.id}`}
                                        className="inline-flex min-h-11 items-center gap-2 text-primary text-[11px] font-bold uppercase tracking-widest mt-auto group/link"
                                    >
                                        Read Article <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))
                    )}
                </motion.div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <motion.div
                        className="flex justify-center items-center gap-2 mt-12 pt-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <button 
                            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronRight size={16} className="rotate-180" />
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-9 h-9 rounded-full flex items-center justify-center font-medium shadow-sm text-sm transition-colors ${
                                    currentPage === pageNum 
                                    ? "bg-primary text-primary-foreground" 
                                    : "border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                                }`}
                            >
                                {pageNum}
                            </button>
                        ))}

                        <button 
                            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </motion.div>
                )}
            </section>
        </div>
    );
}

