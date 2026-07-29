# Development Setup

## Prerequisites

- Docker with Compose v1 (or Compose plugin)
- Access to the `traefik` external Docker network on the host
- `.npmrc` with `@graviola` registry configured

## Starting the Dev Stack

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This starts:

- **oxigraph-dev** — RDF triplestore (dev data volume)
- **oxigraph-cors-dev** — NGINX CORS proxy → `sparql-dev01.pergola.kuenste.live`
- **frontend-dev** — Bun/Vite dev server → `dev01.pergola.kuenste.live`
- **docs** — MkDocs Material (this site) → `docs01.pergola.kuenste.live`

## Dependency Management

The frontend uses a materialized `package_materialized.json` to resolve
`workspace:*` and `catalog:` Bun monorepo references into concrete npm versions.

To regenerate after a `package.json` change (run from inside the graviola monorepo):

```bash
bun run materialize-deps
```

## Hot Reload

Both the frontend (Vite HMR via WSS) and this documentation site (MkDocs watch)
reload automatically on file changes. No container restart needed.
