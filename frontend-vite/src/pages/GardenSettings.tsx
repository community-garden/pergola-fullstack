import { Box, Typography, Paper, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const GardenSettings = () => {
  const { t } = useTranslation();
  const [gardenName, setGardenName] = useState('My Garden');
  const [gardenType, setGardenType] = useState('vegetable');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');

  const handleGardenNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGardenName(event.target.value);
  };

  const handleGardenTypeChange = (event: any) => {
    setGardenType(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real implementation, this would save the garden settings
    console.log('Garden settings saved:', { gardenName, gardenType, location, size });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        {t('navigation:gardenSettings')}
      </Typography>
      
      <ContentPaper>
        <Typography variant="h6" gutterBottom>
          Garden Configuration
        </Typography>
        
        <FormPaper>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="garden-name"
                  label="Garden Name"
                  fullWidth
                  variant="outlined"
                  value={gardenName}
                  onChange={handleGardenNameChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="garden-type-label">Garden Type</InputLabel>
                  <Select
                    labelId="garden-type-label"
                    id="garden-type"
                    value={gardenType}
                    label="Garden Type"
                    onChange={handleGardenTypeChange}
                  >
                    <MenuItem value="vegetable">Vegetable Garden</MenuItem>
                    <MenuItem value="flower">Flower Garden</MenuItem>
                    <MenuItem value="herb">Herb Garden</MenuItem>
                    <MenuItem value="mixed">Mixed Garden</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  id="garden-size"
                  label="Garden Size (m²)"
                  fullWidth
                  variant="outlined"
                  value={size}
                  onChange={handleSizeChange}
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  id="garden-location"
                  label="Location"
                  fullWidth
                  variant="outlined"
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Enter your garden's location"
                />
              </Grid>
              
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Save Settings
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormPaper>
      </ContentPaper>
      
      <ContentPaper>
        <Typography variant="h6" gutterBottom>
          Danger Zone
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="error"
          >
            Reset Garden Data
          </Button>
        </Box>
      </ContentPaper>
    </Box>
  );
};

export default GardenSettings;