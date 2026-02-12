import type { PricePrediction } from "@/lib/types";

export const mockPredictions: PricePrediction[] = [
  // g1 - Elden Ring (bestPrice: 35.99)
  {
    gameId: "g1",
    predictions: [
      { days: 7, predictedPrice: 34.99, confidence: 78, dropProbability: 45 },
      { days: 14, predictedPrice: 32.99, confidence: 72, dropProbability: 55 },
      { days: 30, predictedPrice: 29.99, confidence: 65, dropProbability: 68 },
      { days: 90, predictedPrice: 24.99, confidence: 52, dropProbability: 80 },
    ],
    recommendation: "wait",
    reasoning:
      "Elden Ring frequently drops during seasonal sales. A major Steam sale is expected within 30 days, and historical data suggests a price around $29.99. Consider waiting for a deeper discount.",
    lastUpdated: "2026-02-11T14:30:00Z",
  },
  // g2 - Cyberpunk 2077 (bestPrice: 29.99)
  {
    gameId: "g2",
    predictions: [
      { days: 7, predictedPrice: 29.99, confidence: 88, dropProbability: 15 },
      { days: 14, predictedPrice: 27.99, confidence: 80, dropProbability: 35 },
      { days: 30, predictedPrice: 24.99, confidence: 74, dropProbability: 55 },
      { days: 90, predictedPrice: 19.99, confidence: 60, dropProbability: 72 },
    ],
    recommendation: "buy",
    reasoning:
      "Current price of $29.99 is close to the historical low. While deeper discounts are possible in 90 days, this is a solid deal right now. Buy if you want to play soon.",
    lastUpdated: "2026-02-11T10:15:00Z",
  },
  // g3 - Baldur's Gate 3 (bestPrice: 53.99)
  {
    gameId: "g3",
    predictions: [
      { days: 7, predictedPrice: 53.99, confidence: 92, dropProbability: 8 },
      { days: 14, predictedPrice: 49.99, confidence: 68, dropProbability: 30 },
      { days: 30, predictedPrice: 44.99, confidence: 55, dropProbability: 48 },
      { days: 90, predictedPrice: 39.99, confidence: 42, dropProbability: 62 },
    ],
    recommendation: "strong-wait",
    reasoning:
      "Baldur's Gate 3 rarely goes on deep sale and is currently near full price. The 10% discount is minimal. Wait for a larger seasonal sale to get better value — a 25-30% drop is likely within 90 days.",
    lastUpdated: "2026-02-10T22:00:00Z",
  },
  // g4 - Starfield (bestPrice: 34.99)
  {
    gameId: "g4",
    predictions: [
      { days: 7, predictedPrice: 34.99, confidence: 85, dropProbability: 12 },
      { days: 14, predictedPrice: 32.99, confidence: 76, dropProbability: 35 },
      { days: 30, predictedPrice: 29.99, confidence: 68, dropProbability: 52 },
      { days: 90, predictedPrice: 24.99, confidence: 58, dropProbability: 70 },
    ],
    recommendation: "wait",
    reasoning:
      "Starfield has been trending downward in price since launch. Bethesda titles tend to see aggressive discounts after 12+ months. A sub-$30 price is very likely within 30 days.",
    lastUpdated: "2026-02-11T08:45:00Z",
  },
  // g5 - Red Dead Redemption 2 (bestPrice: 19.99)
  {
    gameId: "g5",
    predictions: [
      { days: 7, predictedPrice: 19.99, confidence: 90, dropProbability: 10 },
      { days: 14, predictedPrice: 19.99, confidence: 86, dropProbability: 15 },
      { days: 30, predictedPrice: 17.99, confidence: 70, dropProbability: 40 },
      { days: 90, predictedPrice: 14.99, confidence: 55, dropProbability: 58 },
    ],
    recommendation: "strong-buy",
    reasoning:
      "At $19.99, RDR2 is at its historical low price point. This title rarely dips below $20. Our model shows high confidence this is the best price you will see in the next two weeks. Strong buy recommendation.",
    lastUpdated: "2026-02-12T06:00:00Z",
  },
  // g6 - The Witcher 3 (bestPrice: 9.99)
  {
    gameId: "g6",
    predictions: [
      { days: 7, predictedPrice: 9.99, confidence: 95, dropProbability: 5 },
      { days: 14, predictedPrice: 9.99, confidence: 92, dropProbability: 8 },
      { days: 30, predictedPrice: 9.99, confidence: 88, dropProbability: 12 },
      { days: 90, predictedPrice: 7.99, confidence: 45, dropProbability: 30 },
    ],
    recommendation: "strong-buy",
    reasoning:
      "The Witcher 3 at $9.99 is at its all-time historical low. This price matches major sale events. Our model shows 95% confidence this will not drop further in the short term. Buy now with confidence.",
    lastUpdated: "2026-02-12T07:30:00Z",
  },
  // g7 - God of War (bestPrice: 19.99)
  {
    gameId: "g7",
    predictions: [
      { days: 7, predictedPrice: 19.99, confidence: 87, dropProbability: 12 },
      { days: 14, predictedPrice: 17.99, confidence: 75, dropProbability: 32 },
      { days: 30, predictedPrice: 14.99, confidence: 62, dropProbability: 50 },
      { days: 90, predictedPrice: 12.99, confidence: 48, dropProbability: 65 },
    ],
    recommendation: "buy",
    reasoning:
      "God of War at $19.99 is a great value. While slightly deeper discounts are possible in the future, the current price is within 15% of its historical low. A solid buy for action-adventure fans.",
    lastUpdated: "2026-02-11T16:00:00Z",
  },
  // g8 - Hogwarts Legacy (bestPrice: 29.99)
  {
    gameId: "g8",
    predictions: [
      { days: 7, predictedPrice: 29.99, confidence: 82, dropProbability: 18 },
      { days: 14, predictedPrice: 27.99, confidence: 72, dropProbability: 38 },
      { days: 30, predictedPrice: 24.99, confidence: 64, dropProbability: 55 },
      { days: 90, predictedPrice: 19.99, confidence: 50, dropProbability: 70 },
    ],
    recommendation: "buy",
    reasoning:
      "Hogwarts Legacy is currently at 50% off, which is a fair deal. Deeper discounts are possible during major sales, but this is a reasonable entry point. Buy if you are interested.",
    lastUpdated: "2026-02-10T20:15:00Z",
  },
  // g9 - GTA V (bestPrice: 14.99)
  {
    gameId: "g9",
    predictions: [
      { days: 7, predictedPrice: 14.99, confidence: 91, dropProbability: 8 },
      { days: 14, predictedPrice: 14.99, confidence: 88, dropProbability: 12 },
      { days: 30, predictedPrice: 12.99, confidence: 65, dropProbability: 35 },
      { days: 90, predictedPrice: 9.99, confidence: 50, dropProbability: 50 },
    ],
    recommendation: "strong-buy",
    reasoning:
      "GTA V at $14.99 with GTA Online included is an exceptional value. This mature title has stabilized at this price floor. With GTA VI on the horizon, this is unlikely to go much lower. Strong buy.",
    lastUpdated: "2026-02-12T09:00:00Z",
  },
  // g10 - Spider-Man Remastered (bestPrice: 29.99)
  {
    gameId: "g10",
    predictions: [
      { days: 7, predictedPrice: 29.99, confidence: 84, dropProbability: 15 },
      { days: 14, predictedPrice: 27.49, confidence: 73, dropProbability: 35 },
      { days: 30, predictedPrice: 24.99, confidence: 65, dropProbability: 50 },
      { days: 90, predictedPrice: 19.99, confidence: 52, dropProbability: 65 },
    ],
    recommendation: "buy",
    reasoning:
      "Spider-Man Remastered at 50% off is a solid deal. PlayStation PC ports tend to see gradual price drops. If you can wait 90 days, a better deal is possible, but the current price is fair.",
    lastUpdated: "2026-02-11T12:30:00Z",
  },
  // g11 - Resident Evil 4 (bestPrice: 27.99)
  {
    gameId: "g11",
    predictions: [
      { days: 7, predictedPrice: 27.99, confidence: 80, dropProbability: 20 },
      { days: 14, predictedPrice: 25.99, confidence: 72, dropProbability: 40 },
      { days: 30, predictedPrice: 22.99, confidence: 63, dropProbability: 58 },
      { days: 90, predictedPrice: 19.99, confidence: 55, dropProbability: 72 },
    ],
    recommendation: "buy",
    reasoning:
      "RE4 Remake at 53% off is a strong deal. Capcom titles often see steady discounts after 12 months. The current price is within 20% of the expected 90-day low. Good time to buy.",
    lastUpdated: "2026-02-11T18:45:00Z",
  },
  // g12 - Diablo IV (bestPrice: 34.99)
  {
    gameId: "g12",
    predictions: [
      { days: 7, predictedPrice: 34.99, confidence: 83, dropProbability: 15 },
      { days: 14, predictedPrice: 31.99, confidence: 70, dropProbability: 38 },
      { days: 30, predictedPrice: 27.99, confidence: 60, dropProbability: 55 },
      { days: 90, predictedPrice: 22.99, confidence: 48, dropProbability: 72 },
    ],
    recommendation: "wait",
    reasoning:
      "Diablo IV has been on a consistent downward trend. Blizzard frequently discounts during Battle.net sales. Waiting 30 days could save you an additional $7-10. Consider holding off.",
    lastUpdated: "2026-02-10T15:00:00Z",
  },
  // g13 - Lies of P (bestPrice: 29.99)
  {
    gameId: "g13",
    predictions: [
      { days: 7, predictedPrice: 29.99, confidence: 86, dropProbability: 12 },
      { days: 14, predictedPrice: 27.99, confidence: 74, dropProbability: 30 },
      { days: 30, predictedPrice: 24.99, confidence: 65, dropProbability: 48 },
      { days: 90, predictedPrice: 19.99, confidence: 52, dropProbability: 65 },
    ],
    recommendation: "buy",
    reasoning:
      "Lies of P at 50% off is a good deal for a well-reviewed souls-like. With DLC announced, publisher may maintain current pricing. Buy now if the genre appeals to you.",
    lastUpdated: "2026-02-11T11:00:00Z",
  },
  // g14 - Alan Wake 2 (bestPrice: 39.99)
  {
    gameId: "g14",
    predictions: [
      { days: 7, predictedPrice: 39.99, confidence: 88, dropProbability: 10 },
      { days: 14, predictedPrice: 37.99, confidence: 72, dropProbability: 28 },
      { days: 30, predictedPrice: 34.99, confidence: 60, dropProbability: 45 },
      { days: 90, predictedPrice: 29.99, confidence: 48, dropProbability: 62 },
    ],
    recommendation: "wait",
    reasoning:
      "Alan Wake 2 is relatively new and only at 33% off. Remedy titles tend to see deeper discounts after 6 months. A sub-$30 price is likely within 90 days. Patient gamers should wait.",
    lastUpdated: "2026-02-10T09:30:00Z",
  },
  // g15 - Armored Core VI (bestPrice: 34.99)
  {
    gameId: "g15",
    predictions: [
      { days: 7, predictedPrice: 34.99, confidence: 84, dropProbability: 14 },
      { days: 14, predictedPrice: 32.99, confidence: 74, dropProbability: 32 },
      { days: 30, predictedPrice: 29.99, confidence: 66, dropProbability: 50 },
      { days: 90, predictedPrice: 24.99, confidence: 54, dropProbability: 68 },
    ],
    recommendation: "wait",
    reasoning:
      "Armored Core VI is following a typical FromSoftware price decay curve. A deeper discount to $29.99 is expected within 30 days during the next platform sale event.",
    lastUpdated: "2026-02-11T13:15:00Z",
  },
];
