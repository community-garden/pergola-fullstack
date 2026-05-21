import { useState, useEffect, useCallback } from 'react';

export interface PlanAssignment {
  date: string;
  personIri: string;
}

export interface WateringPlanState {
  assignments: PlanAssignment[];
  personNames: Record<string, string>;
  myAvailableDates: string[];
  calculatedAt: string | null;
  targetMonth: string | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const DATA_BASE = 'https://data.semantic-desk.top/garden/';

export function gardenIriFromId(gardenId: string): string {
  return `${DATA_BASE}Garden/${gardenId}`;
}

export function currentMonthYYYYMM(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function nextMonthYYYYMM(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function useWateringPlan(
  gardenId: string | undefined,
  month?: string,
  personIri?: string
): WateringPlanState {
  const effectiveMonth = month ?? currentMonthYYYYMM();
  const [refreshKey, setRefreshKey] = useState(0);

  const [state, setState] = useState<Omit<WateringPlanState, 'refetch'>>({
    assignments: [],
    personNames: {},
    myAvailableDates: [],
    calculatedAt: null,
    targetMonth: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!gardenId) return;

    const gardenIri = gardenIriFromId(gardenId);
    setState((s) => ({ ...s, loading: true, error: null }));

    Promise.all([
      fetch(
        `/api/watering/plan?gardenIri=${encodeURIComponent(gardenIri)}&month=${effectiveMonth}`
      ).then((r) => (r.ok ? r.json() : Promise.resolve({ assignments: [] }))),
      fetch(
        `/api/watering/availability?gardenIri=${encodeURIComponent(gardenIri)}&month=${effectiveMonth}`
      ).then((r) => (r.ok ? r.json() : Promise.resolve([]))),
    ])
      .then(([plan, availability]) => {
        const personNames: Record<string, string> = {};
        let myAvailableDates: string[] = [];
        (availability as any[]).forEach((entry) => {
          const iri: string | undefined = entry.person?.['@id'];
          const name: string =
            entry.person?.name ?? entry.name?.split(' @ ')[0] ?? iri ?? '';
          if (iri) personNames[iri] = name;
          if (personIri && iri === personIri && Array.isArray(entry.availableDates)) {
            myAvailableDates = entry.availableDates;
          }
        });

        setState({
          assignments: Array.isArray(plan.assignments) ? plan.assignments : [],
          personNames,
          myAvailableDates,
          calculatedAt: plan.calculatedAt ?? null,
          targetMonth: plan.targetMonth ?? null,
          loading: false,
          error: null,
        });
      })
      .catch((err: Error) => {
        setState((s) => ({ ...s, loading: false, error: err.message }));
      });
  }, [gardenId, effectiveMonth, personIri, refreshKey]);

  const refetch = useCallback(() => setRefreshKey((k) => k + 1), []);

  return { ...state, refetch };
}
