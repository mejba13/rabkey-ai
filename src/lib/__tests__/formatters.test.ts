import { describe, it, expect } from "vitest";
import { formatPrice, formatDiscount, formatDate, getDealScoreTier, slugify } from "../formatters";

describe("formatPrice", () => {
  it("formats USD price correctly", () => {
    expect(formatPrice(29.99)).toBe("$29.99");
  });
  it("formats zero price", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });
  it("formats large price", () => {
    expect(formatPrice(1299.99)).toBe("$1,299.99");
  });
});

describe("formatDiscount", () => {
  it("formats discount percentage", () => {
    expect(formatDiscount(50)).toBe("-50%");
  });
  it("rounds decimal discount", () => {
    expect(formatDiscount(33.7)).toBe("-34%");
  });
});

describe("getDealScoreTier", () => {
  it("returns legendary for 90+", () => {
    expect(getDealScoreTier(95)).toBe("legendary");
    expect(getDealScoreTier(90)).toBe("legendary");
  });
  it("returns excellent for 75-89", () => {
    expect(getDealScoreTier(75)).toBe("excellent");
    expect(getDealScoreTier(89)).toBe("excellent");
  });
  it("returns good for 50-74", () => {
    expect(getDealScoreTier(50)).toBe("good");
  });
  it("returns fair for 25-49", () => {
    expect(getDealScoreTier(25)).toBe("fair");
  });
  it("returns poor for <25", () => {
    expect(getDealScoreTier(10)).toBe("poor");
  });
});

describe("slugify", () => {
  it("converts to lowercase kebab", () => {
    expect(slugify("Elden Ring")).toBe("elden-ring");
  });
  it("handles special characters", () => {
    expect(slugify("Baldur's Gate 3")).toBe("baldur-s-gate-3");
  });
});

describe("formatDate", () => {
  it("formats date string", () => {
    const result = formatDate("2024-01-15");
    expect(result).toContain("Jan");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });
});
