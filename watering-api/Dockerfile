# syntax=docker/dockerfile:1

# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM oven/bun:1.3.10-alpine AS builder
WORKDIR /app

COPY .npmrc /root/.npmrc
COPY packages/letitrain/package.json ./packages/letitrain/
COPY watering-api/package.json       ./watering-api/
RUN echo '{"workspaces":["packages/letitrain","watering-api"]}' > package.json

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install

COPY packages/letitrain/src/ ./packages/letitrain/src/
COPY watering-api/src/       ./watering-api/src/

WORKDIR /app/watering-api
RUN bun build src/index.ts --target bun --outfile dist/index.js

# ── Stage 2: runtime ──────────────────────────────────────────────────────────
FROM oven/bun:1.3.10-alpine
WORKDIR /app
COPY --from=builder /app/watering-api/dist/index.js ./index.js
EXPOSE 3000
CMD ["bun", "run", "index.js"]
