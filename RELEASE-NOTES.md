# vstack-openchamber 0.2.0 release notes

**Released:** 2026-11-05
**Tag:** `v0.2.0`

## Scope

The optional read-only OpenChamber panel for the vstack recorder. Seven views
over `.vstack/`:

Now, Plan, Evidence, Timeline, Decisions, Deliveries, Health.

- Plan groups tasks by status and gives each row a copyable recorder command.
- Evidence groups claims by task; a task with no evidence shows **not run**.
- Decisions shows choices, alternatives, reasons, the review outcome and the
  waiver.
- Deliveries lists active, parked and closed deliveries; select one for its
  tasks, evidence, decisions and handoff. Archived records stay readable when
  `state.json` is broken.
- Health names five states and gives a next command.

The panel has no write path and no network path.

## Honest states

`missing`, `stale`, `incompatible`, `invalid`, `healthy`. A stale state compares
the last history revision with `state.json`; equal revisions are healthy.
Incompatible state renders no partial values.

## Install

1. Open OpenChamber -> Settings -> Extensions.
2. Install from `https://github.com/vipintom/vstack-openchamber.git`.
3. Enable **vstack Workflow**.

Or from a clone:

```bash
git clone https://github.com/vipintom/vstack-openchamber.git
cd vstack-openchamber
pnpm install
pnpm build
```

Load `panel/` as an unpacked extension.

## Compatibility

- OpenChamber >= 1.24.0 (`openchamber.engines.openchamber`).
- Recorder: `@vipintom/vstack-opencode` 0.2.0.
- State schema: 1. A newer schema is refused, not partially rendered.
- Pack: independent; the panel does not read the pack.

## Upgrade from 0.1.0

1. Disable and remove the 0.1.0 panel in OpenChamber -> Settings -> Extensions.
2. Delete the old extension directory.
3. Install 0.2.0 as above.
4. Keep the project's `.vstack/` directory; the 0.2.0 recorder owns its format.
   0.1.0 panel state is not migrated.

## Verification

The Docker harness lives in the workspace that holds all three vstack
repositories and is not published with this package. From that workspace root:

```bash
./docker/test.sh panel
```

The test suite covers all five health states, seven views, active and archived
deliveries, evidence grouping and the read-only boundary. A standalone clone
runs `pnpm test` for iteration only.

## Licence

MIT. See `LICENSE` and `NOTICE`.
