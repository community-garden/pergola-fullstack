# Garten-Startseite

Die Route `/:gardenId/home` begrüßt im Garten-Kontext mit einem **Glas-Overlay**: halbtransparente Fläche mit `backdrop-filter`, darin Icons zu den wichtigsten Bereichen (Gartenplan, Pflanzen, Saisonplaner, Bewässerung, Garteneinstellungen). Nur Features mit aktivem Feature-Flag erscheinen; die Startseite selbst ist keine Kachel.

Darunter steht das kompakte **Wetter-Widget** (`WeatherCompact`). Die Koordinaten kommen vom Garten (`Garden.location`, derselbe WKT-Punkt wie auf der Karte). Der Titel ist der Stationsname aus der Wetterantwort, nicht der Gartenname.

## Bildnachweis

Unten rechts steht der Hinweis **Illustration: Joachim Tilsch**. Beim Darüberfahren (nur mit Maus) oder Antippen blendet Header und Seiteninhalt weich aus; das Hintergrundbild rückt per Animation in den Fokus. Gleichzeitig erscheint der Link zur [Website von Joachim Tilsch](http://www.joachim-tilsch.de/) zusammen mit einem Schließen-Button. Schließen geht über diesen Button, einen Tipp auf die Fläche, Escape oder erneutes Antippen des Hinweises. Auf dem Touchscreen gibt es kein Hover, damit die Ansicht nicht hängen bleibt.

Implementierung: `frontend-vite/src/components/home/`, eingebunden in `frontend-vite/src/pages/Home.tsx`.

## E2E-Test

Lokal gegen Vite (`http://localhost:5173`):

```bash
BASE_URL=http://localhost:5173 ./scripts/run-cypress-local.sh cypress/e2e/home.cy.ts
```

Gegen dev01 (Traefik):

```bash
./scripts/run-cypress.sh cypress/e2e/home.cy.ts
```

<video controls width="100%" style="border-radius:8px">
<source src="/media/cypress/videos/home.cy.ts.mp4" type="video/mp4">
</video>