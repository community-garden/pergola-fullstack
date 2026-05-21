# Watering Availability API

The Watering API lets community members anonymously register their availability for watering shifts. After a collection period, the garden coordinator triggers plan calculation — the LetItRain algorithm distributes tasks fairly and the result is stored as a queryable watering plan.

## Architecture

```
Frontend Wizard  →  POST /api/watering/availability  →  Oxigraph (SPARQL)
                                                             ↓
                      POST /api/watering/plan/calculate  →  LetItRain algorithm
                      GET  /api/watering/plan            ←  stored WateringPlan
```

The `watering-api` service is a Bun/Hono process served under `/api` on the same domain as the frontend. It uses the Graviola SPARQL store interface to persist data directly to the Oxigraph triple store.

## No authentication

Users participate anonymously. The frontend generates a UUID per device (stored in `localStorage`) and includes it as `personId` in every submission. The API has no login, no session, no registration.

## Endpoints

### `POST /api/watering/availability`

Submit or update a user's watering availability.

**Request body:**
```json
{
  "gardenIri": "https://data.semantic-desk.top/garden/Garden/Wurzelwerk",
  "personId": "550e8400-e29b-41d4-a716-446655440000",
  "maximumTasksPerMonth": 2,
  "availableDates": ["2026-06-02", "2026-06-05", "2026-06-09"]
}
```

**Response:** `201 Created` with the stored entity including its `@id`.

### `GET /api/watering/availability?gardenIri=<IRI>`

List all availability entries for a garden.

### `DELETE /api/watering/availability/:id`

Remove an entry (e.g. user withdraws).

### `POST /api/watering/plan/calculate`

Run the LetItRain assignment algorithm and persist the result.

**Request body:**
```json
{
  "gardenIri": "https://data.semantic-desk.top/garden/Garden/Wurzelwerk",
  "targetPersonsPerTask": 2
}
```

**Response:** `200 OK` with the full `WateringPlan` including `assignments[]`.

### `GET /api/watering/plan?gardenIri=<IRI>`

Retrieve the most recently calculated plan for a garden.

## Data model

### WateringAvailability

Stored at `https://data.semantic-desk.top/garden/WateringAvailability/{gardenSlug}-{personId}`.

| Field | Type | Description |
|---|---|---|
| `gardenIri` | IRI string | Which garden this submission is for |
| `personId` | string | Anonymous participant identifier |
| `maximumTasksPerMonth` | integer | How many times per month the person is willing to water |
| `availableDates` | string[] | ISO dates (`YYYY-MM-DD`) the person can water |
| `submittedAt` | ISO datetime | Server-assigned timestamp |

### WateringPlan

Stored at `https://data.semantic-desk.top/garden/WateringPlan/{gardenSlug}-current`.

| Field | Type | Description |
|---|---|---|
| `gardenIri` | IRI string | Garden this plan covers |
| `calculatedAt` | ISO datetime | When the plan was generated |
| `validFrom` | ISO date | First task date in the plan |
| `validUntil` | ISO date | Last task date in the plan |
| `assignments` | `{ date, personId }[]` | One entry per assigned watering shift |

## Running locally

The service starts automatically with the dev stack:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Check it's up:

```bash
curl https://dev01.pergola.kuenste.live/api/watering/health
```

## E2E test

The Cypress spec `e2e/cypress/e2e/watering-api.cy.ts` covers the full flow:
submitting fixture entries → listing → calculating → reading the plan.

```bash
./scripts/run-cypress.sh
```
