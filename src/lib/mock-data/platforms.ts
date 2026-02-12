export interface PlatformInfo {
  id: string;
  name: string;
  shortName: string;
  icon: string; // Lucide icon name for reference
  color: string; // Tailwind color class
}

export const platforms: PlatformInfo[] = [
  { id: "pc", name: "PC (Windows)", shortName: "PC", icon: "Monitor", color: "text-gaming-blue" },
  { id: "playstation", name: "PlayStation", shortName: "PS5", icon: "Gamepad2", color: "text-blue-500" },
  { id: "xbox", name: "Xbox", shortName: "Xbox", icon: "Gamepad", color: "text-green-500" },
  { id: "nintendo", name: "Nintendo Switch", shortName: "Switch", icon: "Smartphone", color: "text-red-500" },
];

export const platformMap = new Map(platforms.map(p => [p.id, p]));
