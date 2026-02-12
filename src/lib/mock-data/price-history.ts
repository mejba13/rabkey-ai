import type { PriceHistory, PriceHistoryPoint } from "@/lib/types";

// ─── Price History Generator ─────────────────────────────────
// Generates realistic weekly price points from 2024-01 to 2024-12.
// Simulates organic price drops during sale events (roughly every
// 6-10 weeks) and gradual price erosion for older titles.

function generatePricePoints(
  originalPrice: number,
  minSalePrice: number,
  storeId: string,
  opts?: {
    saleProbability?: number; // likelihood any given week is a sale week (0-1)
    saleDepth?: number; // how deep a sale goes as fraction of originalPrice (0-1)
    trendDown?: number; // gradual downward drift per week in dollars
  },
): PriceHistoryPoint[] {
  const points: PriceHistoryPoint[] = [];
  const saleProbability = opts?.saleProbability ?? 0.15;
  const saleDepth = opts?.saleDepth ?? 0.45;
  const trendDown = opts?.trendDown ?? 0.05;

  // Seeded-ish deterministic randomness based on store/price combo
  let seed = originalPrice * 1000 + minSalePrice * 100 + storeId.charCodeAt(1);
  function rand(): number {
    seed = (seed * 16807 + 7) % 2147483647;
    return (seed % 10000) / 10000;
  }

  let basePrice = originalPrice;
  const startDate = new Date("2024-01-01");

  for (let week = 0; week < 52; week++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + week * 7);

    // Gradually erode the base price
    basePrice = Math.max(basePrice - trendDown, minSalePrice + 5);

    let price: number;
    const isSaleWeek = rand() < saleProbability;

    if (isSaleWeek) {
      // Sale: drop significantly
      const depth = saleDepth + rand() * 0.15;
      price = Math.max(originalPrice * (1 - depth), minSalePrice);
      // Sometimes hit historical low
      if (rand() < 0.2) {
        price = minSalePrice;
      }
    } else {
      // Normal price with minor fluctuation
      const fluctuation = (rand() - 0.5) * (originalPrice * 0.05);
      price = Math.max(basePrice + fluctuation, minSalePrice + 2);
      price = Math.min(price, originalPrice);
    }

    price = Math.round(price * 100) / 100;

    points.push({
      date: date.toISOString().split("T")[0],
      price,
      storeId,
    });
  }

  return points;
}

function buildHistory(
  gameId: string,
  storeId: string,
  originalPrice: number,
  minSalePrice: number,
  opts?: Parameters<typeof generatePricePoints>[3],
): PriceHistory {
  const points = generatePricePoints(originalPrice, minSalePrice, storeId, opts);
  const prices = points.map((pt) => pt.price);
  return {
    gameId,
    storeId,
    points,
    allTimeLow: Math.min(...prices),
    allTimeHigh: Math.max(...prices),
    averagePrice: Math.round((prices.reduce((a, b) => a + b, 0) / prices.length) * 100) / 100,
  };
}

// ─── Featured Game Histories (15 games) ──────────────────────

export const mockPriceHistories: PriceHistory[] = [
  // g1 — Elden Ring — Originally $59.99, sale low ~$29.99
  buildHistory("g1", "s1", 59.99, 29.99, {
    saleProbability: 0.12,
    saleDepth: 0.4,
    trendDown: 0.08,
  }),

  // g2 — Cyberpunk 2077 — Originally $59.99, sale low ~$19.99
  buildHistory("g2", "s1", 59.99, 19.99, {
    saleProbability: 0.18,
    saleDepth: 0.55,
    trendDown: 0.12,
  }),

  // g3 — Baldur's Gate 3 — Originally $59.99, sale low ~$47.99
  buildHistory("g3", "s1", 59.99, 47.99, {
    saleProbability: 0.08,
    saleDepth: 0.15,
    trendDown: 0.03,
  }),

  // g5 — Red Dead Redemption 2 — Originally $59.99, sale low ~$14.99
  buildHistory("g5", "s1", 59.99, 14.99, {
    saleProbability: 0.2,
    saleDepth: 0.6,
    trendDown: 0.15,
  }),

  // g6 — The Witcher 3 — Originally $39.99, sale low ~$7.99
  buildHistory("g6", "s2", 39.99, 7.99, {
    saleProbability: 0.22,
    saleDepth: 0.65,
    trendDown: 0.1,
  }),

  // g7 — God of War — Originally $49.99, sale low ~$14.99
  buildHistory("g7", "s1", 49.99, 14.99, {
    saleProbability: 0.16,
    saleDepth: 0.5,
    trendDown: 0.1,
  }),

  // g8 — Hogwarts Legacy — Originally $59.99, sale low ~$24.99
  buildHistory("g8", "s1", 59.99, 24.99, {
    saleProbability: 0.14,
    saleDepth: 0.45,
    trendDown: 0.08,
  }),

  // g11 — Resident Evil 4 — Originally $59.99, sale low ~$22.99
  buildHistory("g11", "s1", 59.99, 22.99, {
    saleProbability: 0.15,
    saleDepth: 0.5,
    trendDown: 0.1,
  }),

  // g17 — Dead Space Remake — Originally $59.99, sale low ~$19.99
  buildHistory("g17", "s1", 59.99, 19.99, {
    saleProbability: 0.18,
    saleDepth: 0.55,
    trendDown: 0.12,
  }),

  // g26 — Hades — Originally $24.99, sale low ~$8.49
  buildHistory("g26", "s1", 24.99, 8.49, {
    saleProbability: 0.2,
    saleDepth: 0.55,
    trendDown: 0.04,
  }),

  // g28 — Hollow Knight — Originally $14.99, sale low ~$4.99
  buildHistory("g28", "s1", 14.99, 4.99, {
    saleProbability: 0.22,
    saleDepth: 0.55,
    trendDown: 0.03,
  }),

  // g29 — Stardew Valley — Originally $14.99, sale low ~$8.99
  buildHistory("g29", "s1", 14.99, 8.99, {
    saleProbability: 0.1,
    saleDepth: 0.35,
    trendDown: 0.02,
  }),

  // g32 — Disco Elysium — Originally $39.99, sale low ~$7.99
  buildHistory("g32", "s2", 39.99, 7.99, {
    saleProbability: 0.22,
    saleDepth: 0.65,
    trendDown: 0.12,
  }),

  // g39 — Subnautica — Originally $29.99, sale low ~$7.49
  buildHistory("g39", "s1", 29.99, 7.49, {
    saleProbability: 0.2,
    saleDepth: 0.6,
    trendDown: 0.06,
  }),

  // g50 — Hi-Fi Rush — Originally $29.99, sale low ~$11.99
  buildHistory("g50", "s1", 29.99, 11.99, {
    saleProbability: 0.16,
    saleDepth: 0.5,
    trendDown: 0.06,
  }),
];
