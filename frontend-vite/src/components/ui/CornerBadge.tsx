import { styled } from '@mui/material/styles';
import React from 'react';
import { SxProps, Theme } from '@mui/material';

interface CornerBadgeProps {
  className?: string;
  children?: React.ReactNode;
  cornerActive?: boolean;
  cornerColor?: string;
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

const Badge = styled('span')(({ theme }) => ({
  top: '0',
  right: '0',
  transform: 'scale(1) translate(50%, -50%) rotateZ(45deg)',
  transformOrigin: '50% 50%',
  backgroundColor: 'black',
  height: '20px',
  padding: '0 6px',
  zIndex: 1,
  position: 'absolute',
  fontSize: '0.75rem',
  minWidth: '20px',
  boxSizing: 'border-box'
}));

export const CornerBadge = ({
  children,
  className,
  cornerActive,
  cornerColor,
  sx
}: CornerBadgeProps) => {
  return (
    <Root className={className} cornerActive={cornerActive} sx={sx}>
      {children}
      {cornerActive && <Badge sx={{ backgroundColor: cornerColor || 'black' }} />}
    </Root>
  );
};

export default CornerBadge;