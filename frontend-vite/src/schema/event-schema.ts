import { z } from "zod";
import { JsonSchema } from "@graviola/json-schema-utils";
import { mergeSchemaDefinitions } from "./utils/mergeSchemaDefinitions";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

// ---------------------------------------------------------------------------
// GardenEvent — a date in the garden's calendar: get-together, workday,
// workshop, celebration. Independent of the season planning.
//
// The model follows iCalendar (RFC 5545) so that a calendar feed can later be
// generated without conversions. Property → iCal:
//
//   @id            UID            (the IRI never changes: a stable UID)
//   name           SUMMARY
//   description    DESCRIPTION    (plain text: iCal has no Markdown)
//   startsOn       DTSTART        (date)
//   startsAt       DTSTART        (local time; empty = all-day, VALUE=DATE)
//   endsOn         DTEND          (date; the last day counts, iCal's DTEND is
//                                  exclusive for all-day events: add a day)
//   endsAt         DTEND          (local time)
//   timeZone       TZID           (IANA name; date and time are local to it,
//                                  so 18:00 stays 18:00 across DST changes)
//   place          LOCATION
//   eventCategory  CATEGORIES
//   eventStatus    STATUS         (CONFIRMED | TENTATIVE | CANCELLED)
//   url            URL
//   contact        CONTACT
//   garden         the calendar the event belongs to (one feed per garden)
//   createdAt      CREATED
//   modifiedAt     LAST-MODIFIED, DTSTAMP
//   sequence       SEQUENCE       (0 on creation, +1 on every save)
//
// All events are public: there is no CLASS. Everything entered here may end up
// in a public calendar feed.
//
// Not modelled yet (additive, no migration needed): RRULE/EXDATE for repeats,
// ORGANIZER, ATTACH, VALARM.
//
// The property names are specific on purpose: JSON Forms translations are
// keyed by property name, and `startDate` / `status` already carry the
// wording of plantings.
// ---------------------------------------------------------------------------

export const EVENT_CATEGORIES = ["gathering", "workday", "workshop", "celebration", "meeting", "other"] as const;
export const EVENT_STATUSES = ["confirmed", "tentative", "cancelled"] as const;
/** iCal STATUS values, by our status */
export const EVENT_STATUS_ICAL = { confirmed: "CONFIRMED", tentative: "TENTATIVE", cancelled: "CANCELLED" } as const;
/** Zone of events without one. A per-garden setting can replace it later. */
export const DEFAULT_TIME_ZONE = "Europe/Berlin";

export type EventCategory = (typeof EVENT_CATEGORIES)[number];
export type EventStatus = (typeof EVENT_STATUSES)[number];

const GardenEventSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}GardenEvent`),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    startsOn: z.string().meta({ format: "date" }).describe("First day (YYYY-MM-DD)"),
    startsAt: z.string().meta({ format: "time" }).optional().describe("Start time (local); empty = all-day"),
    endsOn: z.string().meta({ format: "date" }).optional().describe("Last day (inclusive); empty = one day"),
    endsAt: z.string().meta({ format: "time" }).optional().describe("End time (local)"),
    timeZone: z.string().optional().describe("IANA time zone of date and time"),
    place: z.string().optional(),
    eventCategory: z.enum(EVENT_CATEGORIES).optional(),
    eventStatus: z.enum(EVENT_STATUSES).optional(),
    url: z.string().meta({ format: "uri" }).optional(),
    contact: z.string().optional(),
    // Only the link: the garden schema is not imported here (it imports this
    // file), and an event never writes its garden back.
    garden: z.object({ "@id": z.string().optional() }).loose().optional().describe("The garden whose calendar it is"),
    createdAt: z.string().optional().describe("When the event was created (ISO date-time)"),
    modifiedAt: z.string().optional().describe("When the event was last changed (ISO date-time)"),
    sequence: z.number().int().min(0).optional().describe("Revision number, +1 on every save"),
  })
  .loose()
  .meta({
    id: "GardenEvent",
    title: "Garden event",
    description: "A date in the garden calendar",
  });

// Descriptions are left out wherever the German and English texts live in
// i18n/<lang>/jsonforms.json: a schema description would show up untranslated.
const eventDefinitions: NonNullable<JsonSchema["definitions"]> = {
  GardenEvent: {
    type: "object",
    title: "Garden event",
    description: "A date in the garden calendar",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}GardenEvent`, title: "Type" },
      name: { type: "string", minLength: 1, title: "Name" },
      description: { type: "string", title: "Description" },
      startsOn: { type: "string", format: "date", title: "Starts on" },
      startsAt: { type: "string", format: "time", title: "Starts at" },
      endsOn: { type: "string", format: "date", title: "Ends on" },
      endsAt: { type: "string", format: "time", title: "Ends at" },
      timeZone: { type: "string", title: "Time zone" },
      place: { type: "string", title: "Place" },
      eventCategory: { type: "string", enum: [...EVENT_CATEGORIES], title: "Kind of event" },
      eventStatus: { type: "string", enum: [...EVENT_STATUSES], title: "Status" },
      url: { type: "string", format: "uri", title: "Link" },
      contact: { type: "string", title: "Contact" },
      garden: { $ref: "#/definitions/Garden", title: "Garden" },
      createdAt: { type: "string", format: "date-time", title: "Created" },
      modifiedAt: { type: "string", format: "date-time", title: "Changed" },
      sequence: { type: "integer", minimum: 0, title: "Revision" },
    },
    required: ["name", "startsOn"],
    additionalProperties: true,
  },
};

export const eventSchema: JsonSchema = mergeSchemaDefinitions([{ definitions: eventDefinitions } as JsonSchema]);

const ctl = (scope: string, extra: Record<string, unknown> = {}) => ({
  type: "Control",
  scope: `#/properties/${scope}`,
  ...extra,
});
const row = (...elements: unknown[]) => ({ type: "HorizontalLayout", elements });
/** Show dates the German way, store them as ISO dates. */
const dateOptions = { options: { dateFormat: "DD.MM.YYYY", dateSaveFormat: "YYYY-MM-DD" } };
/** Show times as 24-hour HH:mm, store them as iCal-compatible HH:mm:ss. */
const timeOptions = { options: { timeFormat: "HH:mm", timeSaveFormat: "HH:mm:ss", ampm: false } };
/** The end time only makes sense for a timed event (all-day = no start time). */
const onlyWithStartTime = {
  rule: {
    effect: "SHOW",
    condition: { scope: "#/properties/startsAt", schema: { type: "string", minLength: 1 } },
  },
};

export const eventConfiguration = {
  schema: eventSchema,
  primaryFields: {
    GardenEvent: {
      label: "name",
      description: "place",
    },
  },
  typeNameLabelMap: {
    GardenEvent: "Garden event",
  },
  typeNameUiSchemaOptionsMap: {
    GardenEvent: {
      dropdown: true,
    },
  },
  // Not in the form: garden, timeZone, createdAt, modifiedAt, sequence — the app
  // sets them (see api/events.ts).
  uischemata: {
    GardenEvent: {
      type: "VerticalLayout",
      elements: [
        ctl("name"),
        row(ctl("eventCategory"), ctl("eventStatus")),
        row(ctl("startsOn", dateOptions), ctl("startsAt", timeOptions)),
        row(ctl("endsOn", dateOptions), ctl("endsAt", { ...timeOptions, ...onlyWithStartTime })),
        ctl("place"),
        ctl("description", { options: { multi: true } }),
        row(ctl("url"), ctl("contact")),
      ],
    },
  },
};

export { GardenEventSchema };
export type GardenEvent = z.infer<typeof GardenEventSchema>;
