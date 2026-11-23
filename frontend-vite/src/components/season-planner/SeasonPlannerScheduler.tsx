import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Popover,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation } from 'react-i18next';
import { useDispatchIntent } from '@graviola/edb-state-hooks';
import { useSnackbar } from 'notistack';
import { Scheduler, createDateConfig, useScheduler, ONE_DAY_MS } from './scheduler';
import type { SchedulerItem } from './scheduler';
import { useDateFnsLocale } from '../../hooks';
import { useEditMode } from '../../hooks/useEditMode';
import { EditModeToggle } from '../common/EditModeToggle';
import { plantingLabel, useSeasonData } from '../../hooks/useSeasonData';
import { usePlantingMutations } from '../../hooks/usePlantingMutations';
import type { PatchInfo, PlantingInfo } from '../../api/season';
import { DEFAULT_PERIOD_COLORS } from '../garden/SeasonalGrowingCalendar';
import { PlantIcon } from '../plants/PlantIcon';
import {
  ROLE_COLORS,
  defaultSeason,
  formatDay,
  overlapsSeason,
  patchToResource,
  plantingToItem,
  rangeToDates,
  seasonWindow,
  type TimelineText,
} from './seasonTimeline';

const CELL_WIDTH = 3.2; // px per day at zoom 1 → a season fits on a laptop screen
const ROW_HEIGHT = 30;
const LEFT_PANEL_WIDTH = 240;
/** single bed: more room per bar, a narrow left panel */
const BED_ROW_HEIGHT = 44;
const BED_LEFT_PANEL_WIDTH = 120;

export interface SeasonPlannerSchedulerProps {
  /** Shows only this bed: no wish list, no legend, taller bars. */
  patchIri?: string;
  /** Controlled season; without it the planner keeps its own. */
  season?: number;
  onSeasonChange?: (season: number) => void;
  /** Replaces the title at the left of the toolbar. */
  toolbarStart?: ReactNode;
  /** With a handler, a click on a bar selects the planting instead of opening its edit dialog. */
  selectedPlantingIri?: string;
  onPlantingSelect?: (plantingIri: string) => void;
  /** Controlled edit mode; without it the planner keeps its own (off by default). */
  editMode?: boolean;
  onEditModeChange?: (editMode: boolean) => void;
}

/**
 * Season planning timeline: one row per bed, one bar per planting.
 * In edit mode: click empty space → new planting, drag → move, drag edges →
 * change dates, click a bar → edit dialog. Read-only by default. Wishes without a bed are listed above.
 */
export const SeasonPlannerScheduler = ({
  patchIri,
  season: seasonProp,
  onSeasonChange,
  toolbarStart,
  selectedPlantingIri,
  onPlantingSelect,
  editMode: editModeProp,
  onEditModeChange,
}: SeasonPlannerSchedulerProps = {}) => {
  const singleBed = Boolean(patchIri);
  const rowHeight = singleBed ? BED_ROW_HEIGHT : ROW_HEIGHT;
  const leftPanelWidth = singleBed ? BED_LEFT_PANEL_WIDTH : LEFT_PANEL_WIDTH;
  const dispatchIntent = useDispatchIntent();
  const own = useEditMode();
  const editMode = editModeProp ?? own.editMode;
  const toggleEditMode = useCallback(
    () => (onEditModeChange ? onEditModeChange(!editMode) : own.toggleEditMode()),
    [onEditModeChange, editMode, own],
  );
  const { t } = useTranslation('garden');
  const locale = useDateFnsLocale();
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, error } = useSeasonData();
  const { updateDates, editPlanting, createPlanting, invalidate } = usePlantingMutations();

  const [ownSeason, setOwnSeason] = useState(defaultSeason);
  const season = seasonProp ?? ownSeason;
  const setSeason = useCallback(
    (s: number) => {
      setOwnSeason(s);
      onSeasonChange?.(s);
    },
    [onSeasonChange],
  );
  const [wishAnchor, setWishAnchor] = useState<HTMLElement | null>(null);
  const [legendAnchor, setLegendAnchor] = useState<HTMLElement | null>(null);
  const seasonRange = useMemo(() => seasonWindow(season), [season]);

  const text = useMemo<TimelineText>(
    () => ({
      role: (r) => t(`planting.roles.${r}`),
      status: (s) => t(`planting.statuses.${s}`),
      unit: (u) => t(`planting.units.${u}`),
      phase: (p) => t(`seasonPlanner.phases.${p}`),
      bed: t('jsonforms:patch.label'),
    }),
    [t],
  );

  const seasonPlantings = useMemo(
    () =>
      data.plantings.filter(
        (p) => overlapsSeason(p, season) && (!patchIri || p.patchIri === patchIri),
      ),
    [data.plantings, season, patchIri],
  );
  const wishes = useMemo(
    () =>
      data.plantings
        .filter((p) => !p.patchIri && (!p.startDate || overlapsSeason(p, season)))
        .map((p) => ({ planting: p, ...plantingLabel(p, data) }))
        .sort((a, b) => a.name.localeCompare(b.name, 'de')),
    [data, season],
  );

  const resources = useMemo(
    () =>
      data.patches
        .filter((p) => !patchIri || p.iri === patchIri)
        .map(patchToResource)
        // a bed with a picture (e.g. the animal of a community bed) shows it instead of the emoji
        .map((r) =>
          r.data?.imageUrl
            ? { ...r, icon: <PlantIcon icon={r.icon as string} image={r.data.imageUrl} size={24} /> }
            : r,
        ),
    [data.patches, patchIri],
  );
  const items = useMemo(
    () =>
      seasonPlantings
        .map((p) => plantingToItem(p, data, text))
        .filter((i): i is SchedulerItem<PlantingInfo> => Boolean(i))
        .map((i) => (i.id === selectedPlantingIri ? { ...i, selected: true } : i)),
    [seasonPlantings, data, text, selectedPlantingIri],
  );

  // External scheduler state so we control zoom and can apply optimistic updates.
  const schedulerState = useScheduler<PlantingInfo, PatchInfo>({ initialZoom: 1 });
  const { setItems, setResources, zoom, setZoom } = schedulerState;
  useEffect(() => setItems(items), [items, setItems]);
  useEffect(() => setResources(resources), [resources, setResources]);

  // Day/week ticks only once zoomed in far enough to read them.
  const showDays = CELL_WIDTH * zoom >= 5;
  const headerRows = useMemo(
    () => createDateConfig(showDays ? 'day' : 'month', locale),
    [showDays, locale],
  );

  // Fit the whole season into the available width once the container is measured.
  const timelineBoxRef = useRef<HTMLDivElement>(null);
  const fittedRef = useRef(false);
  useEffect(() => {
    const el = timelineBoxRef.current;
    if (!el || fittedRef.current) return;
    const days = (seasonRange.end - seasonRange.start) / ONE_DAY_MS;
    const available = el.clientWidth - leftPanelWidth - 24;
    if (available > 200) {
      setZoom(Math.max(0.5, available / (days * CELL_WIDTH)));
      fittedRef.current = true;
    }
  });

  const persistRange = useCallback(
    async (item: SchedulerItem<PlantingInfo>, start: number, end: number) => {
      const { startDate, endDate } = rangeToDates(start, end);
      try {
        await updateDates(item.id, startDate, endDate);
      } catch (e) {
        console.error(e);
        enqueueSnackbar(t('seasonPlanner.saveError'), { variant: 'error' });
      } finally {
        await invalidate();
      }
    },
    [updateDates, invalidate, enqueueSnackbar, t],
  );

  const handleCreate = useCallback(
    (resourceId: string, start: number) => {
      const patch = data.patchesByIri.get(resourceId);
      void createPlanting({
        patch: patch ? { '@id': patch.iri, name: patch.name } : undefined,
        startDate: formatDay(start),
        endDate: formatDay(start + 89 * ONE_DAY_MS),
      });
    },
    [createPlanting, data.patchesByIri],
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, p: 2 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }
  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {t('seasonPlanner.loadError')}: {(error as Error).message}
      </Alert>
    );
  }

  const thisYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        px: 1.5,
        py: 1,
        bgcolor: 'background.paper',
      }}
    >
      {/* Toolbar */}
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
        {toolbarStart ?? (
          <Typography variant="h6" sx={{ mr: 1 }}>
            {t('seasonPlanner.title')}
          </Typography>
        )}
        <ToggleButtonGroup
          size="small"
          exclusive
          value={season}
          onChange={(_e, v) => v && setSeason(v)}
          aria-label={t('seasonPlanner.season')}
        >
          {[thisYear, thisYear + 1].map((y) => (
            <ToggleButton key={y} value={y}>
              {y}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {editMode && (
        <Button
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            void createPlanting({
              startDate: `${season}-04-01`,
              endDate: `${season}-06-30`,
            })
          }
        >
          {t('seasonPlanner.newPlanting')}
        </Button>
        )}
        <EditModeToggle variant="chip" editMode={editMode} onToggle={toggleEditMode} />
        <Box sx={{ flex: 1 }} />
        {!singleBed && (
          <Button
            size="small"
            color="inherit"
            startIcon={<FavoriteBorderIcon fontSize="small" />}
            onClick={(e) => setWishAnchor(e.currentTarget)}
            sx={{ textTransform: 'none' }}
            data-testid="season-planner-wishlist"
          >
            {t('seasonPlanner.wishlist')} ({wishes.length})
          </Button>
        )}
        {!singleBed && (
          <Tooltip title={t('seasonPlanner.legend')}>
            <IconButton
              size="small"
              onClick={(e) => setLegendAnchor(e.currentTarget)}
              aria-label={t('seasonPlanner.legend')}
              data-testid="season-planner-legend"
            >
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Zoom −">
          <IconButton size="small" onClick={() => setZoom(Math.max(0.5, zoom / 1.4))}>
            <ZoomOutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom +">
          <IconButton size="small" onClick={() => setZoom(Math.min(12, zoom * 1.4))}>
            <ZoomInIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Wish list: plantings without a bed — closed by default, opens from the toolbar */}
      <Popover
        open={Boolean(wishAnchor)}
        anchorEl={wishAnchor}
        onClose={() => setWishAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 1.5, maxWidth: 460 }} data-testid="season-planner-wishlist-panel">
          <Typography variant="subtitle2">
            {t('seasonPlanner.wishlist')} ({wishes.length}) – {t('seasonPlanner.wishlistDescription')}
          </Typography>
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.5} sx={{ maxHeight: 280, overflowY: 'auto', pt: 1 }}>
            {wishes.map(({ planting, icon, name }) => {
              const requester = planting.requestedByIri
                ? data.personsByIri.get(planting.requestedByIri)?.name
                : undefined;
              return (
                <Chip
                  key={planting.iri}
                  size="small"
                  variant="outlined"
                  label={`${icon} ${name}${requester ? ` (${requester})` : ''}`}
                  title={planting.notes}
                  onClick={
                    editMode
                      ? () => {
                          setWishAnchor(null);
                          void editPlanting(planting.iri);
                        }
                      : undefined
                  }
                  sx={{ borderStyle: 'dashed' }}
                />
              );
            })}
          </Stack>
        </Box>
      </Popover>

      {/* Legend and hint */}
      <Popover
        open={Boolean(legendAnchor)}
        anchorEl={legendAnchor}
        onClose={() => setLegendAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Stack spacing={1} sx={{ p: 1.5, maxWidth: 420 }}>
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.5}>
            {Object.entries(ROLE_COLORS).map(([role, color]) => (
              <Chip
                key={role}
                size="small"
                label={t(`planting.roles.${role}`)}
                sx={{ bgcolor: color, color: '#fff', height: 20, fontSize: '0.7rem' }}
              />
            ))}
          </Stack>
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1.5}>
            {(['preCultivation', 'sowing', 'planting', 'harvest'] as const).map((phase) => (
              <Stack key={phase} direction="row" alignItems="center" spacing={0.5}>
                <Box sx={{ width: 14, height: 5, bgcolor: DEFAULT_PERIOD_COLORS[phase] }} />
                <Typography variant="caption">{t(`seasonPlanner.phases.${phase}`)}</Typography>
              </Stack>
            ))}
          </Stack>
          <Typography variant="caption" color="text.secondary">
            {t('seasonPlanner.hint')}
          </Typography>
        </Stack>
      </Popover>


      {resources.length === 0 ? (
        <Alert severity="info">{t('seasonPlanner.noPatches')}</Alert>
      ) : (
        <Box ref={timelineBoxRef} sx={{ flex: 1, minHeight: 320 }}>
          <Scheduler<PlantingInfo, PatchInfo>
            key={season}
            resources={resources}
            items={items}
            schedulerState={schedulerState}
            timelineStart={seasonRange.start}
            timelineEnd={seasonRange.end}
            timelineHeaderRows={headerRows}
            cellWidth={CELL_WIDTH}
            rowHeight={rowHeight}
            leftPanelWidth={leftPanelWidth}
            renderResource={singleBed ? undefined : (resource) => (
              <Tooltip title={t('bedPlanner.showBed')}>
                <Box
                  role="button"
                  tabIndex={0}
                  onClick={() => void dispatchIntent({ kind: 'show-entity', entityIRI: resource.id, typeName: 'Patch' })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') void dispatchIntent({ kind: 'show-entity', entityIRI: resource.id, typeName: 'Patch' });
                  }}
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1, cursor: 'pointer', overflow: 'hidden', width: '100%', '&:hover': { textDecoration: 'underline' } }}
                  data-testid="season-planner-open-bed"
                >
                  <Box component="span" sx={{ display: 'flex', flexShrink: 0 }}>{resource.icon}</Box>
                  <Typography variant="body2" noWrap>{resource.label}</Typography>
                </Box>
              </Tooltip>
            )}
            leftPanelHeader={
              <Typography variant="subtitle2" sx={{ px: 1 }}>
                {t('seasonPlanner.beds')}
              </Typography>
            }
            canCreateItems={editMode}
            canMoveItems={editMode}
            canResizeItems={editMode}
            snapStep={ONE_DAY_MS}
            onItemCreate={handleCreate}
            onItemMove={(item, _resourceId, start, end) => persistRange(item, start, end)}
            onItemResize={(item, start, end) => persistRange(item, start, end)}
            onItemClick={(item) => {
              if (onPlantingSelect) onPlantingSelect(item.id);
              else if (editMode) void editPlanting(item.id);
              else void dispatchIntent({ kind: 'show-entity', entityIRI: item.id, typeName: 'Planting' });
            }}
          />
        </Box>
      )}
    </Box>
  );
};
