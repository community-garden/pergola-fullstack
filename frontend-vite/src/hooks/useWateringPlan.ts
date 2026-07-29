import { useState, useEffect, useCallback } from 'react';
import { isNil } from 'lodash-es';

export interface PlanAssignment {
  date: string;
  personIri: string;
}

export interface DatePerson {
  personIri: string;
  name: string;
}

export type AvailabilityByDate = Record<string, DatePerson[]>;

export interface WateringAvailabilityEntry {
  person?: { '@id'?: string; name?: string };
  name?: string;
  availableDates?: string[];
}

export interface WateringPlanState {
  assignments: PlanAssignment[];
  personNames: Record<string, string>;
  availabilityByDate: AvailabilityByDate;
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

export function addMonthsYYYYMM(yyyyMm: string, delta: number): string {
  const [year, month] = yyyyMm.split('-').map(Number);
  const d = new Date(year, month - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function isPlanCalculated(plan: { calculatedAt?: string | null } | null | undefined): boolean {
  return !!plan?.calculatedAt;
}

export function personNameFromEntry(
  entry: WateringAvailabilityEntry,
  personIri: string,
  personNames: Record<string, string>
): string {
  if (personNames[personIri]) return personNames[personIri];
  const fromPerson = entry.person?.name;
  if (fromPerson) return fromPerson;
  const fromLabel = entry.name?.split(' @ ')[0];
  if (fromLabel) return fromLabel;
  return personIri.split('/').pop() ?? personIri;
}

export function buildAvailabilityByDate(
  entries: WateringAvailabilityEntry[],
  personNames: Record<string, string> = {}
): { availabilityByDate: AvailabilityByDate; personNames: Record<string, string> } {
  const mergedNames = { ...personNames };
  const availabilityByDate: AvailabilityByDate = {};

  entries.forEach((entry) => {
    const personIri = entry.person?.['@id'];
    if (isNil(personIri) || !Array.isArray(entry.availableDates)) return;

    const name = personNameFromEntry(entry, personIri, mergedNames);
    mergedNames[personIri] = name;

    entry.availableDates.forEach((date) => {
      if (!availabilityByDate[date]) availabilityByDate[date] = [];
      if (!availabilityByDate[date].some((p) => p.personIri === personIri)) {
        availabilityByDate[date].push({ personIri, name });
      }
    });
  });

  return { availabilityByDate, personNames: mergedNames };
}

export function planIdFromGardenAndMonth(gardenId: string, targetMonth: string): string {
  return `${gardenId}-${targetMonth}`;
}

export function personIdFromIri(personIri: string): string {
  return personIri.split('/').pop() ?? personIri;
}

export interface PlanTargetState {
  planTargetMonth: string;
  calculatedAt: string | null;
  assignments: PlanAssignment[];
  loading: boolean;
  refetch: () => void;
}

async function resolvePlanTargetState(gardenIri: string): Promise<{
  planTargetMonth: string;
  calculatedAt: string | null;
  assignments: PlanAssignment[];
}> {
  let month = currentMonthYYYYMM();

  for (let i = 0; i < 12; i += 1) {
    const res = await fetch(
      `/api/watering/plan?gardenIri=${encodeURIComponent(gardenIri)}&month=${month}`
    );

    if (!res.ok) {
      return { planTargetMonth: month, calculatedAt: null, assignments: [] };
    }

    const plan = await res.json();
    if (!isPlanCalculated(plan)) {
      return {
        planTargetMonth: month,
        calculatedAt: null,
        assignments: Array.isArray(plan.assignments) ? plan.assignments : [],
      };
    }

    month = addMonthsYYYYMM(month, 1);
  }

  return { planTargetMonth: month, calculatedAt: null, assignments: [] };
}

/** First month from the current month onward that has no calculated plan yet. */
export function usePlanTargetMonth(gardenId: string | undefined): PlanTargetState {
  const [refreshKey, setRefreshKey] = useState(0);
  const [state, setState] = useState<Omit<PlanTargetState, 'refetch'>>({
    planTargetMonth: currentMonthYYYYMM(),
    calculatedAt: null,
    assignments: [],
    loading: true,
  });

  useEffect(() => {
    if (!gardenId) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }

    setState((s) => ({ ...s, loading: true }));
    resolvePlanTargetState(gardenIriFromId(gardenId))
      .then(({ planTargetMonth, calculatedAt, assignments }) => {
        setState({ planTargetMonth, calculatedAt, assignments, loading: false });
      })
      .catch(() => {
        setState({
          planTargetMonth: currentMonthYYYYMM(),
          calculatedAt: null,
          assignments: [],
          loading: false,
        });
      });
  }, [gardenId, refreshKey]);

  const refetch = useCallback(() => setRefreshKey((k) => k + 1), []);

  return { ...state, refetch };
}

/** Month shown in wizard / availability count: current month until plan target is calculated. */
export function registrationMonthYYYYMM(planTargetCalculated: boolean): string {
  return planTargetCalculated ? nextMonthYYYYMM() : currentMonthYYYYMM();
}

export function useRegistrationMonth(gardenId: string | undefined): {
  month: string;
  planTargetMonth: string;
  planTargetCalculated: boolean;
  loading: boolean;
} {
  const { planTargetMonth, calculatedAt, loading, refetch } = usePlanTargetMonth(gardenId);
  const planTargetCalculated = isPlanCalculated({ calculatedAt });
  const month = registrationMonthYYYYMM(planTargetCalculated);

  return { month, planTargetMonth, planTargetCalculated, loading, refetch };
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
    availabilityByDate: {},
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
        const basePersonNames: Record<string, string> = { ...(plan.personNames ?? {}) };
        let myAvailableDates: string[] = [];
        (availability as WateringAvailabilityEntry[]).forEach((entry) => {
          const iri = entry.person?.['@id'];
          if (iri && personIri && iri === personIri && Array.isArray(entry.availableDates)) {
            myAvailableDates = entry.availableDates;
          }
        });

        const { availabilityByDate, personNames } = buildAvailabilityByDate(
          availability as WateringAvailabilityEntry[],
          basePersonNames
        );

        setState({
          assignments: Array.isArray(plan.assignments) ? plan.assignments : [],
          personNames,
          availabilityByDate,
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

export function useAvailabilityCount(
  gardenId: string | undefined,
  month: string
): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(null);
    if (!gardenId) return;
    const gardenIri = gardenIriFromId(gardenId);
    fetch(`/api/watering/availability?gardenIri=${encodeURIComponent(gardenIri)}&month=${month}`)
      .then((r) => (r.ok ? r.json() : Promise.resolve([])))
      .then((data: unknown) => setCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setCount(null));
  }, [gardenId, month]);

  return count;
}
