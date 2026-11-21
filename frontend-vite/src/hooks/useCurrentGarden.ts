import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

const ENTITY_BASE_IRI = 'https://data.semantic-desk.top/garden/';

export interface UseCurrentGardenResult {
  gardenId: string | undefined;
  gardenIRI: string | undefined;
}

export const useCurrentGarden = (): UseCurrentGardenResult => {
  const { gardenId: routeGardenId } = useParams<{ gardenId: string }>();
  // Modals (NiceModal) render outside the router — fall back to the URL path.
  const gardenId =
    routeGardenId ??
    (typeof window !== 'undefined'
      ? decodeURIComponent(window.location.pathname.split('/')[1] ?? '') || undefined
      : undefined);

  const gardenIRI = useMemo(() => {
    if (!gardenId) return undefined;
    return `${ENTITY_BASE_IRI}Garden/${gardenId}`;
  }, [gardenId]);

  return {
    gardenId,
    gardenIRI,
  };
};

