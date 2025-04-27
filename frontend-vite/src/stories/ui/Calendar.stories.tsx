import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../../components/ui/Calendar';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {
  startOfWeek,
  eachDayOfInterval,
  subDays,
  addWeeks,
  format
} from 'date-fns';

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