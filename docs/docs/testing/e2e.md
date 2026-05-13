# E2E Tests

Cypress runs against the live HTTPS frontend at
[dev01.pergola.kuenste.live](https://dev01.pergola.kuenste.live) and outputs
recordings directly into this documentation.

Run a fresh recording:

```bash
./scripts/run-cypress.sh
```

The video appears below as soon as the container exits — no page reload needed
(MkDocs watch mode picks up the new file automatically).

---

## Landing Page

!!! info "Recorded with Cypress 13 + Chrome headless"

<video controls width="100%" style="border-radius:8px; margin-top:1rem">
  <source src="/media/cypress/videos/landing.cy.ts.mp4" type="video/mp4">
  No video yet — run <code>./scripts/run-cypress.sh</code> to generate it.
</video>

---

## Screenshots

Screenshots taken during test failures (or explicit `cy.screenshot()` calls)
land in `docs/docs/assets/cypress/screenshots/` and can be embedded here.
