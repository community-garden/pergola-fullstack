import { describe, it, expect } from 'bun:test';
import { de, enUS } from 'date-fns/locale';
import { eventDisplay } from './formatEvent';

describe('eventDisplay', () => {
  it('shows day, month and weekday of the first day', () => {
    expect(eventDisplay({ startsOn: '2027-05-15' }, de)).toEqual({ day: '15', month: 'Mai', weekday: 'Sa.' });
    expect(eventDisplay({ startsOn: '2027-05-15' }, enUS)).toEqual({ day: '15', month: 'May', weekday: 'Sat' });
  });

  it('an all-day event has no time', () => {
    expect(eventDisplay({ startsOn: '2027-05-15' }, de).time).toBeUndefined();
  });

  it('shows the time as stored, to the minute', () => {
    expect(eventDisplay({ startsOn: '2027-05-15', startsAt: '18:00:00' }, de).time).toBe('18:00');
  });

  it('shows start and end time of a one-day event', () => {
    expect(eventDisplay({ startsOn: '2027-05-15', startsAt: '18:00:00', endsAt: '20:30:00' }, de).time).toBe('18:00–20:30');
  });

  it('a multi-day event names its last day and shows only the start time', () => {
    const d = eventDisplay({ startsOn: '2027-05-15', startsAt: '10:00', endsOn: '2027-05-17', endsAt: '16:00' }, de);
    expect(d.time).toBe('10:00');
    expect(d.until).toBe('Mo., 17. Mai');
    expect(eventDisplay({ startsOn: '2027-05-15', endsOn: '2027-05-17' }, enUS).until).toBe('Mon, May 17');
  });

  it('an end day equal to the start day is a one-day event', () => {
    expect(eventDisplay({ startsOn: '2027-05-15', endsOn: '2027-05-15' }, de).until).toBeUndefined();
  });
});
