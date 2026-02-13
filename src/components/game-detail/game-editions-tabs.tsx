"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { Game, Price, Store } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PriceComparisonTable } from "./price-comparison-table";

interface GameEditionsTabsProps {
  game: Game;
  prices: Price[];
  stores: Store[];
  className?: string;
}

function GameEditionsTabs({
  game,
  prices,
  stores,
  className,
}: GameEditionsTabsProps) {
  const editions = game.editions;

  // Group prices by edition name
  const pricesByEdition = useMemo(() => {
    const map = new Map<string, Price[]>();
    for (const edition of editions) {
      const editionPrices = prices.filter(
        (p) => p.edition === edition.edition,
      );
      map.set(edition.id, editionPrices);
    }
    return map;
  }, [editions, prices]);

  // If only one edition, skip tabs
  if (editions.length <= 1) {
    const editionPrices = editions.length === 1
      ? pricesByEdition.get(editions[0].id) ?? prices
      : prices;

    return (
      <div className={className}>
        <PriceComparisonTable prices={editionPrices} stores={stores} />
      </div>
    );
  }

  const defaultTab = editions[0].id;

  return (
    <Tabs defaultValue={defaultTab} className={className}>
      <TabsList
        variant="line"
        className="w-full justify-start border-b border-white/[0.04]"
      >
        {editions.map((edition) => (
          <TabsTrigger
            key={edition.id}
            value={edition.id}
            className={cn(
              "data-[state=active]:text-gaming-orange",
              "data-[state=active]:after:bg-gaming-orange",
            )}
          >
            <span className="capitalize">{edition.edition}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {editions.map((edition) => {
        const editionPrices = pricesByEdition.get(edition.id) ?? [];

        return (
          <TabsContent key={edition.id} value={edition.id} className="mt-4">
            {/* Edition includes */}
            {edition.includes.length > 0 && (
              <div className="mb-4 rounded-lg border border-white/[0.04] bg-white/[0.02] p-4">
                <p className="text-[10px] uppercase tracking-wider text-white/30 font-heading">
                  Includes
                </p>
                <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                  {edition.includes.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-white/70 font-heading before:mr-1.5 before:text-gaming-orange before:content-['•']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <PriceComparisonTable prices={editionPrices} stores={stores} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

export { GameEditionsTabs };
export type { GameEditionsTabsProps };
