import { describe, it, expect, beforeEach } from "vitest";
import { useAlertsStore } from "../alerts-store";

describe("alerts store", () => {
  beforeEach(() => {
    useAlertsStore.setState({ alerts: [] });
  });

  it("adds an alert", () => {
    useAlertsStore.getState().addAlert({
      gameId: "g1",
      targetPrice: 25,
      currentPrice: 35.99,
      status: "active",
      channels: ["email", "in-app"],
    });
    expect(useAlertsStore.getState().alerts).toHaveLength(1);
  });

  it("removes an alert", () => {
    useAlertsStore.getState().addAlert({
      gameId: "g1",
      targetPrice: 25,
      currentPrice: 35.99,
      status: "active",
      channels: ["in-app"],
    });
    const alert = useAlertsStore.getState().alerts[0];
    useAlertsStore.getState().removeAlert(alert.id);
    expect(useAlertsStore.getState().alerts).toHaveLength(0);
  });

  it("toggles alert status", () => {
    useAlertsStore.getState().addAlert({
      gameId: "g1",
      targetPrice: 25,
      currentPrice: 35.99,
      status: "active",
      channels: ["in-app"],
    });
    const alert = useAlertsStore.getState().alerts[0];
    useAlertsStore.getState().toggleAlertStatus(alert.id);
    expect(useAlertsStore.getState().alerts[0].status).toBe("paused");
    useAlertsStore.getState().toggleAlertStatus(alert.id);
    expect(useAlertsStore.getState().alerts[0].status).toBe("active");
  });
});
