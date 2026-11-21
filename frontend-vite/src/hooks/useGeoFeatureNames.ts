import { useQuery } from '@tanstack/react-query';
import { fetchGeoFeatureNames } from '../api/mapLabels';
import { SEASON_QUERY_KEY } from '../api/season';
import { useCurrentGarden } from './useCurrentGarden';

const EMPTY = new Map<string, string[]>();

/**
 * Geo feature IRI → names of all objects on it (bed, shed, …).
 * Lives under the season query key, so editing a bed refreshes the map labels.
 */
export const useGeoFeatureNames = () => {
  const { gardenIRI } = useCurrentGarden();
  const query = useQuery({
    queryKey: [...SEASON_QUERY_KEY, 'featureNames', gardenIRI],
    enabled: Boolean(gardenIRI),
    staleTime: 30_000,
    queryFn: () => fetchGeoFeatureNames(gardenIRI!),
  });
  return { ...query, data: query.data ?? EMPTY };
};
