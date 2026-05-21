import { Box, IconButton, Typography, styled } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { format, addDays, subDays, isSameDay, isBefore, startOfDay } from 'date-fns';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import WateringCalendarTaskItem from './WateringCalendarTaskItem';
import type { PlanAssignment } from '../../hooks/useWateringPlan';
import { useDateFnsLocale } from '../../hooks';

interface WateringCalendarHorizontalProps {
  preselectedDate?: Date;
  dayCount?: number;
  onDateChange?: (date: Date) => void;
  assignments?: PlanAssignment[];
  personIri?: string;
  availableDates?: string[];
}

const ScrollContainer = styled('div')({
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  height: '100px',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  minHeight: '80px',
  scrollBehavior: 'smooth',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
});

export const WateringCalendarHorizontal = ({
  preselectedDate = new Date(),
  dayCount = 45,
  onDateChange,
  assignments = [],
  personIri,
  availableDates = [],
}: WateringCalendarHorizontalProps) => {
  const { t } = useTranslation('watering');
  const locale = useDateFnsLocale();
  const [selectedDate, setSelectedDate] = useState<Date>(preselectedDate);
  const [scrollBehavior, setScrollBehavior] = useState<'auto' | 'smooth'>('auto');
  const [calendarDates, setCalendarDates] = useState<Date[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate dates for the calendar
  useEffect(() => {
    const startDate = subDays(selectedDate, dayCount);
    const endDate = addDays(selectedDate, dayCount);
    const dates: Date[] = [];
    
    let currentDate = startDate;
    while (isBefore(currentDate, endDate) || isSameDay(currentDate, endDate)) {
      dates.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }
    
    setCalendarDates(dates);
  }, [selectedDate, dayCount]);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateChange && onDateChange(date);
  };

  // Handle navigation
  const selectPreviousDay = () => {
    const newDate = subDays(selectedDate, 1);
    setSelectedDate(newDate);
    onDateChange && onDateChange(newDate);
  };

  const selectNextDay = () => {
    const newDate = addDays(selectedDate, 1);
    setSelectedDate(newDate);
    onDateChange && onDateChange(newDate);
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <IconButton onClick={selectPreviousDay}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography
          variant="body1"
          sx={{ width: '100%', textAlign: 'center' }}
        >
          {format(selectedDate, 'EEEE, dd MMMM', { locale })}
          {isSameDay(selectedDate, new Date()) ? ` (${t('calendar.today')})` : ''}
        </Typography>
        <IconButton onClick={selectNextDay}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <ScrollContainer ref={containerRef}>
        {calendarDates.map((date) => {
          const isDisabled = isBefore(date, startOfDay(new Date()));
          const dateStr = format(date, 'yyyy-MM-dd');
          const dayAssignments = assignments.filter((a) => a.date === dateStr);
          const recruiterCount = dayAssignments.length;
          const inPlannedPeriod = recruiterCount > 0;
          const cornerActive = personIri
            ? dayAssignments.some((a) => a.personIri === personIri)
            : false;
          const isUserAvailable = availableDates.includes(dateStr);

          return (
            <WateringCalendarTaskItem
              key={date.toISOString()}
              disabled={isDisabled}
              date={date}
              recruiterCount={recruiterCount}
              onSelect={() => handleDateSelect(date)}
              active={isSameDay(selectedDate, date)}
              inPlannedPeriod={inPlannedPeriod}
              isUserAvailable={isUserAvailable}
              cornerActive={cornerActive}
              onActivate={() => setScrollBehavior('smooth')}
              scrollBehavior={scrollBehavior}
            />
          );
        })}
      </ScrollContainer>
    </div>
  );
};

export default WateringCalendarHorizontal;