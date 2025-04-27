import { Box, Paper, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
  addMonths,
  getDay,
  startOfWeek,
  addDays,
  isWithinInterval,
} from 'date-fns';
import React, { useState, useEffect } from 'react';
import WateringCalendarTaskItem from './WateringCalendarTaskItem';

interface WateringCalendarTableProps {
  preselectedDate?: Date;
  monthCount?: number;
  onDateChange?: (date: Date) => void;
}

const CalendarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const MonthContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  maxWidth: '100%',
  overflow: 'auto',
}));

const WeekdayHeader = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  padding: theme.spacing(1, 1, 2, 1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const DaysGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: theme.spacing(2),
  justifyItems: 'center',
  padding: theme.spacing(1),
}));

const DayCell = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1),
}));

export const WateringCalendarTable = ({
  preselectedDate = new Date(),
  monthCount = 3,
  onDateChange,
}: WateringCalendarTableProps) => {
  const { t } = useTranslation('watering');
  const [selectedDate, setSelectedDate] = useState<Date>(preselectedDate);
  const [calendarMonths, setCalendarMonths] = useState<{
    month: Date;
    days: Date[];
  }[]>([]);

  // Generate months and days for the calendar
  useEffect(() => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < monthCount; i++) {
      const monthDate = addMonths(currentDate, i);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      
      // Get all days in the month
      const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
      
      // Get the first day of the month and calculate offset
      const firstDayOfMonth = getDay(monthStart);
      
      // Create array with empty slots for days before the first day of month
      const daysWithOffset = [];
      
      // Add empty days at the beginning (Monday is 1, Sunday is 0/7)
      // Adjust the day number to make Monday (1) the first day of the week
      const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
      const daysToAdd = adjustedFirstDay - 1; // -1 because we want to start from Monday (index 0)
      
      // Get the start of the week for this month (Monday)
      const startWeek = startOfWeek(monthStart, { weekStartsOn: 1 });
      
      // Add days from previous month to fill the start of the calendar
      for (let d = 0; d < daysToAdd; d++) {
        daysWithOffset.push(addDays(startWeek, d));
      }
      
      // Add the actual days of the month
      daysWithOffset.push(...daysInMonth);
      
      months.push({
        month: monthDate,
        days: daysWithOffset,
      });
    }
    
    setCalendarMonths(months);
  }, [monthCount]);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateChange && onDateChange(date);
  };

  // Weekday headers
  const weekdays = [
    t('calendar.weekdays.monday'),
    t('calendar.weekdays.tuesday'),
    t('calendar.weekdays.wednesday'),
    t('calendar.weekdays.thursday'),
    t('calendar.weekdays.friday'),
    t('calendar.weekdays.saturday'),
    t('calendar.weekdays.sunday')
  ];

  return (
    <CalendarContainer>
      {calendarMonths.map(({ month, days }) => (
        <MonthContainer key={month.toISOString()} elevation={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
              borderBottom: theme => `2px solid ${theme.palette.primary.main}`,
              paddingBottom: 1
            }}
          >
            {`${t(`calendar.months.${format(month, 'MMMM').toLowerCase()}`)} ${format(month, 'yyyy')}`}
          </Typography>
          
          <WeekdayHeader>
            {weekdays.map((day) => (
              <Typography
                key={day}
                variant="subtitle1"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              >
                {day}
              </Typography>
            ))}
          </WeekdayHeader>
          
          <DaysGrid>
            {days.map((date, index) => {
              const isCurrentMonth = isSameMonth(date, month);
              const isDisabled = isBefore(date, startOfDay(new Date())) || !isCurrentMonth;
              
              // Mock data - in a real implementation, this would come from props or context
              const inPlannedPeriod = !isDisabled && isCurrentMonth;
              const recruiterCount = Math.floor(Math.random() * 4); // Random number 0-3 for demo
              const cornerActive = Math.random() > 0.7; // Random for demo
              
              return (
                <DayCell key={`${date.toISOString()}-${index}`}>
                  {isCurrentMonth && (
                    <WateringCalendarTaskItem
                      disabled={isDisabled}
                      date={date}
                      recruiterCount={recruiterCount}
                      onSelect={() => handleDateSelect(date)}
                      active={isSameDay(selectedDate, date)}
                      inPlannedPeriod={inPlannedPeriod}
                      cornerActive={cornerActive}
                      size={60} // Increased size for better visibility
                    />
                  )}
                </DayCell>
              );
            })}
          </DaysGrid>
        </MonthContainer>
      ))}
    </CalendarContainer>
  );
};

export default WateringCalendarTable;