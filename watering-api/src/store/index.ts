import { initSPARQLStore } from "@graviola/sparql-db-impl";
import type { SparqlStore } from "@graviola/store-core";
import { oxigraphCrudOptions } from "@graviola/remote-query-implementations";
import type { JSONSchema7 } from "json-schema";
import {
  WateringAvailabilityJsonSchema,
  WateringAvailabilityTypeIRI,
  ONTOLOGY,
  DATA_BASE,
  type WateringAvailability,
} from "../schema/watering-availability";
import {
  WateringPlanJsonSchema,
  WateringPlanTypeIRI,
  type WateringPlan,
} from "../schema/watering-plan";
import {
  AnonymousPersonJsonSchema,
  AnonymousPersonTypeIRI,
  type AnonymousPerson,
} from "../schema/anonymous-person";
import {
  MediaAttachmentJsonSchema,
  MediaAttachmentTypeIRI,
  type MediaAttachment,
} from "../schema/media-attachment";

const SPARQL_ENDPOINT = process.env.SPARQL_ENDPOINT_URL ?? "http://localhost:7878/query";

const mergedSchema: JSONSchema7 = {
  type: "object",
  definitions: {
    ...AnonymousPersonJsonSchema.definitions,
    ...WateringAvailabilityJsonSchema.definitions,
    ...WateringPlanJsonSchema.definitions,
    ...MediaAttachmentJsonSchema.definitions,
  },
};

const typeNameToTypeIRI = (typeName: string): string => {
  if (typeName === "WateringAvailability") return WateringAvailabilityTypeIRI;
  if (typeName === "WateringPlan") return WateringPlanTypeIRI;
  if (typeName === "AnonymousPerson") return AnonymousPersonTypeIRI;
  if (typeName === "MediaAttachment") return MediaAttachmentTypeIRI;
  return `${ONTOLOGY}${typeName}`;
};

const typeIRItoTypeName = (iri: string): string => iri.replace(ONTOLOGY, "");

const propertyToIRI = (field: string): string => {
  if (field.includes(":")) return field;
  return `${ONTOLOGY}${field}`;
};

const crudFunctions = oxigraphCrudOptions({
  endpoint: SPARQL_ENDPOINT,
  label: "Oxigraph",
  provider: "oxigraph",
  active: true,
});

/**
 * Document types per store type name. Typing the store with it checks
 * `filterMany` / `filterOne` options (`where`, `include`) against the model.
 */
export type WateringRegistry = {
  WateringAvailability: WateringAvailability;
  WateringPlan: WateringPlan;
  AnonymousPerson: AnonymousPerson;
  MediaAttachment: MediaAttachment;
};

export type WateringStore = SparqlStore<WateringRegistry>;

export const store = initSPARQLStore({
  defaultPrefix: ONTOLOGY,
  jsonldContext: { "@vocab": ONTOLOGY },
  typeNameToTypeIRI,
  schema: mergedSchema,
  sparqlQueryFunctions: crudFunctions,
  queryBuildOptions: {
    base: ONTOLOGY,
    prefixes: { garden: ONTOLOGY, data: DATA_BASE },
    propertyToIRI,
    typeIRItoTypeName,
    primaryFields: {
      AnonymousPerson: { label: "name" },
      WateringAvailability: { label: "name", description: "submittedAt" },
      WateringPlan: { label: "gardenIri", description: "calculatedAt" },
      MediaAttachment: { label: "name", description: "uploadedAt" },
    },
    primaryFieldExtracts: {},
    sparqlFlavour: "oxigraph",
  },
  walkerOptions: { maxRecursion: 2, maxRecursionEachRef: 2 },
  defaultLimit: 200,
}) as unknown as WateringStore;

/**
 * `loadOne` returns a stub `{ "@id": … }` for IRIs that are not in the store.
 * Returns the document only if it has the given required field.
 */
export async function loadExisting<T extends keyof WateringRegistry>(
  typeName: T,
  iri: string,
  requiredField: keyof WateringRegistry[T] & string,
): Promise<WateringRegistry[T] | null> {
  const doc = (await store.loadOne(typeName, iri)) as Record<string, unknown> | null;
  return doc && doc[requiredField] !== undefined ? (doc as unknown as WateringRegistry[T]) : null;
}

/** Availability entries of a garden, optionally for one month, with their person reference. */
export function availabilitiesOf(gardenIri: string, targetMonth?: string) {
  return store.filterMany("WateringAvailability", {
    where: { garden: { "@id": gardenIri }, ...(targetMonth ? { targetMonth } : {}) },
    include: { person: true },
  }) as Promise<WateringAvailability[]>;
}

/**
 * Deletes a document including its nested blank-node objects (e.g. the
 * assignments of a WateringPlan). Graviola's remove() leaves those behind as
 * orphans; an upsert of an empty document deletes them first.
 */
export async function removeDocument(typeName: keyof WateringRegistry, iri: string) {
  await store.upsert(typeName, iri, {} as never);
  await store.remove(typeName, iri);
}
