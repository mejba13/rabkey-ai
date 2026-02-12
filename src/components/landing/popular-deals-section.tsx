"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/shared";
import {
  DealScoreBadge,
  PriceTag,
  DiscountBadge,
  GamingButton,
} from "@/components/gaming";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedDeals } from "@/hooks/use-deals";
import { staggerContainer, staggerItem } from "@/animations/variants";

function DealCardSkeleton() {
  return (
    <div
      className={cn(
        "min-w-[300px] snap-start flex-shrink-0",
        "rounded-xl border border-border bg-card overflow-hidden"
      )}
    >
      <Skeleton className="aspect-video w-full shimmer-skeleton" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4 shimmer-skeleton" />
        <Skeleton className="h-4 w-1/3 shimmer-skeleton" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 shimmer-skeleton" />
          <Skeleton className="h-5 w-10 shimmer-skeleton" />
          <Skeleton className="h-5 w-12 shimmer-skeleton" />
        </div>
        <Skeleton className="h-8 w-full shimmer-skeleton" />
      </div>
    </div>
  );
}

export function PopularDealsSection() {
  const { data: deals, isLoading } = useFeaturedDeals(8);

  return (
    <section className="py-20">
      <PageContainer>
        <div className="flex items-end justify-between mb-8">
          <SectionHeading
            title="Today's Hottest Deals"
            subtitle="AI-curated deals with the highest scores right now"
          />
          <Link
            href="/deals"
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5",
              "text-sm font-heading font-medium text-gaming-orange",
              "hover:text-gaming-orange/80 transition-colors"
            )}
          >
            View All Deals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className={cn(
            "flex gap-4 overflow-x-auto pb-4",
            "snap-x snap-mandatory",
            "scrollbar-hide"
          )}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <DealCardSkeleton key={i} />
              ))
            : deals?.map((deal) => (
                <motion.div
                  key={deal.id}
                  variants={staggerItem}
                  className={cn(
                    "min-w-[300px] snap-start flex-shrink-0",
                    "rounded-xl border border-border bg-card overflow-hidden",
                    "transition-[border-color,box-shadow] duration-200",
                    "hover:border-gaming-orange/50 hover:glow-orange"
                  )}
                >
                  {/* Cover Image */}
                  <div className="relative aspect-video w-full bg-gaming-surface">
                    <Image
                      src={deal.coverImage}
                      alt={deal.title}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
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

                    {/* Price Row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <PriceTag
                        currentPrice={deal.currentPrice}
                        originalPrice={deal.originalPrice}
                        size="sm"
                      />
                      <DiscountBadge discount={deal.discount} />
                      <DealScoreBadge score={deal.dealScore} size="sm" />
                    </div>

                    {/* CTA */}
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
        </motion.div>

        {/* Mobile View All link */}
        <div className="mt-4 sm:hidden text-center">
          <Link
            href="/deals"
            className={cn(
              "inline-flex items-center gap-1.5",
              "text-sm font-heading font-medium text-gaming-orange",
              "hover:text-gaming-orange/80 transition-colors"
            )}
          >
            View All Deals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}
