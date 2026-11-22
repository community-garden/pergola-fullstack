import { Alert, Box, Button, CircularProgress, Snackbar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchGardenGeometries } from '../api/bedPlan';
import { SEASON_QUERY_KEY } from '../api/season';
import { BedPlanner } from '../components/bed-planner/BedPlanner';
import { defaultSeason } from '../components/season-planner/seasonTimeline';
import { useBedPlanStore } from '../hooks/useBedPlanStore';
import { useCurrentGarden } from '../hooks/useCurrentGarden';
import { useSeasonData } from '../hooks/useSeasonData';
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
const BedPlan = () => {
  const { t } = useTranslation('garden');
  const navigate = useNavigate();
  const { patchId } = useParams<{ patchId: string }>();
  const { gardenId, gardenIRI } = useCurrentGarden();
  const [search] = useSearchParams();
  const season = Number(search.get('season')) || defaultSeason();

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

  return (
    <Box sx={{ flex: 1, minHeight: 0, position: 'relative' }}>
      <BedPlanner
        bed={{ iri: patch.iri, name: patch.name, geometry: bedGeometry ?? NO_GEOMETRY }}
        season={season}
        plantings={data.plantings}
        plants={data.plants}
        placements={placements}
        rotation={patch.planRotation}
        context={context}
        api={api}
        // back to where the user came from (the map card); a direct link goes to the map
        onBack={() => (window.history.length > 1 ? navigate(-1) : navigate(toMap))}
      />
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={clearError}
        message={t('bedPlanner.saveFailed', { message: error })}
      />
    </Box>
  );
};

export default BedPlan;
