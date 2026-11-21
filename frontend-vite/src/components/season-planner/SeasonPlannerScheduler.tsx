import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { Scheduler, createDateConfig, useScheduler, ONE_DAY_MS } from './scheduler';
import type { SchedulerItem } from './scheduler';
import { useDateFnsLocale } from '../../hooks';
import { plantingLabel, useSeasonData } from '../../hooks/useSeasonData';
import { usePlantingMutations } from '../../hooks/usePlantingMutations';
import type { PatchInfo, PlantingInfo } from '../../api/season';
import { DEFAULT_PERIOD_COLORS } from '../garden/SeasonalGrowingCalendar';
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

/**
 * Season planning timeline: one row per bed, one bar per planting.
 * Click empty space → new planting, drag → move, drag edges → change dates,
 * click a bar → edit dialog. Wishes without a bed are listed above.
 */
export const SeasonPlannerScheduler = () => {
  const { t } = useTranslation('garden');
  const locale = useDateFnsLocale();
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, error } = useSeasonData();
  const { updateDates, editPlanting, createPlanting, invalidate } = usePlantingMutations();

  const [season, setSeason] = useState(defaultSeason);
  const [showWishes, setShowWishes] = useState(true);
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
    () => data.plantings.filter((p) => overlapsSeason(p, season)),
    [data.plantings, season],
  );
  const wishes = useMemo(
    () =>
      data.plantings
        .filter((p) => !p.patchIri && (!p.startDate || overlapsSeason(p, season)))
        .map((p) => ({ planting: p, ...plantingLabel(p, data) }))
        .sort((a, b) => a.name.localeCompare(b.name, 'de')),
    [data, season],
  );

  const resources = useMemo(() => data.patches.map(patchToResource), [data.patches]);
  const items = useMemo(
    () =>
      seasonPlantings
        .map((p) => plantingToItem(p, data, text))
        .filter((i): i is SchedulerItem<PlantingInfo> => Boolean(i)),
    [seasonPlantings, data, text],
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
    const available = el.clientWidth - LEFT_PANEL_WIDTH - 24;
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
        p: 1.5,
        bgcolor: 'background.paper',
      }}
    >
      {/* Toolbar */}
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
        <Typography variant="h6" sx={{ mr: 1 }}>
          {t('seasonPlanner.title')}
        </Typography>
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
        <Box sx={{ flex: 1 }} />
        {Object.entries(ROLE_COLORS).map(([role, color]) => (
          <Chip
            key={role}
            size="small"
            label={t(`planting.roles.${role}`)}
            sx={{ bgcolor: color, color: '#fff', height: 20, fontSize: '0.7rem' }}
          />
        ))}
        {(['preCultivation', 'sowing', 'planting', 'harvest'] as const).map((phase) => (
          <Stack key={phase} direction="row" alignItems="center" spacing={0.5}>
            <Box sx={{ width: 14, height: 5, bgcolor: DEFAULT_PERIOD_COLORS[phase] }} />
            <Typography variant="caption">{t(`seasonPlanner.phases.${phase}`)}</Typography>
          </Stack>
        ))}
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

      {/* Wish list: plantings without a bed */}
      <Box>
        <Button
          size="small"
          onClick={() => setShowWishes((v) => !v)}
          endIcon={showWishes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{ textTransform: 'none' }}
        >
          {t('seasonPlanner.wishlist')} ({wishes.length}) – {t('seasonPlanner.wishlistDescription')}
        </Button>
        <Collapse in={showWishes}>
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.5} sx={{ maxHeight: 96, overflowY: 'auto', py: 0.5 }}>
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
                  onClick={() => void editPlanting(planting.iri)}
                  sx={{ borderStyle: 'dashed' }}
                />
              );
            })}
          </Stack>
        </Collapse>
      </Box>

      <Typography variant="caption" color="text.secondary">
        {t('seasonPlanner.hint')}
      </Typography>

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
            rowHeight={ROW_HEIGHT}
            leftPanelWidth={LEFT_PANEL_WIDTH}
            leftPanelHeader={
              <Typography variant="subtitle2" sx={{ px: 1 }}>
                {t('seasonPlanner.beds')}
              </Typography>
            }
            canCreateItems
            canMoveItems
            canResizeItems
            snapStep={ONE_DAY_MS}
            onItemCreate={handleCreate}
            onItemMove={(item, _resourceId, start, end) => persistRange(item, start, end)}
            onItemResize={(item, start, end) => persistRange(item, start, end)}
            onItemClick={(item) => void editPlanting(item.id)}
          />
        </Box>
      )}
    </Box>
  );
};
