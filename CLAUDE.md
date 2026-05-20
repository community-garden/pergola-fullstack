# Pergola Fullstack — Claude Working Notes

## Project

Community garden management app. React 19 + Vite 6 frontend (TypeScript, MUI 7),
Oxigraph RDF/SPARQL backend, served via Docker Compose + Traefik with TLS.

## Dev URLs (all HTTPS via Traefik)

| Service | URL |
|---|---|
| Frontend (Vite HMR) | https://dev01.pergola.kuenste.live |
| SPARQL endpoint | https://sparql01.pergola.kuenste.live |
| Documentation (MkDocs) | https://docs01.pergola.kuenste.live |

## Starting the stack

```bash
docker-compose -f docker-compose.dev.yml up -d
```

The host runs **docker-compose v1** — use `docker-compose`, NOT `docker compose`.

When replacing a container after a rebuild, docker-compose v1 errors on `up --no-deps`
if the old container still exists. Remove it first:

```bash
docker rm -f pergola-fullstack_<service>_1
docker-compose -f docker-compose.dev.yml up -d <service>
```

## Development workflow

For **every feature or plan**, follow this loop:

1. **Implement** the feature in `frontend-vite/src/`
2. **Document** — add or update a page in `docs/docs/`
   - Update `docs/mkdocs.yml` nav if it is a new page
3. **Test** — add a Cypress spec in `e2e/cypress/e2e/<feature>.cy.ts`
4. **Record** — run the Cypress container:
   ```bash
   ./scripts/run-cypress.sh
   ```
   Videos land at `docs/docs/media/cypress/videos/<spec>.mp4`
   Screenshots land at `docs/docs/media/cypress/screenshots/<spec>/`
5. **Embed** the video in the docs page:
   ```html
   <video controls width="100%" style="border-radius:8px">
     <source src="/media/cypress/videos/<spec>.mp4" type="video/mp4">
   </video>
   ```
6. **Restart docs** container after any new binary file is added (MkDocs watch mode
   detects `.md` changes but not new binary additions):
   ```bash
   docker-compose -f docker-compose.dev.yml restart docs
   ```
7. **Commit** all of: source changes, docs page, Cypress spec, updated mkdocs.yml nav.
   Videos and screenshots are gitignored (large binaries) — only the `.gitkeep` files
   are tracked.

## Frontend dependency management

`frontend-vite/` was extracted from a Bun monorepo. It uses a **materialized**
`package_materialized.json` that resolves `workspace:*` and `catalog:` refs to concrete
npm versions. The Docker build copies this file outside `/app` so the volume mount
cannot clobber it.

- To add a new package: add it to both `package.json` AND `package_materialized.json`
- To regenerate `package_materialized.json` from scratch: run `bun run materialize-deps`
  from inside the graviola monorepo context, then copy the result back
- Private `@graviola/*` packages resolve from `https://npm.winzlieb.eu` (configured in
  `.npmrc` at repo root, copied to `/root/.npmrc` in the Docker image)

After changing `package_materialized.json`, rebuild the frontend image:

```bash
docker-compose -f docker-compose.dev.yml build frontend-dev
docker rm -f pergola-fullstack_frontend-dev_1
docker-compose -f docker-compose.dev.yml up -d frontend-dev
```

## MkDocs conventions

- MkDocs project root: `docs/` (mounted as `/docs` in the container)
- Docs content: `docs/docs/` (set as `docs_dir: docs` in mkdocs.yml)
- **`docs/docs/assets/` is reserved by MkDocs Material** for its theme JS/CSS.
  User media files go in `docs/docs/media/` instead.
- Cypress outputs: `docs/docs/media/cypress/videos/` and `.../screenshots/`
- Videos and screenshots are gitignored; `.gitkeep` files preserve the dirs.

## Cypress conventions

- Specs: `e2e/cypress/e2e/*.cy.ts`
- Config: `e2e/cypress.config.ts` — baseUrl `https://dev01.pergola.kuenste.live`
- Runs as a standalone Docker container (NOT part of docker-compose)
- Image: `cypress/included:latest` (Cypress 15+, Chrome 148+)
- TypeScript target must be `es2015` or higher (`es5` is deprecated in TS7+)
- `Cypress.on('uncaught:exception', () => false)` in `support/e2e.ts` silences
  OIDC redirect noise from the app

## Bun workspace monorepo

The repo root is a **Bun workspace**. Workspace members are declared in the root
`package.json`:

```json
"workspaces": ["frontend-vite", "packages/*"]
```

Shared packages live in `packages/`. Currently:

| Package | Path | Purpose |
|---|---|---|
| `@pergola/letitrain` | `packages/letitrain/` | Watering-task assignment algorithm |

To run unit tests for a package (requires Bun — use Docker on the host):

```bash
docker run --rm \
  -v $(pwd):/workspace \
  -w /workspace/packages/letitrain \
  oven/bun:1.3.10-alpine \
  bun test
```

To install workspace deps at the root (regenerates `bun.lock`):

```bash
docker run --rm \
  -v $(pwd):/workspace \
  -w /workspace \
  oven/bun:1.3.10-alpine \
  bun install
```

The `frontend-vite/` Docker build is unaffected — its `Dockerfile.dev` uses
`package_materialized.json` and installs packages standalone inside the container.

## Key paths

| Path | Purpose |
|---|---|
| `docker-compose.dev.yml` | Dev stack (oxigraph, frontend, docs) |
| `frontend-vite/Dockerfile.dev` | Frontend container build |
| `frontend-vite/package_materialized.json` | Resolved deps for Docker |
| `frontend-vite/src/` | React application source |
| `packages/letitrain/` | LetItRain watering assignment algorithm |
| `docs/mkdocs.yml` | MkDocs configuration and nav |
| `docs/docs/` | Documentation markdown content |
| `docs/docs/media/cypress/` | Cypress video/screenshot outputs |
| `e2e/cypress/e2e/` | Cypress specs |
| `e2e/cypress.config.ts` | Cypress configuration |
| `scripts/run-cypress.sh` | Run Cypress container + route outputs into docs |
| `.npmrc` | Private registry for @graviola packages |
