import { Box, Paper, Typography, Grid, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { PeriodType } from './plant-helpers';

interface CalendarLegendProps {
  periodColors: Record<PeriodType, string>;
}

export const CalendarLegend = ({ periodColors }: CalendarLegendProps) => {
  const { t } = useTranslation('garden');

  const periodTypes: PeriodType[] = ['sowingOutdoors', 'sowingUnderGlass', 'harvest'];
  
  const abbreviations = [
    { key: 'germinationDays', abbr: t('seasonalCalendar.abbreviations.germinationDays'), full: t('seasonalCalendar.properties.germinationDays') },
    { key: 'daysToHarvest', abbr: t('seasonalCalendar.abbreviations.daysToHarvest'), full: t('seasonalCalendar.properties.daysToHarvest') },
    { key: 'spacing', abbr: t('seasonalCalendar.abbreviations.spacing'), full: t('seasonalCalendar.properties.spacing') },
    { key: 'height', abbr: t('seasonalCalendar.abbreviations.height'), full: t('seasonalCalendar.properties.height') },
    { key: 'sun', abbr: t('seasonalCalendar.abbreviations.sun'), full: t('seasonalCalendar.properties.sun') },
    { key: 'water', abbr: t('seasonalCalendar.abbreviations.water'), full: t('seasonalCalendar.properties.water') },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 2,
        p: 3,
        backgroundColor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        {t('seasonalCalendar.legend.title')}
      </Typography>

      <Grid container spacing={4}>
        {/* Period Colors Section */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              mb: 1.5,
              color: 'text.secondary',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: 0.5,
            }}
          >
            {t('seasonalCalendar.legend.colors')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {periodTypes.map((periodType) => (
              <Box
                key={periodType}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 24,
                    backgroundColor: periodColors[periodType],
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 1,
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t(`seasonalCalendar.${periodType}`)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Abbreviations Section */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              mb: 1.5,
              color: 'text.secondary',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: 0.5,
            }}
          >
            {t('seasonalCalendar.legend.abbreviations')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {abbreviations.map((item) => (
              <Chip
                key={item.key}
                label={
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'baseline' }}>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.875rem',
                      }}
                    >
                      {item.abbr}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: '0.75rem',
                        color: 'text.secondary',
                      }}
                    >
                      = {item.full}
                    </Typography>
                  </Box>
                }
                variant="outlined"
                sx={{
                  height: 'auto',
                  py: 0.75,
                  px: 1.5,
                  '& .MuiChip-label': {
                    px: 0,
                  },
                }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

