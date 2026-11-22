/**
 * Read and write model of the notes on beds (`BedNote`), through
 * Graviola's typed store like the bed plan (api/bedPlan.ts).
 *
 * Date and author are set here, not by Graviola's store-wide `$meta` stamping:
 * the author is the name from the login (empty without one).
 */
import type { PergolaRegistry } from '../schema/registry';
import { GARDEN_NS, REF, idOf, sparqlSelect, type SeasonStore } from './season';

export const NOTES_QUERY_KEY = ['season', 'notes'] as const;

export const NOTE_TYPE_IRI = `${GARDEN_NS}BedNote`;
export const NOTE_PATCH_TYPE_IRI = `${GARDEN_NS}Patch`;

export interface BedNoteInfo {
  iri: string;
  patchIri: string;
  /** Markdown */
  text: string;
  createdAt?: string;
  modifiedAt?: string;
  createdBy?: string;
  modifiedBy?: string;
}

const asString = (v: unknown) => (typeof v === 'string' && v ? v : undefined);

/** Newest first; notes without a date go last. */
export const byNewest = (a: BedNoteInfo, b: BedNoteInfo) =>
  (b.createdAt ?? '').localeCompare(a.createdAt ?? '');

/** All notes of the store. Notes whose bed is gone cannot be resolved and are dropped. */
export async function fetchNotes(store: SeasonStore): Promise<BedNoteInfo[]> {
  const docs = await store.filterMany('BedNote', { include: { patch: REF } });
  return docs
    .flatMap((doc): BedNoteInfo[] => {
      const iri = doc['@id'];
      const patchIri = idOf(doc.patch);
      const text = asString(doc.text);
      if (!iri || !patchIri || !text) return [];
      return [
        {
          iri,
          patchIri,
          text,
          createdAt: asString(doc.createdAt),
          modifiedAt: asString(doc.modifiedAt),
          createdBy: asString(doc.createdBy),
          modifiedBy: asString(doc.modifiedBy),
        },
      ];
    })
    .sort(byNewest);
}

const withoutUndefined = (doc: Record<string, unknown>) => {
  for (const key of Object.keys(doc)) if (doc[key] === undefined) delete doc[key];
  return doc;
};

/** A new note: the bed only as a link, written now by `user`. */
export const newNoteDoc = (
  iri: string,
  patchIri: string,
  text: string,
  user: string | undefined,
  now: string,
): PergolaRegistry['BedNote'] =>
  withoutUndefined({
    '@id': iri,
    '@type': NOTE_TYPE_IRI,
    patch: { '@id': patchIri, '@type': NOTE_PATCH_TYPE_IRI },
    text,
    createdAt: now,
    createdBy: user,
  }) as PergolaRegistry['BedNote'];

/**
 * A changed note: `stored` is the document from the store (links already
 * reduced to `{ '@id' }`), so fields this code does not know are kept, and
 * `createdAt`/`createdBy` stay as they were.
 */
export const editedNoteDoc = (
  stored: Record<string, unknown>,
  text: string,
  user: string | undefined,
  now: string,
): PergolaRegistry['BedNote'] => {
  const doc: Record<string, unknown> = { ...stored, text, modifiedAt: now, modifiedBy: user };
  return withoutUndefined(doc) as PergolaRegistry['BedNote'];
};

/**
 * Notes that point to a bed, found by plain SPARQL: once the bed is
 * deleted the typed API can no longer resolve the link.
 */
export async function noteIrisOfPatch(patchIri: string): Promise<string[]> {
  const rows = await sparqlSelect(
    `SELECT DISTINCT ?n WHERE { ?n a g:BedNote ; g:patch <${patchIri}> }`,
  );
  return rows.flatMap((r) => (r.n?.value ? [r.n.value] : []));
}
