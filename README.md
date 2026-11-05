# vstack OpenChamber panel

Version 0.2.0. Read-only view of the vstack recorder. Seven views over
`.vstack/`, no writes, no invented values.

The panel is optional. It requires the `vstack-opencode` recorder; it does not
work from the Markdown pack alone.

## Views

| View | Shows |
|---|---|
| **Now** | Active delivery, phase, next task, next action, blockers, last activity |
| **Plan** | Tasks grouped by status, each with its check, evidence state and a copyable recorder command |
| **Evidence** | Claims and results grouped by task; a task with no evidence shows **not run**; unlinked evidence is separate |
| **Timeline** | Every recorded event in order: route, task, evidence, decision, handoff, close |
| **Decisions** | Choices, alternatives, reasons, consequences, the review outcome and any waiver |
| **Deliveries** | Every delivery recorded in this project, active, parked and closed; select one to read its tasks, evidence, decisions and handoff |
| **Health** | Missing files, stale state, incompatible version, broken history, with a next command |

Deliveries lists the current delivery and every archived record under
`.vstack/deliveries/`. A finished delivery stays readable after a new one opens.
If `state.json` is broken, Deliveries still lists archived records.

## Honest states

Five states, each with its own message and next command:

| State | Meaning |
|---|---|
| `missing` | No `.vstack/` in this project |
| `stale` | The last history revision and `state.json` disagree; the recorder may have stopped mid-write |
| `incompatible` | State schema is newer than this panel reads |
| `invalid` | A required record is malformed or broken |
| `healthy` | State is present, current and readable |

A task with no evidence renders as **not run**, never as done. A read error
renders as an error, never as an empty project.

## Read-only

The panel has no write path and no network path. Actionable rows offer a
copyable command. All values come from `.vstack/`; none are derived.

Files read:

- `.vstack/state.json` and `.vstack/history.jsonl` on every refresh
- `.vstack/deliveries/*.json`, reloaded only when state or history changes
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

### Offline

After one `pnpm install`, the clone builds and loads without network access.
`panel/` contains the built bundle.

### Windows

Load the folder by absolute path with forward slashes, for example
`C:/work/vstack-openchamber/panel`. The panel reads relative paths inside the
open project; it uses no shell commands.

## Uninstall

1. Disable and remove **vstack Workflow** in OpenChamber → Settings →
   Extensions.
2. Delete the extension directory.
3. Leave `.vstack/` in the project; the recorder owns it.

## Compatibility

- OpenChamber: >= 1.24.0 (`openchamber.engines.openchamber`).
- Recorder: `@vipintom/vstack-opencode` 0.2.0.
- State schema: 1. A newer schema produces an `incompatible` state and no
  partial rendering.

## Development

This repository has no test harness of its own. The Docker harness lives in
the workspace that holds all three vstack repositories and is not published
with any of them.

A standalone clone iterates with:

```bash
pnpm test
```

Release verification runs in Docker from that workspace root:

```bash
./docker/test.sh panel
```

A host-run `pnpm test` is not accepted release verification.

## Release notes and licence

- `RELEASE-NOTES.md` — scope, compatibility and the 0.1.0 migration.
- MIT. See `LICENSE` and `NOTICE`.
- Public repository, read-only: issues are welcome; pull requests are not
  accepted in 0.2.0.
