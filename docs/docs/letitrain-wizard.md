# LetItRain Wizard

The **LetItRain** feature automates watering task assignment across the community garden.
Members register their availability and capacity once through a 3-step wizard;
the algorithm then distributes tasks fairly and publishes a plan.

---

## Wizard walkthrough

### Step 1 — Frequency

The user selects how many times per week they are willing to water.
The slider range is 1–7.

This value is converted to a `maximumTasksPerMonth` for the API:

```
maximumTasksPerMonth = round(frequency × 4.33)
```

The animated carrot bed at the bottom of the wizard grows taller as the
selected frequency increases — a small visual reward for high engagement.

### Step 2 — Availability

The user selects individual dates using the calendar component.
Dates span from the previous Monday through the end of next month.

Rows can be selected by calendar week; columns by day of the week.
Individual cells carry a `data-testid="calendar-date-{YYYY-MM-DD}"` attribute
used by Cypress tests.

### Step 3 — Profile

The user enters a **nickname** for human-readable identification.
No account or password is required.

- A UUID is generated on first visit and stored in `localStorage` under `pergola_person_id`.
- The nickname is stored under `pergola_nickname`.
- The user can tap **Forget me** to clear both values from the device.
- Push and email notification toggles are visible but **disabled** — they are planned for
  a future release.
- An info box describes the upcoming **ICS calendar subscription**, which will let users
  subscribe to their assigned watering tasks directly in any calendar app, referenced by nickname.

---

## User identity model

| Concept | Storage | Notes |
|---------|---------|-------|
| `personId` | `localStorage/pergola_person_id` | UUIDv4, auto-generated; survives page reloads |
| `nickname` | `localStorage/pergola_nickname` | Human-readable; optional but encouraged |
| Server-side account | — | **Not required** — no registration flow |

The `personId` is the primary key used in the watering API.
The `nickname` is stored alongside the availability entry and will be used
when rendering the published plan and the ICS feed.

**Forget me**: clears both keys from localStorage and generates a new UUID immediately.
A new submission with the new ID will create an independent availability entry.

---

## API integration

On wizard completion the frontend calls:

```http
POST /api/watering/availability
Content-Type: application/json

{
  "gardenIri": "https://data.semantic-desk.top/garden/Garden/Wurzelwerk",
  "personId": "<uuid>",
  "nickname": "GärtnerMax",
  "maximumTasksPerMonth": 13,
  "availableDates": ["2026-06-03", "2026-06-07", "2026-06-11"]
}
```

The endpoint upserts the entry (same `personId` + `gardenIri` overwrites the previous
availability), so re-running the wizard updates rather than duplicates the data.

Plan calculation is triggered separately (typically by a garden admin):

```http
POST /api/watering/plan/calculate
Content-Type: application/json

{ "gardenIri": "https://data.semantic-desk.top/garden/Garden/Wurzelwerk", "targetPersonsPerTask": 2 }
```

See the [Watering API](watering-api.md) page for full endpoint documentation.

---

## ICS calendar subscription (planned)

Once a plan is published, users will be able to subscribe via a URL like:

```
https://dev01.pergola.kuenste.live/api/watering/ics?gardenIri=...&nickname=GärtnerMax
```

This will return a valid `.ics` file with the user's assigned watering dates,
importable into any calendar app (Google Calendar, Apple Calendar, Thunderbird, etc.).

---

## Cypress E2E test

The spec `e2e/cypress/e2e/watering-wizard.cy.ts` covers the full end-to-end flow:

1. **Before hook** — clears all existing `WateringAvailability` entries for the test garden via the REST API (GET all → DELETE each), ensuring the suite is re-runnable.
2. **User 1 + 2** — walk through the full UI wizard (slider interaction, calendar date selection, nickname entry).
3. **Users 3–5** — submitted directly via `cy.request()` for speed.
4. **Plan calculation** — verifies the algorithm assigns tasks to at least 3 distinct people.
5. **Plan retrieval** — verifies the stored plan is returned by GET.

Run the test suite and record a video:

```bash
./scripts/run-cypress.sh
```

<video controls width="100%" style="border-radius:8px; margin-top:1rem">
  <source src="/media/cypress/videos/watering-wizard.cy.ts.mp4" type="video/mp4">
  No video yet — run <code>./scripts/run-cypress.sh</code> to generate it.
</video>
