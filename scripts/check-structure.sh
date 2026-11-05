#!/usr/bin/env bash
# Panel structure gate: 7 views including Deliveries + read-only.
set -euo pipefail

# Gate 1: exactly 7 views in panel/src/types.ts, including Deliveries
VIEW_COUNT=$(grep -c '{ id: "' panel/src/types.ts)
if [ "$VIEW_COUNT" -ne 7 ]; then
  echo "ERROR: expected 7 views, found $VIEW_COUNT"
  exit 1
fi
grep -q '{ id: "deliveries", label: "Deliveries" }' panel/src/types.ts || {
  echo "ERROR: Deliveries view missing from panel/src/types.ts"
  exit 1
}
echo "OK: 7 views including Deliveries"

# Gate 2: read-only — no write path, no network path.
# NOTE: 'unlink(' with paren so the legitimate 'unlinked'
# variable in panel/src/app.ts does not trip the gate.
if grep -rnE 'unlink\(|postMessage|writeFile|appendFile|mkdirSync|fetch\(|WebSocket|XMLHttpRequest' panel/src panel/main.ts; then
  echo "ERROR: write/network API found — panel must stay read-only"
  exit 1
fi
echo "OK: read-only gate clean"
