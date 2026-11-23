/**
 * Read and write model of the garden events (`GardenEvent`), through
 * Graviola's typed store like the bed notes (api/bedNotes.ts).
 *
 * The app, not the form, sets what iCal calls CREATED, LAST-MODIFIED and
 * SEQUENCE (see `stampedEventDoc`), and the garden the event belongs to.
 */
import type { CrudDatastoreStore } from '@graviola/edb-state-hooks';
import type { PergolaRegistry } from '../schema/registry';
import { DEFAULT_TIME_ZONE } from '../schema/event-schema';
import { toReferences } from '../utils/toReferences';
import type { EventTimingFields } from '../components/events/eventTiming';
import { GARDEN_NS, REF, idOf } from './season';

export const EVENTS_QUERY_KEY = ['events'] as const;

export const EVENT_TYPE_IRI = `${GARDEN_NS}GardenEvent`;
export const EVENT_GARDEN_TYPE_IRI = `${GARDEN_NS}Garden`;

type EventStore = Pick<CrudDatastoreStore<PergolaRegistry>, 'filterMany' | 'filterOne' | 'upsert'>;

export interface GardenEventInfo extends EventTimingFields {
  iri: string;
  name: string;
  description?: string;
  place?: string;
  eventCategory?: string;
  url?: string;
  contact?: string;
}

const asString = (v: unknown) => (typeof v === 'string' && v.trim() !== '' ? v : undefined);

/** A garden's events, in the order the store returns them (callers sort by time). */
export async function fetchEvents(store: EventStore, gardenIri: string): Promise<GardenEventInfo[]> {
  const docs = await store.filterMany('GardenEvent', {
    where: { garden: { '@id': gardenIri } },
    limit: 1000,
  } as never);
  return (docs as Array<Record<string, unknown>>).flatMap((doc): GardenEventInfo[] => {
    const iri = asString(doc['@id']);
    const name = asString(doc.name);
    const startsOn = asString(doc.startsOn);
    if (!iri || !name || !startsOn) return []; // not a usable event; the table still shows it
    return [
      {
        iri,
        name,
        startsOn,
        startsAt: asString(doc.startsAt),
        endsOn: asString(doc.endsOn),
        endsAt: asString(doc.endsAt),
        timeZone: asString(doc.timeZone),
        eventStatus: asString(doc.eventStatus),
        description: asString(doc.description),
        place: asString(doc.place),
        eventCategory: asString(doc.eventCategory),
        url: asString(doc.url),
        contact: asString(doc.contact),
      },
    ];
  });
}

const withoutUndefined = (doc: Record<string, unknown>) => {
  for (const key of Object.keys(doc)) if (doc[key] === undefined) delete doc[key];
  return doc;
};

const gardenRef = (gardenIri: string) => ({ '@id': gardenIri, '@type': EVENT_GARDEN_TYPE_IRI });

/** The form's starting values for a new event: today, confirmed, in the default zone. */
export const newEventDoc = (iri: string, gardenIri: string | undefined, today: string): Record<string, unknown> =>
  withoutUndefined({
    '@id': iri,
    '@type': EVENT_TYPE_IRI,
    garden: gardenIri ? gardenRef(gardenIri) : undefined,
    timeZone: DEFAULT_TIME_ZONE,
    eventStatus: 'confirmed',
    startsOn: today,
  });

/** What a copy takes over; dates stay, so the copy only needs a new day. */
const COPIED_FIELDS = [
  'name',
  'description',
  'startsOn',
  'startsAt',
  'endsOn',
  'endsAt',
  'timeZone',
  'place',
  'eventCategory',
  'url',
  'contact',
] as const;

/**
 * A copy of an event as the starting values of a new one: a new UID (the IRI),
 * confirmed again, without creation time and revision (those are set on save).
 */
export const duplicatedEventDoc = (
  stored: Record<string, unknown>,
  newIri: string,
  gardenIri: string | undefined,
): Record<string, unknown> => {
  const doc = withoutUndefined({
    '@id': newIri,
    '@type': EVENT_TYPE_IRI,
    garden: gardenIri ? gardenRef(gardenIri) : undefined,
    eventStatus: 'confirmed',
  });
  for (const key of COPIED_FIELDS) if (stored[key] !== undefined) doc[key] = stored[key];
  return doc;
};

/**
 * The document after a save: iCal's bookkeeping properties set.
 *
 * - new (no `createdAt` yet): `createdAt` = now, `sequence` = 0
 * - saved before: `sequence` + 1
 * - always `modifiedAt` = now
 *
 * Missing time zone and garden are filled in, whichever way the event was
 * created (table, detail dialog, …). `stored` has its links reduced to
 * `{ '@id' }` already (see `toReferences`).
 */
export const stampedEventDoc = (
  stored: Record<string, unknown>,
  gardenIri: string | undefined,
  now: string,
): Record<string, unknown> => {
  const doc = { ...stored };
  if (asString(doc.createdAt)) {
    doc.sequence = (Number(doc.sequence) || 0) + 1;
  } else {
    doc.createdAt = now;
    doc.sequence = 0;
  }
  doc.modifiedAt = now;
  if (!asString(doc.timeZone)) doc.timeZone = DEFAULT_TIME_ZONE;
  if (!idOf(doc.garden) && gardenIri) doc.garden = gardenRef(gardenIri);
  return doc;
};

/** Stamps a just-saved event. A failure is logged, not thrown: the event itself is saved. */
export async function stampSavedEvent(
  store: EventStore,
  iri: string,
  gardenIri: string | undefined,
  now: string,
): Promise<void> {
  try {
    const stored = (await store.filterOne('GardenEvent', iri, { include: { garden: REF } })) as Record<
      string,
      unknown
    > | null;
    if (!stored) return;
    await store.upsert('GardenEvent', iri, stampedEventDoc(toReferences(stored), gardenIri, now) as never);
  } catch (e) {
    console.error('Garden events: stamping the saved event failed', e);
  }
}
