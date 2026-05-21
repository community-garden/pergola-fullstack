import { useState, useEffect } from 'react';

export interface PlanAssignment {
  date: string;
  personIri: string;
}

export interface WateringPlanState {
  assignments: PlanAssignment[];
  personNames: Record<string, string>;
  loading: boolean;
  error: string | null;
}

const DATA_BASE = 'https://data.semantic-desk.top/garden/';

export function gardenIriFromId(gardenId: string): string {
  return `${DATA_BASE}Garden/${gardenId}`;
}

export function useWateringPlan(gardenId: string | undefined): WateringPlanState {
  const [state, setState] = useState<WateringPlanState>({
    assignments: [],
    personNames: {},
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!gardenId) return;

    const gardenIri = gardenIriFromId(gardenId);
    setState((s) => ({ ...s, loading: true, error: null }));

    Promise.all([
      fetch(`/api/watering/plan?gardenIri=${encodeURIComponent(gardenIri)}`).then((r) =>
        r.ok ? r.json() : Promise.resolve({ assignments: [] })
      ),
      fetch(`/api/watering/availability?gardenIri=${encodeURIComponent(gardenIri)}`).then((r) =>
        r.ok ? r.json() : Promise.resolve([])
      ),
    ])
      .then(([plan, availability]) => {
        const personNames: Record<string, string> = {};
        (availability as any[]).forEach((entry) => {
          const iri: string | undefined = entry.person?.['@id'];
          // person.name is the nickname; fall back to the label's prefix before " @ "
          const name: string =
            entry.person?.name ?? entry.name?.split(' @ ')[0] ?? iri ?? '';
          if (iri) personNames[iri] = name;
        });

        setState({
          assignments: Array.isArray(plan.assignments) ? plan.assignments : [],
          personNames,
          loading: false,
          error: null,
        });
      })
      .catch((err: Error) => {
        setState((s) => ({ ...s, loading: false, error: err.message }));
      });
  }, [gardenId]);

  return state;
}
