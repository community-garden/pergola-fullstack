# syntax=docker/dockerfile:1

# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM oven/bun:1.3.10-alpine AS builder
WORKDIR /app

COPY .npmrc /root/.npmrc
COPY frontend-vite/package_materialized.json ./package.json

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install

COPY frontend-vite/ ./

# Vite embeds these at build time
ARG VITE_SPARQL_API_URL=https://sparql01.pergola.kuenste.live/query
ARG VITE_API_URL=https://pergola.kuenste.live/api
ENV VITE_SPARQL_API_URL=$VITE_SPARQL_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN bun run build

# ── Stage 2: serve ────────────────────────────────────────────────────────────
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY frontend-vite/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
