export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "general" | "pricing" | "security" | "features";
}

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "How does GrabKey AI find the best prices?",
    answer: "We monitor prices across 50+ authorized game key retailers in real-time. Our AI analyzes current prices, historical trends, and sale patterns to calculate a Deal Score (0-100) for every listing, helping you instantly identify the best value.",
    category: "general",
  },
  {
    id: "faq-2",
    question: "Are the game keys legitimate?",
    answer: "We list keys from both official stores (Steam, GOG, Epic, Humble Bundle, etc.) and grey market resellers. Each store has a Trust Score based on user reviews, key revocation history, and our AI verification system. We always recommend purchasing from stores with 'Excellent' or 'Good' trust ratings.",
    category: "security",
  },
  {
    id: "faq-3",
    question: "How accurate are the price predictions?",
    answer: "Our ML models achieve 85%+ accuracy on 7-day predictions and 70%+ on 30-day predictions. The predictions are based on historical price data, seasonal sale patterns, publisher behavior, and game lifecycle analysis. Confidence scores are shown alongside every prediction.",
    category: "features",
  },
  {
    id: "faq-4",
    question: "What's included in the Free plan?",
    answer: "The Free plan includes basic price comparison across all stores, up to 3 price alerts, 30-day price history charts, and community support. You can search, compare, and find deals without paying a cent.",
    category: "pricing",
  },
  {
    id: "faq-5",
    question: "Can I cancel my Pro or Ultimate subscription anytime?",
    answer: "Yes! All paid plans are month-to-month with no long-term commitment. You can cancel anytime from your Settings page, and you'll retain access until the end of your billing period.",
    category: "pricing",
  },
  {
    id: "faq-6",
    question: "How do price alerts work?",
    answer: "Set a target price for any game, and we'll monitor prices across all stores 24/7. When the price drops to your target (or below), you'll be notified instantly via email, push notification, or in-app alert — depending on your preferences.",
    category: "features",
  },
  {
    id: "faq-7",
    question: "What is a Deal Score?",
    answer: "Deal Score is our proprietary AI-powered rating from 0-100 that evaluates every deal based on 7 factors: proximity to historical low (25%), prediction comparison (20%), store trust (15%), price trend (15%), region compatibility (10%), edition value (10%), and time sensitivity (5%). Scores 90+ are 'Legendary' deals.",
    category: "features",
  },
  {
    id: "faq-8",
    question: "Do you support regional pricing?",
    answer: "Yes! We track prices across 20+ regions and currencies. Set your region in Settings to see prices in your local currency and find region-specific deals. Some stores offer significantly lower prices in certain regions.",
    category: "general",
  },
  {
    id: "faq-9",
    question: "How does the browser extension work?",
    answer: "Our Chrome extension (available on Ultimate plan) automatically checks prices when you visit a game store page, shows you if a better deal exists elsewhere, and can auto-apply available coupon codes at checkout.",
    category: "features",
  },
  {
    id: "faq-10",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, PayPal, and Apple Pay through our secure Stripe payment processor. All transactions are encrypted and PCI DSS compliant.",
    category: "pricing",
  },
];
