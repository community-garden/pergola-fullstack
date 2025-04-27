import { Box, Slider, Typography, styled } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LetItRainFrequencyProps {
  onChange?: (frequency: number) => void;
  frequency?: number;
}

// Styled components using MUI v6 approach
const StyledQuestion = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '2rem',
  width: '80%',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '1rem',
  },
}));
export function LetItRainFrequency({ onChange, frequency: _frequency }: LetItRainFrequencyProps) {
  const { t } = useTranslation('letItRain');
  const [frequency, setFrequency] = useState(2);
  const daysPerWeek = _frequency || frequency;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between'
    }}>
      <Box>
        <StyledQuestion variant="h3">
          {t('frequency.question')}
        </StyledQuestion>
        <Typography variant="body1">{t('frequency.description')}</Typography>
        <Slider
          min={1}
          max={7}
          value={daysPerWeek}
          onChange={(_, value) => {
            const v = typeof value === 'number' ? value : 1;
            setFrequency(v);
            onChange?.(v);
          }}
          aria-labelledby="discrete-slider-always"
          step={1}
          valueLabelDisplay="on"
          marks={true}
          sx={{ my: 3 }}
        />
        <Typography variant="body1">{t('frequency.timesPerWeek', { count: daysPerWeek })}</Typography>
      </Box>
      
    </Box>
  );
}

export default LetItRainFrequency;