import { useAdbContext, useDataStore } from '@graviola/edb-state-hooks';
import { toReferences } from '../../../utils/toReferences';
import { shapeChange, versionBefore } from './shapeHistory';
import type { SessionChange, ShapePersistence } from './useShapeEditor';

const GARDEN_NS = 'https://ontology.semantic-desk.top/garden#';

type Doc = Record<string, unknown>;

/**
 * Store writes of the shape editor, through Graviola (the documents are validated
 * against the schema):
 *
 * - a new shape becomes a GeoFeature in the garden's `geoFeatures`
 *   (valid from the change day, unless the garden is being set up);
 * - an edit replaces the outline;
 * - taking a shape off the map sets `validUntil` (or deletes a shape drawn in the same
 *   session that nothing refers to);
 * - at the end of a session, the old outline of every changed shape is kept as a
 *   GeoFeatureVersion, unless the change counts as a correction (see `shapeChange`).
 */
export const useShapePersistence = ({
  gardenIRI,
  setupMode,
  changeDay,
  onKept,
}: {
  gardenIRI: string | undefined;
  setupMode: boolean;
  changeDay: string;
  /** called with the IRIs of the shapes whose old outline was kept */
  onKept?: (iris: string[]) => void;
}): ShapePersistence & { setSetupMode: (value: boolean) => Promise<void> } => {
  const { dataStore } = useDataStore();
  const { createEntityIRI } = useAdbContext();

  const load = async (typeName: string, iri: string): Promise<Doc | null> =>
    ((await (dataStore as any)?.loadOne(typeName, iri)) as Doc | null) ?? null;

  const save = async (typeName: string, iri: string, doc: Doc) => {
    if (!dataStore) throw new Error('DataStore not ready');
    await dataStore.upsert(typeName, iri, {
      ...toReferences(doc),
      '@id': iri,
      '@type': `${GARDEN_NS}${typeName}`,
    });
  };

  const now = () => new Date().toISOString();

  const loadFeature = async (iri: string) => {
    const stored = await load('GeoFeature', iri);
    if (!stored) throw new Error(`GeoFeature ${iri} not found`);
    return stored;
  };

  return {
    create: async (geo) => {
      if (!gardenIRI) throw new Error('No garden');
      const iri = createEntityIRI('GeoFeature');
      const time = now();
      await save('GeoFeature', iri, {
        geo,
        creationTime: time,
        modificationTime: time,
        ...(setupMode ? {} : { validFrom: changeDay }),
      });
      // read the garden fresh: an older copy would drop shapes added a moment ago
      const garden = await load('Garden', gardenIRI);
      const existing = (garden?.geoFeatures as Doc[] | undefined) ?? [];
      await save('Garden', gardenIRI, { ...garden, geoFeatures: [...existing, { '@id': iri }] });
      return iri;
    },

    update: async (iri, geo) => {
      const stored = await loadFeature(iri);
      await save('GeoFeature', iri, { ...stored, geo, modificationTime: now() });
    },

    remove: async (iri, kind) => {
      if (kind === 'end') {
        const stored = await loadFeature(iri);
        await save('GeoFeature', iri, { ...stored, validUntil: changeDay, modificationTime: now() });
        return;
      }
      if (!gardenIRI || !dataStore) throw new Error('DataStore not ready');
      const garden = await load('Garden', gardenIRI);
      const remaining = ((garden?.geoFeatures as Doc[] | undefined) ?? []).filter((f) => f?.['@id'] !== iri);
      await save('Garden', gardenIRI, { ...garden, geoFeatures: remaining });
      // an empty upsert removes nested nodes that remove() would leave behind
      await dataStore.upsert('GeoFeature', iri, {});
      await dataStore.remove('GeoFeature', iri);
    },

    finish: async (changes: SessionChange[]) => {
      const kept: string[] = [];
      for (const change of changes) {
        if (change.created) continue;
        const stored = await loadFeature(change.iri);
        const validFrom = stored.validFrom as string | undefined;
        const kind = shapeChange({ setupMode, createdInSession: false, validFrom, changeDay });
        if (kind !== 'version') continue;
        const versionIRI = createEntityIRI('GeoFeatureVersion');
        await save('GeoFeatureVersion', versionIRI, {
          ...versionBefore({ geo: change.before, validFrom }, changeDay),
          creationTime: now(),
        });
        const versions = (stored.versions as Doc[] | undefined) ?? [];
        await save('GeoFeature', change.iri, {
          ...stored,
          validFrom: changeDay,
          versions: [...versions, { '@id': versionIRI }],
          modificationTime: now(),
        });
        kept.push(change.iri);
      }
      if (kept.length > 0) onKept?.(kept);
    },

    /** Garden.setupMode: while the garden is being set up, shape changes leave no history. */
    setSetupMode: async (value) => {
      if (!gardenIRI) throw new Error('No garden');
      const garden = await load('Garden', gardenIRI);
      await save('Garden', gardenIRI, { ...garden, setupMode: value });
    },
  };
};
