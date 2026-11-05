import {
  evaluateHealth,
  formatTime,
  lastHandoff,
  mergeDeliveries,
  nextTask,
  parseArchives,
  parseHistory,
  parseState,
  progress,
  shortId,
  taskEvidence,
} from "./model.ts";
import type { Delivery, Health, HistoryEvent, Snapshot, State, ViewId } from "./types.ts";
import { VIEWS } from "./types.ts";

const REFRESH_MS = 3000;

function esc(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function tone(value: string): string {
  if (["passed", "done", "healthy", "closed", "judgement"].includes(value)) return "success";
  if (["failed", "blocked", "invalid", "incompatible", "missing"].includes(value)) return "error";
  if (["stale", "doing", "active", "parked"].includes(value)) return "warning";
  return "neutral";
}

function badge(value: string): string {
  return `<span class="badge tone-${tone(value)}">${esc(value)}</span>`;
}

function copyButton(command: string): string {
  return `<button class="copy" data-copy="${esc(command)}" title="Copy command">Copy</button>`;
}

function empty(title: string, detail: string): string {
  return `<div class="empty"><strong>${esc(title)}</strong><p>${esc(detail)}</p></div>`;
}

function deliveryLabel(delivery: Delivery): string {
  return `${esc(delivery.title)} <span class="muted">${esc(delivery.id)}</span>`;
}

function deliveryDetail(delivery: Delivery): string {
  const p = progress(delivery);
  const handoff = lastHandoff(delivery);
  const tasks = delivery.tasks
    .map(
      (task) => `<tr>
        <td>${esc(task.id)}</td>
        <td>${esc(task.title)}</td>
        <td>${badge(task.status)}</td>
        <td>${esc(taskEvidence(delivery, task))}</td>
        <td><code>${esc(task.check)}</code></td>
      </tr>`
    )
    .join("");
  const evidence = delivery.evidence
    .map(
      (item) => `<tr>
        <td>${esc(item.id)}</td>
        <td>${esc(item.claim)}</td>
        <td>${badge(item.result)}</td>
        <td><code>${esc(item.check)}</code></td>
        <td>${esc(item.artifact ?? "—")}</td>
      </tr>`
    )
    .join("");
  const decisions = delivery.decisions
    .map(
      (item) => `<li><strong>${esc(item.choice)}</strong> — ${esc(item.reason)}
        <div class="muted">Alternatives: ${esc(item.alternatives)}. Consequence: ${esc(item.consequence)}. Owner: ${esc(item.owner)}.</div></li>`
    )
    .join("");
  const waiver = delivery.close?.waiver;
  return `<section class="card">
      <div class="row-between">
        <h2>${deliveryLabel(delivery)}</h2>
        ${badge(delivery.status)}
      </div>
      <p>${esc(delivery.outcome)}</p>
      <dl class="facts">
        <dt>Tier</dt><dd>${esc(delivery.tier)}</dd>
        <dt>Playbook</dt><dd>${esc(delivery.playbook)}</dd>
        <dt>Phase</dt><dd>${esc(delivery.phase)}</dd>
        <dt>Done when</dt><dd>${esc(delivery.doneWhen)}</dd>
        <dt>Tasks</dt><dd>${p.done}/${p.total} done</dd>
        <dt>Updated</dt><dd>${esc(formatTime(delivery.updatedAt))}</dd>
        <dt>Closed</dt><dd>${esc(formatTime(delivery.closedAt))}</dd>
        <dt>Record</dt><dd><code>${esc(delivery.close?.recordPath ?? `.vstack/deliveries/${delivery.id}.md`)}</code>
          ${copyButton(`cat ${delivery.close?.recordPath ?? `.vstack/deliveries/${delivery.id}.md`}`)}</dd>
      </dl>
      ${waiver ? `<p class="callout tone-warning"><strong>Waiver</strong> ${esc(waiver.reason)} — accepted by ${esc(waiver.owner)}.</p>` : ""}
    </section>
    <section class="card">
      <h3>Tasks</h3>
      ${
        tasks
          ? `<div class="scroll"><table><thead><tr><th>ID</th><th>Task</th><th>Status</th><th>Evidence</th><th>Check</th></tr></thead><tbody>${tasks}</tbody></table></div>`
          : empty("No tasks recorded", "Add one with vstack_task.")
      }
    </section>
    <section class="card">
      <h3>Evidence</h3>
      ${
        evidence
          ? `<div class="scroll"><table><thead><tr><th>ID</th><th>Claim</th><th>Result</th><th>Check</th><th>Artifact</th></tr></thead><tbody>${evidence}</tbody></table></div>`
          : empty("No evidence recorded", "A task cannot complete without it.")
      }
    </section>
    <section class="card">
      <h3>Decisions</h3>
      ${decisions ? `<ul>${decisions}</ul>` : empty("No decisions recorded", "Record one with vstack_decision.")}
    </section>
    <section class="card">
      <h3>Handoff</h3>
      ${
        handoff
          ? `<p><strong>${esc(handoff.state)}</strong> → ${esc(handoff.nextAction)}</p>
             <p class="muted">Blockers: ${handoff.blockers.length ? esc(handoff.blockers.join(", ")) : "none"}. Tree: ${esc(handoff.treeStatus || "unknown")}.</p>`
          : empty("No handoff recorded", "Record one with vstack_handoff.")
      }
    </section>`;
}

export interface AppOptions {
  view?: ViewId;
  read: () => Promise<Snapshot>;
}

export function mountApp(root: HTMLElement, options: AppOptions): { refresh: () => Promise<void>; destroy: () => void } {
  let view: ViewId = options.view ?? "now";
  let selectedId: string | null = null;
  let state: State | null = null;
  let events: HistoryEvent[] = [];
  let archiveDeliveries: Delivery[] = [];
  let health: Health = { state: "missing", title: "Missing", detail: "Not read yet." };

  root.innerHTML = `<div class="vstack">
    <header>
      <div class="brand"><span class="mark">v</span><span>vstack</span><span id="health-badge"></span></div>
      <div class="actions">
        <button id="refresh" class="secondary">Refresh</button>
      </div>
    </header>
    <div id="health-banner" class="banner"></div>
    <nav class="tabs" role="tablist">${VIEWS.map(
      (item) => `<button role="tab" data-view="${item.id}" aria-selected="false">${esc(item.label)}</button>`
    ).join("")}</nav>
    <main id="view"></main>
    <footer id="footer" class="muted"></footer>
  </div>`;

  const viewEl = root.querySelector<HTMLElement>("#view")!;
  const bannerEl = root.querySelector<HTMLElement>("#health-banner")!;
  const healthBadge = root.querySelector<HTMLElement>("#health-badge")!;
  const footerEl = root.querySelector<HTMLElement>("#footer")!;

  function renderHeader(): void {
    healthBadge.innerHTML = badge(health.state);
    bannerEl.className = `banner tone-${tone(health.state)}`;
    bannerEl.innerHTML = `<strong>${esc(health.title)}</strong> ${esc(health.detail)}`;
    root.querySelectorAll<HTMLElement>("[data-view]").forEach((button) => {
      const active = button.dataset.view === view;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    const revision = state ? `revision ${state.revision}` : "no state";
    footerEl.textContent = `${revision} · ${events.length} events · ${archiveDeliveries.length} archived deliveries`;
  }

  function renderNow(): string {
    const delivery = state?.delivery;
    if (!delivery) {
      return `<section class="card">${empty(
        "No delivery recorded",
        "Open one with vstack_route. The panel never invents a delivery or a task."
      )}<p class="command"><code>vstack_route</code>${copyButton("vstack_route")}</p></section>`;
    }
    const task = nextTask(delivery);
    const handoff = lastHandoff(delivery);
    return `<section class="card">
        <div class="row-between"><h2>${deliveryLabel(delivery)}</h2>${badge(delivery.status)}</div>
        <p>${esc(delivery.outcome)}</p>
        <dl class="facts">
          <dt>Phase</dt><dd>${esc(delivery.phase)}</dd>
          <dt>Tier</dt><dd>${esc(delivery.tier)}</dd>
          <dt>Playbook</dt><dd>${esc(delivery.playbook)}</dd>
          <dt>Done when</dt><dd>${esc(delivery.doneWhen)}</dd>
          <dt>Next task</dt><dd>${task ? `${esc(task.title)} <span class="muted">${esc(task.id)}</span>` : "none"}</dd>
          <dt>Blockers</dt><dd>${handoff?.blockers.length ? esc(handoff.blockers.join(", ")) : "none recorded"}</dd>
          <dt>Last activity</dt><dd>${esc(formatTime(delivery.updatedAt))}</dd>
        </dl>
        <p class="muted">${delivery.tasks.filter((item) => item.status === "done").length}/${delivery.tasks.length} tasks done · ${delivery.evidence.length} evidence records</p>
      </section>
      <section class="card">
        <h3>Commands</h3>
        <p class="command"><code>vstack_task {"action":"add","title":"…","check":"…"}</code>${copyButton('vstack_task {"action":"add","title":"…","check":"…"}')}</p>
        <p class="command"><code>vstack_evidence {"claim":"…","check":"…","result":"passed"}</code>${copyButton('vstack_evidence {"claim":"…","check":"…","result":"passed"}')}</p>
        <p class="command"><code>vstack_close</code>${copyButton("vstack_close")}</p>
      </section>`;
  }

  function renderPlan(): string {
    const delivery = state?.delivery;
    if (!delivery) return empty("No plan recorded", "Open a delivery and add tasks.");
    return `<section class="card">
      <h2>Plan</h2>
      <div class="scroll"><table><thead><tr><th>ID</th><th>Task</th><th>Status</th><th>Check</th><th>Evidence</th></tr></thead><tbody>
      ${delivery.tasks
        .map(
          (task) => `<tr><td>${esc(task.id)}</td><td>${esc(task.title)}</td><td>${badge(task.status)}</td><td><code>${esc(task.check)}</code></td><td>${esc(taskEvidence(delivery, task))}</td></tr>`
        )
        .join("")}
      </tbody></table></div>
      ${delivery.tasks.length === 0 ? empty("No tasks recorded", "Add one with vstack_task.") : ""}
    </section>`;
  }

  function renderEvidence(): string {
    const delivery = state?.delivery;
    if (!delivery) return empty("No evidence recorded", "Open a delivery first.");
    return `<section class="card">
      <h2>Evidence</h2>
      <div class="scroll"><table><thead><tr><th>ID</th><th>Claim</th><th>Result</th><th>Check</th><th>Artifact</th><th>Time</th></tr></thead><tbody>
      ${delivery.evidence
        .map(
          (item) => `<tr><td>${esc(item.id)}</td><td>${esc(item.claim)}</td><td>${badge(item.result)}</td><td><code>${esc(item.check)}</code></td><td>${esc(item.artifact ?? "—")}</td><td>${esc(formatTime(item.createdAt))}</td></tr>`
        )
        .join("")}
      </tbody></table></div>
      ${delivery.evidence.length === 0 ? empty("No evidence recorded", "A task without evidence shows not run.") : ""}
    </section>`;
  }

  function renderTimeline(): string {
    return `<section class="card">
      <h2>Timeline</h2>
      ${
        events.length
          ? `<div class="scroll"><table><thead><tr><th>Time</th><th>Event</th><th>Delivery</th><th>Data</th></tr></thead><tbody>
            ${events
              .map(
                (event) => `<tr><td>${esc(formatTime(event.ts))}</td><td>${badge(event.type)}</td><td><code>${esc(shortId(event.deliveryId))}</code></td><td><code>${esc(JSON.stringify(event.data))}</code></td></tr>`
              )
              .join("")}
            </tbody></table></div>`
          : empty("No events recorded", "The recorder writes history.jsonl on every change.")
      }
    </section>`;
  }

  function renderDecisions(): string {
    const decisions = state?.delivery?.decisions ?? [];
    return `<section class="card">
      <h2>Decisions</h2>
      ${
        decisions.length
          ? `<ul>${decisions
              .map(
                (item) => `<li><strong>${esc(item.choice)}</strong> — ${esc(item.reason)}
                  <div class="muted">Alternatives: ${esc(item.alternatives)}. Consequence: ${esc(item.consequence)}. Owner: ${esc(item.owner)}.</div>
                  <div class="muted">${esc(formatTime(item.createdAt))}</div></li>`
              )
              .join("")}</ul>`
          : empty("No decisions recorded", "Record one with vstack_decision.")
      }
    </section>`;
  }

  function renderDeliveries(): string {
    const deliveries = mergeDeliveries(state, archiveDeliveries);
    if (deliveries.length === 0) {
      return `<section class="card">${empty(
        "No deliveries recorded",
        "Closed deliveries are kept in .vstack/deliveries/. Open one with vstack_route."
      )}<p class="command"><code>vstack_route</code>${copyButton("vstack_route")}</p></section>`;
    }
    if (!selectedId) selectedId = deliveries[0]!.id;
    const selected = deliveries.find((delivery) => delivery.id === selectedId) ?? deliveries[0]!;
    return `<section class="card">
        <h2>Deliveries</h2>
        <p class="muted">Every delivery recorded in this project, newest first. Closed records stay in <code>.vstack/deliveries/</code>.</p>
        <div class="scroll"><table class="deliveries"><thead><tr><th>Delivery</th><th>Status</th><th>Tier</th><th>Tasks</th><th>Evidence</th><th>Updated</th></tr></thead><tbody>
        ${deliveries
          .map((delivery) => {
            const p = progress(delivery);
            return `<tr data-delivery="${esc(delivery.id)}" class="${delivery.id === selectedId ? "selected" : ""}">
              <td><strong>${esc(delivery.title)}</strong><div class="muted">${esc(delivery.id)}</div></td>
              <td>${badge(delivery.status)}</td>
              <td>${esc(delivery.tier)}</td>
              <td>${p.done}/${p.total}</td>
              <td>${delivery.evidence.length}</td>
              <td>${esc(formatTime(delivery.updatedAt))}</td>
            </tr>`;
          })
          .join("")}
        </tbody></table></div>
      </section>
      ${deliveryDetail(selected)}`;
  }

  function renderHealthView(): string {
    const rows: Array<[string, string]> = [
      ["State", health.state],
      ["Detail", health.detail],
      ["Schema", state ? String(state.schemaVersion) : "—"],
      ["Revision", state ? String(state.revision) : "—"],
      ["State path", ".vstack/state.json"],
      ["History path", ".vstack/history.jsonl"],
      ["Archive path", ".vstack/deliveries/"],
      ["History events", String(events.length)],
      ["Archived deliveries", String(archiveDeliveries.length)],
    ];
    return `<section class="card">
      <h2>Health</h2>
      <dl class="facts">${rows.map(([key, value]) => `<dt>${esc(key)}</dt><dd>${esc(value)}</dd>`).join("")}</dl>
      <h3>Next action</h3>
      ${
        health.state === "missing"
          ? `<p>Install and enable the recorder, then open a delivery.</p><p class="command"><code>vstack_route</code>${copyButton("vstack_route")}</p>`
          : health.state === "incompatible"
            ? `<p>Update the panel to a version that reads schema ${state?.schemaVersion ?? "newer"}.</p>`
            : health.state === "invalid"
              ? `<p class="callout tone-error">A required record is malformed. Fix or move the named file; the panel will not invent values.</p>`
              : health.state === "stale"
                ? `<p>Run a recorder command to rewrite state, or refresh after the current command finishes.</p>`
                : `<p>No action. Every value above comes from a recorded file.</p>`
      }
    </section>`;
  }

  function renderView(): void {
    renderHeader();
    if (health.state === "missing") {
      viewEl.innerHTML = `<section class="card">${empty(
        "No vstack state",
        "This project has no .vstack/ directory. The panel is read-only; the recorder creates state."
      )}<p class="command"><code>vstack_route</code>${copyButton("vstack_route")}</p></section>`;
      return;
    }
    if (health.state === "incompatible" || health.state === "invalid") {
      viewEl.innerHTML = `<section class="card"><h2>${esc(health.title)}</h2><p class="callout tone-${tone(health.state)}">${esc(health.detail)}</p>
        <p class="muted">Open Health for the file and schema details.</p></section>`;
      return;
    }
    switch (view) {
      case "now":
        viewEl.innerHTML = renderNow();
        break;
      case "plan":
        viewEl.innerHTML = renderPlan();
        break;
      case "evidence":
        viewEl.innerHTML = renderEvidence();
        break;
      case "timeline":
        viewEl.innerHTML = renderTimeline();
        break;
      case "decisions":
        viewEl.innerHTML = renderDecisions();
        break;
      case "deliveries":
        viewEl.innerHTML = renderDeliveries();
        break;
      case "health":
        viewEl.innerHTML = renderHealthView();
        break;
    }
  }

  async function refresh(): Promise<void> {
    try {
      const snapshot = await options.read();
      const stateParsed = snapshot.stateText === null
        ? null
        : parseState(snapshot.stateText);
      const historyParsed = snapshot.historyText === null
        ? { ok: true as const, value: [] as HistoryEvent[] }
        : parseHistory(snapshot.historyText);
      const parsedArchives = parseArchives(snapshot.archives);
      state = stateParsed?.ok ? stateParsed.value : null;
      events = historyParsed.ok ? historyParsed.value : [];
      archiveDeliveries = parsedArchives.deliveries;
      health = evaluateHealth({
        present: snapshot.present,
        state,
        stateError: stateParsed,
        events,
        historyError: historyParsed.ok ? null : historyParsed,
        archiveErrors: parsedArchives.errors,
      });
      if (selectedId && !mergeDeliveries(state, archiveDeliveries).some((item) => item.id === selectedId)) {
        selectedId = null;
      }
      renderView();
    } catch (error) {
      health = {
        state: "invalid",
        title: "Read failed",
        detail: error instanceof Error ? error.message : String(error),
      };
      state = null;
      events = [];
      archiveDeliveries = [];
      renderView();
    }
  }

  root.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const tab = target.closest<HTMLElement>("[data-view]");
    if (tab?.dataset.view) {
      view = tab.dataset.view as ViewId;
      renderView();
      return;
    }
    const row = target.closest<HTMLElement>("[data-delivery]");
    if (row?.dataset.delivery) {
      selectedId = row.dataset.delivery;
      view = "deliveries";
      renderView();
      return;
    }
    const copy = target.closest<HTMLElement>("[data-copy]");
    if (copy?.dataset.copy) {
      void navigator.clipboard
        .writeText(copy.dataset.copy)
        .then(() => {
          copy.textContent = "Copied";
          window.setTimeout(() => {
            copy.textContent = "Copy";
          }, 1200);
        })
        .catch(() => {
          copy.textContent = "Select and copy";
        });
      return;
    }
    if (target.closest("#refresh")) void refresh();
  });

  void refresh();
  const timer = window.setInterval(() => {
    if (document.visibilityState === "visible") void refresh();
  }, REFRESH_MS);
  window.addEventListener("beforeunload", () => window.clearInterval(timer));

  return {
    refresh,
    destroy: () => {
      window.clearInterval(timer);
    },
  };
}
