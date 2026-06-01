import { Box } from '@mui/material';
import { SeasonPlannerScheduler } from '@components/season-planner/SeasonPlannerScheduler';

export const SeasonPlanner = () => {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <SeasonPlannerScheduler />
    </Box>
  );
};
