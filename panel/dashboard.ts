/**
 * vstack Dashboard - Full Screen Page
 * Thin entry point - reads ONLY published projections from .vstack/reports/ and .vstack/state/
 */

import { connectHost } from "@openchamber/sdk";
import { applyHostReady } from "@openchamber/sdk/ui";
import { setProjectDir } from "./src/services/api.ts";

const POLL_INTERVAL = 3000;
const SUPPORTED_SCHEMA_VERSION = 1;

interface Manifest {
  schemaVersion: number;
  vstackVersion: string;
  contentVersion: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

interface DeliverySummary {
  id: string;
  title: string;
  type: string;
  profile: string;
  status: string;
  currentPhase: string;
  updatedAt: string;
  revision: number;
}

interface DashboardIndex {
  schemaVersion: number;
  revision: number;
  updatedAt: string;
  activeDeliveries: DeliverySummary[];
}

let host = connectHost();
let currentProjectDir: string | null = null;
let lastRefreshTime: Date | null = null;
let refreshInterval: number | null = null;
let currentView: 'overview' | 'quality' | 'reviews' | 'releases' | 'evidence' = 'overview';
let selectedDeliveryId: string | null = null;
let allDeliveries: DeliverySummary[] = [];

host.onReady((ctx: any) => {
  applyHostReady(ctx, document.documentElement);
  document.body.dataset.theme = ctx.theme.mode;
  document.body.dataset.surface = ctx.surface;
  currentProjectDir = ctx.directory;
  setProjectDir(ctx.directory);
  loadDashboard();
  
  if (refreshInterval) clearInterval(refreshInterval);
  refreshInterval = window.setInterval(() => {
    if (document.visibilityState === "visible") {
      loadDashboard();
    }
  }, POLL_INTERVAL);
  
  host.onDirectory((dir: string | null) => {
    if (dir !== currentProjectDir) {
      currentProjectDir = dir;
      setProjectDir(dir);
      loadDashboard();
    }
  });
  
  window.addEventListener("beforeunload", () => {
    if (refreshInterval) clearInterval(refreshInterval);
  });
  
  document.getElementById("refreshBtn")?.addEventListener("click", loadDashboard);
  
  document.getElementById("deliverySelect")?.addEventListener("change", (e) => {
    selectedDeliveryId = (e.target as HTMLSelectElement).value || null;
    renderCurrentView();
  });
  
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
    renderCurrentView();
  });
});

async function loadDashboard() {
  if (!currentProjectDir) {
    showEmptyState("No project open");
    return;
  }
  
  try {
    const { readManifest, readDashboardIndex } = await import("./src/services/api.ts");
    const manifest = await readManifest();
    if (!manifest) {
      showEmptyState("No vstack workflow found in this project");
      return;
    }
    
    if (manifest.schemaVersion !== SUPPORTED_SCHEMA_VERSION) {
      showErrorState(new Error(`Unsupported schema version: ${manifest.schemaVersion}. Expected ${SUPPORTED_SCHEMA_VERSION}`));
      return;
    }
    
    const index = await readDashboardIndex();
    if (!index) {
      showEmptyState("No active workflow state");
      return;
    }
    
    allDeliveries = index.activeDeliveries || [];
    updateDeliverySelect();
    
    // Auto-select first delivery if none selected
    if (!selectedDeliveryId && allDeliveries.length > 0) {
      selectedDeliveryId = allDeliveries[0]!.id;
      updateDeliverySelect();
    }
    
    renderCurrentView();
    lastRefreshTime = new Date();
    updateLastRefresh();
  } catch (error) {
    console.error("Failed to load dashboard:", error);
    if (error instanceof Error && error.message.includes("NOT_GRANTED")) {
      showErrorState(new Error("Files permission denied. Please approve the 'files' capability in OpenChamber Settings."));
    } else {
      showErrorState(error);
    }
  }
}

function updateDeliverySelect() {
  const select = document.getElementById("deliverySelect") as HTMLSelectElement | null;
  if (!select) return;
  
  select.innerHTML = '<option value="">Select delivery...</option>' + 
    allDeliveries.map(d => `<option value="${d.id}" ${d.id === selectedDeliveryId ? "selected" : ""}>${escapeHtml(d.title)} (${d.status})</option>`).join("");
  select.disabled = allDeliveries.length === 0;
}

function renderCurrentView() {
  switch (currentView) {
    case 'overview':
      renderOverview();
      break;
    case 'quality':
      renderQuality();
      break;
    case 'reviews':
      renderReviews();
      break;
    case 'releases':
      renderReleases();
      break;
    case 'evidence':
      renderEvidence();
      break;
  }
}

async function renderOverview() {
  const grid = document.getElementById("overviewGrid")!;
  
  if (allDeliveries.length === 0) {
    grid.innerHTML = '<div class="empty-state">No active deliveries. Create one with vstack_delivery_create.</div>';
    return;
  }
  
  const activeDelivery = selectedDeliveryId 
    ? allDeliveries.find(d => d.id === selectedDeliveryId) 
    : allDeliveries[0];
  
  if (!activeDelivery) {
    grid.innerHTML = '<div class="empty-state">No delivery selected</div>';
    return;
  }
  
  const completedCount = allDeliveries.filter(d => d.status === "completed").length;
  const totalCount = allDeliveries.length;
  const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  grid.innerHTML = `
    <div class="card">
      <h3>Delivery: ${escapeHtml(activeDelivery.title)}</h3>
      <div class="stat-row"><span class="stat-label">Type</span><span class="stat-value"><span class="type-badge type-${activeDelivery.type}">${activeDelivery.type}</span></span></div>
      <div class="stat-row"><span class="stat-label">Profile</span><span class="stat-value">${escapeHtml(activeDelivery.profile)}</span></div>
      <div class="stat-row"><span class="stat-label">Status</span><span class="stat-value"><span class="status-badge-cell status-${activeDelivery.status}">${activeDelivery.status}</span></span></div>
      <div class="stat-row"><span class="stat-label">Current Phase</span><span class="stat-value">${escapeHtml(activeDelivery.currentPhase)}</span></div>
      <div class="stat-row"><span class="stat-label">Revision</span><span class="stat-value">${activeDelivery.revision}</span></div>
      <div class="stat-row"><span class="stat-label">Updated</span><span class="stat-value">${formatDate(activeDelivery.updatedAt)}</span></div>
    </div>
    
    <div class="card">
      <h3>Workflow Progress</h3>
      <div class="stat-row"><span class="stat-label">Total Deliveries</span><span class="stat-value">${totalCount}</span></div>
      <div class="stat-row"><span class="stat-label">Completed</span><span class="stat-value passed">${completedCount}</span></div>
      <div class="stat-row"><span class="stat-label">Active</span><span class="stat-value">${allDeliveries.filter(d => d.status === "active").length}</span></div>
      <div class="stat-row"><span class="stat-label">Blocked</span><span class="stat-value warning">${allDeliveries.filter(d => d.status === "blocked").length}</span></div>
      <div class="stat-row"><span class="stat-label">Progress</span><span class="stat-value">${progressPct.toFixed(0)}%</span></div>
    </div>
    
    <div class="card" style="grid-column: 1 / -1;">
      <h3>All Deliveries</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th>Title</th><th>Type</th><th>Profile</th><th>Status</th><th>Phase</th><th>Revision</th><th>Updated</th></tr>
          </thead>
          <tbody>
            ${allDeliveries.map(d => `
              <tr class="${d.id === selectedDeliveryId ? 'selected' : ''}" style="cursor: pointer;" data-id="${d.id}">
                <td>${escapeHtml(d.title)}</td>
                <td><span class="type-badge type-${d.type}">${d.type}</span></td>
                <td>${escapeHtml(d.profile)}</td>
                <td><span class="status-badge-cell status-${d.status}">${d.status}</span></td>
                <td>${escapeHtml(d.currentPhase)}</td>
                <td>${d.revision}</td>
                <td>${formatDate(d.updatedAt)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // Add click handlers for delivery rows
  document.querySelectorAll('#overviewGrid tbody tr[data-id]').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-id')!;
      selectedDeliveryId = id;
      updateDeliverySelect();
      renderCurrentView();
    });
  });
}

async function renderQuality() {
  const container = document.getElementById("qualityContent")!;
  
  if (!selectedDeliveryId) {
    container.innerHTML = '<div class="empty-state">Select a delivery to view quality checks</div>';
    return;
  }
  
  try {
    const { readQualitySummary } = await import("./src/services/api.ts");
    const quality = await readQualitySummary(selectedDeliveryId);
    
    if (!quality) {
      container.innerHTML = '<div class="empty-state">No quality summary available</div>';
      return;
    }
    
    container.innerHTML = `
      <div class="quality-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${quality.checksTotal}</span>
            <span class="stat-label">Total Checks</span>
          </div>
          <div class="stat">
            <span class="stat-value passed">${quality.checksPassed}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat">
            <span class="stat-value failed">${quality.checksFailed}</span>
            <span class="stat-label">Failed</span>
          </div>
          <div class="stat">
            <span class="stat-value warning">${quality.checksSkipped}</span>
            <span class="stat-label">Skipped</span>
          </div>
        </div>
        
        <div class="quality-breakdown">
          <h4>By Type</h4>
          <div class="table-wrapper">
            <table class="evidence-table">
              <thead>
                <tr><th>Type</th><th>Passed</th><th>Failed</th></tr>
              </thead>
              <tbody>
                ${Object.entries(quality.checksByType as Record<string, { passed: number; failed: number }>).map(([type, counts]) => `
                  <tr><td>${escapeHtml(type)}</td><td>${counts.passed}</td><td>${counts.failed}</td></tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="quality-findings">
          <h4>Review Findings</h4>
          <div class="quality-stats">
            <div class="stat">
              <span class="stat-value failed">${quality.reviewFindings.critical}</span>
              <span class="stat-label">Critical</span>
            </div>
            <div class="stat">
              <span class="stat-value failed">${quality.reviewFindings.high}</span>
              <span class="stat-label">High</span>
            </div>
            <div class="stat">
              <span class="stat-value warning">${quality.reviewFindings.medium}</span>
              <span class="stat-label">Medium</span>
            </div>
            <div class="stat">
              <span class="stat-value">${quality.reviewFindings.low}</span>
              <span class="stat-label">Low</span>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Failed to render quality:", error);
    container.innerHTML = '<div class="error-state">Failed to load quality data</div>';
  }
}

async function renderReviews() {
  const container = document.getElementById("reviewsContent")!;
  
  if (!selectedDeliveryId) {
    container.innerHTML = '<div class="empty-state">Select a delivery to view reviews</div>';
    return;
  }
  
  try {
    const { readDeliveryReport } = await import("./src/services/api.ts");
    const report = await readDeliveryReport(selectedDeliveryId);
    
    if (!report) {
      container.innerHTML = '<div class="empty-state">Delivery report not found</div>';
      return;
    }
    
    const reviews = report.reviewSessions || [];
    const findings = report.reviewFindings || [];
    
    if (reviews.length === 0 && findings.length === 0) {
      container.innerHTML = '<div class="empty-state">No reviews conducted yet</div>';
      return;
    }
    
    let html = `
      <div class="reviews-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${reviews.length}</span>
            <span class="stat-label">Review Runs</span>
          </div>
          <div class="stat">
            <span class="stat-value">${findings.length}</span>
            <span class="stat-label">Total Findings</span>
          </div>
          <div class="stat">
            <span class="stat-value failed">${findings.filter((f: any) => f.severity === "critical" || f.severity === "high").length}</span>
            <span class="stat-label">Critical/High</span>
          </div>
          <div class="stat">
            <span class="stat-value passed">${findings.filter((f: any) => f.disposition === "fixed" || f.disposition === "resolved").length}</span>
            <span class="stat-label">Resolved</span>
          </div>
        </div>
      </div>
    `;
    
    if (reviews.length > 0) {
      html += `
        <div class="review-runs">
          <h4>Review Runs</h4>
          <div class="table-wrapper">
            <table class="review-table">
              <thead>
                <tr><th>Type</th><th>Independence</th><th>Reviewer</th><th>Status</th><th>Findings</th><th>Started</th><th>Completed</th></tr>
              </thead>
              <tbody>
                ${reviews.map((r: any) => `
                  <tr>
                    <td><span class="type-badge type-${r.type}">${r.type}</span></td>
                    <td>${r.independence}</td>
                    <td>${r.reviewerId}</td>
                    <td><span class="status-badge-cell status-${r.status}">${r.status}</span></td>
                    <td>${r.findings?.length || 0}</td>
                    <td>${formatDate(r.startedAt)}</td>
                    <td>${r.completedAt ? formatDate(r.completedAt) : "-"}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
    
    if (findings.length > 0) {
      const bySeverity = findings.reduce((acc: any, f: any) => {
        const list = acc[f.severity] ?? (acc[f.severity] = []);
        list.push(f);
        return acc;
      }, {} as Record<string, any[]>);
      
      const severityOrder = ["critical", "high", "medium", "low", "informational"];
      
      html += `
        <div class="findings">
          <h4>Findings by Severity</h4>
          ${severityOrder.map(sev => {
            const sevFindings = bySeverity[sev] || [];
            if (sevFindings.length === 0) return "";
            return `
              <div class="severity-group severity-${sev}">
                <h5>${sev.toUpperCase()} (${sevFindings.length})</h5>
                <div class="table-wrapper">
                  <table class="findings-table">
                    <thead>
                      <tr><th>Category</th><th>Title</th><th>Location</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      ${sevFindings.map((f: any) => `
                        <tr>
                          <td><span class="type-badge type-${f.category}">${f.category}</span></td>
                          <td>${escapeHtml(f.title)}</td>
                          <td>${escapeHtml(f.location)}</td>
                          <td><span class="status-badge-cell status-${f.disposition}">${f.disposition}</span></td>
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }
    
    container.innerHTML = html;
  } catch (error) {
    console.error("Failed to render reviews:", error);
    container.innerHTML = '<div class="error-state">Failed to load review data</div>';
  }
}

async function renderReleases() {
  const container = document.getElementById("releasesContent")!;
  
  if (!selectedDeliveryId) {
    container.innerHTML = '<div class="empty-state">Select a delivery to view releases</div>';
    return;
  }
  
  try {
    const { readDeliveryReport } = await import("./src/services/api.ts");
    const report = await readDeliveryReport(selectedDeliveryId);
    
    if (!report) {
      container.innerHTML = '<div class="empty-state">Delivery report not found</div>';
      return;
    }
    
    // Releases and deployments from projection
    const releases = report.decisions?.filter((d: any) => d.phase === "release") || [];
    const deployments = report.decisions?.filter((d: any) => d.phase === "deployment") || [];
    
    if (releases.length === 0 && deployments.length === 0) {
      container.innerHTML = '<div class="empty-state">No releases or deployments yet</div>';
      return;
    }
    
    let html = "";
    
    if (releases.length > 0) {
      html += `
        <div class="releases-list">
          <h4>Release Candidates</h4>
          ${releases.map((r: any) => `
            <div class="release-card status-${r.status || "draft"}">
              <div class="release-header">
                <h5>${escapeHtml(r.summary)} <span class="badge version">${escapeHtml(r.chosenOption)}</span></h5>
                <span class="status-badge-cell status-${r.status || "draft"}">${r.status || "draft"}</span>
              </div>
              <div class="release-meta">
                <span>Created: ${formatDate(r.createdAt)}</span>
              </div>
              ${r.rationale ? `<div class="changelog">${escapeHtml(r.rationale)}</div>` : ""}
            </div>
          `).join("")}
        </div>
      `;
    }
    
    if (deployments.length > 0) {
      html += `
        <div class="deployments-list">
          <h4>Deployments</h4>
          <div class="table-wrapper">
            <table class="deployments-table">
              <thead>
                <tr><th>Phase</th><th>Summary</th><th>Status</th><th>Created</th></tr>
              </thead>
              <tbody>
                ${deployments.map((d: any) => `
                  <tr class="status-${d.status || "active"}">
                    <td>${d.phase}</td>
                    <td>${escapeHtml(d.summary)}</td>
                    <td><span class="status-badge-cell status-${d.status || "active"}">${d.status || "active"}</span></td>
                    <td>${formatDate(d.createdAt)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
    
    container.innerHTML = html;
  } catch (error) {
    console.error("Failed to render releases:", error);
    container.innerHTML = '<div class="error-state">Failed to load release data</div>';
  }
}

async function renderEvidence() {
  const container = document.getElementById("evidenceContent")!;
  
  if (!selectedDeliveryId) {
    container.innerHTML = '<div class="empty-state">Select a delivery to view evidence</div>';
    return;
  }
  
  try {
    const { readDeliveryReport } = await import("./src/services/api.ts");
    const report = await readDeliveryReport(selectedDeliveryId);
    
    if (!report) {
      container.innerHTML = '<div class="empty-state">Delivery report not found</div>';
      return;
    }
    
    const evidence = report.evidence || [];
    
    if (evidence.length === 0) {
      container.innerHTML = '<div class="empty-state">No evidence recorded yet</div>';
      return;
    }
    
    // Group by type
    const byType = evidence.reduce((acc: any, e: any) => {
      const list = acc[e.type] ?? (acc[e.type] = []);
      list.push(e);
      return acc;
    }, {} as Record<string, any[]>);
    
    container.innerHTML = `
      <div class="evidence-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${evidence.length}</span>
            <span class="stat-label">Total Records</span>
          </div>
          <div class="stat">
            <span class="stat-value passed">${evidence.filter((e: any) => e.status === "passed").length}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat">
            <span class="stat-value failed">${evidence.filter((e: any) => e.status === "failed").length}</span>
            <span class="stat-label">Failed</span>
          </div>
        </div>
      </div>
      
      <div class="evidence-list">
        ${Object.entries(byType as Record<string, any[]>).map(([type, records]) => `
          <div class="evidence-source-group">
            <h4>${escapeHtml(type)} <span class="badge">${records.length}</span></h4>
            <div class="table-wrapper">
              <table class="evidence-table">
                <thead>
                  <tr><th>Check</th><th>Status</th><th>Exit Code</th><th>Task</th><th>Completed</th><th>Summary</th></tr>
                </thead>
                <tbody>
                  ${(records as any[]).map(e => `
                    <tr class="status-${e.status}">
                      <td>${escapeHtml(e.checkId)}</td>
                      <td><span class="status-badge-cell status-${e.status}">${e.status}</span></td>
                      <td>${e.exitCode !== null ? e.exitCode : "-"}</td>
                      <td>${e.taskId || "-"}</td>
                      <td>${formatDate(e.completedAt)}</td>
                      <td>${escapeHtml(e.summary || "-")}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  } catch (error) {
    console.error("Failed to render evidence:", error);
    container.innerHTML = '<div class="error-state">Failed to load evidence data</div>';
  }
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return dateStr;
  }
}

function showEmptyState(message: string) {
  const grid = document.getElementById("overviewGrid")!;
  grid.innerHTML = `<div class="empty-state">${message}</div>`;
}

function showErrorState(error: any) {
  const grid = document.getElementById("overviewGrid")!;
  grid.innerHTML = `<div class="error-state">Error: ${error.message}</div>`;
}

function updateLastRefresh() {
  const el = document.getElementById("lastRefresh")!;
  el.textContent = lastRefreshTime ? `Last refreshed: ${lastRefreshTime.toLocaleTimeString()}` : "Last refreshed: never";
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize
async function main() {
  // All initialization is done via host.onReady
}

main();