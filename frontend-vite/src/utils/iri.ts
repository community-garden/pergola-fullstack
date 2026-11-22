/**
 * Last segment of an entity IRI (`…#Patch/8vfrdlxuyq9` → `8vfrdlxuyq9`).
 * Beds live in two namespaces (`…/garden#Patch/…` from the app, `…/garden/Patch/…`
 * from imports), so routes use only this part.
 */
export const lastSegment = (iri: string): string => iri.split('/').filter(Boolean).pop() ?? iri;
