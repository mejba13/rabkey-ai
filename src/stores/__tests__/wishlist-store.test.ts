import { describe, it, expect, beforeEach } from "vitest";
import { useWishlistStore } from "../wishlist-store";

describe("wishlist store", () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: [] });
  });

  it("adds an item to wishlist", () => {
    useWishlistStore.getState().addItem("g1");
    const items = useWishlistStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].gameId).toBe("g1");
  });

  it("adds item with target price", () => {
    useWishlistStore.getState().addItem("g1", 29.99);
    const item = useWishlistStore.getState().items[0];
    expect(item.targetPrice).toBe(29.99);
  });

  it("removes an item", () => {
    useWishlistStore.getState().addItem("g1");
    useWishlistStore.getState().removeItem("g1");
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });

  it("checks if item is in wishlist", () => {
    useWishlistStore.getState().addItem("g1");
    expect(useWishlistStore.getState().isInWishlist("g1")).toBe(true);
    expect(useWishlistStore.getState().isInWishlist("g99")).toBe(false);
  });

  it("updates target price", () => {
    useWishlistStore.getState().addItem("g1", 30);
    useWishlistStore.getState().updateTargetPrice("g1", 25);
    const item = useWishlistStore.getState().getItem("g1");
    expect(item?.targetPrice).toBe(25);
  });

  it("clears wishlist", () => {
    useWishlistStore.getState().addItem("g1");
    useWishlistStore.getState().addItem("g2");
    useWishlistStore.getState().clearWishlist();
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });

  it("does not add duplicate items", () => {
    useWishlistStore.getState().addItem("g1");
    useWishlistStore.getState().addItem("g1");
    expect(useWishlistStore.getState().items).toHaveLength(1);
  });
});
