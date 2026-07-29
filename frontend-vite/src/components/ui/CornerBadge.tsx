import { styled } from '@mui/material/styles';
import React from 'react';
import { SxProps, Theme } from '@mui/material';

interface CornerBadgeProps {
  className?: string;
  children?: React.ReactNode;
  cornerActive?: boolean;
  cornerColor?: string;
  badgeContent?: string | number;
  badgeColor?: string;
  'data-cy'?: string;
  sx?: SxProps<Theme>;
}

const Root = styled('span', {
  shouldForwardProp: (prop) => prop !== 'cornerActive'
})<{ cornerActive?: boolean; sx?: SxProps<Theme> }>(({ theme, cornerActive }) => ({
  borderRadius: `4px ${cornerActive ? '0' : '4px'} 4px 4px`,
  display: 'inline-flex',
  position: 'relative',
  flexShrink: 0,
  verticalAlign: 'middle',
  overflow: 'hidden',
  alignItems: 'center'
}));

const CountBadge = styled('span')(({ theme }) => ({
  top: '0',
  right: '0',
  transform: 'translate(35%, -35%)',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  height: '20px',
  minWidth: '20px',
  padding: '0 4px',
  zIndex: 2,
  position: 'absolute',
  fontSize: '0.7rem',
  fontWeight: 700,
  borderRadius: '10px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  lineHeight: 1,
}));

export const CornerBadge = ({
  children,
  className,
  cornerActive,
  cornerColor,
  badgeContent,
  badgeColor,
  'data-cy': dataCy,
  sx
}: CornerBadgeProps) => {
  const showCountBadge = badgeContent !== undefined && badgeContent !== '' && Number(badgeContent) > 0;

  return (
    <Root className={className} cornerActive={cornerActive} sx={sx} data-cy={dataCy}>
      {children}
      {cornerActive && (
        <CountBadge
          sx={{
            transform: 'scale(1) translate(50%, -50%) rotateZ(45deg)',
            transformOrigin: '50% 50%',
            borderRadius: 0,
            backgroundColor: cornerColor || 'black',
            color: 'white',
            minWidth: '20px',
            height: '20px',
            padding: '0 6px',
          }}
        />
      )}
      {showCountBadge && (
        <CountBadge sx={{ backgroundColor: badgeColor }} aria-label={String(badgeContent)}>
          {badgeContent}
        </CountBadge>
      )}
    </Root>
  );
};

export default CornerBadge;