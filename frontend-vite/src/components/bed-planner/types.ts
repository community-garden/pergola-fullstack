import type { PlantInfo, PlantingInfo } from '../../api/season';
import type { LocalPoint } from './bedFrame';
import type { BedShape } from './bedLayout';

/** The bed being planned. */
export interface BedPlanBed {
  iri: string;
  name: string;
  /** GeoJSON geometry of the bed (from its geo feature's WKT) */
  geometry: GeoJSON.Geometry;
}

/**
 * A `PlantPlacement`: one plant, a row or an area of plants in the bed.
 * x/y: centimetres from the frame's top-left corner (for a row or an area: its first point).
 */
export interface BedPlacement extends LocalPoint {
  iri: string;
  plantingIri: string;
  /** a row or an area instead of a single plant (bed coordinates; stored as WKT, see `shapeToWkt`) */
  shape?: BedShape;
  /** cm between the plants of a row or area; default: the plant's spacing */
  spacing?: number;
  /** cm between the rows of an area; default: the plant's row spacing, else `spacing` */
  rowSpacing?: number;
}

/** What a new placement brings: a position, and for rows and areas their shape and spacing. */
export type PlacementFields = LocalPoint & Pick<BedPlacement, 'shape' | 'spacing' | 'rowSpacing'>;

/** Everything the bed planner shows. Plantings and plants use the season read model. */
export interface BedPlanData {
  bed: BedPlanBed;
  season: number;
  /** plantings of this bed (any season; the planner shows those of `season`) */
  plantings: PlantingInfo[];
  /** all species and varieties, for names, images, spacing and "other plant" */
  plants: PlantInfo[];
  placements: BedPlacement[];
  /** how the map is turned in the bed plan (degrees, clockwise); undefined: automatic, the longest side straight */
  rotation?: number;
  /** other features of the garden, drawn in grey for orientation */
  context?: GeoJSON.Geometry[];
}

/**
 * Write side of the bed planner. The Storybook prototype keeps everything in
 * memory (`useBedPlanState`); the app will implement the same interface on the
 * Graviola store.
 */
export interface BedPlanApi {
  addPlacement: (plantingIri: string, fields: PlacementFields) => void;
  /** Moves a plant to `to`; a row or an area is moved as a whole so that its first point is at `to`. */
  movePlacement: (placementIri: string, to: LocalPoint) => void;
  /** Changes the spacing of a row or an area. */
  updatePlacement: (placementIri: string, patch: Pick<BedPlacement, 'spacing' | 'rowSpacing'>) => void;
  removePlacement: (placementIri: string) => void;
  /** Saves how the bed is turned in the plan; undefined goes back to automatic. */
  setRotation: (degrees: number | undefined) => void;
  /** Assigns another plant to the bed (a new planting in the season); resolves to the planting's IRI. */
  addPlanting: (plantIri: string) => Promise<string>;
}
