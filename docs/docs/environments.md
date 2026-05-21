# Environments & Service URLs

## Development

Started with:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

| Service | URL | Description |
|---|---|---|
| **Frontend** | [https://dev01.pergola.kuenste.live](https://dev01.pergola.kuenste.live) | Vite HMR dev server |
| **Storybook** | [https://storybook01.pergola.kuenste.live](https://storybook01.pergola.kuenste.live) | Component explorer, watch mode |
| **Watering API** | [https://dev01.pergola.kuenste.live/api](https://dev01.pergola.kuenste.live/api) | REST API, watch mode |
| **SPARQL endpoint** | [https://sparql01.pergola.kuenste.live/query](https://sparql01.pergola.kuenste.live/query) | Oxigraph SPARQL |
| **Documentation** | [https://docs01.pergola.kuenste.live](https://docs01.pergola.kuenste.live) | MkDocs Material, this site |

All dev services use Bun's watch/HMR — source changes are picked up without rebuilding images.

## Production

Started with:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

| Service | URL | Description |
|---|---|---|
| **Frontend** | [https://pergola.kuenste.live](https://pergola.kuenste.live) | Nginx serving Vite build |
| **Watering API** | [https://pergola.kuenste.live/api](https://pergola.kuenste.live/api) | Compiled Bun runtime |
| **SPARQL endpoint** | [https://sparql01.pergola.kuenste.live/query](https://sparql01.pergola.kuenste.live/query) | Oxigraph SPARQL (shared) |

The production frontend is a fully static Vite build served by nginx.
The production API is compiled to a single JS bundle via `bun build` — no TypeScript overhead at runtime.

## Rebuilding for production

After any source change:
```bash
docker-compose -f docker-compose.prod.yml build
docker rm -f pergola-fullstack_frontend_1 pergola-fullstack_watering-api_1
docker-compose -f docker-compose.prod.yml up -d frontend watering-api
```

Build args for the frontend (embedded at compile time by Vite):

| Arg | Default |
|---|---|
| `VITE_SPARQL_API_URL` | `https://sparql01.pergola.kuenste.live/query` |
| `VITE_API_URL` | `https://pergola.kuenste.live/api` |

Override at build time if needed:
```bash
docker-compose -f docker-compose.prod.yml build \
  --build-arg VITE_SPARQL_API_URL=https://... \
  frontend
```
