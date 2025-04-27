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

const CarrotBed = styled('div')(() => ({
  position: 'relative',
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '0 10%',
  overflow: 'hidden',
  marginTop: 'auto',
  minHeight: '120px',
  '&::after': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'block',
    background: '#8b4513',
    height: '30px',
  }
}));

// Define the carrot styles with their unique transformations
const carrotStyles = [
  {
    order: 4,
    transform: 'scaleX(-1) rotate(-7deg) scale(0.8)',
    activeTransform: 'scaleX(-1) rotate(7deg) scale(1.1)',
    activeTop: '14px',
  },
  {
    order: 7,
    transform: 'rotate(6deg) scale(0.8)',
    activeTransform: 'rotate(-6deg) scale(1.1)',
    activeTop: '15px',
  },
  {
    order: 1,
    transform: 'rotate(-8deg) scale(0.8)',
    activeTransform: 'rotate(3deg) scale(1.1)',
    activeTop: '12px',
  },
  {
    order: 5,
    transform: 'rotate(-7deg) scale(0.8)',
    activeTransform: 'rotate(7deg) scale(1.1)',
    activeTop: '17px',
  },
  {
    order: 2,
    transform: 'rotate(7deg) scale(0.8)',
    activeTransform: 'rotate(-9deg) scale(1.1)',
    activeTop: '16px',
  },
  {
    order: 6,
    transform: 'scale(0.8)',
    activeTransform: 'scale(1.1)',
    activeTop: '14px',
  },
  {
    order: 3,
    transform: 'rotate(-7deg) scale(0.8)',
    activeTransform: 'rotate(7deg) scale(1.1)',
    activeTop: '13px',
  },
];

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
      
      <CarrotBed>
        {carrotStyles.map((style, index) => {
          // Create dynamic styles based on whether carrot is active
          const isActive = daysPerWeek >= index + 1;
          
          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'relative',
                width: '50px',
                transition: 'all .5s ease',
                top: isActive ? style.activeTop : '28px',
                order: style.order,
                transform: isActive ? style.activeTransform : style.transform,
              }}
              width="82.209"
              height="105.599"
              viewBox="0 0 82.209 105.599"
            >
            <g transform="translate(-91.734 57.392) rotate(-43)">
              <path
                d="M119.026,160.58l-.02-.007c-.025-.026-.057-.083-.083-.108l-14.717-14.736h0a6.179,6.179,0,0,0-4.392-1.9,5.828,5.828,0,0,0-5.168,3.016h0L91.227,152.3l6.084,7.433c.55.7.616,1.473.264,1.825l-.021.021c-.428.428-1.1.286-1.825-.264l-6.709-5.491L73.412,180.747l3.567,4.358c.55.7.616,1.473.264,1.825l-.021.021c-.428.428-1.1.286-1.825-.264L71.625,183.6l-6.692,10.685h0a6.5,6.5,0,0,0-.933,3.3,5.956,5.956,0,0,0,5.954,5.969,6.95,6.95,0,0,0,3.848-1.4l21.421-15.7-5.4-6.6c-.55-.7-.617-1.473-.264-1.825l.021-.021c.428-.428,1.1-.286,1.825.264l7.081,5.823q9.9-7.253,19.808-14.484l0,0a6.068,6.068,0,0,0,2.429-4.823,5.731,5.731,0,0,0-1.691-4.2Z"
                transform="translate(0 -77.957)"
                fill="#eb8d17"
              />
              <path
                d="M341.351,64.933l-3.075-5.166L325.922,66.9,335.105,51l-5.152-3L316.9,70.586l5.332,5.332Z"
                transform="translate(-205.725 0)"
                fill="#006f52"
              />
            </g>
          </svg>
          );
        })}
      </CarrotBed>
    </Box>
  );
}

export default LetItRainFrequency;