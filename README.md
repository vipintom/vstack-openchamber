# vstack OpenChamber panel

Read-only view of the vstack recorder. Six views over `.vstack/`, no writes, no invented values.

The panel is optional. It requires the `vstack-opencode` recorder; it does not work from the Markdown pack alone.

## Views

| View | Shows |
|---|---|
| **Now** | Active delivery, phase, next action, blockers, last activity |
| **Plan** | Tasks by status, each with its check and whether evidence exists |
| **Evidence** | Claims and results grouped by task; not-run is visible |
| **Timeline** | Every recorded event in order: route, task, evidence, decision, handoff, close |
| **Decisions** | Choices, alternatives, reasons, waivers |
| **Health** | Missing files, stale state, incompatible version, broken history |

## Honest states

Five states, each with its own message and next action:

| State | Meaning |
|---|---|
| `missing` | No `.vstack/` in this project |
| `stale` | State predates the last recorder write |
| `incompatible` | State schema is newer than this panel reads |
| `invalid` | A required record is malformed or broken |
| `healthy` | State is present, current and readable |

A task with no evidence renders as **not run**, never as done. A read error renders as an error, never as an empty project.

## Read-only

The panel has no write path and no network path. Every actionable row offers a copyable command or tool call. All values come from `.vstack/`; none are derived.

## Install

### Extension manager

1. Open OpenChamber → Settings → Extensions.
2. Install from `https://github.com/vipintom/vstack-openchamber.git`.
3. Enable **vstack Workflow**.

### From a clone

```bash
git clone https://github.com/vipintom/vstack-openchamber.git
cd vstack-openchamber
pnpm install
pnpm build
```

Then load `panel/` as an unpacked extension.

## Compatibility

- OpenChamber: latest release at the time of vstack 0.2.0.
- Recorder: `@vipintom/vstack-opencode` 0.2.0.
- State schema: 1.

## Development

```bash
pnpm install
pnpm typecheck
pnpm build
pnpm test
```

## Licence

MIT.
