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
  getISOWeek,
  addDays,
} from 'date-fns';
import React, { useState } from 'react';
import { differenceInDays } from 'date-fns';
import { useDateFnsLocale } from '../../hooks';

interface Props {
  dates: Date[];
  onChange?: (dates: Date[]) => void;
  selectedDates?: Date[];
  badges?: Record<string, number>;
}

// ── Presentational icon ───────────────────────────────────────────────────────

function CheckBoxIcon(props: {
  checked?: boolean;
  label?: string;
  isHeadCheckbox?: boolean;
  badgeValue?: number;
}) {
  return (
    <CheckBoxIconStyled
      className={`${props.checked ? 'checked' : ''} ${props.isHeadCheckbox ? 'head-checkbox' : ''}`}
      $isHeadCheckbox={props.isHeadCheckbox || false}
      aria-hidden="true"
    >
      {props.label && <LabelText>{props.label}</LabelText>}
      {props.badgeValue !== undefined && <Badge>{props.badgeValue}</Badge>}
    </CheckBoxIconStyled>
  );
}

// ── Checkbox sub-components (defined outside Calendar for stable React identity)

function AllCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Checkbox
      sx={checkBoxStyles}
      checkedIcon={<CheckBoxIcon checked label="✓" isHeadCheckbox />}
      icon={<CheckBoxIcon label="✓" isHeadCheckbox />}
      color="primary"
      onChange={onChange}
      checked={checked}
      inputProps={{ 'data-testid': 'calendar-select-all' } as any}
    />
  );
}

function DayCheckbox({
  colGetDay,
  label,
  checked,
  onChange,
}: {
  colGetDay: number;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, colGetDay: number) => void;
}) {
  return (
    <Checkbox
      sx={checkBoxStyles}
      checkedIcon={<CheckBoxIcon checked label={label} isHeadCheckbox />}
      icon={<CheckBoxIcon label={label} isHeadCheckbox />}
      color="primary"
      onChange={(e) => onChange(e, colGetDay)}
      checked={checked}
      inputProps={{ 'data-testid': `calendar-day-${colGetDay}` } as any}
    />
  );
}

function CwCheckbox({
  cw,
  checked,
  onChange,
}: {
  cw: number;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, cw: number) => void;
}) {
  return (
    <Checkbox
      sx={checkBoxStyles}
      checkedIcon={<CheckBoxIcon checked label={`W${cw}`} isHeadCheckbox />}
      icon={<CheckBoxIcon label={`W${cw}`} isHeadCheckbox />}
      color="primary"
      onChange={(e) => onChange(e, cw)}
      checked={checked}
      inputProps={{ 'data-testid': `calendar-cw-${cw}` } as any}
    />
  );
}

function DateCheckbox({
  date,
  disabled,
  checked,
  badgeValue,
  onChange,
}: {
  date: Date;
  disabled?: boolean;
  checked: boolean;
  badgeValue?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, date: Date) => void;
}) {
  return (
    <Checkbox
      sx={checkBoxStyles}
      checkedIcon={<CheckBoxIcon checked label={getDate(date).toString()} badgeValue={badgeValue} />}
      icon={<CheckBoxIcon label={getDate(date).toString()} badgeValue={badgeValue} />}
      color="primary"
      onChange={(e) => onChange(e, date)}
      checked={checked}
      disabled={disabled}
      data-testid={`calendar-date-${format(date, 'yyyy-MM-dd')}`}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function Calendar({
  dates = [],
  onChange,
  selectedDates: externalSelectedDates,
  badges = {}
}: Props) {
  const dateFnsLocale = useDateFnsLocale();
  const weekStartsOn = (dateFnsLocale.options?.weekStartsOn ?? 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6;

  const [selectedDatesIntern, setSelectedDates] = useState<Date[]>([]);
  const selectedDates = externalSelectedDates || selectedDatesIntern;

  const toggleDates = (dates: Date[], selected: boolean) => {
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
      const dateStr = format(date, 'yyyy-MM-dd');
      return dates.map((d) => format(d, 'yyyy-MM-dd')).includes(dateStr);
    } catch (error) {
      console.error('Error formatting date:', error);
      return false;
    }
  };

  const getDateKey = (date: Date): string => format(date, 'yyyy-MM-dd');

  const getBadgeValue = (date: Date): number | undefined => badges[getDateKey(date)];

  const [firstDate] = dates;
  const lastDate = dates[dates.length - 1];

  const handleAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleDates(dates, event.target.checked);
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>, colGetDay: number) => {
    const relatedDates: Date[] = dates.filter(date => new Date(date).getDay() === colGetDay);
    toggleDates(relatedDates, event.target.checked);
  };

  const handleCwChange = (event: React.ChangeEvent<HTMLInputElement>, cw: number) => {
    const relatedDates: Date[] = dates.filter(date => getISOWeek(date) === cw);
    toggleDates(relatedDates, event.target.checked);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>, date: Date) => {
    toggleDates([date], event.target.checked);
  };

  const allDatesChecked = (): boolean =>
    !dates.some((date) => !dateIncluded(selectedDates, date));

  const dayDatesChecked = (colGetDay: number): boolean =>
    !dates.some((date) => new Date(date).getDay() === colGetDay && !dateIncluded(selectedDates, date));

  const cwDatesChecked = (cw: number): boolean =>
    !dates.some((date) => getISOWeek(date) === cw && !dateIncluded(selectedDates, date));

  // Grid bounds derived from the dates prop so we only show the relevant period.
  const dayOfFirst = firstDate ? firstDate.getDay() : new Date().getDay();
  const daysFromWeekStart = (dayOfFirst - weekStartsOn + 7) % 7;
  const gridStart = addDays(firstDate ?? new Date(), -daysFromWeekStart);
  // Column order: 7 consecutive getDay values starting from weekStartsOn.
  const weekColumns = Array.from({ length: 7 }, (_, k) => (weekStartsOn + k) % 7);
  const gridEnd = lastDate ?? new Date();
  const weeks = Math.ceil((differenceInDays(gridEnd, gridStart) + 1) / 7);

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
            getMonth(firstDate) === getMonth(lastDate) ? 'd.' : 'd. MMMM',
            { locale: dateFnsLocale }
          )}
          &nbsp;–&nbsp;
          {format(lastDate, 'd. MMMM', { locale: dateFnsLocale })}
        </Typography>

        <Table size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ padding: '4px', width: '40px' }}>
                <AllCheckbox checked={allDatesChecked()} onChange={handleAllChange} />
              </TableCell>
              {weekColumns.map((colGetDay, colIndex) => (
                <TableCell key={colGetDay} align="center" sx={{ padding: '4px', width: '40px' }}>
                  <DayCheckbox
                    colGetDay={colGetDay}
                    label={format(addDays(gridStart, colIndex), 'EEEE', { locale: dateFnsLocale }).substring(0, 2)}
                    checked={dayDatesChecked(colGetDay)}
                    onChange={handleDayChange}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(new Array(weeks)).map((_, weekIndex) => {
              const cw = getISOWeek(addDays(gridStart, weekIndex * 7));
              return (
              <TableRow key={weekIndex}>
                <TableCell align="center" sx={{ padding: '4px' }}>
                  <CwCheckbox
                    cw={cw}
                    checked={cwDatesChecked(cw)}
                    onChange={handleCwChange}
                  />
                </TableCell>
                {[...new Array(7)].map((_, dayOfWeek) => {
                  const date = addDays(gridStart, weekIndex * 7 + dayOfWeek);
                  const dateAvailable = dateIncluded(dates, date);
                  return (
                    <TableCell key={format(date, 'dd-MM-yyyy')} align="center" sx={{ padding: '4px' }}>
                      <DateCheckbox
                        date={date}
                        disabled={!dateAvailable}
                        checked={dateIncluded(selectedDates, date) && dateAvailable}
                        badgeValue={getBadgeValue(date)}
                        onChange={handleDateChange}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CalendarWrapper>
    </>
  );
}

// ── Styled components ─────────────────────────────────────────────────────────

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
