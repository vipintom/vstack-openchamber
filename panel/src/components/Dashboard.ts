/**
 * vstack Workflow - OpenChamber Dashboard Component
 * Main dashboard rendering logic - reads ONLY published projections
 */

import type { 
  DashboardIndex, 
  DeliverySummary,
  DeliveryDetailReport,
  ActivitySummary,
  QualitySummaryReport,
  MemoryIndexReport,
  DeliveryTask,
  DeliveryAgentRun,
  DeliveryEvidence,
  DeliveryReviewFinding
} from "../types/index.ts";
import { 
  readDeliveryReport,
  readActivityReport,
  readQualitySummary,
  readMemoryIndex,
  readDashboardIndex,
  setProjectDir,
  getProjectDir,
  listReports
} from "../services/api.ts";
import { 
  renderPhasesTable, 
  renderTasksTable, 
  renderAgentsTable,
  escapeHtml,
  getStatusClass,
  formatDate,
  getNextActionHint,
  renderDeliveryDetail as renderDeliveryDetailFromProjections,
  showViewSimple
} from "./render.ts";

let currentView: 'overview' | 'deliveries' | 'delivery-detail' | 'tasks' | 'quality' | 'reviews' | 'releases' | 'evidence' = 'overview';
let selectedDeliveryId: string | null = null;
let lastIndex: DashboardIndex | null = null;
let lastRefreshTime: Date | null = null;

export async function renderDashboard(index: DashboardIndex) {
  lastIndex = index;
  lastRefreshTime = new Date();
  
  renderOverview(index);
  renderDeliveriesList(index);
  renderTasks();
  renderQuality();
  renderReviews();
  renderReleases();
  renderEvidence();
  updateLastRefresh();

  // Set up tab switching
  document.getElementById("tabs")?.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("tab")) return;
    
    document.querySelectorAll(".tab").forEach(t => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    
    target.classList.add("active");
    target.setAttribute("aria-selected", "true");
    document.getElementById(`panel-${target.dataset.tab}`)?.classList.add("active");
    
    currentView = target.dataset.tab as any;
    if (currentView === 'deliveries') renderDeliveriesList(lastIndex!);
    else if (currentView === 'tasks' && selectedDeliveryId) renderTasks();
  });
  
  document.getElementById("refreshBtn")?.addEventListener("click", () => {
    // Refresh is handled by the entry point's interval
    window.dispatchEvent(new CustomEvent('vstack-refresh'));
  });
}

function renderOverview(index: DashboardIndex) {
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
  
  // Last updated
  document.getElementById("lastUpdated")!.textContent = index.updatedAt 
    ? `Last updated: ${new Date(index.updatedAt).toLocaleString()}` 
    : "Last updated: never";
}

function renderDeliveriesList(index: DashboardIndex) {
  const container = document.getElementById("deliveriesList")!;
  const deliveries = index.activeDeliveries || [];
  
  if (deliveries.length === 0) {
    container.innerHTML = '<div class="empty-state">No active deliveries. Create one with vstack_delivery_create.</div>';
    return;
  }
  
  container.innerHTML = deliveries.map((d: DeliverySummary) => `
    <div class="delivery-item ${d.id === selectedDeliveryId ? 'selected' : ''}" data-id="${d.id}">
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
      selectedDeliveryId = id;
      currentView = 'delivery-detail';
      renderDeliveryDetailFromProjection(id);
      showViewSimple('delivery-detail');
    });
  });
}

async function renderDeliveryDetailFromProjection(deliveryId: string) {
  try {
    const [deliveryReport, activityReport, qualitySummary] = await Promise.all([
      readDeliveryReport(deliveryId),
      readActivityReport(deliveryId),
      readQualitySummary(deliveryId),
    ]);
    
    if (!deliveryReport) {
      document.getElementById("deliveryDetail")!.innerHTML = '<div class="error-state">Delivery report not found</div>';
      return;
    }
    
    // Render using projection data only
    renderDeliveryDetailFromProjections(
      deliveryReport.delivery,
      [], // phases not in projection yet
      deliveryReport.tasks,
      deliveryReport.agentRuns
    );
    
    // Add quality and activity data if available
    if (qualitySummary) {
      renderQualitySummary(qualitySummary);
    }
    if (activityReport) {
      renderActivitySummary(activityReport);
    }
    
    showViewSimple("delivery-detail");
  } catch (error) {
    console.error("Failed to load delivery detail from projections:", error);
    document.getElementById("deliveryDetail")!.innerHTML = '<div class="error-state">Failed to load delivery detail</div>';
  }
}

function renderQualitySummary(quality: QualitySummaryReport) {
  const container = document.getElementById("qualityContent")!;
  container.innerHTML = `
    <div class="quality-summary">
      <h3>Quality Gates</h3>
      <div class="quality-metrics">
        <div class="metric"><span class="metric-value">${quality.checksPassed}/${quality.checksTotal}</span> Checks Passed</div>
        <div class="metric"><span class="metric-value">${quality.checksFailed}</span> Checks Failed</div>
        <div class="metric"><span class="metric-value">${quality.checksSkipped}</span> Checks Skipped</div>
      </div>
      <div class="quality-breakdown">
        <h4>By Type</h4>
        <table class="quality-table">
          <thead><tr><th>Type</th><th>Passed</th><th>Failed</th></tr></thead>
          <tbody>
            ${Object.entries(quality.checksByType as Record<string, { passed: number; failed: number }>).map(([type, counts]) => `
              <tr><td>${type}</td><td>${counts.passed}</td><td>${counts.failed}</td></tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div class="quality-findings">
        <h4>Review Findings</h4>
        <div class="findings-counts">
          <span class="finding critical">${quality.reviewFindings.critical} Critical</span>
          <span class="finding high">${quality.reviewFindings.high} High</span>
          <span class="finding medium">${quality.reviewFindings.medium} Medium</span>
          <span class="finding low">${quality.reviewFindings.low} Low</span>
        </div>
      </div>
    </div>
  `;
}

function renderActivitySummary(activity: ActivitySummary) {
  const container = document.getElementById("activityContent")!;
  if (!container) return;
  
  container.innerHTML = `
    <div class="activity-summary">
      <h3>Activity Timeline</h3>
      <div class="activity-list">
        ${activity.activities.slice(0, 20).map((a: { timestamp: string; actor: string; eventType: string; entity: { type: string; id: string }; summary: string; outcome?: string }) => `
          <div class="activity-item">
            <span class="activity-time">${formatDate(a.timestamp)}</span>
            <span class="activity-actor">${a.actor}</span>
            <span class="activity-event">${a.eventType}</span>
            <span class="activity-entity">${a.entity.type}:${a.entity.id}</span>
            <span class="activity-summary">${escapeHtml(a.summary)}</span>
            ${a.outcome ? `<span class="activity-outcome">${a.outcome}</span>` : ""}
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderTasks() {
  const container = document.getElementById("tasksList")!;
  const deliveryId = selectedDeliveryId;
  
  if (!deliveryId) {
    container.innerHTML = '<div class="empty-state">Select a delivery to view tasks</div>';
    return;
  }
  
  // Tasks are loaded via projection in renderDeliveryDetailFromProjection
  // This panel shows tasks for the selected delivery
  readDeliveryReport(deliveryId).then(report => {
    if (!report) {
      container.innerHTML = '<div class="error-state">Delivery report not found</div>';
      return;
    }
    
    const tasks = report.tasks;
    if (tasks.length === 0) {
      container.innerHTML = '<div class="empty-state">No tasks for this delivery</div>';
      return;
    }
    
    container.innerHTML = tasks.map((t: DeliveryTask) => `
      <div class="task-item">
        <div class="task-header">
          <span class="task-title">${escapeHtml(t.title)}</span>
          <span class="task-status status-${t.status}">${t.status}</span>
        </div>
        <div class="task-meta">
          <span>Type: ${t.type}</span>
          <span>Priority: ${t.priority}</span>
          <span>Assigned: ${t.assignedAgentId || "none"}</span>
        </div>
        <div class="task-meta">
          <span>Dependencies: ${t.dependencies.join(", ") || "none"}</span>
        </div>
      </div>
    `).join("");
  }).catch(error => {
    container.innerHTML = `<div class="error-state">Error loading tasks: ${error instanceof Error ? error.message : "unknown"}</div>`;
  });
}

function renderQuality() {
  document.getElementById("qualityContent")!.innerHTML = '<div class="empty-state">Select a delivery to view quality gates</div>';
}

function renderReviews() {
  document.getElementById("reviewsContent")!.innerHTML = '<div class="empty-state">Select a delivery to view reviews</div>';
}

function renderReleases() {
  document.getElementById("releasesContent")!.innerHTML = '<div class="empty-state">Release status will be shown here</div>';
}

function renderEvidence() {
  document.getElementById("evidenceContent")!.innerHTML = '<div class="empty-state">Select a delivery to view evidence</div>';
}

function updateLastRefresh() {
  const el = document.getElementById("lastRefresh")!;
  el.textContent = lastRefreshTime ? `Last refreshed: ${lastRefreshTime.toLocaleTimeString()}` : "Last refreshed: never";
}

// Initialize
async function main() {
  // All initialization is done via host.onReady
}

main();