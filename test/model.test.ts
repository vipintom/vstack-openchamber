import { describe, expect, it } from "vitest";
import {
  evaluateHealth,
  mergeDeliveries,
  parseArchives,
  parseHistory,
  parseState,
  taskEvidence,
} from "../panel/src/model.ts";
import type { Delivery } from "../panel/src/types.ts";

const delivery = (overrides: Partial<Delivery> = {}): Delivery => ({
  id: "dlv_1",
  title: "Fix flaky test",
  tier: "quick",
  playbook: "fix-bug",
  phase: "build",
  status: "active",
  outcome: "Suite passes",
  doneWhen: "Ten green runs",
  skills: ["debug"],
  skipped: [],
  tasks: [
    {
      id: "tsk_1",
      title: "Reproduce",
      status: "done",
      check: "pnpm test -- retry",
      evidenceId: "ev_1",
      artifact: null,
      createdAt: "2026-11-05T10:00:00.000Z",
      updatedAt: "2026-11-05T10:00:00.000Z",
    },
  ],
  evidence: [
    {
      id: "ev_1",
      claim: "Failure reproduces",
      check: "pnpm test -- retry",
      result: "passed",
      artifact: null,
      createdAt: "2026-11-05T10:00:00.000Z",
    },
  ],
  decisions: [],
  handoffs: [],
  createdAt: "2026-11-05T10:00:00.000Z",
  updatedAt: "2026-11-05T10:00:00.000Z",
  closedAt: null,
  ...overrides,
});

const state = (overrides: Record<string, unknown> = {}) => ({
  schemaVersion: 1,
  revision: 3,
  createdAt: "2026-11-05T10:00:00.000Z",
  updatedAt: "2026-11-05T10:00:00.000Z",
  delivery: delivery(),
  ...overrides,
});

const healthy = (overrides: Partial<Parameters<typeof evaluateHealth>[0]> = {}) =>
  evaluateHealth({
    present: true,
    state: state() as never,
    stateError: null,
    events: [],
    historyError: null,
    archiveErrors: [],
    ...overrides,
  });

describe("state parsing", () => {
  it("accepts a valid state", () => {
    const parsed = parseState(JSON.stringify(state()));
    expect(parsed.ok).toBe(true);
  });

  it("reports a newer schema as incompatible", () => {
    const parsed = parseState(JSON.stringify(state({ schemaVersion: 2 })));
    expect(parsed.ok).toBe(false);
    if (!parsed.ok) expect(parsed.kind).toBe("incompatible");
  });

  it("rejects malformed state", () => {
    const parsed = parseState("{not json");
    expect(parsed.ok).toBe(false);
    if (!parsed.ok) expect(parsed.kind).toBe("invalid");
  });
});

describe("health", () => {
  it("is missing when there is no .vstack directory", () => {
    expect(healthy({ present: false }).state).toBe("missing");
  });

  it("is incompatible for a newer schema", () => {
    expect(
      healthy({
        state: null,
        stateError: { ok: false, kind: "incompatible", message: "schema 2" },
      }).state
    ).toBe("incompatible");
  });

  it("is invalid when history is broken", () => {
    expect(
      healthy({
        historyError: { ok: false, kind: "invalid", message: "line 1 is not JSON" },
      }).state
    ).toBe("invalid");
  });

  it("is stale when history is newer than state", () => {
    expect(
      healthy({
        events: [{ ts: "2026-11-05T11:00:00.000Z", type: "task.added", deliveryId: "dlv_1", data: {} }],
      }).state
    ).toBe("stale");
  });

  it("is healthy when the last event has the current revision", () => {
    expect(
      healthy({
        events: [
          {
            ts: "2026-11-05T10:00:00.001Z",
            type: "task.added",
            deliveryId: "dlv_1",
            data: {},
            revision: 3,
            seq: 0,
            prevHash: null,
            hash: "abc",
          },
        ],
      }).state
    ).toBe("healthy");
  });

  it("is stale when history is behind the state revision", () => {
    expect(
      healthy({
        events: [
          {
            ts: "2026-11-05T10:00:00.001Z",
            type: "task.added",
            deliveryId: "dlv_1",
            data: {},
            revision: 2,
            seq: 0,
            prevHash: null,
            hash: "abc",
          },
        ],
      }).state
    ).toBe("stale");
  });

  it("is healthy when state and history agree", () => {
    expect(healthy().state).toBe("healthy");
  });
});

describe("deliveries view", () => {
  it("merges archives and the active delivery without duplicates", () => {
    const closed = delivery({ id: "dlv_2", status: "closed", title: "Old work" });
    const merged = mergeDeliveries(state({ delivery: delivery() }) as never, [closed, delivery()]);
    expect(merged.map((item) => item.id)).toEqual(["dlv_1", "dlv_2"]);
  });

  it("prefers the current state over an older parked archive", () => {
    const current = delivery({ title: "Resumed work", status: "active" });
    const parked = delivery({ title: "Parked copy", status: "parked" });
    const merged = mergeDeliveries(state({ delivery: current }) as never, [parked]);
    expect(merged).toHaveLength(1);
    expect(merged[0]!.title).toBe("Resumed work");
  });

  it("shows a task without evidence as not run", () => {
    const item = delivery({
      evidence: [],
      tasks: [{ ...delivery().tasks[0]!, evidenceId: null }],
    });
    expect(taskEvidence(item, item.tasks[0]!)).toBe("not run");
  });

  it("reports malformed archive files without inventing a delivery", () => {
    const parsed = parseArchives([{ name: "bad.json", text: "{" }]);
    expect(parsed.deliveries).toHaveLength(0);
    expect(parsed.errors).toHaveLength(1);
  });
});

describe("history parsing", () => {
  it("reads append-only JSON lines in order", () => {
    const parsed = parseHistory(
      '{"ts":"2026-11-05T10:00:00.000Z","type":"delivery.opened","deliveryId":"dlv_1","data":{}}\n' +
        '{"ts":"2026-11-05T10:01:00.000Z","type":"task.added","deliveryId":"dlv_1","data":{"id":"tsk_1"}}\n'
    );
    expect(parsed.ok).toBe(true);
    if (parsed.ok) expect(parsed.value).toHaveLength(2);
  });
});
