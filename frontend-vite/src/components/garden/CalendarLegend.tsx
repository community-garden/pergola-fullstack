import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PERIOD_TYPES, type PeriodType } from './plant-helpers';

interface CalendarLegendProps {
  periodColors: Record<PeriodType, string>;
  /** Period types to explain; defaults to all */
  periodTypes?: PeriodType[];
}

/**
 * Colours of the calendar and the column abbreviations, compact enough for a
 * popover (as the season planner's legend).
 */
export const CalendarLegend = ({ periodColors, periodTypes = PERIOD_TYPES }: CalendarLegendProps) => {
  const { t } = useTranslation('garden');
  const abbreviations = ['germinationDays', 'daysToHarvest', 'spacing', 'height', 'sun', 'water'] as const;

  return (
    <Stack spacing={1.25} sx={{ p: 1.5, maxWidth: 440 }} data-testid="calendar-legend">
      <Stack direction="row" flexWrap="wrap" useFlexGap columnGap={1.5} rowGap={0.5}>
        {periodTypes.map((periodType) => (
          <Stack key={periodType} direction="row" alignItems="center" spacing={0.5}>
            <Box sx={{ width: 14, height: 8, borderRadius: 0.5, bgcolor: periodColors[periodType] }} />
            <Typography variant="caption">{t(`seasonalCalendar.${periodType}`)}</Typography>
          </Stack>
        ))}
      </Stack>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 1, rowGap: 0.25 }}>
        {abbreviations.map((key) => (
          <Box key={key} sx={{ display: 'contents' }}>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {t(`seasonalCalendar.abbreviations.${key}`)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              = {t(`seasonalCalendar.properties.${key}`)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};
