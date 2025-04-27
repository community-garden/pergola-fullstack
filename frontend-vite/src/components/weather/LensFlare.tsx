import { Box, keyframes } from '@mui/material';

const glowPulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { opacity: 0.3; }
`;

const flareFloat = keyframes`
  0% { transform: translate(-50%, -50%) translate(0, 0); }
  50% { transform: translate(-50%, -50%) translate(10px, -10px); }
  100% { transform: translate(-50%, -50%) translate(0, 0); }
`;

const flareRotate = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

export const LensFlare = () => {
  // Flare configurations
  const flares = [
    { 
      size: 400, 
      opacity: 0.3, 
      blur: 50, 
      animation: `${flareFloat} 20s ease-in-out infinite`,
      position: { x: '50%', y: '50%' }
    },
    { 
      size: 200, 
      opacity: 0.4, 
      blur: 30, 
      animation: `${flareFloat} 15s ease-in-out infinite reverse`,
      position: { x: '30%', y: '30%' }
    },
    { 
      size: 150, 
      opacity: 0.5, 
      blur: 20, 
      animation: `${flareFloat} 18s ease-in-out infinite`,
      position: { x: '70%', y: '30%' }
    },
    { 
      size: 100, 
      opacity: 0.6, 
      blur: 15, 
      animation: `${flareFloat} 12s ease-in-out infinite reverse`,
      position: { x: '30%', y: '70%' }
    },
    { 
      size: 120, 
      opacity: 0.5, 
      blur: 25, 
      animation: `${flareFloat} 16s ease-in-out infinite`,
      position: { x: '70%', y: '70%' }
    }
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Main light source */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(10px)',
          animation: `${glowPulse} 3s ease-in-out infinite`,
        }}
      />

      {/* Flare elements */}
      {flares.map((flare, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: flare.position.y,
            left: flare.position.x,
            width: `${flare.size}px`,
            height: `${flare.size}px`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
            opacity: flare.opacity,
            filter: `blur(${flare.blur}px)`,
            mixBlendMode: 'screen',
            animation: flare.animation,
          }}
        />
      ))}

      {/* Light streaks */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '300px',
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
          transform: 'translate(-50%, -50%) rotate(45deg)',
          filter: 'blur(1px)',
          animation: `${flareRotate} 30s linear infinite`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '300px',
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
          transform: 'translate(-50%, -50%) rotate(-45deg)',
          filter: 'blur(1px)',
          animation: `${flareRotate} 30s linear infinite reverse`,
        }}
      />
    </Box>
  );
}; 