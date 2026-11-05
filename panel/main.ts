import { connectHost } from "@openchamber/sdk";
import { applyHostReady } from "@openchamber/sdk/ui";
import { readSnapshot } from "./src/api.ts";
import { mountApp } from "./src/app.ts";
import { VIEWS, type ViewId } from "./src/types.ts";

const host = connectHost();
let mounted: { refresh: () => Promise<void> } | null = null;

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  document.body.dataset.theme = ctx.theme.mode;
  document.body.dataset.surface = ctx.surface;
  if (!mounted) {
    const root = document.getElementById("app");
    if (!root) throw new Error("vstack panel root is missing");
    const candidate = document.body.dataset.view;
    const initial = VIEWS.find((item) => item.id === candidate)?.id as ViewId | undefined;
    mounted = mountApp(root, { read: readSnapshot, ...(initial ? { view: initial } : {}) });
  } else {
    void mounted.refresh();
  }
});

host.onDirectory(() => {
  if (mounted) void mounted.refresh();
});
