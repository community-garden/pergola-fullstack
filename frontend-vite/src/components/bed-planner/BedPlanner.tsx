import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type Modifier,
} from '@dnd-kit/core';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UndoIcon from '@mui/icons-material/Undo';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
  Alert,
  Box,
  Button,
  Chip,
  Drawer,
  Fab,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { plantingLabel } from '../../hooks/useSeasonData';
import { overlapsSeason, plantingRange } from '../season-planner/seasonTimeline';
import { PlantIcon } from '../plants/PlantIcon';
import {
  bboxFrame,
  bedOutline,
  bestRotation,
  insideBed,
  normalizeRotation,
  outlineLocal,
  plantDiameterCm,
  roundPoint,
  spacingConflicts,
  viewRect,
  type LocalPoint,
  type SpacedPlant,
} from './bedFrame';
import {
  MAX_PLANTS_PER_SHAPE,
  minPoints,
  polygonArea,
  polylineLength,
  shapeLabelPoint,
  shapePlants,
  translateShape,
  type BedShape,
} from './bedLayout';
import {
  BedPlannerMap,
  type BedPlannerMapHandle,
  type DrawingView,
  type PlacedPlantView,
  type ShapeView,
} from './BedPlannerMap';
import { BedPlannerSidebar, type BedPlanItem, type PlaceMode } from './BedPlannerSidebar';
import type { BedPlanApi, BedPlanData } from './types';

export interface BedPlannerProps extends BedPlanData {
  api: BedPlanApi;
  /** shows a back button in the header (the app leaves the page; Storybook has none) */
  onBack?: () => void;
}

const SIDEBAR_WIDTH = 320;
/** The theme's papers are glass; over the busy map they need to be nearly opaque. */
const SOLID = 'rgba(255, 255, 255, 0.94)';

/** Smallest spacing one can type for a row or an area. */
const MIN_EDIT_SPACING = 2;

/** A row or an area with what the selection card shows. */
interface ShapeDetails extends ShapeView {
  name: string;
  spacing: number;
  rowSpacing: number;
}

/** Number field for a spacing in cm: applies valid values while typing. */
const SpacingField = ({
  label,
  value,
  onCommit,
  testId,
  grow = false,
}: {
  label: string;
  value: number;
  onCommit: (cm: number) => void;
  testId: string;
  /** share the row's width (phones) instead of a fixed width */
  grow?: boolean;
}) => {
  const [text, setText] = useState(String(value));
  const [shown, setShown] = useState(value);
  if (value !== shown) {
    setShown(value);
    setText(String(value));
  }
  return (
    <TextField
      size="small"
      type="number"
      label={label}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        const cm = Number(e.target.value);
        if (e.target.value !== '' && Number.isFinite(cm) && cm >= MIN_EDIT_SPACING) onCommit(Math.round(cm));
      }}
      onBlur={() => setText(String(value))}
      slotProps={{
        htmlInput: { min: MIN_EDIT_SPACING, step: 1, 'data-testid': testId },
        input: { endAdornment: <InputAdornment position="end">cm</InputAdornment> },
      }}
      sx={grow ? { flex: 1, minWidth: 0 } : { width: 132 }}
    />
  );
};

/** Size of the plant icon that follows the pointer while dragging from the list. */
const DRAG_ICON_PX = 44;

/** Screen position of the pointer or finger that started a drag. */
const activatorPoint = (event: Event | null): { x: number; y: number } | undefined => {
  if (!event) return undefined;
  if ('touches' in event) {
    const touch = (event as TouchEvent).touches[0] ?? (event as TouchEvent).changedTouches[0];
    return touch ? { x: touch.clientX, y: touch.clientY } : undefined;
  }
  const { clientX, clientY } = event as PointerEvent;
  return { x: clientX, y: clientY };
};

/**
 * The drag overlay starts where the list row is, with the icon in its top-left
 * corner. Wherever the row was grabbed, move it so the icon sits centred under
 * the pointer: that is where the plant will be placed.
 */
const iconUnderPointer: Modifier = ({ activatorEvent, activeNodeRect, transform }) => {
  const start = activatorPoint(activatorEvent);
  if (!start || !activeNodeRect) return transform;
  return {
    ...transform,
    x: transform.x + start.x - activeNodeRect.left - DRAG_ICON_PX / 2,
    y: transform.y + start.y - activeNodeRect.top - DRAG_ICON_PX / 2,
  };
};

/**
 * Bed planner: one bed on a locked map, its plantings in a sidebar (permanent
 * on desktop, a drawer on phones). Plants are dragged from the list into the
 * bed, or chosen and then placed by clicking/tapping into the bed — one by
 * one, as a row (polyline) or as an area (polygon) filled at their spacing.
 */
export const BedPlanner = ({ bed, season, plantings, plants, placements, rotation, context, api, onBack }: BedPlannerProps) => {
  const { t, i18n } = useTranslation('garden');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [armedIri, setArmedIri] = useState<string>();
  const [placeMode, setPlaceMode] = useState<PlaceMode>('single');
  /** points of the row or area being drawn */
  const [draft, setDraft] = useState<LocalPoint[]>([]);
  const [selectedIri, setSelectedIri] = useState<string>();
  const [hoverIri, setHoverIri] = useState<string>();
  const [draggingIri, setDraggingIri] = useState<string>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [satellite, setSatellite] = useState(false);
  /** the turn tool next to the zoom buttons is folded away until opened */
  const [turnOpen, setTurnOpen] = useState(false);
  const [message, setMessage] = useState<string>();
  const mapHandle = useRef<BedPlannerMapHandle>(null);

  // ── geometry ───────────────────────────────────────────────────────────────
  const frame = useMemo(() => bboxFrame(bed.geometry), [bed.geometry]);
  const outline = useMemo(() => {
    const ring = bedOutline(bed.geometry);
    return frame && ring ? outlineLocal(frame, ring) : [];
  }, [frame, bed.geometry]);

  // ── turned view: saved, else the longest side straight ───────────────────────
  const autoRotation = useMemo(() => bestRotation(outline), [outline]);
  const viewRotation = normalizeRotation(rotation ?? autoRotation);
  const rect = useMemo(() => viewRect(outline, viewRotation), [outline, viewRotation]);
  const turn = (by: number) => api.setRotation(Math.round(normalizeRotation(viewRotation + by) * 10) / 10);

  // ── what the sidebar and the map show ───────────────────────────────────────
  const { items, itemsByIri, plantViews, shapeViews } = useMemo(() => {
    const plantsByIri = new Map(plants.map((p) => [p.iri, p]));
    const items: BedPlanItem[] = plantings
      .filter((p) => p.patchIri === bed.iri && overlapsSeason(p, season))
      .map((planting) => {
        const { icon, image, name, species, variety } = plantingLabel(planting, { plantsByIri });
        const diameter = plantDiameterCm({ spacing: variety?.spacing ?? species?.spacing });
        return {
          planting,
          name,
          icon,
          image,
          diameterCm: diameter.cm,
          estimated: diameter.estimated,
          rowSpacingCm: variety?.rowSpacing ?? species?.rowSpacing,
          placed: 0,
          quantity: planting.quantityUnit === 'plants' ? planting.quantity : undefined,
        };
      });
    const itemsByIri = new Map(items.map((i) => [i.planting.iri, i]));
    const period = (item: BedPlanItem) => {
      const range = plantingRange(item.planting);
      return range && ([range.start, range.end] as [number, number]);
    };

    // single plants, and rows and areas with the plants they get
    const singles: PlacedPlantView[] = [];
    const shapes: (Omit<ShapeDetails, 'conflicts' | 'title' | 'labelAt'> & { item: BedPlanItem })[] = [];
    for (const p of placements) {
      const item = itemsByIri.get(p.plantingIri);
      if (!item) continue;
      const common = { iri: p.iri, plantingIri: p.plantingIri, name: item.name, icon: item.icon, image: item.image };
      if (p.shape) {
        const spacing = p.spacing ?? item.diameterCm;
        const rowSpacing = p.rowSpacing ?? item.rowSpacingCm ?? spacing;
        const { points } = shapePlants(p.shape, spacing, rowSpacing, outline);
        shapes.push({ ...common, item, shape: p.shape, plants: points, diameterCm: spacing, spacing, rowSpacing });
      } else {
        singles.push({ ...common, x: p.x, y: p.y, diameterCm: item.diameterCm, estimated: item.estimated, conflict: false });
      }
    }

    // spacing conflicts between all plants (those of one row or area among themselves are fine)
    const spaced: SpacedPlant[] = [
      ...singles.map((v) => ({ id: v.iri, x: v.x, y: v.y, diameterCm: v.diameterCm, period: period(itemsByIri.get(v.plantingIri)!) })),
      ...shapes.flatMap((s) =>
        s.plants.map((p, k) => ({ id: `${s.iri}#${k}`, ...p, diameterCm: s.diameterCm, period: period(s.item), group: s.iri })),
      ),
    ];
    const conflicting = new Set(spacingConflicts(spaced).flat());

    const plantViews = singles.map((v) => ({ ...v, conflict: conflicting.has(v.iri) }));
    const shapeViews: ShapeDetails[] = shapes.map(({ item, ...s }) => ({
      ...s,
      title: `${item.name} · ${t(s.shape.kind === 'line' ? 'bedPlanner.modeLine' : 'bedPlanner.modeArea')} · ${t('bedPlanner.plantsCount', { count: s.plants.length })}`,
      labelAt: shapeLabelPoint(s.shape),
      conflicts: new Set(s.plants.flatMap((_, k) => (conflicting.has(`${s.iri}#${k}`) ? [k] : []))),
    }));
    for (const v of plantViews) itemsByIri.get(v.plantingIri)!.placed += 1;
    for (const s of shapeViews) itemsByIri.get(s.plantingIri)!.placed += s.plants.length;
    return { items, itemsByIri, plantViews, shapeViews };
  }, [plantings, plants, placements, bed.iri, season, outline, t]);

  const armed = armedIri ? itemsByIri.get(armedIri) : undefined;
  const selected = plantViews.find((v) => v.iri === selectedIri);
  const selectedShape = shapeViews.find((v) => v.iri === selectedIri);
  const plantCount = plantViews.length + shapeViews.reduce((n, s) => n + s.plants.length, 0);
  /** phone while placing or drawing: only the bar at the bottom, the bed stays free */
  const compact = isMobile && Boolean(armed);

  // ── drawing a row or an area ────────────────────────────────────────────────
  const drawKind = armed && placeMode !== 'single' ? placeMode : undefined;
  const drawSpacing = useMemo(
    () =>
      armed && drawKind
        ? { spacing: armed.diameterCm, rowSpacing: drawKind === 'area' ? (armed.rowSpacingCm ?? armed.diameterCm) : undefined }
        : undefined,
    [armed, drawKind],
  );
  const drawing = useMemo<DrawingView | undefined>(
    () =>
      armed && drawKind && drawSpacing
        ? {
            kind: drawKind,
            vertices: draft,
            diameterCm: drawSpacing.spacing,
            icon: armed.icon,
            image: armed.image,
            layout: (shape: BedShape) => shapePlants(shape, drawSpacing.spacing, drawSpacing.rowSpacing, outline).points,
          }
        : undefined,
    [armed, drawKind, drawSpacing, draft, outline],
  );
  const draftCount =
    drawing && draft.length >= minPoints(drawing.kind) ? drawing.layout({ kind: drawing.kind, points: draft }).length : undefined;

  const finishDraft = useCallback(() => {
    if (!armed || !drawKind || !drawSpacing || draft.length < minPoints(drawKind)) return;
    const shape: BedShape = { kind: drawKind, points: draft.map(roundPoint) };
    const { points, truncated } = shapePlants(shape, drawSpacing.spacing, drawSpacing.rowSpacing, outline);
    setDraft([]);
    if (points.length === 0) {
      setMessage(t('bedPlanner.emptyShape'));
      return;
    }
    if (truncated) setMessage(t('bedPlanner.tooMany', { max: MAX_PLANTS_PER_SHAPE }));
    api.addPlacement(armed.planting.iri, {
      ...shape.points[0],
      shape,
      spacing: drawSpacing.spacing,
      ...(drawSpacing.rowSpacing !== undefined && { rowSpacing: drawSpacing.rowSpacing }),
    });
  }, [armed, drawKind, drawSpacing, draft, outline, api, t]);

  // ── actions ────────────────────────────────────────────────────────────────
  const place = useCallback(
    (plantingIri: string, at: LocalPoint) => {
      if (!insideBed(outline, at)) {
        setMessage(t('bedPlanner.outside'));
        return;
      }
      api.addPlacement(plantingIri, roundPoint(at));
    },
    [api, outline, t],
  );

  const move = useCallback(
    (iri: string, to: LocalPoint) => {
      if (!insideBed(outline, to)) {
        setMessage(t('bedPlanner.outside'));
        return false;
      }
      api.movePlacement(iri, roundPoint(to));
      return true;
    },
    [api, outline, t],
  );

  const moveShape = useCallback(
    (iri: string, d: LocalPoint) => {
      const view = shapeViews.find((v) => v.iri === iri);
      const placement = placements.find((p) => p.iri === iri);
      if (!view || !placement) return false;
      const by = roundPoint(d);
      if (shapePlants(translateShape(view.shape, by), view.spacing, view.rowSpacing, outline).points.length === 0) {
        setMessage(t('bedPlanner.outside'));
        return false;
      }
      api.movePlacement(iri, { x: placement.x + by.x, y: placement.y + by.y });
      return true;
    },
    [api, outline, placements, shapeViews, t],
  );

  const remove = useCallback(
    (iri: string) => {
      api.removePlacement(iri);
      setSelectedIri(undefined);
    },
    [api],
  );

  const arm = useCallback(
    (plantingIri: string) => {
      setArmedIri((current) => (current === plantingIri && !isMobile ? undefined : plantingIri));
      setDraft([]);
      setSelectedIri(undefined);
      setDrawerOpen(false);
    },
    [isMobile],
  );

  const disarm = useCallback(() => {
    setArmedIri(undefined);
    setDraft([]);
  }, []);

  const changeMode = useCallback((mode: PlaceMode) => {
    setPlaceMode(mode);
    setDraft([]);
  }, []);

  const otherPlant = useCallback(
    async (plantIri: string) => {
      const plantingIri = await api.addPlanting(plantIri);
      setArmedIri(plantingIri);
      setDraft([]);
      setDrawerOpen(false);
    },
    [api],
  );

  // Esc: drop the drawing, then end placing / deselect · Enter: finish the row or area ·
  // Backspace: remove its last point, or the selected plant (also Delete)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement | null)?.closest('input, textarea, [contenteditable="true"]')) return;
      if (e.key === 'Escape') {
        if (draft.length > 0) {
          setDraft([]);
        } else {
          disarm();
          setSelectedIri(undefined);
        }
      } else if (e.key === 'Enter' && draft.length > 0) {
        finishDraft();
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && draft.length > 0) {
        e.preventDefault();
        setDraft((d) => d.slice(0, -1));
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIri) {
        remove(selectedIri);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [draft.length, finishDraft, disarm, selectedIri, remove]);

  const number = (value: number, digits: number) =>
    new Intl.NumberFormat(i18n.language, { maximumFractionDigits: digits }).format(value);

  // ── drag from the list onto the map ─────────────────────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
  );
  const onDragStart = (e: DragStartEvent) => setDraggingIri(String(e.active.id));
  const onDragEnd = (e: DragEndEvent) => {
    setDraggingIri(undefined);
    const start = activatorPoint(e.activatorEvent);
    if (!start) return;
    const at = mapHandle.current?.clientToLocal(start.x + e.delta.x, start.y + e.delta.y);
    if (at) place(String(e.active.id), at);
  };
  const dragging = draggingIri ? itemsByIri.get(draggingIri) : undefined;

  if (!frame) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        {t('bedPlanner.noGeometry')}
      </Alert>
    );
  }

  const sidebar = (
    <BedPlannerSidebar
      bedName={bed.name}
      season={season}
      items={items}
      plants={plants}
      armedIri={armedIri}
      mode={placeMode}
      onModeChange={changeMode}
      draggable={!isMobile && placeMode === 'single'}
      onArm={arm}
      onHover={setHoverIri}
      onOtherPlant={otherPlant}
    />
  );

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragCancel={() => setDraggingIri(undefined)}>
      <Box sx={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden' }} data-testid="bed-planner">
        {isMobile ? (
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            slotProps={{ paper: { sx: { width: 'min(320px, 88vw)', bgcolor: SOLID } } }}
          >
            {sidebar}
          </Drawer>
        ) : (
          <Box
            component="aside"
            sx={{ width: SIDEBAR_WIDTH, flexShrink: 0, borderRight: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
          >
            {sidebar}
          </Box>
        )}

        <Box
          sx={{
            position: 'relative',
            flex: 1,
            minWidth: 0,
            // pinch to zoom; the zoom buttons would cover the bed
            ...(compact && { '& .maplibregl-ctrl-top-right': { display: 'none' } }),
          }}
        >
          <BedPlannerMap
            handleRef={mapHandle}
            geometry={bed.geometry}
            frame={frame}
            rect={rect}
            plants={plantViews}
            shapes={shapeViews}
            context={context}
            satellite={satellite}
            armed={Boolean(armed)}
            drawing={drawing}
            selectedIri={selectedIri}
            highlightPlantingIri={hoverIri ?? armedIri}
            onSelect={setSelectedIri}
            onPlace={(at) => armedIri && place(armedIri, at)}
            onDrawPoint={(at) => setDraft((d) => [...d, at])}
            onDrawFinish={finishDraft}
            onMove={move}
            onMoveShape={moveShape}
          />

          {/* bed and count */}
          {!compact && (
            <Paper
              elevation={2}
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                pl: onBack ? 0.5 : 1.5,
                pr: 1.5,
                py: 0.75,
                maxWidth: 'calc(100% - 80px)',
                bgcolor: SOLID,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {onBack && (
                <Tooltip title={t('bedPlanner.back')}>
                  <IconButton size="small" onClick={onBack} aria-label={t('bedPlanner.back')} data-testid="bed-planner-back">
                    <ArrowBackIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>
                  {bed.name} · {season}
                </Typography>
                <Typography variant="caption" color="text.secondary" data-testid="bed-planner-count">
                  {t('bedPlanner.inBed', { count: plantCount })}
                </Typography>
              </Box>
            </Paper>
          )}

          {/* turn the view (saved with the bed): a map tool below the zoom buttons, folded away by default */}
          {!compact && (
            <Box
              data-testid="bed-planner-rotation"
              sx={{ position: 'absolute', top: 88, right: 10, display: 'flex', alignItems: 'center', gap: 0.75 }}
            >
              {turnOpen && (
                <Paper elevation={2} sx={{ bgcolor: SOLID, display: 'flex', alignItems: 'center', px: 0.5, height: 29 }}>
                  <Tooltip title={t('bedPlanner.turnLeft')}>
                    <IconButton size="small" onClick={() => turn(-5)} aria-label={t('bedPlanner.turnLeft')} data-testid="bed-planner-turn-left">
                      <RotateLeftIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="caption" data-testid="bed-planner-rotation-value" sx={{ minWidth: 38, textAlign: 'center' }}>
                    {number(viewRotation, 1)}°
                  </Typography>
                  <Tooltip title={t('bedPlanner.turnRight')}>
                    <IconButton size="small" onClick={() => turn(5)} aria-label={t('bedPlanner.turnRight')} data-testid="bed-planner-turn-right">
                      <RotateRightIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Button
                    size="small"
                    sx={{ minWidth: 0, px: 1 }}
                    disabled={rotation === undefined}
                    onClick={() => api.setRotation(undefined)}
                    data-testid="bed-planner-turn-auto"
                  >
                    {t('bedPlanner.turnAuto')}
                  </Button>
                  <Button
                    size="small"
                    sx={{ minWidth: 0, px: 1 }}
                    disabled={viewRotation === 0}
                    onClick={() => api.setRotation(0)}
                    data-testid="bed-planner-turn-north"
                  >
                    {t('bedPlanner.turnNorth')}
                  </Button>
                </Paper>
              )}
              <Tooltip title={t('bedPlanner.turnTool')}>
                <IconButton
                  onClick={() => setTurnOpen((o) => !o)}
                  aria-label={t('bedPlanner.turnTool')}
                  aria-expanded={turnOpen}
                  data-testid="bed-planner-turn-toggle"
                  sx={{
                    width: 29,
                    height: 29,
                    borderRadius: '4px',
                    bgcolor: turnOpen ? 'primary.main' : '#fff',
                    color: turnOpen ? 'primary.contrastText' : 'rgba(0,0,0,0.75)',
                    boxShadow: '0 0 0 2px rgba(0,0,0,0.1)',
                    '&:hover': { bgcolor: turnOpen ? 'primary.dark' : '#f2f2f2' },
                  }}
                >
                  <ExploreOutlinedIcon sx={{ fontSize: 19, transform: `rotate(${-viewRotation}deg)` }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {/* placing mode: a bar at the top (desktop) or a slim bar at the bottom edge (phone) */}
          {armed && (
            <Paper
              elevation={4}
              data-testid="bed-planner-armed"
              sx={{
                bgcolor: SOLID,
                position: 'absolute',
                ...(isMobile
                  ? { left: 8, right: 8, bottom: 8 }
                  : { top: 72, left: '50%', transform: 'translateX(-50%)', maxWidth: 'calc(100% - 24px)' }),
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? 0.5 : 1,
                pl: 1,
                pr: 0.5,
                py: 0.5,
              }}
            >
              <PlantIcon icon={armed.icon} image={armed.image} size={isMobile ? 24 : 28} />
              <Typography
                variant="body2"
                data-testid="bed-planner-armed-text"
                sx={{
                  flex: '1 1 auto',
                  minWidth: 0,
                  ...(isMobile && {
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.25,
                  }),
                }}
              >
                {!drawKind
                  ? t('bedPlanner.placing', { name: armed.name })
                  : isMobile && draftCount !== undefined
                    ? `${armed.name} · ${t('bedPlanner.plantsCount', { count: draftCount })}`
                    : t(`bedPlanner.${drawKind === 'line' ? 'drawingLine' : 'drawingArea'}${isMobile ? 'Tap' : ''}`, {
                        name: armed.name,
                      }) + (draftCount !== undefined ? ` · ${t('bedPlanner.plantsCount', { count: draftCount })}` : '')}
              </Typography>
              {draft.length > 0 && (
                <Tooltip title={t('bedPlanner.undoPoint')}>
                  <IconButton
                    size="small"
                    onClick={() => setDraft((d) => d.slice(0, -1))}
                    aria-label={t('bedPlanner.undoPoint')}
                    data-testid="bed-planner-undo"
                  >
                    <UndoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              {draftCount !== undefined &&
                (isMobile ? (
                  <IconButton
                    size="small"
                    onClick={finishDraft}
                    aria-label={t('bedPlanner.finish')}
                    data-testid="bed-planner-finish"
                    sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.dark' } }}
                  >
                    <CheckIcon fontSize="small" />
                  </IconButton>
                ) : (
                  <Button size="small" variant="contained" disableElevation onClick={finishDraft} data-testid="bed-planner-finish">
                    {t('bedPlanner.finish')}
                  </Button>
                ))}
              {isMobile ? (
                <IconButton size="small" onClick={disarm} aria-label={t('bedPlanner.done')} data-testid="bed-planner-done">
                  <CloseIcon fontSize="small" />
                </IconButton>
              ) : (
                <Button size="small" onClick={disarm} data-testid="bed-planner-done">
                  {t('bedPlanner.done')}
                </Button>
              )}
            </Paper>
          )}

          {/* selected plant, row or area: a card at the bottom (on phones at the bottom edge) */}
          {(selected || selectedShape) && (
            <Paper
              elevation={4}
              data-testid="bed-planner-selected"
              sx={{
                bgcolor: SOLID,
                position: 'absolute',
                ...(isMobile
                  ? { left: 8, right: 8, bottom: 8 }
                  : { bottom: 16, left: '50%', transform: 'translateX(-50%)', width: 'max-content', maxWidth: 'calc(100% - 24px)' }),
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                columnGap: isMobile ? 0.5 : 1.5,
                rowGap: 1,
                p: 1,
              }}
            >
              {!isMobile && (
                <PlantIcon
                  icon={(selected ?? selectedShape)!.icon}
                  image={(selected ?? selectedShape)!.image}
                  size={36}
                />
              )}
              <Box sx={{ minWidth: 0, flex: isMobile ? '1 1 0' : undefined }}>
                <Typography variant="subtitle2" noWrap>
                  {selected
                    ? selected.name
                    : `${selectedShape!.name} · ${t(selectedShape!.shape.kind === 'line' ? 'bedPlanner.modeLine' : 'bedPlanner.modeArea')}`}
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div" data-testid="bed-shape-info">
                  {selected
                    ? `${t('bedPlanner.position', { x: Math.round(selected.x), y: Math.round(selected.y) })} · ${
                        selected.estimated ? t('bedPlanner.spacingUnknown') : t('bedPlanner.spacing', { cm: selected.diameterCm })
                      }`
                    : `${
                        selectedShape!.shape.kind === 'line'
                          ? t('bedPlanner.length', { m: number(polylineLength(selectedShape!.shape.points) / 100, 1) })
                          : t('bedPlanner.area', { m2: number(polygonArea(selectedShape!.shape.points) / 10_000, 2) })
                      } · ${t('bedPlanner.plantsCount', { count: selectedShape!.plants.length })}`}
                </Typography>
                {(selected ? selected.conflict : selectedShape!.conflicts.size > 0) && (
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'error.main' }}>
                    <WarningAmberIcon sx={{ fontSize: 14 }} />
                    <Typography variant="caption">{t('bedPlanner.conflict')}</Typography>
                  </Stack>
                )}
              </Box>
              {isMobile && (
                <>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => remove((selected ?? selectedShape)!.iri)}
                    aria-label={t('bedPlanner.remove')}
                    data-testid="bed-planner-remove"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => setSelectedIri(undefined)} aria-label={t('bedPlanner.done')}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              )}
              {selectedShape && (
                <Box sx={{ display: 'flex', gap: 1, ...(isMobile && { flexBasis: '100%' }) }}>
                  <SpacingField
                    label={t('bedPlanner.spacingField')}
                    value={selectedShape.spacing}
                    onCommit={(cm) => api.updatePlacement(selectedShape.iri, { spacing: cm })}
                    testId="bed-shape-spacing"
                    grow={isMobile}
                  />
                  {selectedShape.shape.kind === 'area' && (
                    <SpacingField
                      label={t('bedPlanner.rowSpacingField')}
                      value={selectedShape.rowSpacing}
                      onCommit={(cm) => api.updatePlacement(selectedShape.iri, { rowSpacing: cm })}
                      testId="bed-shape-row-spacing"
                      grow={isMobile}
                    />
                  )}
                </Box>
              )}
              {!isMobile && (
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={() => remove((selected ?? selectedShape)!.iri)}
                  data-testid="bed-planner-remove"
                >
                  {t('bedPlanner.remove')}
                </Button>
              )}
            </Paper>
          )}

          {/* on phones, the bottom belongs to the placing bar or the selection card */}
          {!(isMobile && (armed || selected || selectedShape)) && (
            <Chip
              icon={<SatelliteAltIcon />}
              label={t('bedPlanner.satellite')}
              color={satellite ? 'primary' : 'default'}
              variant={satellite ? 'filled' : 'outlined'}
              onClick={() => setSatellite((s) => !s)}
              size="small"
              sx={{ position: 'absolute', left: 10, bottom: 28, bgcolor: satellite ? undefined : 'background.paper' }}
            />
          )}

          {isMobile && !armed && !selected && !selectedShape && (
            <Fab
              color="primary"
              variant="extended"
              onClick={() => setDrawerOpen(true)}
              data-testid="bed-planner-open-list"
              sx={{ position: 'absolute', right: 16, bottom: 28 }}
            >
              <LocalFloristIcon sx={{ mr: 1 }} />
              {t('bedPlanner.plants')}
            </Fab>
          )}

          <Snackbar
            open={Boolean(message)}
            autoHideDuration={2500}
            onClose={() => setMessage(undefined)}
            message={message}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ position: 'absolute', top: '72px !important' }}
          />
        </Box>
      </Box>

      <DragOverlay dropAnimation={null} modifiers={[iconUnderPointer]}>
        {dragging ? (
          <Box sx={{ pointerEvents: 'none', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.35))' }}>
            <PlantIcon icon={dragging.icon} image={dragging.image} size={DRAG_ICON_PX} />
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
