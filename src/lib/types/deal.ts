export type DealTag = "Flash Sale" | "Historical Low" | "Bundle Deal" | "New Release" | "Editor's Pick" | "Trending" | "Limited Time";

export type Recommendation = "strong-buy" | "buy" | "wait" | "avoid";

export interface DealScoreBreakdown {
  historicalLowFactor: number;    // 25%
  predictionFactor: number;       // 20%
  storeTrustFactor: number;       // 15%
  priceTrendFactor: number;       // 15%
  regionCompatibility: number;    // 10%
  editionValue: number;           // 10%
  timeSensitivity: number;        // 5%
}

export interface Deal {
  id: string;
  gameId: string;
  storeId: string;
  title: string;
  coverImage: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  dealScore: number;
  scoreBreakdown: DealScoreBreakdown;
  recommendation: Recommendation;
  tags: DealTag[];
  expiresAt?: string;
  url: string;
  platform: string;
}
