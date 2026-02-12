export interface FeaturedCollection {
  id: string;
  title: string;
  subtitle: string;
  gameIds: string[];
  gradient: string; // Tailwind gradient classes
  icon: string; // Lucide icon name
}

export const featuredCollections: FeaturedCollection[] = [
  {
    id: "col-1",
    title: "Under $10",
    subtitle: "Amazing games at incredible prices",
    gameIds: ["g6", "g28", "g29", "g30", "g36", "g37", "g38", "g43", "g44"],
    gradient: "from-gaming-teal to-gaming-blue",
    icon: "DollarSign",
  },
  {
    id: "col-2",
    title: "Best of Open World",
    subtitle: "Explore vast worlds without limits",
    gameIds: ["g1", "g2", "g5", "g8", "g9", "g22", "g4"],
    gradient: "from-gaming-orange to-gaming-coral",
    icon: "Globe",
  },
  {
    id: "col-3",
    title: "Indie Gems",
    subtitle: "Hidden masterpieces from independent studios",
    gameIds: ["g26", "g27", "g28", "g29", "g32", "g33", "g37", "g45", "g47"],
    gradient: "from-gaming-purple to-[#9F67FF]",
    icon: "Gem",
  },
  {
    id: "col-4",
    title: "Souls-like Challenge",
    subtitle: "For those who never give up",
    gameIds: ["g1", "g13", "g15", "g23", "g28", "g49"],
    gradient: "from-gaming-coral to-gaming-pink",
    icon: "Swords",
  },
  {
    id: "col-5",
    title: "Co-op Adventures",
    subtitle: "Better with friends",
    gameIds: ["g1", "g4", "g12", "g16", "g21", "g30", "g40", "g42"],
    gradient: "from-gaming-gold to-gaming-orange",
    icon: "Users",
  },
  {
    id: "col-6",
    title: "Historical Low Prices",
    subtitle: "Currently at or near their cheapest ever",
    gameIds: ["g5", "g6", "g7", "g17", "g28", "g32", "g39"],
    gradient: "from-gaming-teal to-gaming-blue",
    icon: "TrendingDown",
  },
  {
    id: "col-7",
    title: "New Releases",
    subtitle: "The latest and greatest games",
    gameIds: ["g23", "g24", "g25", "g21", "g22", "g43"],
    gradient: "from-gaming-blue to-gaming-purple",
    icon: "Sparkles",
  },
  {
    id: "col-8",
    title: "90+ Deal Score",
    subtitle: "Legendary deals you can't miss",
    gameIds: ["g6", "g28", "g5", "g32", "g38", "g44"],
    gradient: "from-gaming-gold to-gaming-orange",
    icon: "Trophy",
  },
];
