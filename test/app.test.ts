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

const snapshot = (overrides: Partial<Snapshot> = {}): Snapshot => ({
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
  ...overrides,
});

function mount(read: () => Promise<Snapshot>, view: "now" | "plan" | "evidence" | "timeline" | "decisions" | "deliveries" | "health" = "deliveries") {
  const root = document.createElement("div");
  document.body.append(root);
  const app = mountApp(root, { read, view });
  return { root, app };
}

const stateText = (value: Delivery | null, revision = 4): string =>
  JSON.stringify({
    schemaVersion: 1,
    revision,
    createdAt: "2026-11-05T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z",
    delivery: value,
  });

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

  it("still lists archived deliveries when state.json is broken", async () => {
    const { root, app } = mount(async () => snapshot({ stateText: "{not json" }));
    await app.refresh();

    expect(root.textContent).toContain("Old work");
    expect(root.textContent).toContain("Invalid");
    app.destroy();
  });
});

describe("view content", () => {
  it("shows the handoff next action in Now", async () => {
    const current = delivery("dlv_2", "Current work", "active", "2026-11-05T10:00:00.000Z");
    current.handoffs = [
      {
        id: "hnd_1",
        state: "half done",
        nextAction: "run the repro",
        blockers: ["staging down"],
        treeStatus: "dirty",
        createdAt: "2026-11-05T10:00:00.000Z",
      },
    ];
    const { root, app } = mount(async () => snapshot({ stateText: stateText(current) }), "now");
    await app.refresh();

    expect(root.textContent).toContain("Next action");
    expect(root.textContent).toContain("run the repro");
    app.destroy();
  });

  it("groups evidence by task and shows a task with no evidence as not run", async () => {
    const current = delivery("dlv_2", "Current work", "active", "2026-11-05T10:00:00.000Z");
    current.tasks.push({
      id: "tsk_2",
      title: "follow up",
      status: "todo",
      check: "pnpm test",
      evidenceId: null,
      artifact: null,
      createdAt: "2026-11-05T10:00:00.000Z",
      updatedAt: "2026-11-05T10:00:00.000Z",
    });
    const { root, app } = mount(async () => snapshot({ stateText: stateText(current) }), "evidence");
    await app.refresh();

    expect(root.textContent).toContain("reproduce");
    expect(root.textContent).toContain("follow up");
    expect(root.textContent).toContain("not run");
    app.destroy();
  });

  it("shows the close waiver in Decisions", async () => {
    const current = delivery("dlv_2", "Current work", "closed", "2026-11-05T10:00:00.000Z");
    current.close = {
      recordPath: ".vstack/deliveries/dlv_2.md",
      summary: "done",
      waiver: { reason: "vendor image unavailable", owner: "owner" },
      closedAt: "2026-11-05T10:00:00.000Z",
    };
    const { root, app } = mount(async () => snapshot({ stateText: stateText(current) }), "decisions");
    await app.refresh();

    expect(root.textContent).toContain("vendor image unavailable");
    expect(root.textContent).toContain("Waiver");
    app.destroy();
  });

  it("renders fifty archived deliveries under 300 ms", async () => {
    const archives = Array.from({ length: 50 }, (_, index) => {
      const item = delivery(`dlv_${index}`, `Archived ${index}`, "closed", `2026-11-0${(index % 5) + 1}T10:00:00.000Z`);
      return { name: `dlv_${index}.json`, text: JSON.stringify(item) };
    });
    const { root, app } = mount(async () => snapshot({ stateText: stateText(null), archives, historyText: "" }));
    const started = performance.now();
    await app.refresh();
    const elapsed = performance.now() - started;
    expect(root.querySelectorAll("[data-delivery]")).toHaveLength(50);
    expect(elapsed).toBeLessThan(300);
    app.destroy();
  });

  it("offers start only for todo/blocked and no command for done", async () => {
    const current = delivery("dlv_2", "Current work", "active", "2026-11-05T10:00:00.000Z");
    current.tasks.push({
      id: "tsk_2",
      title: "follow up",
      status: "todo",
      check: "pnpm test",
      evidenceId: null,
      artifact: null,
      createdAt: "2026-11-05T10:00:00.000Z",
      updatedAt: "2026-11-05T10:00:00.000Z",
    });
    const { root, app } = mount(async () => snapshot({ stateText: stateText(current) }), "plan");
    await app.refresh();

    const commands = [...root.querySelectorAll<HTMLElement>("[data-copy]")].map((node) => node.dataset.copy);
    expect(commands.some((command) => command?.includes('"action":"start"'))).toBe(true);
    expect(commands.some((command) => command?.includes('"action":"complete"'))).toBe(false);
    app.destroy();
  });
});
