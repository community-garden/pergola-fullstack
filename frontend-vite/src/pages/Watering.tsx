import { Box, Typography, Paper, Grid, Slider, FormControl, InputLabel, Select, MenuItem, Button, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const Watering = () => {
  const { t } = useTranslation();
  const [frequency, setFrequency] = useState<number>(3);
  const [wateringDay, setWateringDay] = useState<string>('');

  const handleFrequencyChange = (_event: Event, newValue: number | number[]) => {
    setFrequency(newValue as number);
  };

  const handleDayChange = (event: any) => {
    setWateringDay(event.target.value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      
      <ContentPaper>
        <Typography variant="h6" gutterBottom>
          Watering Schedule
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              How often do you want to water your garden?
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={frequency}
                onChange={handleFrequencyChange}
                step={1}
                marks
                min={1}
                max={7}
                valueLabelDisplay="auto"
                aria-labelledby="watering-frequency-slider"
              />
              <Typography variant="body2" align="center">
                {frequency === 1 ? 'Once a week' : `${frequency} times a week`}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="watering-day-label">Preferred Day</InputLabel>
              <Select
                labelId="watering-day-label"
                id="watering-day"
                value={wateringDay}
                label="Preferred Day"
                onChange={handleDayChange}
              >
                <MenuItem value="monday">Monday</MenuItem>
                <MenuItem value="tuesday">Tuesday</MenuItem>
                <MenuItem value="wednesday">Wednesday</MenuItem>
                <MenuItem value="thursday">Thursday</MenuItem>
                <MenuItem value="friday">Friday</MenuItem>
                <MenuItem value="saturday">Saturday</MenuItem>
                <MenuItem value="sunday">Sunday</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" size="large">
              Save Schedule
            </Button>
          </Grid>
        </Grid>
      </ContentPaper>
      
      <ContentPaper>
        <Typography variant="h6" gutterBottom>
          Watering History
        </Typography>
        <Typography variant="body1">
          This is a placeholder for watering history. In the actual implementation, 
          this would display a log of past watering activities.
        </Typography>
      </ContentPaper>
    </Box>
  );
};

export default Watering;