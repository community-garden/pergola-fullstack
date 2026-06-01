import { z } from 'zod';

export const CornerKeySchema = z.enum(['topLeft', 'topRight', 'bottomRight', 'bottomLeft']);
export type CornerKey = z.infer<typeof CornerKeySchema>;

export const LngLatSchema = z.object({ lng: z.number(), lat: z.number() });
export type LngLat = z.infer<typeof LngLatSchema>;

export const CornersSchema = z.object({
  topLeft: LngLatSchema.nullable(),
  topRight: LngLatSchema.nullable(),
  bottomRight: LngLatSchema.nullable(),
  bottomLeft: LngLatSchema.nullable(),
});
export type Corners = z.infer<typeof CornersSchema>;

export const CalibrationStateSchema = z.discriminatedUnion('stage', [
  z.object({ stage: z.literal('idle') }),
  z.object({ stage: z.literal('uploading') }),
  z.object({
    stage: z.literal('placing_corners'),
    imageUrl: z.string(),
    corners: CornersSchema,
  }),
  z.object({
    stage: z.literal('adjusting'),
    imageUrl: z.string(),
    corners: CornersSchema,
    opacity: z.number(),
  }),
  z.object({
    stage: z.literal('confirmed'),
    imageUrl: z.string(),
    corners: CornersSchema,
  }),
]);
export type CalibrationState = z.infer<typeof CalibrationStateSchema>;

export const CORNER_KEYS: CornerKey[] = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];

export const CORNER_LABELS: Record<CornerKey, string> = {
  topLeft: 'TL',
  topRight: 'TR',
  bottomRight: 'BR',
  bottomLeft: 'BL',
};

export const EMPTY_CORNERS: Corners = {
  topLeft: null,
  topRight: null,
  bottomRight: null,
  bottomLeft: null,
};
