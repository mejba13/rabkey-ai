import type { User } from "@/stores/auth-store";

/**
 * Seed credentials for demo/development.
 *
 * Admin:  admin@grabkey.ai  / admin123
 * User:   user@grabkey.ai   / user123
 */

interface SeedEntry {
  email: string;
  password: string;
  user: User;
}

export const seedUsers: SeedEntry[] = [
  {
    email: "admin@grabkey.ai",
    password: "admin123",
    user: {
      id: "admin-1",
      name: "Admin",
      email: "admin@grabkey.ai",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&q=80",
      role: "admin",
      tier: "ultimate",
      joinedAt: "2024-01-15T00:00:00.000Z",
    },
  },
  {
    email: "user@grabkey.ai",
    password: "user123",
    user: {
      id: "user-1",
      name: "Demo User",
      email: "user@grabkey.ai",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&q=80",
      role: "user",
      tier: "pro",
      joinedAt: "2024-06-01T00:00:00.000Z",
    },
  },
];

/** Look up a seed user by email + password. Returns the User or null. */
export function authenticateSeedUser(
  email: string,
  password: string
): User | null {
  const entry = seedUsers.find(
    (s) => s.email.toLowerCase() === email.toLowerCase() && s.password === password
  );
  return entry?.user ?? null;
}
