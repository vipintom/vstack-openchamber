# vstack OpenChamber panel

Read-only view of the vstack recorder. Seven views over `.vstack/`, no writes, no invented values.

The panel is optional. It requires the `vstack-opencode` recorder; it does not work from the Markdown pack alone.

## Views

| View | Shows |
|---|---|
| **Now** | Active delivery, phase, next task, blockers, last activity |
| **Plan** | Tasks by status, each with its check and whether evidence exists |
| **Evidence** | Claims and results, grouped by task; not-run is visible |
| **Timeline** | Every recorded event in order: route, task, evidence, decision, handoff, close |
| **Decisions** | Choices, alternatives, reasons, consequences and waivers |
| **Deliveries** | Every delivery recorded in this project, active and closed; select one to read its tasks, evidence, decisions and handoff |
| **Health** | Missing files, stale state, incompatible version, broken history |

Deliveries lists the active delivery and every closed record under `.vstack/deliveries/`. The same data powers the record detail, so a finished delivery stays readable after a new one opens.

## Honest states

Five states, each with its own message and next action:

| State | Meaning |
|---|---|
| `missing` | No `.vstack/` in this project |
| `stale` | History is newer than `state.json`; the recorder may have stopped mid-write |
| `incompatible` | State schema is newer than this panel reads |
| `invalid` | A required record is malformed or broken |
| `healthy` | State is present, current and readable |

A task with no evidence renders as **not run**, never as done. A read error renders as an error, never as an empty project.

## Read-only

The panel has no write path and no network path. Every actionable row offers a copyable command. All values come from `.vstack/`; none are derived.

Files read:

- `.vstack/state.json`
- `.vstack/history.jsonl`
- `.vstack/deliveries/*.json`
- the Markdown record path named by a delivery

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
pnpm test
pnpm build
```

## Licence

MIT.
