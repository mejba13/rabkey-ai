export const springPresets = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
  default: { type: "spring" as const, stiffness: 200, damping: 25 },
  smooth: { type: "spring" as const, stiffness: 150, damping: 20 },
  gentle: { type: "spring" as const, stiffness: 100, damping: 15 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
};
