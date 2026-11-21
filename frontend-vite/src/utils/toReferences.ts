/**
 * References inside a loaded document come back as nested documents. For an
 * upsert only the link is relevant — reduce them to `{ '@id' }` so the
 * referenced entities are never rewritten from a possibly stale or partial
 * copy (an upsert inserts every triple of an embedded named entity again).
 */
export const toReferences = <T extends Record<string, unknown>>(doc: T): T =>
  Object.fromEntries(
    Object.entries(doc).map(([key, value]) => {
      if (key.startsWith('@')) return [key, value];
      if (Array.isArray(value)) {
        return [
          key,
          value.map((v) => (v && typeof v === 'object' && '@id' in v ? { '@id': (v as any)['@id'] } : v)),
        ];
      }
      if (value && typeof value === 'object' && '@id' in value) {
        return [key, { '@id': (value as any)['@id'] }];
      }
      return [key, value];
    }),
  ) as T;
