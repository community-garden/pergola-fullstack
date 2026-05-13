# Pergola Garden Dev Docs

Welcome to the living documentation for the **Pergola** community garden platform.

This site runs in watch mode and updates instantly as files change.

## Services

| Service | URL | Description |
|---|---|---|
| Frontend (dev) | [dev01.pergola.kuenste.live](https://dev01.pergola.kuenste.live) | Vite dev server with HMR |
| SPARQL Endpoint | [sparql01.pergola.kuenste.live](https://sparql01.pergola.kuenste.live) | Oxigraph RDF store |
| Documentation | [docs01.pergola.kuenste.live](https://docs01.pergola.kuenste.live) | This site |

## Stack

- **Frontend**: React 19 + Vite 6 + MUI 7, served via Bun
- **Data**: Oxigraph (SPARQL 1.1), RDF/Turtle
- **Infra**: Docker Compose + Traefik, TLS via Let's Encrypt
- **Testing**: Cypress 13 (E2E, video recording)
- **Docs**: MkDocs Material (this site)
