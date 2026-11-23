import { useQuery } from '@tanstack/react-query';
import { EVENTS_QUERY_KEY, fetchEvents, type GardenEventInfo } from '../api/events';
import { useCurrentGarden } from './useCurrentGarden';
import { usePergolaStore } from './usePergolaStore';

const NO_EVENTS: GardenEventInfo[] = [];

/** The events of the current garden. */
export const useGardenEvents = () => {
  const { store, ready } = usePergolaStore();
  const { gardenIRI } = useCurrentGarden();
  const query = useQuery({
    queryKey: [...EVENTS_QUERY_KEY, gardenIRI],
    enabled: Boolean(ready && store && gardenIRI),
    staleTime: 30_000,
    queryFn: () => fetchEvents(store!, gardenIRI!),
  });
  return { ...query, events: query.data ?? NO_EVENTS };
};
