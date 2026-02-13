export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: string;
  category: "deals" | "guides" | "news" | "tips";
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "steam-winter-sale-2024-best-deals",
    title: "Steam Winter Sale 2024: Top 25 Best Deals According to AI",
    excerpt: "Our AI analyzed every deal in the Steam Winter Sale. Here are the 25 games with the highest Deal Scores — some are at historical low prices you won't want to miss.",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop&q=80",
    author: { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80" },
    publishedAt: "2024-12-20",
    readingTime: "8 min read",
    category: "deals",
    tags: ["Steam", "Sale", "Winter Sale", "Best Deals"],
  },
  {
    id: "blog-2",
    slug: "how-deal-scores-work",
    title: "How Our AI Deal Scores Work: A Deep Dive",
    excerpt: "Ever wondered how GrabKey AI rates deals from 0-100? We break down the 7 weighted factors behind every Deal Score and explain what makes a 'Legendary' deal.",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop&q=80",
    author: { name: "Sarah Kim", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80" },
    publishedAt: "2024-12-15",
    readingTime: "6 min read",
    category: "guides",
    tags: ["AI", "Deal Score", "How It Works"],
  },
  {
    id: "blog-3",
    slug: "grey-market-keys-safe",
    title: "Are Grey Market Game Keys Safe? A Comprehensive Guide",
    excerpt: "We analyze key revocation rates, customer complaints, and trust signals across grey market sellers to help you make informed purchasing decisions.",
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop&q=80",
    author: { name: "Mike Torres", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80" },
    publishedAt: "2024-12-10",
    readingTime: "10 min read",
    category: "guides",
    tags: ["Grey Market", "Safety", "Trust", "Keys"],
  },
  {
    id: "blog-4",
    slug: "best-game-deals-january-2025",
    title: "Best Game Deals This Week: January 2025 Roundup",
    excerpt: "Elden Ring at $29.99, Cyberpunk 2077 at $19.99, and more. Our weekly roundup of the top deals across all platforms with AI-verified scores.",
    coverImage: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=450&fit=crop&q=80",
    author: { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80" },
    publishedAt: "2025-01-06",
    readingTime: "5 min read",
    category: "deals",
    tags: ["Weekly Deals", "Roundup", "Best Prices"],
  },
  {
    id: "blog-5",
    slug: "save-money-game-keys-tips",
    title: "10 Pro Tips to Save Money on Game Keys in 2025",
    excerpt: "From setting smart price alerts to understanding seasonal sale patterns, here are 10 strategies that saved our community over $12M last year.",
    coverImage: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=450&fit=crop&q=80",
    author: { name: "Sarah Kim", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80" },
    publishedAt: "2025-01-02",
    readingTime: "7 min read",
    category: "tips",
    tags: ["Tips", "Saving Money", "Strategy"],
  },
  {
    id: "blog-6",
    slug: "game-awards-2024-price-tracker",
    title: "The Game Awards 2024 Winners: Current Best Prices",
    excerpt: "Every Game Awards 2024 winner and nominee with current best prices, deal scores, and price predictions. Find out which award winners are worth buying right now.",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop&q=80",
    author: { name: "Mike Torres", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80" },
    publishedAt: "2024-12-13",
    readingTime: "9 min read",
    category: "news",
    tags: ["Game Awards", "2024", "Winners", "Prices"],
  },
];
