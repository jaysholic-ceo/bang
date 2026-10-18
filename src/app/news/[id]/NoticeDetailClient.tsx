"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon } from "lucide-react";

export default function NoticeDetailClient({ post }: { post: any }) {
    const authorInitial = post.author ? post.author[0] : "관";

    return (
        <div className="flex flex-col min-h-screen bg-background pb-24">
            <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-16 justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src={post.thumbnailUrl || '/images/placeholder.jpg'}
                        alt="Hero Header"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#283038]/60" />
                </div>

                <div className="relative z-10 max-w-4xl w-full mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-primary px-3 py-1 rounded text-xs font-bold text-white uppercase tracking-wider">
                                {post.boardType}
                            </span>
                            <span className="text-white/80 text-sm font-sans">{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-8">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-3 text-white/90 font-sans">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                                {authorInitial}
                            </div>
                            <div>
                                <p className="text-sm font-medium">{post.author}</p>
                                <p className="text-xs text-white/60">지인마취통증의학과 강북점</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 md:px-8 w-full -mt-16 md:-mt-24 relative z-20 mb-20">
                <motion.div
                    className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-premium border border-border p-8 md:p-16 mb-12"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Editorial Layout */}
                    <div className="flex flex-col gap-10">
                        <div className="flex items-center gap-4 text-[11px] md:text-xs font-bold text-primary tracking-[0.3em] uppercase">
                            <div className="w-8 h-[1px] bg-primary/30" />
                            지인마취통증의학과 강북점
                        </div>

                        {/* Fixed Style Content Area to guarantee consistency */}
                        <article 
                            className="prose prose-zinc prose-lg lg:prose-xl max-w-none font-normal leading-[1.8] text-foreground break-keep italic/underline:text-primary [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-10 [&_img]:mx-auto [&_img]:max-w-full [&_p]:mb-6"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground font-bold uppercase tracking-widest">
                                <Share2 size={14} className="text-primary/40" />
                                Share this article
                            </div>
                            <div className="flex gap-4">
                                <button className="w-12 h-12 rounded-full bg-background hover:bg-secondary flex justify-center items-center text-muted-foreground transition-all shadow-sm border border-border" title="링크 복사하기">
                                    <LinkIcon size={18} />
                                </button>
                                <button className="w-12 h-12 rounded-full bg-background hover:bg-secondary flex justify-center items-center text-muted-foreground transition-all shadow-sm border border-border" title="페이스북 공유">
                                    <Facebook size={18} />
                                </button>
                                <button className="w-12 h-12 rounded-full bg-background hover:bg-secondary flex justify-center items-center text-muted-foreground transition-all shadow-sm border border-border" title="트위터 공유">
                                    <Twitter size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Link href="/news" className="group flex items-center gap-3 text-primary text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-8 py-4 bg-white rounded-full border border-border shadow-premium hover:bg-background transition-all">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to News & columns</span>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
