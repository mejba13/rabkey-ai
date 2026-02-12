"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Flame, TrendingDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import {
  DealScoreBadge,
  PriceTag,
  DiscountBadge,
  GamingButton,
} from "@/components/gaming";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedDeals } from "@/hooks/use-deals";
import { staggerContainer, staggerItem } from "@/animations/variants";

function DealCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/40 bg-card/80 overflow-hidden",
        featured && "md:col-span-2 md:row-span-2"
      )}
    >
      <Skeleton className={cn("w-full shimmer-skeleton", featured ? "aspect-[16/10]" : "aspect-video")} />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4 shimmer-skeleton" />
        <Skeleton className="h-4 w-1/3 shimmer-skeleton" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 shimmer-skeleton" />
          <Skeleton className="h-5 w-12 shimmer-skeleton" />
        </div>
      </div>
    </div>
  );
}

export function PopularDealsSection() {
  const { data: deals, isLoading } = useFeaturedDeals(5);
  const featured = deals?.[0];
  const rest = deals?.slice(1, 5);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Section top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-3/4"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.705 0.193 39.221 / 20%), transparent)",
          }}
        />
      </div>

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle, oklch(0.705 0.193 39.221 / 3%) 0%, transparent 70%)" }}
        />
      </div>

      <PageContainer>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block text-xs font-heading font-bold uppercase tracking-[0.2em] text-gaming-coral mb-4">
              Hot Deals
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
              Today&apos;s{" "}
              <GradientText variant="primary">Hottest Deals</GradientText>
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              AI-curated deals with the highest scores right now
            </p>
          </div>
          <Link
            href="/deals"
            className={cn(
              "inline-flex items-center gap-2",
              "text-sm font-heading font-semibold text-gaming-orange",
              "hover:text-gaming-orange/80 transition-colors",
              "group"
            )}
          >
            View All Deals
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Deals Grid - Featured + Supporting */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {isLoading ? (
            <>
              <DealCardSkeleton featured />
              {Array.from({ length: 4 }).map((_, i) => (
                <DealCardSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {/* Featured Deal - Large */}
              {featured && (
                <motion.div
                  variants={staggerItem}
                  className={cn(
                    "md:col-span-2 md:row-span-2",
                    "group relative rounded-2xl overflow-hidden",
                    "bg-card/80 backdrop-blur-sm border border-border/40",
                    "transition-all duration-300",
                    "hover:border-gaming-orange/40 hover:shadow-[0_0_40px_oklch(0.784_0.159_72.989/8%)]"
                  )}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gaming-orange/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

                  {/* Ambient glow */}
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: "oklch(0.784 0.159 72.989 / 8%)" }}
                  />

                  {/* Cover Image */}
                  <div className="relative z-[2] aspect-[16/10] w-full bg-gaming-surface overflow-hidden">
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-heading font-bold",
                            "backdrop-blur-md",
                            tag === "Flash Sale"
                              ? "bg-gaming-coral/20 text-gaming-coral border border-gaming-coral/30"
                              : tag === "Historical Low"
                                ? "bg-gaming-teal/20 text-gaming-teal border border-gaming-teal/30"
                                : "bg-gaming-orange/20 text-gaming-orange border border-gaming-orange/30"
                          )}
                        >
                          {tag === "Flash Sale" && <Flame className="inline h-3 w-3 mr-1" />}
                          {tag === "Historical Low" && <TrendingDown className="inline h-3 w-3 mr-1" />}
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Deal Score - Large */}
                    <div className="absolute top-4 right-4">
                      <DealScoreBadge score={featured.dealScore} size="lg" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-[2] p-6 space-y-4">
                    <div>
                      <h3 className="font-heading font-bold text-xl md:text-2xl">
                        {featured.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {featured.platform.toUpperCase()} &middot; {featured.recommendation === "strong-buy" ? "Strong Buy" : "Buy"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <PriceTag
                        currentPrice={featured.currentPrice}
                        originalPrice={featured.originalPrice}
                        size="lg"
                      />
                      <DiscountBadge discount={featured.discount} />
                      {featured.expiresAt && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Limited time
                        </span>
                      )}
                    </div>

                    <GamingButton
                      size="lg"
                      className="w-full md:w-auto"
                      onClick={() => window.open(featured.url, "_blank")}
                    >
                      <Flame className="h-4 w-4 mr-2" />
                      Grab This Deal
                    </GamingButton>
                  </div>
                </motion.div>
              )}

              {/* Supporting deals */}
              {rest?.map((deal) => (
                <motion.div
                  key={deal.id}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={cn(
                    "group rounded-2xl overflow-hidden",
                    "bg-card/80 backdrop-blur-sm border border-border/40",
                    "transition-all duration-300",
                    "hover:border-gaming-orange/40 hover:shadow-[0_0_30px_oklch(0.784_0.159_72.989/6%)]"
                  )}
                >
                  {/* Cover */}
                  <div className="relative aspect-video w-full bg-gaming-surface overflow-hidden">
                    <Image
                      src={deal.coverImage}
                      alt={deal.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 right-3">
                      <DealScoreBadge score={deal.dealScore} size="sm" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-heading font-semibold text-sm truncate">
                        {deal.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {deal.platform.toUpperCase()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <PriceTag
                        currentPrice={deal.currentPrice}
                        originalPrice={deal.originalPrice}
                        size="sm"
                      />
                      <DiscountBadge discount={deal.discount} />
                    </div>

                    <GamingButton
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(deal.url, "_blank")}
                    >
                      Grab Deal
                    </GamingButton>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      </PageContainer>
    </section>
  );
}
