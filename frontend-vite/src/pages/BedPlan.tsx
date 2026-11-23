import { Alert, Badge, Box, Button, CircularProgress, IconButton, Paper, Snackbar, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotesIcon from '@mui/icons-material/EditNote';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchGardenGeometries } from '../api/bedPlan';
import { SEASON_QUERY_KEY } from '../api/season';
import { BedPlanner } from '../components/bed-planner/BedPlanner';
import { BedViewSwitch, type BedView } from '../components/bed-planner/BedViewSwitch';
import { BedNotesPanel } from '../components/bed-notes/BedNotesPanel';
import { PlantIcon } from '../components/plants/PlantIcon';
import { SeasonPlannerScheduler } from '../components/season-planner/SeasonPlannerScheduler';
import { defaultSeason } from '../components/season-planner/seasonTimeline';
import { useBedPlanStore } from '../hooks/useBedPlanStore';
import { useCurrentGarden } from '../hooks/useCurrentGarden';
import { useSeasonData } from '../hooks/useSeasonData';
import { useBedNotes } from '../hooks/useBedNotes';
import { usePergolaStore } from '../hooks/usePergolaStore';
import { lastSegment } from '../utils/iri';

/** A bed without an area on the garden map: the planner shows its hint instead of a map. */
const NO_GEOMETRY: GeoJSON.Geometry = { type: 'GeometryCollection', geometries: [] };

const isArea = (g: GeoJSON.Geometry) => g.type === 'Polygon' || g.type === 'MultiPolygon';

/**
 * `/:gardenId/beds/:patchId/plan?season=2027` — the bed plan of one bed:
 * where each plant, row or area of the season's plantings stands in the bed.
 * `patchId` is the last part of the bed's IRI.
 */
const NOTES_WIDTH = 380;

const BedPlan = () => {
  const { t } = useTranslation('garden');
  const navigate = useNavigate();
  const { patchId } = useParams<{ patchId: string }>();
  const { gardenId, gardenIRI } = useCurrentGarden();
  const [search, setSearch] = useSearchParams();
  const season = Number(search.get('season')) || defaultSeason();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const rawView = search.get('view');
  const view: BedView = rawView === 'timeline' || (rawView === 'notes' && isMobile) ? rawView : 'plan';
  const plantingParam = search.get('planting') ?? undefined;
  const [notesOpen, setNotesOpen] = useState(true);

  const update = useCallback(
    (changes: Record<string, string | undefined>) =>
      setSearch(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const [k, v] of Object.entries(changes)) {
            if (v === undefined) next.delete(k);
            else next.set(k, v);
          }
          return next;
        },
        { replace: true },
      ),
    [setSearch],
  );

  const { data, isLoading } = useSeasonData();
  const { store, ready } = usePergolaStore();
  const geometries = useQuery({
    queryKey: [...SEASON_QUERY_KEY, 'geometries', gardenIRI],
    enabled: Boolean(gardenIRI && ready && store),
    staleTime: 60_000,
    queryFn: () => fetchGardenGeometries(store!, gardenIRI!),
  });

  const patch = useMemo(
    () => data.patches.find((p) => lastSegment(p.iri) === patchId),
    [data.patches, patchId],
  );
  const bedGeometry = patch?.geoFeatureIri ? geometries.data?.get(patch.geoFeatureIri) : undefined;
  /** the other areas of the garden, in grey, for orientation */
  const context = useMemo(
    () =>
      [...(geometries.data ?? [])]
        .filter(([iri, g]) => iri !== patch?.geoFeatureIri && isArea(g))
        .map(([, g]) => g),
    [geometries.data, patch?.geoFeatureIri],
  );

  const { placements, api, error, clearError } = useBedPlanStore(patch?.iri, season, data.plants);
  const notesState = useBedNotes();
  

  const bedNotes = useMemo(() => notesState.notesOfBed(patch?.iri), [notesState, patch?.iri]);
  /** clicking a planting only highlights its bar in the timeline */
  const selectedPlantingIri = useMemo(
    () => data.plantings.find((p) => p.patchIri === patch?.iri && lastSegment(p.iri) === plantingParam)?.iri,
    [data.plantings, patch?.iri, plantingParam],
  );
  const selectPlanting = useCallback((iri: string) => update({ planting: lastSegment(iri) }), [update]);
  const bedNoteCount = bedNotes.length;

  const notesPanel = (
    <BedNotesPanel notes={bedNotes} api={{ ...notesState.api, addNote: (text) => (patch ? notesState.api.addNote(patch.iri, text) : Promise.resolve()) }} />
  );
  const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate(toMap));
  const setView = (v: BedView) => update({ view: v === 'plan' ? undefined : v });
  const switcher = <BedViewSwitch value={view} onChange={setView} withNotes={isMobile} />;
  const notesToggle = !isMobile && (
    <Tooltip title={t('bedPlanner.viewNotes')}>
      <IconButton
        size="small"
        color={notesOpen ? 'primary' : 'default'}
        onClick={() => setNotesOpen((o) => !o)}
        aria-label={t('bedPlanner.viewNotes')}
        data-testid="bed-notes-toggle"
      >
        <Badge badgeContent={bedNoteCount} color="primary" max={99}>
          <NotesIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );

  const toMap = `/${gardenId}/map`;
  if (isLoading || geometries.isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!patch) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert
          severity="warning"
          action={
            <Button color="inherit" size="small" component={RouterLink} to={toMap}>
              {t('bedPlanner.toMap')}
            </Button>
          }
        >
          {t('bedPlanner.notFound')}
        </Alert>
      </Box>
    );
  }

  const planView = (
    <BedPlanner
      bed={{ iri: patch.iri, name: patch.name, imageUrl: patch.imageUrl, geometry: bedGeometry ?? NO_GEOMETRY }}
      season={season}
      plantings={data.plantings}
      plants={data.plants}
      placements={placements}
      rotation={patch.planRotation}
      context={context}
      api={api}
      // back to where the user came from (the map card); a direct link goes to the map
      onBack={goBack}
      headerActions={
        <Stack direction="row" spacing={0.5} alignItems="center">
          {switcher}
          {notesToggle}
        </Stack>
      }
      onPlantingFocus={selectPlanting}
    />
  );

  const timelineView = (
    <SeasonPlannerScheduler
      patchIri={patch.iri}
      season={season}
      onSeasonChange={(s) => update({ season: String(s) })}
      selectedPlantingIri={selectedPlantingIri}
      onPlantingSelect={selectPlanting}
      toolbarStart={
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: 1 }}>
          <IconButton size="small" onClick={goBack} aria-label={t('bedPlanner.back')} data-testid="bed-planner-back">
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          {patch.imageUrl && <PlantIcon image={patch.imageUrl} size={36} shape="rounded" />}
          <Typography variant="h6" noWrap>
            {patch.name}
          </Typography>
          {switcher}
          {notesToggle}
        </Stack>
      }
    />
  );

  return (
    <Box sx={{ flex: 1, minHeight: 0, display: 'flex' }}>
      <Box sx={{ flex: 1, minWidth: 0, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {view === 'notes' ? (
          <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
              <IconButton size="small" onClick={goBack} aria-label={t('bedPlanner.back')}>
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              {patch.imageUrl && <PlantIcon image={patch.imageUrl} size={32} shape="rounded" />}
              <Typography variant="subtitle1" noWrap sx={{ flex: 1 }}>
                {patch.name} · {season}
              </Typography>
              {switcher}
            </Stack>
            <Box sx={{ flex: 1, minHeight: 0 }}>{notesPanel}</Box>
          </Box>
        ) : view === 'timeline' ? (
          timelineView
        ) : (
          planView
        )}
        <Snackbar
          open={Boolean(error || notesState.error)}
          autoHideDuration={6000}
          onClose={() => {
            clearError();
            notesState.clearError();
          }}
          message={error ? t('bedPlanner.saveFailed', { message: error }) : t('bedNotes.saveFailed', { message: notesState.error })}
        />
      </Box>
      {!isMobile && notesOpen && (
        <Paper
          square
          elevation={0}
          component="aside"
          sx={{ width: NOTES_WIDTH, flexShrink: 0, borderLeft: 1, borderColor: 'divider', minHeight: 0, overflow: 'hidden', bgcolor: '#fff' }}
        >
          {notesPanel}
        </Paper>
      )}
    </Box>
  );
};

export default BedPlan;
