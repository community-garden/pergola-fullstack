import { generateIcsCalendar } from "ts-ics"
import type { IcsCalendar, IcsEvent, IcsDateObject } from "ts-ics"

export interface WateringIcsOptions {
  personIri: string
  assignments: ReadonlyArray<{ date: string; personIri: string }>
  /** Pre-translated summary, e.g. "Gießen im Wurzelwerk" */
  eventSummary: string
  /** Garden slug — used for prodId and download filename */
  gardenId: string
  /** Optional WKT POINT literal, e.g. "POINT(10.123 53.456)" */
  gardenLocation?: string
}

function parseWktPoint(wkt: string): string | undefined {
  // WKT POINT(lon lat) → ICS GEO format: lat;lon
  const m = wkt.match(/POINT\s*\(\s*([\d.-]+)\s+([\d.-]+)\s*\)/i)
  if (!m) return undefined
  return `${m[2]};${m[1]}`  // lat;lon (ICS order)
}

function allDayDate(dateStr: string): IcsDateObject {
  const [year, month, day] = dateStr.split("-").map(Number)
  return { date: new Date(Date.UTC(year, month - 1, day)), type: "DATE" }
}

export function generateWateringICS(opts: WateringIcsOptions): string {
  const { personIri, assignments, eventSummary, gardenId, gardenLocation } = opts

  const geo = gardenLocation ? parseWktPoint(gardenLocation) : undefined
  const now = new Date()

  const events: IcsEvent[] = assignments
    .filter((a) => a.personIri === personIri)
    .map((a): IcsEvent => ({
      uid: `${gardenId}-watering-${a.date}-${personIri.split("/").pop() ?? "person"}`,
      summary: eventSummary,
      stamp: { date: now },
      start: allDayDate(a.date),
      end: allDayDate(a.date),
      ...(geo ? { geo } : {}),
    }))

  const calendar: IcsCalendar = {
    version: "2.0",
    prodId: `-//${gardenId}//WateringPlan//EN`,
    events,
  }

  return generateIcsCalendar(calendar)
}
