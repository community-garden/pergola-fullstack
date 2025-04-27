import { useEffect, useRef } from 'react';
import { Box, keyframes, styled } from '@mui/material';
import { WeatherInfo } from './helper';

// Define animations
const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled components for the icons
const IconWrapper = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  overflow: 'visible',
}));

const AnimatedIcon = styled('img')<{ animation: 'float' | 'pulse' | 'rotate' | 'none' }>(
  ({ animation }) => ({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    animation: 
      animation === 'float' 
        ? `${float} 3s ease-in-out infinite` 
        : animation === 'pulse' 
          ? `${pulse} 2s ease-in-out infinite` 
          : animation === 'rotate' 
            ? `${rotate} 10s linear infinite` 
            : 'none',
  })
);

// Map weather conditions to animations
const getAnimationForWeather = (weatherId: number): 'float' | 'pulse' | 'rotate' | 'none' => {
  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) {
    return 'pulse';
  }
  // Drizzle or Rain
  else if ((weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
    return 'float';
  }
  // Snow
  else if (weatherId >= 600 && weatherId < 700) {
    return 'float';
  }
  // Atmosphere (fog, mist, etc.)
  else if (weatherId >= 700 && weatherId < 800) {
    return 'pulse';
  }
  // Clear
  else if (weatherId === 800) {
    return 'rotate';
  }
  // Clouds
  else if (weatherId > 800 && weatherId < 900) {
    return 'float';
  }
  return 'none';
};

interface WeatherIconProps {
  weather: WeatherInfo;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const WeatherIcon = ({ weather, size = 'medium', className }: WeatherIconProps) => {
  const iconRef = useRef<HTMLImageElement>(null);
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;
  const animation = getAnimationForWeather(weather.id);
  
  // Size mapping
  const sizeMap = {
    small: { width: 50, height: 50 },
    medium: { width: 100, height: 100 },
    large: { width: 150, height: 150 },
  };
  
  const { width, height } = sizeMap[size];
  
  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = iconUrl;
  }, [iconUrl]);
  
  return (
    <IconWrapper 
      className={className} 
      sx={{ 
        width, 
        height,
      }}
    >
      <AnimatedIcon
        ref={iconRef}
        src={iconUrl}
        alt={weather.description}
        animation={animation}
      />
    </IconWrapper>
  );
};

export default WeatherIcon;