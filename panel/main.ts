/**
 * vstack Workflow - OpenChamber Panel (Read-Only Dashboard)
 * Thin entry point - delegates to Dashboard component
 */

import { connectHost } from "@openchamber/sdk";
import { applyHostReady } from "@openchamber/sdk/ui";
import { setProjectDir } from "./src/services/api.ts";
import { renderDashboard } from "./src/components/Dashboard.ts";

const POLL_INTERVAL = 3000;

let host = connectHost();
let currentProjectDir: string | null = null;
let refreshInterval: number | null = null;

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
});

async function loadDashboard() {
  if (!currentProjectDir) return;
  
  try {
    const { readManifest, readDashboardIndex } = await import("./src/services/api.ts");
    const manifest = await readManifest();
    if (!manifest) return;
    
    if (manifest.schemaVersion !== 1) return;
    
    const index = await readDashboardIndex();
    if (!index) return;
    
    await renderDashboard(index);
  } catch (error) {
    console.error("Failed to load dashboard:", error);
  }
}