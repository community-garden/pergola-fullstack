/**
 * Resolves an image URL stored on an entity (e.g. `PlantSpecies.imageUrl`).
 *
 * Absolute URLs (`https://…`, `data:…`, `blob:…`) and root-relative paths
 * (`/media/…`) are used as they are. Other relative paths (`media/plants/…`)
 * are resolved against the app root, not against the current route, so the
 * same value works on `/Wurzelwerk/map` and on `/plants`.
 */
export const resolveMediaUrl = (url: string | undefined | null): string | undefined => {
  const value = url?.trim();
  if (!value) return undefined;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith('/')) return value;
  return `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${value.replace(/^\.\//, '')}`;
};
