"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Clock, Sparkles, TrendingUp, BookOpen, Newspaper, Lightbulb } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { blogPosts, type BlogPost } from "@/lib/mock-data/blog-posts";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const categories = [
  { key: "all", label: "All Posts", icon: Sparkles },
  { key: "deals", label: "Deals", icon: TrendingUp },
  { key: "guides", label: "Guides", icon: BookOpen },
  { key: "news", label: "News", icon: Newspaper },
  { key: "tips", label: "Tips", icon: Lightbulb },
] as const;

type CategoryKey = (typeof categories)[number]["key"];

const categoryColors: Record<string, { badge: string; glow: string; border: string; text: string }> = {
  deals: {
    badge: "bg-gaming-orange/10 text-gaming-orange border-gaming-orange/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(245,166,35,0.15)]",
    border: "group-hover:border-gaming-orange/30",
    text: "text-gaming-orange",
  },
  guides: {
    badge: "bg-gaming-teal/10 text-gaming-teal border-gaming-teal/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,212,170,0.15)]",
    border: "group-hover:border-gaming-teal/30",
    text: "text-gaming-teal",
  },
  news: {
    badge: "bg-gaming-purple/10 text-gaming-purple border-gaming-purple/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]",
    border: "group-hover:border-gaming-purple/30",
    text: "text-gaming-purple",
  },
  tips: {
    badge: "bg-gaming-gold/10 text-gaming-gold border-gaming-gold/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]",
    border: "group-hover:border-gaming-gold/30",
    text: "text-gaming-gold",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

/* ──────────────────────────────────────────────
   Featured Post — Cinematic Hero Card
   ────────────────────────────────────────────── */
function FeaturedPost({ post }: { post: BlogPost }) {
  const colors = categoryColors[post.category];

  return (
    <motion.div variants={itemVariants}>
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block overflow-hidden rounded-2xl"
      >
        {/* Full-bleed image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 1280px"
            priority
          />
          {/* Cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

          {/* Featured badge */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-gaming-orange/90 text-black backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              Featured
            </span>
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-heading font-bold uppercase tracking-wider border",
                colors.badge
              )}>
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-white/40 font-heading">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
            </div>

            <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-3 group-hover:text-gaming-orange transition-colors duration-300">
              {post.title}
            </h2>

            <p className="text-sm md:text-base text-white/50 leading-relaxed line-clamp-2 mb-5 max-w-xl">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full ring-2 ring-white/10"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-heading font-medium text-white/70">{post.author.name}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-xs text-white/40 font-heading">{formatDate(post.publishedAt)}</span>
                </div>
              </div>

              <span className="hidden sm:flex items-center gap-2 text-sm font-heading font-semibold text-gaming-orange group-hover:gap-3 transition-all duration-300">
                Read Article
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Blog Post Card — Glassmorphic with Glow
   ────────────────────────────────────────────── */
function BlogCard({ post }: { post: BlogPost }) {
  const colors = categoryColors[post.category];

  return (
    <motion.div variants={itemVariants} layout>
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group flex flex-col overflow-hidden rounded-xl h-full",
          "bg-white/[0.02] backdrop-blur-sm",
          "border border-white/[0.06]",
          "transition-all duration-500 ease-out",
          colors.glow,
          colors.border
        )}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/20 to-transparent opacity-80" />

          {/* Category pill on image */}
          <div className="absolute top-3 left-3">
            <span className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-heading font-bold uppercase tracking-wider border backdrop-blur-md",
              colors.badge
            )}>
              {post.category}
            </span>
          </div>

          {/* Reading time on image */}
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-heading text-white/60 bg-black/40 backdrop-blur-md">
              <Clock className="h-2.5 w-2.5" />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <h2 className="font-heading font-semibold text-[15px] leading-snug text-white/90 line-clamp-2 group-hover:text-white transition-colors duration-300">
            {post.title}
          </h2>

          <p className="text-[13px] text-white/35 line-clamp-2 leading-relaxed flex-1">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-1">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[9px] font-heading font-medium text-white/25 bg-white/[0.03] border border-white/[0.04]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Author + CTA */}
          <div className="flex items-center justify-between pt-3 mt-auto border-t border-white/[0.04]">
            <div className="flex items-center gap-2.5">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full ring-1 ring-white/10"
              />
              <div className="flex flex-col">
                <span className="text-[11px] text-white/50 font-heading font-medium">{post.author.name}</span>
                <span className="text-[10px] text-white/25 font-heading">{formatDate(post.publishedAt)}</span>
              </div>
            </div>

            <span className={cn(
              "flex items-center gap-1 text-[11px] font-heading font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0",
              colors.text
            )}>
              Read
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Blog Page
   ────────────────────────────────────────────── */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const featured = blogPosts[0];
  const gridPosts = blogPosts.slice(1);

  const filteredPosts =
    activeCategory === "all"
      ? gridPosts
      : gridPosts.filter((p) => p.category === activeCategory);

  return (
    <PageContainer className="py-12 md:py-16 lg:py-20">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="text-center mb-10 lg:mb-14"
      >
        <span className="inline-block text-[11px] font-heading font-semibold uppercase tracking-[0.25em] text-gaming-purple/80 mb-4">
          Blog
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
          Gaming{" "}
          <GradientText variant="secondary">Intelligence</GradientText>
        </h1>
        <p className="text-white/40 max-w-md mx-auto text-sm lg:text-base leading-relaxed">
          Deal tips, price intelligence insights, and gaming news
        </p>
      </motion.div>

      {/* ── Featured Post ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-10"
      >
        {featured && <FeaturedPost post={featured} />}
      </motion.div>

      {/* ── Category Filter Tabs ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
        className="flex items-center justify-center gap-2 mb-10 flex-wrap"
      >
        {categories.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-heading font-medium transition-all duration-300",
              "border",
              activeCategory === key
                ? "bg-gaming-purple/15 text-gaming-purple border-gaming-purple/30 shadow-[0_0_15px_rgba(124,58,237,0.1)]"
                : "bg-white/[0.02] text-white/35 border-white/[0.06] hover:text-white/60 hover:border-white/[0.1] hover:bg-white/[0.04]"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </motion.div>

      {/* ── Post Grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="col-span-full flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-white/20" />
              </div>
              <p className="text-white/40 font-heading text-sm mb-1">No posts found</p>
              <p className="text-white/20 text-xs">
                Check back soon for new {activeCategory} content
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </PageContainer>
  );
}
