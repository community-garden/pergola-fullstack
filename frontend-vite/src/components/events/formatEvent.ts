import { format, parseISO } from 'date-fns';
import type { Locale } from 'date-fns';
import { isAllDay, type EventTimingFields } from './eventTiming';

/**
 * The parts of an event's date and time as shown to people. Date and time are
 * shown as stored (local to the event's time zone), never shifted to the
 * viewer's zone: an event at 18:00 is at 18:00 where the garden is.
 */
export interface EventDisplay {
  /** day of the month of the first day, e.g. "15" */
  day: string;
  /** short month of the first day, e.g. "Mai" */
  month: string;
  /** short weekday of the first day, e.g. "Sa." */
  weekday: string;
  /** "18:00" or "18:00–20:30"; none for an all-day event */
  time?: string;
  /** the last day of a multi-day event, e.g. "So., 17. Mai" */
  until?: string;
}

const hhmm = (time: string) => time.trim().slice(0, 5);

const dayPattern = (locale: Locale) => (locale.code?.startsWith('de') ? 'EEE, d. MMM' : 'EEE, MMM d');

export const eventDisplay = (event: EventTimingFields, locale: Locale): EventDisplay => {
  const start = parseISO(event.startsOn);
  const lastDay = event.endsOn?.trim() ? event.endsOn : undefined;
  const multiDay = lastDay !== undefined && lastDay > event.startsOn; // ISO dates sort as text

  let time: string | undefined;
  if (!isAllDay(event)) {
    time = event.endsAt?.trim() && !multiDay ? `${hhmm(event.startsAt!)}–${hhmm(event.endsAt)}` : hhmm(event.startsAt!);
  }

  return {
    day: format(start, 'd', { locale }),
    month: format(start, 'LLL', { locale }),
    weekday: format(start, 'EEE', { locale }),
    ...(time ? { time } : {}),
    ...(multiDay ? { until: format(parseISO(lastDay), dayPattern(locale), { locale }) } : {}),
  };
};
