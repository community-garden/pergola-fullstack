#!/usr/bin/env bash
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
RESULTS="$REPO/docs/docs/media/cypress"

mkdir -p "$RESULTS/videos" "$RESULTS/screenshots"

echo "Running Cypress against https://prod01.pergola.kuenste.live ..."

docker run --rm \
  --ipc=host \
  -v "$REPO/e2e:/e2e" \
  -v "$RESULTS:/e2e/cypress/results" \
  -w /e2e \
  cypress/included:latest \
  --browser chrome \
  --headless \
  --config baseUrl=https://prod01.pergola.kuenste.live

echo "✓ Done — video at: docs/docs/media/cypress/videos/landing.cy.ts.mp4"
