// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { mountApp } from "../panel/src/app.ts";
import type { Delivery, Snapshot } from "../panel/src/types.ts";

const delivery = (id: string, title: string, status: Delivery["status"], updatedAt: string): Delivery => ({
  id,
  title,
  tier: "quick",
  playbook: "fix-bug",
  phase: status === "closed" ? "close" : "build",
  status,
  outcome: `${title} outcome`,
  doneWhen: `${title} check passes`,
  skills: ["debug"],
  skipped: [],
  tasks: [
    {
      id: "tsk_1",
      title: "reproduce",
      status: "done",
      check: "pnpm test",
      evidenceId: "ev_1",
      artifact: null,
      createdAt: updatedAt,
      updatedAt,
    },
  ],
  evidence: [
    {
      id: "ev_1",
      claim: `${title} reproduces`,
      check: "pnpm test",
      result: "passed",
      artifact: null,
      createdAt: updatedAt,
    },
  ],
  decisions: [],
  handoffs: [],
  createdAt: updatedAt,
  updatedAt,
  closedAt: status === "closed" ? updatedAt : null,
});

const snapshot = (): Snapshot => ({
  present: true,
  stateText: JSON.stringify({
    schemaVersion: 1,
    revision: 4,
    createdAt: "2026-11-05T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z",
    delivery: delivery("dlv_2", "Current work", "active", "2026-11-05T10:00:00.000Z"),
  }),
  historyText: "",
  archives: [
    {
      name: "dlv_1.json",
      text: JSON.stringify(delivery("dlv_1", "Old work", "closed", "2026-11-04T10:00:00.000Z")),
    },
  ],
});

function mount(read: () => Promise<Snapshot>) {
  const root = document.createElement("div");
  document.body.append(root);
  const app = mountApp(root, { read, view: "deliveries" });
  return { root, app };
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("deliveries view", () => {
  it("renders seven tabs and both active and archived deliveries", async () => {
    const { root, app } = mount(async () => snapshot());
    await app.refresh();

    expect(root.querySelectorAll("[data-view]")).toHaveLength(7);
    expect(root.textContent).toContain("Deliveries");
    expect(root.textContent).toContain("Current work");
    expect(root.textContent).toContain("Old work");
    expect(root.textContent).toContain("Closed");

    const oldRow = root.querySelector<HTMLElement>('[data-delivery="dlv_1"]');
    expect(oldRow).not.toBeNull();
    oldRow!.click();
    expect(root.querySelector(".selected")?.textContent).toContain("Old work");
    app.destroy();
  });

  it("renders missing state without inventing a delivery", async () => {
    const { root, app } = mount(async () => ({
      present: false,
      stateText: null,
      historyText: null,
      archives: [],
    }));
    await app.refresh();

    expect(root.textContent).toContain("No vstack state");
    expect(root.textContent).not.toContain("Current work");
    app.destroy();
  });

  it("refuses to render a newer schema", async () => {
    const { root, app } = mount(async () => ({
      ...snapshot(),
      stateText: JSON.stringify({ schemaVersion: 2, revision: 1, createdAt: "x", updatedAt: "x", delivery: null }),
    }));
    await app.refresh();

    expect(root.textContent).toContain("Incompatible");
    expect(root.textContent).not.toContain("Current work");
    app.destroy();
  });
});
