import { wktToGeoJSON } from '@terraformer/wkt';
import type { SeasonData } from '../../../hooks/useSeasonData';
import { plantingLabel } from '../../../hooks/useSeasonData';
import { defaultSeason, plantingRange } from '../../season-planner/seasonTimeline';
import type { PlantingInfo } from '../../../api/season';
import { approxArea, footprint, labelPoint, type Footprint } from './geometry';

// ---------------------------------------------------------------------------
// Modes
// ---------------------------------------------------------------------------

export type MapLabelMode =
  | { kind: 'off' }
  | { kind: 'names' }
  | { kind: 'season'; season: number };

export const DEFAULT_LABEL_MODE: MapLabelMode = { kind: 'names' };

/** URL value: `off`, `names` or a season year such as `2027`. */
export const parseLabelMode = (value: string | null): MapLabelMode => {
  if (value === 'off') return { kind: 'off' };
  if (value === 'names') return { kind: 'names' };
  if (value && /^\d{4}$/.test(value)) return { kind: 'season', season: Number(value) };
  return DEFAULT_LABEL_MODE;
};

export const formatLabelMode = (mode: MapLabelMode): string =>
  mode.kind === 'season' ? String(mode.season) : mode.kind;

/** Plant symbols in season labels: main images (default) or emoji. */
export type MapIconMode = 'images' | 'emoji';

export const DEFAULT_ICON_MODE: MapIconMode = 'images';

/** URL value of `?icons=`; only `emoji` differs from the default. */
export const parseIconMode = (value: string | null): MapIconMode =>
  value === 'emoji' ? 'emoji' : DEFAULT_ICON_MODE;

// ---------------------------------------------------------------------------
// Zoom levels
// ---------------------------------------------------------------------------

/** Below this zoom the beds are too small to carry text. */
export const LABEL_MIN_ZOOM = 18.5;
/** From here on plant names and bed captions are shown, not only icons. */
export const LABEL_DETAIL_ZOOM = 19.75;
/** At most this many plant lines per bed, then "+n". */
export const MAX_PLANT_LINES = 4;

export type LabelDetail = 'hidden' | 'compact' | 'detail';

export const labelDetailForZoom = (zoom: number): LabelDetail =>
  zoom < LABEL_MIN_ZOOM ? 'hidden' : zoom < LABEL_DETAIL_ZOOM ? 'compact' : 'detail';

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------

export interface MapLabelLine {
  icon?: string;
  /** main image of the plant (URL), shown instead of the icon in image mode */
  image?: string;
  text: string;
  /** e.g. a wish that is not planned yet */
  muted?: boolean;
}

export interface MapLabel {
  /** geo feature IRI */
  key: string;
  lngLat: [number, number];
  /** higher wins when labels overlap */
  priority: number;
  title?: string;
  lines: MapLabelLine[];
  /** size of the feature on the ground — plant images are fitted into it */
  footprint?: Footprint;
}

export interface FeatureAnchor {
  lngLat: [number, number];
  priority: number;
  footprint?: Footprint;
}

interface GeoFeatureLike {
  '@id'?: string;
  geo?: string;
}

/** Label position and rank for every geo feature with a valid geometry. */
export const featureAnchors = (geoFeatures: GeoFeatureLike[]): Map<string, FeatureAnchor> => {
  const anchors = new Map<string, FeatureAnchor>();
  geoFeatures.forEach((feature) => {
    const iri = feature?.['@id'];
    if (!iri || !feature.geo) return;
    try {
      const geometry = wktToGeoJSON(feature.geo) as GeoJSON.Geometry;
      const lngLat = labelPoint(geometry);
      if (lngLat) anchors.set(iri, { lngLat, priority: approxArea(geometry), footprint: footprint(geometry) });
    } catch {
      // invalid WKT — the feature layer already logs it
    }
  });
  return anchors;
};

const namesLabels = (
  anchors: Map<string, FeatureAnchor>,
  featureNames: Map<string, string[]>,
): MapLabel[] =>
  [...anchors].flatMap(([key, anchor]) => {
    const names = featureNames.get(key);
    return names?.length ? [{ key, ...anchor, lines: names.map((text) => ({ text })) }] : [];
  });

/**
 * A planting belongs to a season on the map if it occupies the bed at some point
 * of that calendar year (the timeline additionally shows the autumn before).
 */
const occupiesYear = (planting: PlantingInfo, year: number) => {
  const range = plantingRange(planting);
  return Boolean(range && range.start < Date.UTC(year + 1, 0, 1) && range.end > Date.UTC(year, 0, 1));
};

const seasonLabels = (
  anchors: Map<string, FeatureAnchor>,
  data: SeasonData,
  season: number,
): MapLabel[] => {
  const patchesByFeature = new Map<string, SeasonData['patches']>();
  data.patches.forEach((patch) => {
    if (!patch.geoFeatureIri) return;
    if (!patchesByFeature.has(patch.geoFeatureIri)) patchesByFeature.set(patch.geoFeatureIri, []);
    patchesByFeature.get(patch.geoFeatureIri)!.push(patch);
  });

  return [...anchors].flatMap(([key, anchor]) => {
    const patches = patchesByFeature.get(key);
    if (!patches?.length) return [];
    const patchIris = new Set(patches.map((p) => p.iri));
    const plantings = data.plantings
      .filter(
        (p) =>
          p.patchIri &&
          patchIris.has(p.patchIri) &&
          p.status !== 'cancelled' &&
          occupiesYear(p, season),
      )
      .sort((a, b) => (a.startDate ?? '').localeCompare(b.startDate ?? ''));

    // one line per plant (species + variety); muted only if all of them are wishes
    const lines = new Map<string, MapLabelLine>();
    plantings.forEach((planting) => {
      const id = `${planting.speciesIri ?? ''}|${planting.varietyIri ?? ''}|${planting.speciesIri || planting.varietyIri ? '' : planting.iri}`;
      const { icon, image, name } = plantingLabel(planting, data);
      const muted = planting.status === 'wish';
      const existing = lines.get(id);
      if (existing) existing.muted = existing.muted && muted;
      else lines.set(id, { icon, image, text: name, muted });
    });

    return [
      {
        key,
        ...anchor,
        // beds with plantings win over empty bed captions, then bigger beds first
        priority: (lines.size ? 1 : 0) + anchor.priority,
        title: patches.map((p) => p.name).join(' / '),
        lines: [...lines.values()],
      },
    ];
  });
};

export const buildMapLabels = (
  mode: MapLabelMode,
  anchors: Map<string, FeatureAnchor>,
  featureNames: Map<string, string[]>,
  data: SeasonData,
): MapLabel[] => {
  switch (mode.kind) {
    case 'names':
      return namesLabels(anchors, featureNames);
    case 'season':
      return seasonLabels(anchors, data, mode.season);
    default:
      return [];
  }
};

/** Seasons that have plantings, plus this year and the planning default. */
export const availableSeasons = (data: SeasonData, now = new Date()): number[] => {
  const years = new Set<number>([now.getFullYear(), defaultSeason(now)]);
  data.plantings.forEach((p) => {
    if (!p.patchIri || !p.startDate) return;
    const start = Number(p.startDate.slice(0, 4));
    const end = Number((p.endDate ?? p.startDate).slice(0, 4));
    if (!Number.isFinite(start) || !Number.isFinite(end)) return;
    for (let year = start; year <= Math.min(end, start + 10); year++) years.add(year);
  });
  return [...years].sort((a, b) => b - a);
};
