import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { blogPosts } from "@/lib/mock-data";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <PageContainer className="py-12 md:py-16 lg:py-20">
      {/* ── Page Header ── */}
      <div className="text-center mb-12 lg:mb-16">
        <span className="inline-block text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-purple/80 mb-4">
          Blog
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
          Gaming{" "}
          <GradientText variant="secondary">Intelligence</GradientText>
        </h1>
        <p className="text-white/50 max-w-lg mx-auto text-base lg:text-lg leading-relaxed">
          Deal tips, price intelligence insights, and gaming news
        </p>
      </div>

      {/* ── Featured Post ── */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className={cn(
            "group flex flex-col md:flex-row gap-0 overflow-hidden rounded-xl mb-10",
            "bg-card/50 border border-border/30",
            "hover:border-white/[0.08] transition-all duration-300"
          )}
        >
          <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-[320px] overflow-hidden">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10 md:w-1/2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[9px] font-heading font-bold uppercase tracking-wide bg-gaming-purple/[0.1] text-gaming-purple border border-gaming-purple/15">
                {featured.category}
              </span>
              <span className="text-[11px] text-white/25 font-heading">{featured.readingTime}</span>
            </div>
            <h2 className="font-heading font-bold text-xl md:text-2xl lg:text-3xl text-white/95 leading-tight mb-3 group-hover:text-white transition-colors">
              {featured.title}
            </h2>
            <p className="text-sm text-white/40 leading-relaxed line-clamp-3 mb-5">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-3">
              <Image
                src={featured.author.avatar}
                alt={featured.author.name}
                width={28}
                height={28}
                className="rounded-full ring-1 ring-white/10"
              />
              <div>
                <span className="text-xs font-heading font-medium text-white/60">{featured.author.name}</span>
                <span className="text-white/15 mx-2">&middot;</span>
                <span className="text-xs text-white/30 font-heading">{formatDate(featured.publishedAt)}</span>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm font-heading font-semibold text-gaming-purple/80 group-hover:text-gaming-purple transition-colors">
              Read Article
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>
      )}

      {/* ── Post Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className={cn(
              "group flex flex-col overflow-hidden rounded-xl",
              "bg-card/50 border border-border/30",
              "hover:border-white/[0.08] transition-all duration-300"
            )}
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col flex-1 p-5 gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-heading font-bold uppercase tracking-wide bg-white/[0.04] text-white/40 border border-white/[0.06]">
                  {post.category}
                </span>
                <span className="text-[10px] text-white/20 font-heading">{post.readingTime}</span>
              </div>
              <h2 className="font-heading font-semibold text-base text-white/90 line-clamp-2 group-hover:text-white transition-colors">
                {post.title}
              </h2>
              <p className="text-xs text-white/35 line-clamp-2 leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 pt-1 mt-auto">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={22}
                  height={22}
                  className="rounded-full ring-1 ring-white/10"
                />
                <span className="text-[11px] text-white/40 font-heading">{post.author.name}</span>
                <span className="text-white/10 text-[10px]">&middot;</span>
                <span className="text-[11px] text-white/25 font-heading">{formatDate(post.publishedAt)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
