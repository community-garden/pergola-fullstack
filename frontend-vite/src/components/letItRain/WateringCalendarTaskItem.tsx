import { Box, Link, Typography, styled } from '@mui/material';
import { format } from 'date-fns';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CornerBadge } from '../ui';

interface WateringCalendarTaskItemProps {
  disabled?: boolean;
  date: Date;
  recruiterCount: number;
  onSelect?: () => void;
  active?: boolean;
  inPlannedPeriod?: boolean;
  cornerActive?: boolean;
  optimalRecruiterCount?: number;
  size?: number;
  onActivate?: (active: boolean, ref: HTMLElement | null) => void;
  scrollBehavior?: 'smooth' | 'auto';
}

// Styled components
const DayContainer = styled('div')<{
  disabled?: boolean;
  size: number;
  active?: boolean;
}>(({ theme, disabled, size, active }) => ({
  opacity: disabled ? 0.5 : 1.0,
  padding: '2px',
  height: `${size + 20}px`,
  '& .badgeContent': {
    transition: 'width 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, height 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: `${size + (active ? 20 : 0)}px`,
    height: `${size + (active ? 20 : 0)}px`,
  },
  color: theme.palette.grey[800],
  fontWeight: active ? 'bold' : 'normal',
  '& h6': {
    fontWeight: active ? 'bold' : 'normal',
  },
}));

const DayTitle = styled(Typography)<{ active?: boolean }>(({ active }) => ({
  fontSize: active ? '1.5rem' : '1rem',
  fontWeight: active ? 'bold' : 'normal',
  textTransform: 'uppercase',
}));

const DaySubTitle = styled(Typography)<{ active?: boolean }>(({ active }) => ({
  fontSize: active ? '1.2rem' : '.9rem',
  fontWeight: active ? 'bold' : 'normal',
}));

export const WateringCalendarTaskItem = ({
  disabled,
  date,
  recruiterCount,
  optimalRecruiterCount = 3,
  size = 60,
  onSelect,
  onActivate,
  active = false,
  inPlannedPeriod,
  cornerActive,
  scrollBehavior,
}: WateringCalendarTaskItemProps) => {
  const { t } = useTranslation('watering');
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (active) {
      ref?.current?.scrollIntoView({
        behavior: scrollBehavior,
        block: 'center',
        inline: 'center',
      });
      onActivate && onActivate(active, ref?.current);
    }
  }, [active, ref, onActivate, scrollBehavior]);

  // Calculate badge color based on recruiter count and planned period
  const getBadgeColor = () => {
    if (!inPlannedPeriod) {
      return '#bdbdbd'; // grey[400]
    }
    
    const recruiterMissingCount = optimalRecruiterCount - recruiterCount;
    
    if (recruiterMissingCount >= 2) {
      return '#FFBD4A'; // warning color
    } else if (recruiterMissingCount === 1) {
      return '#F6E6A2'; // light warning color
    } else {
      return '#BDE3DC'; // success color
    }
  };

  return (
    <Link
      ref={ref}
      underline="none"
      onClick={() => onSelect && onSelect()}
      component="button"
      sx={{ 
        cursor: disabled ? 'default' : 'pointer',
        background: 'none',
        border: 'none',
        padding: 0
      }}
    >
      <DayContainer 
        disabled={disabled} 
        size={size} 
        active={active}
      >
        <CornerBadge 
          cornerActive={cornerActive}
          sx={{ backgroundColor: getBadgeColor() }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            className="badgeContent"
          >
            <DayTitle active={active}>
              {format(date, 'EE')}
            </DayTitle>
            <DaySubTitle active={active}>
              {format(date, 'dd.MM.')}
            </DaySubTitle>
          </Box>
        </CornerBadge>
      </DayContainer>
    </Link>
  );
};

export default WateringCalendarTaskItem;