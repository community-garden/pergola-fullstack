/**
 * History of shapes on the garden map.
 *
 * A GeoFeature keeps its IRI for its whole life. When its shape changes in the garden,
 * the old outline is kept as a GeoFeatureVersion; when it is taken off the map, it gets
 * an end date. Periods are half-open intervals of days, [validFrom, validUntil):
 * validUntil is the first day the shape no longer holds. No validFrom: since always;
 * no validUntil: still valid.
 *
 * While a garden is being set up (Garden.setupMode), shape changes are corrections and
 * leave no history.
 */

export interface ShapeValidity {
  validFrom?: string;
  validUntil?: string;
}

export interface ShapeVersionLike extends ShapeValidity {
  geo?: string;
}

/** A day as YYYY-MM-DD, in local time. */
export const toDay = (date: Date = new Date()): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

/** Does the shape hold on `day`? */
export const isValidOn = (shape: ShapeValidity, day: string): boolean =>
  (!shape.validFrom || shape.validFrom <= day) && (!shape.validUntil || day < shape.validUntil);

/** Is the feature still on the map on `day` (not taken off)? */
export const isCurrent = (shape: ShapeValidity, day: string = toDay()): boolean =>
  !shape.validUntil || day < shape.validUntil;

/** The features that are on the map on `day`. */
export const currentShapes = <T extends ShapeValidity>(features: T[], day: string = toDay()): T[] =>
  features.filter((feature) => isCurrent(feature, day));

/**
 * The outline of a feature on `day`: its current shape, or the earlier shape that held
 * then, or nothing if the feature did not exist on that day.
 */
export const geometryOn = (
  feature: ShapeVersionLike & { versions?: ShapeVersionLike[] },
  day: string,
): string | undefined => {
  if (isValidOn(feature, day)) return feature.geo;
  return (feature.versions ?? []).find((version) => isValidOn(version, day))?.geo;
};

export type ShapeChange = 'correction' | 'version';

/**
 * How a changed shape is saved when the edit session ends.
 *
 * A change is a correction (no history) while the garden is being set up, for a shape
 * drawn in the same session, and when the current shape only began on the change day or
 * later (keeping it would give an empty period). Otherwise the old outline is kept.
 */
export const shapeChange = (options: {
  setupMode: boolean;
  createdInSession: boolean;
  validFrom?: string;
  changeDay: string;
}): ShapeChange => {
  const { setupMode, createdInSession, validFrom, changeDay } = options;
  if (setupMode || createdInSession) return 'correction';
  if (validFrom && validFrom >= changeDay) return 'correction';
  return 'version';
};

/** The earlier shape that is kept when a feature changes on `changeDay`. */
export const versionBefore = (
  feature: ShapeVersionLike,
  changeDay: string,
): Required<Pick<ShapeVersionLike, 'geo' | 'validUntil'>> & ShapeVersionLike & { name: string } => ({
  geo: feature.geo ?? '',
  ...(feature.validFrom ? { validFrom: feature.validFrom } : {}),
  validUntil: changeDay,
  name: `${feature.validFrom ?? '…'} – ${changeDay}`,
});

/**
 * Taking a shape off the map: a shape drawn in this session never existed in the
 * garden and is deleted; any other gets an end date and stays in the history.
 */
export const removal = (createdInSession: boolean): 'delete' | 'end' => (createdInSession ? 'delete' : 'end');

/** Same outline? Compares the WKT without differences in spacing. */
export const sameGeometry = (a?: string, b?: string): boolean =>
  (a ?? '').replace(/\s+/g, ' ').trim() === (b ?? '').replace(/\s+/g, ' ').trim();
