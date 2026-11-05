# AGENTS.md — vstack-openchamber

Version 0.2.0. The read-only OpenChamber panel over `.vstack/`. Seven views,
five honest states, no write path and no network path.

## Layout

| Path | Holds |
|---|---|
| `panel/main.ts` | Guest entry; registers the panel and the dashboard |
| `panel/src/api.ts` | Reads `.vstack/`; caches archives until state or history moves |
| `panel/src/model.ts` | Parses state and history into a view model; the five states |
| `panel/src/app.ts` | The seven views, grouping and copyable commands |
| `panel/src/types.ts` | Shared shapes and the view list |
| `panel/index.html`, `panel/style.css` | Shell and styles |
| `test/*.test.ts` | View, state, grouping and read-only coverage |

## Rules

- Read-only. No write path, no network path, no shell command.
- Seven views: Now, Plan, Evidence, Timeline, Decisions, Deliveries, Health.
- Five states: `missing`, `stale`, `incompatible`, `invalid`, `healthy`.
- A state schema newer than this panel reads is `incompatible` and renders
  nothing partial.
- A task with no evidence renders as **not run**, never as done.
- A read error renders as an error, never as an empty project.
- Every value comes from `.vstack/`. Nothing is derived or invented.
- `stale` means the last history revision differs from `state.revision`.
  Equal revisions are healthy.
- Archived deliveries stay browseable when `state.json` is broken.
- Archives are reloaded only when state or history changes.

## Verification

```bash
pnpm typecheck
pnpm test
```

Release verification runs in Docker from the workspace that holds all three
repositories. The harness is not part of this repository:

```bash
./docker/test.sh panel
```

A host-run `pnpm test` is not accepted release verification.

## Documents

- `README.md` — views, states, install and compatibility.
- `RELEASE-NOTES.md` — scope, honest states and migration from 0.1.0.
- `LICENSE`, `NOTICE` — MIT and SDK credit.
