import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/mock-data";
import { formatDate } from "@/lib/formatters";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <PageContainer className="py-12">
      <SectionHeading
        title="Blog"
        subtitle="Gaming news, deal tips, and price intelligence insights"
      />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-border bg-card overflow-hidden hover:border-gaming-orange/50 hover:shadow-lg hover:shadow-gaming-orange/10 transition-all"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize text-xs">{post.category}</Badge>
                <span className="text-xs text-muted-foreground">{post.readingTime}</span>
              </div>
              <h2 className="font-heading font-semibold text-lg line-clamp-2 group-hover:text-gaming-orange transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 pt-1">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-xs text-muted-foreground">{post.author.name}</span>
                <span className="text-xs text-muted-foreground">&middot;</span>
                <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
