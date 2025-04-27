import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import WateringCalendarHorizontal from './WateringCalendarHorizontal';
import WateringCalendarTable from './WateringCalendarTable';

export type WateringCalendarVariant = 'horizontal' | 'table';

interface WateringCalendarProps {
  preselectedDate?: Date;
  variant?: WateringCalendarVariant;
  dayCount?: number;
  monthCount?: number;
  onDateChange?: (date: Date) => void;
  allowVariantToggle?: boolean;
}

export const WateringCalendar = ({
  preselectedDate = new Date(),
  variant: initialVariant = 'horizontal',
  dayCount = 45,
  monthCount = 3,
  onDateChange,
  allowVariantToggle = true,
}: WateringCalendarProps) => {
  const { t } = useTranslation('watering');
  const [variant, setVariant] = useState<WateringCalendarVariant>(initialVariant);
  const [selectedDate, setSelectedDate] = useState<Date>(preselectedDate);

  const handleVariantChange = (
    _event: React.MouseEvent<HTMLElement>,
    newVariant: WateringCalendarVariant | null,
  ) => {
    if (newVariant !== null) {
      setVariant(newVariant);
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateChange && onDateChange(date);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {allowVariantToggle && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2 
          }}
        >
          <Typography variant="h6">{t('page.title')}</Typography>
          <ToggleButtonGroup
            value={variant}
            exclusive
            onChange={handleVariantChange}
            aria-label="calendar view"
            size="small"
          >
            <ToggleButton value="horizontal" aria-label="horizontal view">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="table" aria-label="table view">
              <CalendarMonthIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}

      {variant === 'horizontal' ? (
        <WateringCalendarHorizontal
          preselectedDate={selectedDate}
          dayCount={dayCount}
          onDateChange={handleDateChange}
        />
      ) : (
        <WateringCalendarTable
          preselectedDate={selectedDate}
          monthCount={monthCount}
          onDateChange={handleDateChange}
        />
      )}
    </Box>
  );
};

export default WateringCalendar;