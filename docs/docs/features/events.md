# Termine (Gartenkalender)

Eigener Bereich `/:gardenId/events` für Treffen, Arbeitseinsätze, Workshops und Feste. Er ist unabhängig von der Saisonplanung. Es gibt noch keine Kalenderansicht: Die Seite ist eine Graviola-Tabelle (anlegen, bearbeiten, duplizieren, löschen), die Formulare kommen aus dem Schema. Auf der Startseite zeigt ein Glas-Panel die nächsten Termine.

## Datenmodell `GardenEvent`

Das Modell folgt iCalendar (RFC 5545), damit ein Kalender-Abo später ohne Umrechnung entstehen kann. Alle Termine sind öffentlich (kein `CLASS`): Was eingetragen wird, darf später in einem öffentlichen Feed stehen.

| Eigenschaft | iCal | Hinweis |
|---|---|---|
| `@id` | `UID` | Die IRI ändert sich nie. Eine Kopie bekommt eine neue. |
| `name` | `SUMMARY` | |
| `description` | `DESCRIPTION` | Nur Text, iCal kennt kein Markdown. |
| `startsOn` | `DTSTART` | Datum `YYYY-MM-DD`. |
| `startsAt` | `DTSTART` | Ortszeit `HH:mm:ss`. **Leer heißt ganztägig** (`VALUE=DATE`). |
| `endsOn` | `DTEND` | Letzter Tag, zählt mit. Beim Export ganztägig +1 Tag (iCal-Ende ist exklusiv). |
| `endsAt` | `DTEND` | Nur bei Terminen mit Uhrzeit. |
| `timeZone` | `TZID` | IANA-Name, Standard `Europe/Berlin`. Datum und Zeit sind Ortszeit, 18:00 bleibt auch nach der Zeitumstellung 18:00. |
| `place` | `LOCATION` | Freitext. |
| `eventCategory` | `CATEGORIES` | Treffen, Arbeitseinsatz, Workshop, Fest, Plenum, Sonstiges. |
| `eventStatus` | `STATUS` | `CONFIRMED`, `TENTATIVE`, `CANCELLED`. Absagen behalten die UID, Abonnenten sehen die Änderung. |
| `url`, `contact` | `URL`, `CONTACT` | Kontakt ist Freitext und für alle sichtbar. |
| `garden` | – | Zu welchem Garten (Kalender) der Termin gehört. |
| `createdAt` | `CREATED` | Setzt die App beim ersten Speichern. |
| `modifiedAt` | `LAST-MODIFIED`, `DTSTAMP` | Setzt die App bei jedem Speichern. |
| `sequence` | `SEQUENCE` | 0 beim Anlegen, +1 bei jedem Speichern. |

Noch nicht modelliert, später ohne Migration ergänzbar: `RRULE`/`EXDATE` (Wiederholungen), `ORGANIZER`, `ATTACH`, `VALARM`. Bis dahin hilft die Zeilenaktion **Duplizieren**.

Garten, Zeitzone, Erstellzeit, Änderungszeit und Revision stehen nicht im Formular. Sie werden nach dem Speichern gesetzt (`PergolaIntentBus`, Intent `entity-saved`), egal wie das Formular geöffnet wurde.

## Startseite

`EventsPreview` (`frontend-vite/src/components/events/`) zeigt höchstens vier Zeilen: den zuletzt beendeten Termin, falls er höchstens 14 Tage zurückliegt und nicht abgesagt war, dazu die nächsten Termine (drei, sonst vier). Laufende Termine zählen als kommend. Abgesagte kommende Termine bleiben durchgestrichen sichtbar. Ein Klick öffnet den Detaildialog.

Ab 960 px steht das Panel links neben dem Wetter, darunter über dem Wetter. Die Regeln stehen in `eventTiming.ts` und werden später auch vom Feed genutzt.

## Bekannte Grenzen

- Die Tabelle zeigt wie die anderen Tabellen alle Termine, nicht nur die des aktuellen Gartens. Das Startseiten-Panel filtert nach Garten.
- Die Beschriftung „Name“ ist für alle Typen gleich, weil JSON-Forms-Übersetzungen nach Eigenschaftsname gelten.

## Tests

- `eventTiming.test.ts`, `formatEvent.test.ts`: Ganztägig, exklusives Ende, Zeitumstellung, 14-Tage-Grenze.
- `__tests__/garden-events.test.ts`: speichern, nach Garten lesen, Stempel, Kopie, Löschen (gegen Oxigraph).
- `e2e/cypress/e2e/events.cy.ts`: Startseite und Terminseite.

<video controls width="100%" style="border-radius:8px">
<source src="/media/cypress/videos/events.cy.ts.mp4" type="video/mp4">
</video>
