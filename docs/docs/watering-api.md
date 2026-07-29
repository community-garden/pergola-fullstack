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

Submit or update a user's watering availability for a specific month.

**Request body:**
```json
{
  "gardenIri": "https://data.semantic-desk.top/garden/Garden/Wurzelwerk",
  "personId": "550e8400-e29b-41d4-a716-446655440000",
  "maximumTasksPerMonth": 2,
  "availableDates": ["2026-06-02", "2026-06-05", "2026-06-09"],
  "targetMonth": "2026-06"
}
```

**Response:** `201 Created` with the stored entity including its `@id`.

Re-submitting with the same `personId` + `gardenIri` + `targetMonth` replaces the previous entry.

### `GET /api/watering/availability?gardenIri=<IRI>[&month=YYYY-MM]`

List availability entries for a garden. Pass `month` to filter to a specific month.

### `DELETE /api/watering/availability/:id`

Remove an entry (e.g. user withdraws).

### `DELETE /api/watering/availability/date`

Remove a single date from a person's availability without deleting their whole entry.

**Request body:**
```json
{
  "gardenIri": "https://data.semantic-desk.top/garden/Garden/Wurzelwerk",
  "personIri": "https://data.semantic-desk.top/garden/Person/550e8400-e29b-41d4-a716-446655440000",
  "targetMonth": "2026-06",
  "date": "2026-06-05"
}
```

If no dates remain after removal, the entire availability document is deleted.

### `POST /api/watering/plan/calculate`

Run the LetItRain assignment algorithm and persist the result for a calendar month.

**Request body:**
```json
{
  "gardenIri": "https://data.semantic-desk.top/garden/Garden/Wurzelwerk",
  "targetPersonsPerTask": 2,
  "targetMonth": "2026-06"
}
```

`targetMonth` defaults to next month when omitted.

**Response:** `200 OK` with the full `WateringPlan` including `assignments[]` and `targetMonth`.

### `GET /api/watering/plan?gardenIri=<IRI>[&month=YYYY-MM]`

Retrieve the calculated plan for a garden. `month` defaults to the current calendar month.

### `DELETE /api/watering/plan/:id/assignments`

Remove a single assignment from a calculated plan (manual correction).

**Request body:**
```json
{
  "date": "2026-06-05",
  "personIri": "https://data.semantic-desk.top/garden/Person/550e8400-e29b-41d4-a716-446655440000"
}
```

Returns the updated plan document.

### `DELETE /api/watering/plan/:id`

Remove an entire plan document.

## Data model

### WateringAvailability

Stored at `https://data.semantic-desk.top/garden/WateringAvailability/{gardenSlug}-{personId}-{YYYY-MM}`.

One document per person per garden per calendar month — re-submitting replaces it.

| Field | Type | Description |
|---|---|---|
| `gardenIri` | IRI string | Which garden this submission is for |
| `personId` | string | Anonymous participant identifier |
| `maximumTasksPerMonth` | integer | How many times per month the person is willing to water |
| `availableDates` | string[] | ISO dates (`YYYY-MM-DD`) the person can water |
| `targetMonth` | string | Calendar month (`YYYY-MM`) this entry covers |
| `submittedAt` | ISO datetime | Server-assigned timestamp |

### WateringPlan

Stored at `https://data.semantic-desk.top/garden/WateringPlan/{gardenSlug}-{YYYY-MM}`.

One plan per garden per calendar month — recalculating replaces the stored plan.

| Field | Type | Description |
|---|---|---|
| `gardenIri` | IRI string | Garden this plan covers |
| `targetMonth` | string | Calendar month (`YYYY-MM`) this plan covers |
| `calculatedAt` | ISO datetime | When the plan was generated |
| `validFrom` | ISO date | First task date in the plan |
| `validUntil` | ISO date | Last task date in the plan |
| `assignments` | `{ date, personIri }[]` | One entry per assigned watering shift |

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
