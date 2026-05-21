import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn } from '@storybook/test';
import { Calendar } from '../../components/ui/Calendar';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {
  startOfWeek,
  eachDayOfInterval,
  subDays,
  addWeeks,
  addDays,
  getISOWeek,
  format
} from 'date-fns';

// Fixed-date range for deterministic interaction tests (Mon 4 May – Sun 17 May 2026)
const TEST_START = new Date(2026, 4, 4); // 4 May 2026 (Monday)
const testDates = Array.from({ length: 14 }, (_, i) => addDays(TEST_START, i));

// Create a theme that matches the original styling
const theme = createTheme({
  palette: {
    primary: {
      main: '#007B6C',
      light: '#BDE3DC',
      dark: '#005A4E',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2196F3',
      contrastText: '#ffffff',
    },
    grey: {
      400: '#cccccc'
    }
  },
  typography: {
    fontFamily: 'Open Sans, Arial, sans-serif',
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    }
  },
});

// Generate dates for the calendar (3 weeks starting from Monday)
const generateDates = () => {
  const today = new Date();
  const startDate = subDays(startOfWeek(today, { weekStartsOn: 1 }), 7); // Start 1 week before
  const endDate = addWeeks(startDate, 3); // 3 weeks total
  
  return eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
};

// Generate some pre-selected dates
const generateSelectedDates = (allDates: Date[]) => {
  // Select a few dates for demonstration
  return [
    allDates[3],
    allDates[7],
    allDates[12],
    allDates[15],
  ];
};

// Generate sample badge data (vote counts)
const generateBadgeData = (allDates: Date[]) => {
  const badges: Record<string, number> = {};
  
  // Add vote counts to some dates
  badges[format(allDates[5], 'yyyy-MM-dd')] = 3;
  badges[format(allDates[8], 'yyyy-MM-dd')] = 7;
  badges[format(allDates[12], 'yyyy-MM-dd')] = 2;
  badges[format(allDates[15], 'yyyy-MM-dd')] = 5;
  
  return badges;
};

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          padding: '20px',
          maxWidth: '600px',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample dates for the stories
const allDates = generateDates();
const selectedDates = generateSelectedDates(allDates);
const badgeData = generateBadgeData(allDates);

export const Default: Story = {
  args: {
    dates: allDates,
  },
};

export const WithSelectedDates: Story = {
  args: {
    dates: allDates,
    selectedDates: selectedDates,
  },
};

export const Interactive: Story = {
  args: {
    dates: allDates,
    onChange: (dates) => console.log('Selected dates:', dates),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with interactive selection. Open the console to see selected dates.',
      },
    },
  },
};

export const LimitedRange: Story = {
  args: {
    // Only show next 10 days
    dates: allDates.slice(5, 15),
    onChange: (dates) => console.log('Selected dates:', dates),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with a limited date range. Notice how days outside the range are disabled.',
      },
    },
  },
};

export const WithBadges: Story = {
  args: {
    dates: allDates,
    badges: badgeData,
    onChange: (dates) => console.log('Selected dates:', dates),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with badges showing vote counts for specific dates.',
      },
    },
  },
};

export const WithSelectedDatesAndBadges: Story = {
  args: {
    dates: allDates,
    selectedDates: selectedDates,
    badges: badgeData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with both pre-selected dates and badges showing vote counts.',
      },
    },
  },
};

// ── Component tests (play functions) ─────────────────────────────────────────
// Uses a fixed 14-day window (Mon 4 May – Sun 17 May 2026) so assertions
// about the number of selected dates are stable across runs.

export const SelectAllTest: Story = {
  name: 'Test: select-all toggles all dates',
  args: {
    dates: testDates,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Re-query before every click: previously these were sub-components defined
    // inside Calendar (new function ref each render → React would unmount/remount
    // the DOM node on state update, leaving any cached ref stale).
    await expect(canvas.getByTestId('calendar-select-all')).not.toBeChecked();

    await userEvent.click(canvas.getByTestId('calendar-select-all'));
    await expect(args.onChange).toHaveBeenCalledOnce();
    const firstCall = (args.onChange as ReturnType<typeof fn>).mock.calls[0][0] as Date[];
    await expect(firstCall).toHaveLength(testDates.length);

    await userEvent.click(canvas.getByTestId('calendar-select-all'));
    await expect(args.onChange).toHaveBeenCalledTimes(2);
    const secondCall = (args.onChange as ReturnType<typeof fn>).mock.calls[1][0] as Date[];
    await expect(secondCall).toHaveLength(0);
  },
};

export const SingleDateToggleTest: Story = {
  name: 'Test: individual date can be selected and deselected',
  args: {
    dates: testDates,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Use the deterministic testid so we always hit an enabled cell regardless
    // of which week index TEST_START falls on in the current-month grid.
    const testId = `calendar-date-${format(TEST_START, 'yyyy-MM-dd')}`;

    await expect(canvas.getByTestId(testId)).not.toBeChecked();

    await userEvent.click(canvas.getByTestId(testId));
    await expect(args.onChange).toHaveBeenCalledOnce();
    const selected = (args.onChange as ReturnType<typeof fn>).mock.calls[0][0] as Date[];
    await expect(selected).toHaveLength(1);

    await userEvent.click(canvas.getByTestId(testId));
    await expect(args.onChange).toHaveBeenCalledTimes(2);
    const deselected = (args.onChange as ReturnType<typeof fn>).mock.calls[1][0] as Date[];
    await expect(deselected).toHaveLength(0);
  },
};

export const SelectDayOfWeekTest: Story = {
  name: 'Test: day-of-week header selects all available dates on that day',
  args: {
    dates: testDates,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Monday header = data-testid "calendar-day-1" (setDay convention: 1=Mon).
    // testDates (Mon 4 May – Sun 17 May 2026) has exactly 2 Mondays: May 4 and May 11.
    const mondayCount = testDates.filter(d => d.getDay() === 1).length;
    await expect(mondayCount).toBe(2);

    await userEvent.click(canvas.getByTestId('calendar-day-1'));
    await expect(args.onChange).toHaveBeenCalledOnce();
    const selected = (args.onChange as ReturnType<typeof fn>).mock.calls[0][0] as Date[];
    await expect(selected).toHaveLength(mondayCount);
    await expect(selected.every(d => d.getDay() === 1)).toBe(true);
  },
};

export const SelectCalendarWeekTest: Story = {
  name: 'Test: CW checkbox selects all available dates in that ISO week',
  args: {
    dates: testDates,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Week containing TEST_START (Mon 4 May 2026). All 7 days (Mon 4 – Sun 10 May)
    // are in testDates, so clicking that CW should select exactly 7 dates.
    const targetWeek = getISOWeek(TEST_START);
    const datesInWeek = testDates.filter(d => getISOWeek(d) === targetWeek);
    await expect(datesInWeek.length).toBe(7);

    await userEvent.click(canvas.getByTestId(`calendar-cw-${targetWeek}`));
    await expect(args.onChange).toHaveBeenCalledOnce();
    const selected = (args.onChange as ReturnType<typeof fn>).mock.calls[0][0] as Date[];
    await expect(selected).toHaveLength(7);
    await expect(selected.every(d => getISOWeek(d) === targetWeek)).toBe(true);
  },
};