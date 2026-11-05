export type Tier = "quick" | "standard" | "deep";
export type Phase = "route" | "shape" | "plan" | "build" | "prove" | "review" | "close";
export type DeliveryStatus = "active" | "parked" | "closed";

export interface Task {
  id: string;
  title: string;
  status: "todo" | "doing" | "done" | "blocked";
  check: string;
  evidenceId: string | null;
  artifact: string | null;
  gateId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Evidence {
  id: string;
  claim: string;
  check: string;
  result: "passed" | "failed" | "blocked" | "not_verified" | "judgement";
  artifact: string | null;
  taskId?: string | null;
  gateId: string | null;
  digest: string | null;
  createdAt: string;
}

export type GateKind = "command" | "artifact" | "review";

export interface Gate {
  id: string;
  kind: GateKind;
  check: string;
}
export interface Review {
  outcome: "approved" | "changes_requested";
  notes: string;
  owner: string;
}

export interface Decision {
  id: string;
  choice: string;
  alternatives: string;
  reason: string;
  consequence: string;
  owner: string;
  createdAt: string;
}

export interface Handoff {
  id: string;
  state: string;
  nextAction: string;
  blockers: string[];
  treeStatus: string;
  createdAt: string;
}

export interface Delivery {
  id: string;
  title: string;
  tier: Tier;
  playbook: string;
  phase: Phase;
  status: DeliveryStatus;
  outcome: string;
  doneWhen: string;
  skills: string[];
  skipped: string[];
  tasks: Task[];
  gates: Gate[];
  evidence: Evidence[];
  decisions: Decision[];
  handoffs: Handoff[];
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  close?: {
    recordPath: string;
    summary: string;
    review?: Review | null;
    waiver: { reason: string; owner: string } | null;
    closedAt: string;
  } | null;
}

export interface State {
  schemaVersion: number;
  revision: number;
  createdAt: string;
  updatedAt: string;
  delivery: Delivery | null;
}

export interface HistoryEvent {
  ts: string;
  type: string;
  deliveryId: string;
  data: Record<string, unknown>;
  revision?: number;
  seq?: number;
  prevHash?: string | null;
  hash?: string;
}

export type HealthState = "missing" | "stale" | "incompatible" | "invalid" | "healthy";

export interface Health {
  state: HealthState;
  title: string;
  detail: string;
}

export interface Snapshot {
  present: boolean;
  stateText: string | null;
  historyText: string | null;
  archives: Array<{ name: string; text: string }>;
}

export type ViewId = "now" | "plan" | "evidence" | "timeline" | "decisions" | "deliveries" | "health";

export const VIEWS: Array<{ id: ViewId; label: string }> = [
  { id: "now", label: "Now" },
  { id: "plan", label: "Plan" },
  { id: "evidence", label: "Evidence" },
  { id: "timeline", label: "Timeline" },
  { id: "decisions", label: "Decisions" },
  { id: "deliveries", label: "Deliveries" },
  { id: "health", label: "Health" },
];
