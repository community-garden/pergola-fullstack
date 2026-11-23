import { useEffect, useMemo, useState } from 'react';
import { Box, ButtonBase, Card, CardContent, Chip, Skeleton, Stack, Typography, alpha, useTheme } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatchIntent } from '@graviola/edb-state-hooks';
import type { Locale } from 'date-fns';
import { useDateFnsLocale } from '../../hooks';
import { useGardenEvents } from '../../hooks/useGardenEvents';
import type { GardenEventInfo } from '../../api/events';
import { isCancelled, selectHomeEvents } from './eventTiming';
import { eventDisplay } from './formatEvent';

/** The start page compares with "now"; five minutes is accurate enough for dates. */
const REFRESH_MS = 5 * 60_000;

const useNow = () => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), REFRESH_MS);
    return () => clearInterval(id);
  }, []);
  return now;
};

interface EventRowProps {
  event: GardenEventInfo;
  locale: Locale;
  past?: boolean;
  onOpen: (iri: string) => void;
}

const EventRow = ({ event, locale, past, onOpen }: EventRowProps) => {
  const theme = useTheme();
  const { t } = useTranslation('events');
  const display = eventDisplay(event, locale);
  const cancelled = isCancelled(event);
  const tentative = event.eventStatus === 'tentative';

  const details = [
    display.weekday,
    display.time ?? t('preview.allDay'),
    display.until ? t('preview.until', { date: display.until }) : undefined,
    event.place,
  ].filter(Boolean);

  const badge = past ? t('preview.recent') : cancelled ? t('preview.cancelled') : tentative ? t('preview.tentative') : undefined;

  return (
    <ButtonBase
      data-testid="events-preview-row"
      data-event-iri={event.iri}
      data-past={past ? 'true' : undefined}
      onClick={() => onOpen(event.iri)}
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 1.5,
        p: 0.75,
        borderRadius: 2,
        textAlign: 'left',
        opacity: past || cancelled ? 0.7 : 1,
        '&:hover, &:focus-visible': { backgroundColor: alpha(theme.palette.background.paper, 0.5) },
      }}
    >
      <Box
        aria-hidden
        sx={{
          flexShrink: 0,
          width: 46,
          py: 0.5,
          textAlign: 'center',
          borderRadius: 2,
          lineHeight: 1,
          backgroundColor: alpha(theme.palette.background.paper, 0.55),
          border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`,
        }}
      >
        <Typography component="div" variant="h6" fontWeight={700} lineHeight={1.1}>
          {display.day}
        </Typography>
        <Typography component="div" variant="caption" color="text.secondary" textTransform="uppercase" lineHeight={1.2}>
          {display.month}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          fontWeight={700}
          noWrap
          sx={{ textDecoration: cancelled ? 'line-through' : undefined }}
        >
          {event.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" noWrap>
          {details.join(' · ')}
        </Typography>
      </Box>

      {badge && (
        <Chip
          size="small"
          label={badge}
          color={cancelled ? 'error' : 'default'}
          variant="outlined"
          sx={{ flexShrink: 0, height: 22 }}
        />
      )}
    </ButtonBase>
  );
};

/**
 * Glass panel for the start page: the next events and one recent one.
 * Up to four rows, soonest first, led by the most recent past event when it
 * ended at most two weeks ago (see `selectHomeEvents`). A row opens the event's
 * detail dialog; the header links to the events module.
 */
export const EventsPreview = () => {
  const theme = useTheme();
  const { t } = useTranslation('events');
  const { gardenId = '' } = useParams();
  const locale = useDateFnsLocale();
  const dispatchIntent = useDispatchIntent();
  const now = useNow();
  const { events, isLoading, isError } = useGardenEvents();

  const { past, upcoming } = useMemo(() => selectHomeEvents(events, now), [events, now]);
  const rows = past ? [{ event: past, past: true }, ...upcoming.map((event) => ({ event, past: false }))] : upcoming.map((event) => ({ event, past: false }));

  const open = (iri: string) => void dispatchIntent({ kind: 'show-entity', entityIRI: iri, typeName: 'GardenEvent' });

  return (
    <Card
      component="section"
      aria-label={t('preview.ariaLabel')}
      data-testid="events-preview"
      sx={{
        // the start page decides the width, like it does for the weather card
        width: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: alpha(theme.palette.background.paper, 0.35),
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${alpha(theme.palette.common.white, 0.35)}`,
        boxShadow: theme.shadows[2],
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight={700} component="h2">
              {t('preview.title')}
            </Typography>
            <Typography
              component={Link}
              to={`/${gardenId}/events`}
              data-testid="events-preview-all"
              variant="caption"
              fontWeight={600}
              sx={{ color: 'primary.dark', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              {t('preview.all')}
            </Typography>
          </Box>

          {isLoading ? (
            [0, 1, 2].map((i) => <Skeleton key={i} variant="rounded" height={46} />)
          ) : isError ? (
            <Typography variant="body2" color="error">
              {t('preview.loadFailed')}
            </Typography>
          ) : rows.length === 0 ? (
            <Typography variant="body2" color="text.secondary" data-testid="events-preview-empty">
              {events.length === 0 ? t('preview.empty') : t('preview.emptyUpcoming')}
            </Typography>
          ) : (
            rows.map(({ event, past: isPast }) => (
              <EventRow key={event.iri} event={event} locale={locale} past={isPast} onOpen={open} />
            ))
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EventsPreview;
