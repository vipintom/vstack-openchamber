import type { Delivery, Health, HistoryEvent, State, Task } from "./types.ts";

export const SUPPORTED_SCHEMA = 1;

export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; kind: "incompatible" | "invalid"; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isTask(value: unknown): value is Task {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.title) &&
    typeof value.status === "string" &&
    isString(value.check) &&
    (value.evidenceId === null || typeof value.evidenceId === "string") &&
    (value.artifact === null || typeof value.artifact === "string") &&
    isString(value.createdAt) &&
    isString(value.updatedAt)
  );
}

export function parseDelivery(value: unknown): ParseResult<Delivery> {
  if (!isRecord(value)) return { ok: false, kind: "invalid", message: "delivery is not an object" };
  if (!isString(value.id)) return { ok: false, kind: "invalid", message: "delivery.id is missing" };
  if (!isString(value.title)) return { ok: false, kind: "invalid", message: "delivery.title is missing" };
  if (!isString(value.tier)) return { ok: false, kind: "invalid", message: "delivery.tier is missing" };
  if (!isString(value.playbook)) return { ok: false, kind: "invalid", message: "delivery.playbook is missing" };
  if (!isString(value.phase)) return { ok: false, kind: "invalid", message: "delivery.phase is missing" };
  if (!isString(value.status)) return { ok: false, kind: "invalid", message: "delivery.status is missing" };
  if (!Array.isArray(value.tasks) || !value.tasks.every(isTask)) {
    return { ok: false, kind: "invalid", message: "delivery.tasks is malformed" };
  }
  if (!Array.isArray(value.evidence) || !value.evidence.every(isRecord)) {
    return { ok: false, kind: "invalid", message: "delivery.evidence is malformed" };
  }
  if (!Array.isArray(value.decisions) || !value.decisions.every(isRecord)) {
    return { ok: false, kind: "invalid", message: "delivery.decisions is malformed" };
  }
  if (!Array.isArray(value.handoffs) || !value.handoffs.every(isRecord)) {
    return { ok: false, kind: "invalid", message: "delivery.handoffs is malformed" };
  }
  if (!isString(value.createdAt) || !isString(value.updatedAt)) {
    return { ok: false, kind: "invalid", message: "delivery timestamps are missing" };
  }
  if (value.closedAt !== null && !isString(value.closedAt)) {
    return { ok: false, kind: "invalid", message: "delivery.closedAt is malformed" };
  }
  return { ok: true, value: value as unknown as Delivery };
}

export function parseState(text: string): ParseResult<State> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, kind: "invalid", message: "state.json is not valid JSON" };
  }
  if (!isRecord(parsed)) return { ok: false, kind: "invalid", message: "state is not an object" };
  if (typeof parsed.schemaVersion !== "number") {
    return { ok: false, kind: "invalid", message: "schemaVersion is missing" };
  }
  if (parsed.schemaVersion !== SUPPORTED_SCHEMA) {
    if (parsed.schemaVersion > SUPPORTED_SCHEMA) {
      return {
        ok: false,
        kind: "incompatible",
        message: `state schema ${parsed.schemaVersion} is newer than this panel reads (${SUPPORTED_SCHEMA})`,
      };
    }
    return { ok: false, kind: "invalid", message: `unknown state schema ${parsed.schemaVersion}` };
  }
  if (typeof parsed.revision !== "number") {
    return { ok: false, kind: "invalid", message: "revision is missing" };
  }
  if (!isString(parsed.createdAt) || !isString(parsed.updatedAt)) {
    return { ok: false, kind: "invalid", message: "state timestamps are missing" };
  }
  if (parsed.delivery !== null && !isRecord(parsed.delivery)) {
    return { ok: false, kind: "invalid", message: "delivery is malformed" };
  }
  if (parsed.delivery !== null) {
    const delivery = parseDelivery(parsed.delivery);
    if (!delivery.ok) return delivery;
  }
  return { ok: true, value: parsed as unknown as State };
}

export function parseHistory(text: string): ParseResult<HistoryEvent[]> {
  const events: HistoryEvent[] = [];
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  for (const [index, line] of lines.entries()) {
    let value: unknown;
    try {
      value = JSON.parse(line);
    } catch {
      return { ok: false, kind: "invalid", message: `history line ${index + 1} is not JSON` };
    }
    if (
      !isRecord(value) ||
      !isString(value.ts) ||
      !isString(value.type) ||
      !isString(value.deliveryId) ||
      !isRecord(value.data)
    ) {
      return { ok: false, kind: "invalid", message: `history line ${index + 1} is malformed` };
    }
    events.push(value as unknown as HistoryEvent);
  }
  return { ok: true, value: events };
}

export function parseArchives(files: Array<{ name: string; text: string }>): {
  deliveries: Delivery[];
  errors: string[];
} {
  const deliveries: Delivery[] = [];
  const errors: string[] = [];
  for (const file of files) {
    let value: unknown;
    try {
      value = JSON.parse(file.text);
    } catch {
      errors.push(`${file.name} is not JSON`);
      continue;
    }
    const parsed = parseDelivery(value);
    if (!parsed.ok) {
      errors.push(`${file.name}: ${parsed.message}`);
      continue;
    }
    deliveries.push(parsed.value);
  }
  return { deliveries, errors };
}

export interface HealthInput {
  present: boolean;
  state: State | null;
  stateError: ParseResult<State> | null;
  events: HistoryEvent[];
  historyError: ParseResult<HistoryEvent[]> | null;
  archiveErrors: string[];
}

export function evaluateHealth(input: HealthInput): Health {
  if (!input.present) {
    return {
      state: "missing",
      title: "Missing",
      detail: "No .vstack/ directory in this project. Open a delivery with vstack_route to start recording.",
    };
  }
  if (input.stateError && !input.stateError.ok) {
    return {
      state: input.stateError.kind === "incompatible" ? "incompatible" : "invalid",
      title: input.stateError.kind === "incompatible" ? "Incompatible" : "Invalid",
      detail: input.stateError.message,
    };
  }
  if (!input.state) {
    return { state: "invalid", title: "Invalid", detail: "state.json could not be read." };
  }
  if (input.historyError && !input.historyError.ok) {
    return { state: "invalid", title: "Invalid", detail: input.historyError.message };
  }
  if (input.archiveErrors.length > 0) {
    return { state: "invalid", title: "Invalid", detail: input.archiveErrors.join("; ") };
  }
  const last = input.events.at(-1);
  if (last && typeof last.revision === "number") {
    if (last.revision !== input.state.revision) {
      return {
        state: "stale",
        title: "Stale",
        detail: `The last event is revision ${last.revision}; state.json is revision ${input.state.revision}. The recorder may have stopped mid-write.`,
      };
    }
  } else if (last && last.ts > input.state.updatedAt) {
    return {
      state: "stale",
      title: "Stale",
      detail: "The history is newer than state.json. The recorder may have stopped mid-write.",
    };
  }
  return { state: "healthy", title: "Healthy", detail: "State is present, current and readable." };
}

export function mergeDeliveries(state: State | null, archives: Delivery[]): Delivery[] {
  const byId = new Map<string, Delivery>();
  for (const delivery of archives) byId.set(delivery.id, delivery);
  const active = state?.delivery;
  if (active) byId.set(active.id, active);
  return [...byId.values()].sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (b.status === "active" && a.status !== "active") return 1;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

export function nextTask(delivery: Delivery): Task | undefined {
  return delivery.tasks.find((task) => task.status === "doing") ?? delivery.tasks.find((task) => task.status === "todo");
}

export function taskEvidence(delivery: Delivery, task: Task): string {
  if (!task.evidenceId) return "not run";
  const evidence = delivery.evidence.find((item) => item.id === task.evidenceId);
  return evidence ? `${evidence.result} (${evidence.id})` : "missing evidence";
}

export function lastHandoff(delivery: Delivery) {
  return delivery.handoffs.at(-1);
}

export function progress(delivery: Delivery): { done: number; total: number } {
  return {
    done: delivery.tasks.filter((task) => task.status === "done").length,
    total: delivery.tasks.length,
  };
}

export function formatTime(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export function shortId(value: string): string {
  return value.length > 18 ? `${value.slice(0, 18)}…` : value;
}
