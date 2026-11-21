#!/usr/bin/env bash
# Local dev database helper.
#   scripts/local-dev.sh up     start Oxigraph (localhost:7880) and load the seed if the DB is empty
#   scripts/local-dev.sh reset  wipe the DB volume, start fresh and load the seed
#   scripts/local-dev.sh down   stop Oxigraph (keeps data)
#   scripts/local-dev.sh seed-season [year]
#                               (re)import plants, varieties, persons and wishes from
#                               Saisonplanung/pflanzen/*.json (default season 2027)
#   scripts/local-dev.sh plant-images
#                               derive the web images (frontend-vite/public/media/plants,
#                               not versioned) and set only the image URLs of the
#                               species in the store; plantings stay untouched
set -euo pipefail
cd "$(dirname "$0")/.."

COMPOSE="docker-compose -f docker-compose.local.yml"
SPARQL="http://localhost:7880"
SEED="frontend-vite/fixtures/wurzelwerk-garden.ttl"

wait_ready() {
  for _ in $(seq 1 30); do
    curl -sf "$SPARQL/query?query=ASK%7B%7D" -H 'Accept: application/sparql-results+json' >/dev/null && return 0
    sleep 1
  done
  echo "Oxigraph did not become ready on $SPARQL" >&2; exit 1
}

triple_count() {
  curl -sf "$SPARQL/query" -H 'Accept: text/csv' \
    --data-urlencode 'query=SELECT (COUNT(*) AS ?c) WHERE { ?s ?p ?o }' | tail -n1 | tr -d '\r'
}

seed() {
  curl -sf -X POST "$SPARQL/store?default" -H 'Content-Type: text/turtle' --data-binary "@$SEED"
  echo "Seeded $SEED ($(triple_count) triples in store)"
}

case "${1:-up}" in
  up)
    $COMPOSE up -d
    wait_ready
    if [ "$(triple_count)" = "0" ]; then seed; else echo "Store not empty ($(triple_count) triples), skipping seed"; fi
    ;;
  reset)
    $COMPOSE down -v
    $COMPOSE up -d
    wait_ready
    seed
    ;;
  down)
    $COMPOSE down
    ;;
  seed-season)
    wait_ready
    SPARQL="$SPARQL" python3 scripts/import-saisonplanung.py --season "${2:-2027}" --load
    ;;
  plant-images)
    wait_ready
    python3 scripts/plant-images.py
    SPARQL="$SPARQL" python3 scripts/import-saisonplanung.py --images-only
    ;;
  *)
    echo "usage: $0 [up|reset|down|seed-season [year]|plant-images]" >&2; exit 1 ;;
esac
