# Compact weather widget

A compact glass-style weather card for the home dashboard. It shows the current
conditions for the garden location (temperature, description, feels-like,
humidity, wind, sunrise and sunset) with reduced background animations.

The widget lives in `frontend-vite/src/components/weather/WeatherCompact.tsx` and is
shown on `/:gardenId/home`. Coordinates come from `Garden.location` (WKT point).
The card title is the station name from the weather response (`name`), not the garden name.
Stories are under **Weather → WeatherCompact**
(`bun run storybook` on port **6006**).

---

## Development

```bash
cd frontend-vite
bun run storybook
```

Open [http://localhost:6006](http://localhost:6006) and pick **Weather / WeatherCompact**.
Stories use mocked OpenWeather data (no live API). Use the Storybook language toolbar
for German / English labels (`weather` i18n namespace).

### Cypress

Storybook must be running on the host. Then:

```bash
cd e2e
npx cypress run --spec cypress/e2e/weather-compact.cy.ts \
  --env STORYBOOK_URL=http://localhost:6006
```

Video output follows the project convention under `docs/docs/media/cypress/videos/`
when using `scripts/run-cypress.sh` (other specs target the dev app URL).

<video controls width="100%" style="border-radius:8px">
  <source src="/media/cypress/videos/weather-compact.cy.ts.mp4" type="video/mp4">
</video>

## Related

- Large weather card: `WeatherView.tsx`
- OpenWeather fetch: `components/weather/helper.ts`
- Garden coordinates: `Garden.location` (WKT) in garden settings (`LocationRenderer`)