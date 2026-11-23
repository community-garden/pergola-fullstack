import { describe, it, expect } from 'bun:test';
import {
  addDays,
  eventRange,
  HOME_ROWS,
  PAST_WINDOW_DAYS,
  selectHomeEvents,
  zonedToInstant,
  type EventTimingFields,
} from './eventTiming';

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const utc = (iso: string) => Date.parse(iso);

type TestEvent = EventTimingFields & { name: string };
const event = (name: string, fields: Partial<EventTimingFields> & { startsOn: string }): TestEvent => ({
  name,
  timeZone: 'Europe/Berlin',
  ...fields,
});

describe('zonedToInstant', () => {
  it('uses the winter and the summer offset of the zone', () => {
    expect(zonedToInstant('2027-01-15', '18:00:00', 'Europe/Berlin')).toBe(utc('2027-01-15T17:00:00Z'));
    expect(zonedToInstant('2027-07-15', '18:00:00', 'Europe/Berlin')).toBe(utc('2027-07-15T16:00:00Z'));
  });

  it('keeps 18:00 local on both sides of a daylight saving change', () => {
    // Europe/Berlin springs forward on 2027-03-28
    expect(zonedToInstant('2027-03-27', '18:00', 'Europe/Berlin')).toBe(utc('2027-03-27T17:00:00Z'));
    expect(zonedToInstant('2027-03-29', '18:00', 'Europe/Berlin')).toBe(utc('2027-03-29T16:00:00Z'));
  });

  it('works for zones west of Greenwich', () => {
    expect(zonedToInstant('2027-01-15', '09:30', 'America/New_York')).toBe(utc('2027-01-15T14:30:00Z'));
  });
});

describe('addDays', () => {
  it('counts calendar days across month and year ends', () => {
    expect(addDays('2027-02-28', 1)).toBe('2027-03-01');
    expect(addDays('2027-12-31', 1)).toBe('2028-01-01');
    expect(addDays('2027-03-01', -1)).toBe('2027-02-28');
  });
});

describe('eventRange', () => {
  it('an all-day event runs from midnight to the next midnight (iCal exclusive DTEND)', () => {
    const r = eventRange(event('Fest', { startsOn: '2027-05-15' }));
    expect(r.allDay).toBe(true);
    expect(r.start).toBe(utc('2027-05-14T22:00:00Z'));
    expect(r.end).toBe(utc('2027-05-15T22:00:00Z'));
  });

  it('the last day of a multi-day event counts', () => {
    const r = eventRange(event('Camp', { startsOn: '2027-05-15', endsOn: '2027-05-17' }));
    expect(r.end - r.start).toBe(3 * DAY);
  });

  it('an all-day event on the day the clocks go forward lasts 23 hours', () => {
    const r = eventRange(event('Umstellung', { startsOn: '2027-03-28' }));
    expect(r.end - r.start).toBe(23 * HOUR);
  });

  it('a timed event runs from start to end time', () => {
    const r = eventRange(event('Treffen', { startsOn: '2027-05-15', startsAt: '18:00:00', endsAt: '20:30:00' }));
    expect(r.allDay).toBe(false);
    expect(r.end - r.start).toBe(2.5 * HOUR);
  });

  it('a timed event can end on a later day', () => {
    const r = eventRange(
      event('Nachtwache', { startsOn: '2027-05-15', startsAt: '22:00', endsOn: '2027-05-16', endsAt: '06:00' }),
    );
    expect(r.end - r.start).toBe(8 * HOUR);
  });

  it('a timed event without an end has no duration (iCal: no DTEND)', () => {
    const r = eventRange(event('Treffen', { startsOn: '2027-05-15', startsAt: '18:00' }));
    expect(r.end).toBe(r.start);
  });

  it('a timed event with a last day but no end time lasts until the end of that day', () => {
    const r = eventRange(event('Camp', { startsOn: '2027-05-15', startsAt: '10:00', endsOn: '2027-05-16' }));
    expect(r.end).toBe(zonedToInstant('2027-05-17', '00:00', 'Europe/Berlin'));
  });

  it('an end before the start does not make the event end before it starts', () => {
    const r = eventRange(event('Tippfehler', { startsOn: '2027-05-15', startsAt: '18:00', endsAt: '09:00' }));
    expect(r.end).toBe(r.start);
  });

  it('an unknown time zone falls back to the default zone', () => {
    const r = eventRange(event('Treffen', { startsOn: '2027-05-15', startsAt: '18:00', timeZone: 'Mars/Olympus' }));
    expect(r.start).toBe(utc('2027-05-15T16:00:00Z'));
  });

  it('an event without a zone uses the default zone', () => {
    const r = eventRange({ startsOn: '2027-05-15', startsAt: '18:00' });
    expect(r.start).toBe(utc('2027-05-15T16:00:00Z'));
  });
});

describe('selectHomeEvents', () => {
  const now = utc('2027-05-10T12:00:00Z');
  const upcomingDays = (n: number) =>
    Array.from({ length: n }, (_, i) => event(`next-${i + 1}`, { startsOn: addDays('2027-05-12', i * 2) }));

  it('shows four upcoming events, soonest first, when there is no past event', () => {
    const picked = selectHomeEvents([...upcomingDays(6)].reverse(), now);
    expect(picked.past).toBeUndefined();
    expect(picked.upcoming.map((e) => e.name)).toEqual(['next-1', 'next-2', 'next-3', 'next-4']);
  });

  it('shows one past event and three upcoming ones (four rows)', () => {
    const picked = selectHomeEvents([event('last', { startsOn: '2027-05-01' }), ...upcomingDays(6)], now);
    expect(picked.past?.name).toBe('last');
    expect(picked.upcoming.map((e) => e.name)).toEqual(['next-1', 'next-2', 'next-3']);
    expect(1 + picked.upcoming.length).toBe(HOME_ROWS);
  });

  it('shows only the most recent of several past events', () => {
    const picked = selectHomeEvents(
      [
        event('older', { startsOn: '2027-04-28' }),
        event('newest', { startsOn: '2027-05-08' }),
        event('old', { startsOn: '2027-05-02' }),
      ],
      now,
    );
    expect(picked.past?.name).toBe('newest');
  });

  it('a past event that ended exactly 14 days ago still shows, one millisecond later it does not', () => {
    const e = event('edge', { startsOn: '2027-04-26', startsAt: '10:00', endsAt: '12:00' }); // ends 12:00 Berlin
    const end = eventRange(e).end;
    expect(selectHomeEvents([e], end + PAST_WINDOW_DAYS * DAY).past?.name).toBe('edge');
    expect(selectHomeEvents([e], end + PAST_WINDOW_DAYS * DAY + 1).past).toBeUndefined();
  });

  it('the age of a past event counts from its end, not its start', () => {
    const camp = event('camp', { startsOn: '2027-04-20', endsOn: '2027-04-30' }); // ended 11 days ago
    expect(selectHomeEvents([camp], now).past?.name).toBe('camp');
  });

  it('an event in progress is upcoming, not past', () => {
    const running = event('running', { startsOn: '2027-05-10', startsAt: '10:00', endsAt: '18:00' });
    const picked = selectHomeEvents([running], now);
    expect(picked.past).toBeUndefined();
    expect(picked.upcoming.map((e) => e.name)).toEqual(['running']);
  });

  it('an all-day event of today is still upcoming in the evening', () => {
    const today = event('today', { startsOn: '2027-05-10' });
    const evening = utc('2027-05-10T20:00:00Z'); // 22:00 Berlin
    expect(selectHomeEvents([today], evening).upcoming.map((e) => e.name)).toEqual(['today']);
  });

  it('a cancelled past event is not shown', () => {
    const picked = selectHomeEvents([event('abgesagt', { startsOn: '2027-05-05', eventStatus: 'cancelled' })], now);
    expect(picked.past).toBeUndefined();
  });

  it('a cancelled upcoming event stays in the list so nobody turns up', () => {
    const picked = selectHomeEvents([event('abgesagt', { startsOn: '2027-05-12', eventStatus: 'cancelled' })], now);
    expect(picked.upcoming.map((e) => e.name)).toEqual(['abgesagt']);
  });

  it('an empty list gives an empty selection', () => {
    expect(selectHomeEvents([], now)).toEqual({ upcoming: [] });
  });

  it('shows four upcoming events when the only past event is too old', () => {
    const picked = selectHomeEvents([event('ancient', { startsOn: '2027-03-01' }), ...upcomingDays(5)], now);
    expect(picked.past).toBeUndefined();
    expect(picked.upcoming).toHaveLength(4);
  });
});
