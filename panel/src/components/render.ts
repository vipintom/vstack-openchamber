/**
 * vstack Workflow - OpenChamber Panel Render Components
 * Single source of truth for all UI rendering logic
 */

import type { 
  DashboardIndex, 
  DeliverySummary,
  DeliveryDetailReport,
  DeliveryTask,
  DeliveryAgentRun,
  DeliveryEvidence,
  DeliveryReviewFinding
} from "../types/index.ts";

export function getStatusClass(status: string): string {
  const map: Record<string, string> = {
    "proposed": "status-proposed",
    "active": "status-active",
    "blocked": "status-blocked",
    "completed": "status-completed",
    "cancelled": "status-cancelled",
    "failed": "status-failed",
    "dispatched": "status-dispatched",
    "running": "status-running",
    "pending": "status-pending",
    "ready": "status-ready",
    "in_progress": "status-in_progress",
    "review": "status-review",
    "skipped": "status-skipped",
    "needs_rework": "status-needs_rework",
    "not_started": "status-not_started",
    "verifying": "status-verifying",
    "approved": "status-approved",
    "rejected": "status-rejected",
    "expired": "status-expired",
  };
  return map[status] || "status-unknown";
}

export function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return dateStr;
  }
}

export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function getNextActionHint(status: string): string {
  switch (status) {
    case "proposed": return "Start workflow (vstack_workflow_start)";
    case "active": return "Continue work on current phase";
    case "blocked": return "Resolve blocker";
    case "completed": return "Delivery completed";
    default: return "Check vstack_status tool";
  }
}

export function renderOverview(index: DashboardIndex): void {
  const activeDelivery = index.activeDeliveries?.[0];
  
  document.getElementById("goal")!.textContent = activeDelivery?.title || "-";
  document.getElementById("status")!.textContent = activeDelivery?.status || "-";
  document.getElementById("currentStep")!.textContent = activeDelivery?.currentPhase || "-";
  document.getElementById("activeTask")!.textContent = "-";
  
  const badge = document.getElementById("statusBadge")!;
  badge.className = `status-badge status-${activeDelivery?.status || "idle"}`;
  badge.textContent = activeDelivery?.status || "Idle";
  
  const nextAction = activeDelivery 
    ? getNextActionHint(activeDelivery.status)
    : "Create a delivery (vstack_delivery_create)";
  document.getElementById("nextAction")!.textContent = nextAction;
  
  const completedCount = index.activeDeliveries?.filter((d: DeliverySummary) => d.status === "completed").length || 0;
  const totalCount = index.activeDeliveries?.length || 0;
  const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  (document.getElementById("progressFill") as HTMLElement).style.width = `${progressPct}%`;
  document.getElementById("progressText")!.textContent = `${completedCount}/${totalCount} deliveries`;
  
  document.getElementById("lastUpdated")!.textContent = index.updatedAt 
    ? `Last updated: ${new Date(index.updatedAt).toLocaleString()}` 
    : "Last updated: never";
}

export function renderDeliveriesList(deliveries: DeliverySummary[], selectedId: string | null, onSelect: (id: string) => void): void {
  const container = document.getElementById("deliveriesList")!;
  
  if (deliveries.length === 0) {
    container.innerHTML = '<div class="empty-state">No active deliveries. Create one with vstack_delivery_create.</div>';
    return;
  }
  
  container.innerHTML = deliveries.map((d: DeliverySummary) => `
    <div class="delivery-item ${d.id === selectedId ? 'selected' : ''}" data-id="${d.id}">
      <div class="delivery-header">
        <span class="delivery-title">${escapeHtml(d.title)}</span>
        <span class="delivery-status status-${d.status}">${d.status}</span>
      </div>
      <div class="delivery-meta">
        <span>${d.type} • ${d.profile}</span>
        <span>${d.currentPhase}</span>
        <span>${d.revision} rev</span>
      </div>
    </div>
  `).join("");
  
  // Add click handlers
  document.querySelectorAll('.delivery-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id')!;
      onSelect(id);
    });
  });
}

export function renderDeliveryDetail(
  delivery: DeliveryDetailReport['delivery'],
  phases: any[],
  tasks: DeliveryTask[],
  agents: DeliveryAgentRun[]
): void {
  const container = document.getElementById("deliveryDetail")!;
  
  container.innerHTML = `
    <div class="delivery-detail-header">
      <h2>${escapeHtml(delivery.title)}</h2>
      <div class="delivery-meta">
        <span class="type-badge type-${delivery.type}">${delivery.type}</span>
        <span class="profile-badge">${delivery.profile}</span>
        <span class="risk-badge risk-${delivery.risk}">${delivery.risk}</span>
      </div>
      <p>${escapeHtml(delivery.description)}</p>
    </div>
    
    <div class="detail-tabs">
      <nav class="sub-tabs" role="tablist">
        <button class="sub-tab active" role="tab" data-tab="phases" aria-selected="true">Phases (${phases.length})</button>
        <button class="sub-tab" role="tab" data-tab="tasks" aria-selected="false">Tasks (${tasks.length})</button>
        <button class="sub-tab" role="tab" data-tab="agents" aria-selected="false">Agents (${agents.length})</button>
        <button class="sub-tab" role="tab" data-tab="quality" aria-selected="false">Quality</button>
        <button class="sub-tab" role="tab" data-tab="reviews" aria-selected="false">Reviews</button>
      </nav>
      
      <div class="sub-tab-panel active" id="subpanel-phases" role="tabpanel">
        ${renderPhasesTable(phases)}
      </div>
      <div class="sub-tab-panel" id="subpanel-tasks" role="tabpanel">
        ${renderTasksTable(tasks)}
      </div>
      <div class="sub-tab-panel" id="subpanel-agents" role="tabpanel">
        ${renderAgentsTable(agents)}
      </div>
      <div class="sub-tab-panel" id="subpanel-quality" role="tabpanel">
        <div class="empty-state">Quality checks coming soon</div>
      </div>
      <div class="sub-tab-panel" id="subpanel-reviews" role="tabpanel">
        <div class="empty-state">Reviews coming soon</div>
      </div>
    </div>
  `;
  
  // Sub-tab switching
  const subTabs = container.querySelectorAll(".sub-tab");
  subTabs.forEach((tabEl) => {
    const tab = tabEl as HTMLElement;
    tab.addEventListener("click", () => {
      container.querySelectorAll(".sub-tab").forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      container.querySelectorAll(".sub-tab-panel").forEach(p => p.classList.remove("active"));
      
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      document.getElementById(`subpanel-${tab.dataset.tab}`)!.classList.add("active");
    });
  });
}

export function renderPhasesTable(phases: Array<{ phase: string; status: string; runSequence: number; requiredGates: string[]; gateResults?: Array<{ status: string }>; startedAt?: string; completedAt?: string }>): string {
  if (phases.length === 0) return '<div class="empty-state">No phases</div>';
  
  return `
    <table class="phases-table">
      <thead>
        <tr><th>Phase</th><th>Status</th><th>Sequence</th><th>Required Gates</th><th>Passed</th><th>Started</th><th>Completed</th></tr>
      </thead>
      <tbody>
        ${phases.map(p => `
          <tr class="phase-row status-${p.status}">
            <td>${p.phase}</td>
            <td><span class="status-badge ${getStatusClass(p.status)}">${p.status}</span></td>
            <td>${p.runSequence}</td>
            <td>${p.requiredGates.join(", ") || "None"}</td>
            <td>${p.gateResults?.filter((g: any) => g.status === "passed").length || 0}/${p.requiredGates.length}</td>
            <td>${p.startedAt ? formatDate(p.startedAt) : "-"}</td>
            <td>${p.completedAt ? formatDate(p.completedAt) : "-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

export function renderTasksTable(tasks: DeliveryTask[]): string {
  if (tasks.length === 0) return '<div class="empty-state">No tasks</div>';
  
  return `
    <table class="tasks-table">
      <thead>
        <tr><th>Title</th><th>Type</th><th>Status</th><th>Priority</th><th>Agent</th><th>Dependencies</th></tr>
      </thead>
      <tbody>
        ${tasks.map(t => `
          <tr class="task-row status-${t.status}">
            <td>${escapeHtml(t.title)}</td>
            <td><span class="type-badge type-${t.type}">${t.type}</span></td>
            <td><span class="status-badge ${getStatusClass(t.status)}">${t.status}</span></td>
            <td><span class="priority-badge priority-${t.priority}">${t.priority}</span></td>
            <td>${t.assignedAgentId || "-"}</td>
            <td>${t.dependencies?.join(", ") || "None"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

export function renderAgentsTable(agents: DeliveryAgentRun[]): string {
  if (agents.length === 0) return '<div class="empty-state">No agent runs</div>';
  
  return `
    <table class="agents-table">
      <thead>
        <tr><th>Agent</th><th>Task</th><th>Status</th><th>Session</th><th>Started</th><th>Completed</th></tr>
      </thead>
      <tbody>
        ${agents.map(a => `
          <tr>
            <td>${a.agentId}</td>
            <td>${a.taskId || "-"}</td>
            <td><span class="status-badge ${getStatusClass(a.status)}">${a.status}</span></td>
            <td>${a.sessionId?.slice(0, 8) || "-"}</td>
            <td>${formatDate(a.startedAt)}</td>
            <td>${a.completedAt ? formatDate(a.completedAt) : "-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

export function showView(view: string, currentView: { value: string }, onChange: (view: string) => void): void {
  // Update main tabs
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.remove("active");
    t.setAttribute("aria-selected", "false");
  });
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  
  const activeTab = document.querySelector(`.tab[data-tab="${view}"]`);
  if (activeTab) {
    activeTab.classList.add("active");
    activeTab.setAttribute("aria-selected", "true");
  }
  
  const activePanel = document.getElementById(`panel-${view}`);
  if (activePanel) activePanel.classList.add("active");
  
  currentView.value = view;
  onChange(view);
}

export function showViewSimple(view: string): void {
  // Legacy simple version
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.remove("active");
    t.setAttribute("aria-selected", "false");
  });
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  
  const activeTab = document.querySelector(`.tab[data-tab="${view}"]`);
  if (activeTab) {
    activeTab.classList.add("active");
    activeTab.setAttribute("aria-selected", "true");
  }
  
  const activePanel = document.getElementById(`panel-${view}`);
  if (activePanel) activePanel.classList.add("active");
}

export function updateLastRefresh(lastRefreshTime: Date | null): void {
  const el = document.getElementById("lastRefresh")!;
  el.textContent = lastRefreshTime ? `Last refreshed: ${lastRefreshTime.toLocaleTimeString()}` : "Last refreshed: never";
}