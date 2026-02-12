export type BuyWaitRecommendation = "strong-buy" | "buy" | "wait" | "strong-wait";

export interface PricePrediction {
  gameId: string;
  predictions: {
    days: 7 | 14 | 30 | 90;
    predictedPrice: number;
    confidence: number; // 0-100
    dropProbability: number; // 0-100
  }[];
  recommendation: BuyWaitRecommendation;
  reasoning: string;
  lastUpdated: string;
}
