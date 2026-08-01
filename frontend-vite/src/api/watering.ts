import type { PlanAssignment } from '../hooks/useWateringPlan';

export async function removePlanAssignment(
  planId: string,
  date: string,
  personIri: string
): Promise<{ assignments: PlanAssignment[] }> {
  const res = await fetch(`/api/watering/plan/${encodeURIComponent(planId)}/assignments`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, personIri }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function addPlanAssignment(planId: string, date: string, personIri: string): Promise<void> {
  const res = await fetch(`/api/watering/plan/${encodeURIComponent(planId)}/assignments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, personIri }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

export async function deletePlan(planId: string): Promise<{ deleted: string }> {
  const res = await fetch(`/api/watering/plan/${encodeURIComponent(planId)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function removeAvailabilityDate(
  gardenIri: string,
  personIri: string,
  targetMonth: string,
  date: string
): Promise<{ deleted?: string; availableDates?: string[] }> {
  const res = await fetch('/api/watering/availability/date', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gardenIri, personIri, targetMonth, date }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
