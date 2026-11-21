#!/usr/bin/env bash
# Run Cypress natively inside the nix e2e dev shell (Cypress from nixpkgs,
# see flake.nix devShells.e2e) against a locally running frontend.
#
#   scripts/run-cypress-local.sh [spec]          # default: all specs
#   BASE_URL=http://localhost:5173 scripts/run-cypress-local.sh cypress/e2e/season-planner.cy.ts
#
# Videos/screenshots are copied to docs/docs/media/cypress/ like scripts/run-cypress.sh does.
set -euo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
BASE_URL="${BASE_URL:-http://localhost:5173}"
SPEC="${1:-cypress/e2e/**/*.cy.ts}"
DOCS_MEDIA="$REPO/docs/docs/media/cypress"

status=0
nix develop "$REPO#e2e" --command bash -c "
  set -euo pipefail
  cd '$REPO/e2e'
  # cypress CLI (same version as the nix binary) + typescript for the .ts specs
  [ -d node_modules/cypress ] || npm install --no-save --no-audit --no-fund \"cypress@\$CYPRESS_NIX_VERSION\" typescript@5
  npx cypress run --browser electron --headless --spec '$SPEC' --config baseUrl='$BASE_URL'
" || status=$?

mkdir -p "$DOCS_MEDIA/videos" "$DOCS_MEDIA/screenshots"
cp -r "$REPO/e2e/cypress/results/videos/." "$DOCS_MEDIA/videos/" 2>/dev/null || true
cp -r "$REPO/e2e/cypress/results/screenshots/." "$DOCS_MEDIA/screenshots/" 2>/dev/null || true
echo "Results copied to docs/docs/media/cypress/ (cypress exit status $status)"
exit $status
