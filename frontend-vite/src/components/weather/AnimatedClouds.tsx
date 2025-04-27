import { Box, keyframes } from '@mui/material';
import { LensFlare } from './LensFlare';

const cloudAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const cloudAnimation2 = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const fogAnimation = keyframes`
  0% {
    opacity: 0.3;
    filter: blur(8px);
  }
  50% {
    opacity: 0.6;
    filter: blur(12px);
  }
  100% {
    opacity: 0.3;
    filter: blur(8px);
  }
`;

interface AnimatedCloudsProps {
  speed?: number;
  opacity?: number;
  weatherType?: string;
}

export const AnimatedClouds = ({ speed = 60, opacity = 0.1, weatherType = 'clear' }: AnimatedCloudsProps) => {
  const isCloudy = weatherType.includes('cloud');
  const isHaze = weatherType.includes('haze') || weatherType.includes('fog') || weatherType.includes('mist');
  const isSunny = weatherType.includes('clear') || weatherType.includes('sun');

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Base weather effect */}
      {isCloudy && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: 0,
              width: '100%',
              height: '100%',
              background: 'url("/clouds.svg") repeat-x',
              backgroundSize: 'contain',
              opacity,
              animation: `${cloudAnimation} ${speed}s linear infinite`,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '30%',
              left: 0,
              width: '100%',
              height: '100%',
              background: 'url("/clouds.svg") repeat-x',
              backgroundSize: 'contain',
              opacity: opacity * 0.7,
              animation: `${cloudAnimation2} ${speed * 1.5}s linear infinite`,
            }}
          />
        </>
      )}

      {/* Haze/Fog effect */}
      {isHaze && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.6) 100%)',
              animation: `${fogAnimation} 6s ease-in-out infinite`,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(0deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
              animation: `${fogAnimation} 8s ease-in-out infinite reverse`,
            }}
          />
        </>
      )}

      {/* Lens flare effect */}
      {isSunny && <LensFlare />}
    </Box>
  );
}; 