import {
  Checkbox,
  Typography,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  format, 
  getDate, 
  getMonth, 
  getWeek, 
  setWeek, 
  setDay,
  addDays,
  startOfYear,
  addMonths,
  getYear,
  } from 'date-fns';
import React, { useState } from 'react';
import { differenceInDays } from 'date-fns';

interface Props {
  dates: Date[];
  onChange?: (dates: Date[]) => void;
  selectedDates?: Date[];
  badges?: Record<string, number>; // Map of date strings to badge values (e.g., vote counts)
}

export function Calendar({
  dates = [],
  onChange,
  selectedDates: externalSelectedDates,
  badges = {}
}: Props) {
  const [selectedDatesIntern, setSelectedDates] = useState<Date[]>([]);
  const selectedDates = externalSelectedDates || selectedDatesIntern;

  const toggleDates = (dates: Date[], selected: boolean) => {
    // remove or add given dates from selected dates
    const newSelectedDates = selected
      ? [
          ...selectedDates,
          ...dates.filter((date) => !dateIncluded(selectedDates, date)),
        ]
      : selectedDates.filter((date) => !dateIncluded(dates, date));
    
    !externalSelectedDates && setSelectedDates(newSelectedDates);
    onChange?.(newSelectedDates);
  };

  const dateIncluded = (dates: Date[], date: Date): boolean => {
    try {
      console.log('date', date)

      const dateStr = format(date, 'yyyy-MM-dd');
      return dates.map((d) => format(d, 'yyyy-MM-dd')).includes(dateStr);
    } catch (error) {
      console.error('Error formatting date:', error);
      return false;
    }
  };
  
  const getDateKey = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };
  
  const getBadgeValue = (date: Date): number | undefined => {
    const dateKey = getDateKey(date);
    return badges[dateKey];
  };

  const [firstDate] = dates;
  const lastDate = dates[dates.length - 1];

  const handleAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // (un)check all dates
    toggleDates(dates, event.target.checked);
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>, dayOfWeek: number) => {
    // (un)check each date with same day
    const relatedDates: Date[] = dates.filter(date => {
      const day = new Date(date).getDay();
      // Convert Sunday (0) to 6 to match the expected format where Monday is 0
      const adjustedDay = day === 0 ? 6 : day - 1;
      return adjustedDay === dayOfWeek;
    });
    
    toggleDates(relatedDates, event.target.checked);
  };

  const handleCwChange = (event: React.ChangeEvent<HTMLInputElement>, cw: number) => {
    // (un)check date of this calendar week
    const relatedDates: Date[] = dates.filter(date => getWeek(date) === cw);
    toggleDates(relatedDates, event.target.checked);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>, date: Date) => {
    toggleDates([date], event.target.checked);
  };

  const allDatesChecked = (): boolean => {
    return !dates.some((date) => !dateIncluded(selectedDates, date));
  };

  const dayDatesChecked = (dayOfWeek: number): boolean => {
    return !dates.some((date) => {
      const day = new Date(date).getDay();
      // Convert Sunday (0) to 6 to match the expected format where Monday is 0
      const adjustedDay = day === 0 ? 6 : day - 1;
      return adjustedDay === dayOfWeek && !dateIncluded(selectedDates, date);
    });
  };

  const cwDatesChecked = (cw: number): boolean => {
    return !dates.some((date) => {
      const weekNum = getWeek(date);
      return weekNum === cw && !dateIncluded(selectedDates, date);
    });
  };

  function AllCheckBox(): React.ReactElement {
    const checked = allDatesChecked();
    return (
      <Checkbox
        sx={checkBoxStyles}
        checkedIcon={<CheckBoxIcon checked label="✓" isHeadCheckbox={true} />}
        icon={<CheckBoxIcon label="✓" isHeadCheckbox={true} />}
        color="primary"
        onChange={handleAllChange}
        checked={checked}
      />
    );
  }

  function DayCheckBox(props: { dayOfWeek: number, label: string }): React.ReactElement {
    const checked = dayDatesChecked(props.dayOfWeek);
    return (
      <Checkbox
        sx={checkBoxStyles}
        checkedIcon={<CheckBoxIcon checked label={props.label} isHeadCheckbox={true} />}
        icon={<CheckBoxIcon label={props.label} isHeadCheckbox={true} />}
        color="primary"
        onChange={(e) => handleDayChange(e, props.dayOfWeek)}
        checked={checked}
      />
    );
  }

  function CwCheckBox(props: { cw: number }): React.ReactElement {
    const checked = cwDatesChecked(props.cw);
    return (
      <Checkbox
        sx={checkBoxStyles}
        checkedIcon={<CheckBoxIcon checked label={`W${props.cw}`} isHeadCheckbox={true} />}
        icon={<CheckBoxIcon label={`W${props.cw}`} isHeadCheckbox={true} />}
        color="primary"
        onChange={(e) => handleCwChange(e, props.cw)}
        checked={checked}
      />
    );
  }

  function DateCheckBox({ date, disabled }: { date: Date, disabled?: boolean }): React.ReactElement {
    const checked = dateIncluded(selectedDates, date) && !disabled;
    const badgeValue = getBadgeValue(date);
    
    return (
      <Checkbox
        sx={checkBoxStyles}
        checkedIcon={<CheckBoxIcon checked label={getDate(date).toString()} badgeValue={badgeValue} />}
        icon={<CheckBoxIcon label={getDate(date).toString()} badgeValue={badgeValue} />}
        color="primary"
        onChange={(e) => handleDateChange(e, date)}
        checked={checked}
        disabled={disabled}
      />
    );
  }

  function CheckBoxIcon(props: {
    checked?: boolean,
    label?: string,
    isHeadCheckbox?: boolean,
    badgeValue?: number
  }) {
    return (
      <CheckBoxIconStyled
        className={`${props.checked ? 'checked' : ''} ${props.isHeadCheckbox ? 'head-checkbox' : ''}`}
        $isHeadCheckbox={props.isHeadCheckbox || false}
        aria-hidden="true"
      >
        {props.label && <LabelText>{props.label}</LabelText>}
        {props.badgeValue !== undefined && (
          <Badge>{props.badgeValue}</Badge>
        )}
      </CheckBoxIconStyled>
    );
  }

  const startOfMonth = new Date().setDate(1);
  const nextNextMonth = addMonths(startOfMonth, 2);
  const lastDateOfMonth = new Date(nextNextMonth).setDate(0);
  const dayDifference = differenceInDays(lastDateOfMonth, startOfMonth);
  const weeks = Math.ceil(dayDifference / 7);
  return (
    <>
      <Typography variant="h3" sx={questionStyles}>
        Wann hast du Zeit?
      </Typography>
      <CalendarWrapper>
        <Typography variant="body2" align="center" gutterBottom={true}>
          Zeitraum:&nbsp;
          {format(
            firstDate,
            getMonth(firstDate) === getMonth(lastDate) ? 'd.' : 'd. MMMM'
          )}
          &nbsp;–&nbsp;
          {format(lastDate, 'd. MMMM')}
        </Typography>
        
        <Table size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ padding: '4px', width: '40px' }}>
                <AllCheckBox />
              </TableCell>
              {[1, 2, 3, 4, 5, 6, 7].map((dayOfWeek) => (
                <TableCell key={dayOfWeek} align="center" sx={{ padding: '4px', width: '40px' }}>
                  <DayCheckBox
                    dayOfWeek={dayOfWeek}
                    label={format(setDay(new Date(), dayOfWeek), 'EEEE').substring(0, 2)}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(new Array(weeks))
              .map((_, weekIndex) => (
                <TableRow key={weekIndex}>
                  <TableCell align="center" sx={{ padding: '4px' }}>
                    <CwCheckBox cw={weekIndex + 1} />
                  </TableCell>
                  {[...new Array(7)].map((_, dayOfWeek) => {
                    const date = addDays(startOfMonth, weekIndex * 7 + dayOfWeek);
                    const dateAvailable = dateIncluded(dates, date);
                    return (
                      <TableCell key={format(date, 'dd-MM-yyyy')} align="center" sx={{ padding: '4px' }}>
                        <DateCheckBox date={date} disabled={!dateAvailable} />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CalendarWrapper>
    </>
  );
}

// Styled components
const CalendarWrapper = styled('div')(({ theme }) => ({
  padding: '6px 2px 2px',
  background: '#f7f7f7',
  borderRadius: '4px',
  [theme.breakpoints.up('sm')]: {
    padding: '10px',
  }
}));

const CheckBoxIconStyled = styled('div')<{ $isHeadCheckbox: boolean }>(({ theme, $isHeadCheckbox }) => ({
  width: '36px',
  height: '36px',
  border: `1px dotted ${theme.palette.grey[400]}`,
  borderRadius: '3px',
  background: '#fff',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...($isHeadCheckbox && {
    border: `1px solid ${theme.palette.primary.main}`,
  }),
  '&.head-checkbox': {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  '@media (max-width:360px)': {
    width: '32px',
    height: '32px',
  },
  '&.checked': {
    borderStyle: 'solid',
    background: '#BDE3DC',
    ...($isHeadCheckbox && {
      background: theme.palette.primary.main,
    }),
    '&.head-checkbox': {
      background: theme.palette.primary.main,
    },
  }
}));

const LabelText = styled('span')(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '1.2',
  textAlign: 'center',
  fontFamily: 'Consolas, monaco, monospace',
  '.checked &': {
    color: theme.palette.text.primary,
  },
  '.head-checkbox &': {
    color: theme.palette.primary.main,
  },
  '.checked.head-checkbox &': {
    color: theme.palette.primary.contrastText,
  }
}));

const Badge = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: '-6px',
  right: '-6px',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  borderRadius: '50%',
  width: '18px',
  height: '18px',
  fontSize: '11px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
  zIndex: 1
}));

// Styles
const questionStyles = {
  textAlign: 'center',
  width: '80%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '2rem',
  fontWeight: 600,
  '@media (max-width:320px)': {
    marginBottom: '1rem',
  },
};

const checkBoxStyles = {
  padding: '2px',
  '@media (max-width:360px)': {
    padding: '1px',
  },
  '&.Mui-checked': {
    color: (theme: any) => theme.palette.primary.contrastText,
  }
};

export default Calendar;
