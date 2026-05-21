import { initSPARQLStore } from "@graviola/sparql-db-impl";
import { oxigraphCrudOptions } from "@graviola/remote-query-implementations";
import type { JSONSchema7 } from "json-schema";
import {
  WateringAvailabilityJsonSchema,
  WateringAvailabilityTypeIRI,
  ONTOLOGY,
  DATA_BASE,
} from "../schema/watering-availability";
import { WateringPlanJsonSchema, WateringPlanTypeIRI } from "../schema/watering-plan";
import {
  AnonymousPersonJsonSchema,
  AnonymousPersonTypeIRI,
} from "../schema/anonymous-person";

const SPARQL_ENDPOINT = process.env.SPARQL_ENDPOINT_URL ?? "http://localhost:7878/query";

const mergedSchema: JSONSchema7 = {
  type: "object",
  definitions: {
    ...AnonymousPersonJsonSchema.definitions,
    ...WateringAvailabilityJsonSchema.definitions,
    ...WateringPlanJsonSchema.definitions,
  },
};

const typeNameToTypeIRI = (typeName: string): string => {
  if (typeName === "WateringAvailability") return WateringAvailabilityTypeIRI;
  if (typeName === "WateringPlan") return WateringPlanTypeIRI;
  if (typeName === "AnonymousPerson") return AnonymousPersonTypeIRI;
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
    primaryFields: {},
    primaryFieldExtracts: {},
    sparqlFlavour: "oxigraph",
  },
  walkerOptions: { maxRecursion: 2, maxRecursionEachRef: 2 },
  defaultLimit: 200,
});
