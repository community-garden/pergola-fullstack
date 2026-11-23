import { DEFAULT_TIME_ZONE } from '../../schema/event-schema';

/**
 * Timing rules of garden events, in one place. Pure functions, no React: the
 * start page preview uses them now, a calendar feed can use them later.
 *
 * An event's date and time are *local* to its time zone (iCal's
 * `DTSTART;TZID=…`). Instants are only computed to compare with "now".
 */

/** The timing fields of an event (a subset of `GardenEvent`). */
export interface EventTimingFields {
  /** YYYY-MM-DD */
  startsOn: string;
  /** HH:mm or HH:mm:ss; empty means all-day */
  startsAt?: string;
  /** YYYY-MM-DD, the last day (inclusive); empty means the start day */
  endsOn?: string;
  /** HH:mm or HH:mm:ss */
  endsAt?: string;
  timeZone?: string;
  eventStatus?: string;
}

export interface EventRange {
  /** instant, ms since epoch */
  start: number;
  /**
   * instant, ms since epoch. For all-day events the first moment after the
   * event (iCal's exclusive DTEND). An event without an end time ends when it
   * starts (iCal: no DTEND means zero duration).
   */
  end: number;
  allDay: boolean;
}

/** Past events of up to this age may appear on the start page. */
export const PAST_WINDOW_DAYS = 14;
/** Rows of the start page preview. */
export const HOME_ROWS = 4;

const DAY_MS = 24 * 60 * 60 * 1000;

const hasValue = (v: string | undefined): v is string => typeof v === 'string' && v.trim() !== '';

/** `HH:mm` or `HH:mm:ss` → [h, m, s] */
const parseTime = (time: string): [number, number, number] => {
  const [h = '0', m = '0', s = '0'] = time.split(':');
  return [Number(h), Number(m), Number(s)];
};

const parseDate = (date: string): [number, number, number] => {
  const [y, m, d] = date.slice(0, 10).split('-').map(Number);
  return [y, m, d];
};

/** `date` plus `days`, as YYYY-MM-DD (calendar arithmetic, no time zone involved). */
export const addDays = (date: string, days: number): string => {
  const [y, m, d] = parseDate(date);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
};

/** Offset of `timeZone` from UTC at the instant `utcMs`, in ms (positive east of Greenwich). */
const zoneOffsetMs = (utcMs: number, timeZone: string): number => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(utcMs));
  const part = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const wallAsUtc = Date.UTC(part('year'), part('month') - 1, part('day'), part('hour'), part('minute'), part('second'));
  return wallAsUtc - Math.floor(utcMs / 1000) * 1000;
};

/**
 * The instant at which a clock in `timeZone` shows `date` `time`. Around a
 * daylight saving change the offset is looked up twice; a wall time that does
 * not exist (spring forward) resolves to the instant after the gap.
 */
export const zonedToInstant = (date: string, time: string, timeZone: string): number => {
  const [y, mo, d] = parseDate(date);
  const [h, mi, s] = parseTime(time);
  const wallAsUtc = Date.UTC(y, mo - 1, d, h, mi, s);
  const first = wallAsUtc - zoneOffsetMs(wallAsUtc, timeZone);
  const second = wallAsUtc - zoneOffsetMs(first, timeZone);
  return second;
};

/** An unknown or invalid zone name falls back to the default zone. */
const safeZone = (timeZone: string | undefined): string => {
  const zone = hasValue(timeZone) ? timeZone : DEFAULT_TIME_ZONE;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: zone });
    return zone;
  } catch {
    return DEFAULT_TIME_ZONE;
  }
};

export const isAllDay = (event: Pick<EventTimingFields, 'startsAt'>): boolean => !hasValue(event.startsAt);

/**
 * Start and end of an event as instants.
 *
 * - all-day: from midnight of the first day to midnight after the last day
 * - timed, with end time: the end time on the last day (the start day if none)
 * - timed, last day but no end time: until the end of the last day
 * - timed, neither: zero duration (starts and ends at the start time)
 */
export const eventRange = (event: EventTimingFields): EventRange => {
  const zone = safeZone(event.timeZone);
  const lastDay = hasValue(event.endsOn) ? event.endsOn : event.startsOn;

  if (isAllDay(event)) {
    return {
      start: zonedToInstant(event.startsOn, '00:00:00', zone),
      end: zonedToInstant(addDays(lastDay, 1), '00:00:00', zone),
      allDay: true,
    };
  }

  const start = zonedToInstant(event.startsOn, event.startsAt!, zone);
  let end: number;
  if (hasValue(event.endsAt)) {
    end = zonedToInstant(lastDay, event.endsAt, zone);
  } else if (hasValue(event.endsOn)) {
    end = zonedToInstant(addDays(event.endsOn, 1), '00:00:00', zone);
  } else {
    end = start;
  }
  // A mistyped end before the start must not make the event vanish.
  return { start, end: Math.max(start, end), allDay: false };
};

export const isCancelled = (event: Pick<EventTimingFields, 'eventStatus'>): boolean => event.eventStatus === 'cancelled';

export interface HomeEvents<T> {
  /** The most recent past event, if it ended at most {@link PAST_WINDOW_DAYS} days ago and was not cancelled. */
  past?: T;
  /** Events in progress and coming up, soonest first. */
  upcoming: T[];
}

/**
 * Picks the events for the start page: {@link HOME_ROWS} rows in total, a
 * recent past event first when there is one and the rest upcoming events.
 *
 * Upcoming includes events in progress. Cancelled events that are still ahead
 * stay (they are shown struck through, so nobody turns up); a cancelled past
 * event is of no interest.
 */
export const selectHomeEvents = <T extends EventTimingFields>(events: readonly T[], now: number): HomeEvents<T> => {
  const ranged = events.map((event) => ({ event, range: eventRange(event) }));

  const upcoming = ranged
    .filter(({ range }) => range.end > now)
    .sort((a, b) => a.range.start - b.range.start || a.range.end - b.range.end);

  const past = ranged
    .filter(({ event, range }) => range.end <= now && now - range.end <= PAST_WINDOW_DAYS * DAY_MS && !isCancelled(event))
    .sort((a, b) => b.range.end - a.range.end)[0];

  const upcomingRows = HOME_ROWS - (past ? 1 : 0);
  return {
    ...(past ? { past: past.event } : {}),
    upcoming: upcoming.slice(0, upcomingRows).map(({ event }) => event),
  };
};
