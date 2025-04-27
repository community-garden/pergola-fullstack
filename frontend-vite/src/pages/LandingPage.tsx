import { Box, Typography, Paper, TextField, Button, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import logo and background
import logoSvg from '../assets/logo-pergola-title.svg';
import backgroundImage from '../assets/background_full_grey_01.jpg';

const RootContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '500px',
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const LogoSvg = styled('svg')(({ theme }) => ({
  width: '200px',
  height: '87px',
  marginBottom: theme.spacing(4),
  fill: theme.palette.primary.main,
}));

const Form = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
}));

const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [gardenId, setGardenId] = useState('');

  const handleGardenIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGardenId(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (gardenId.trim()) {
      navigate(`/${gardenId}/home`);
    }
  };

  return (
    <RootContainer>
      <ContentPaper>
        <LogoSvg role="img">
          <title>{t('common:appName')}</title>
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref={`${logoSvg}#logo`}
          />
        </LogoSvg>
        
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Welcome to Pergola
        </Typography>
        
        <Typography variant="body1" paragraph align="center">
          Your garden management application
        </Typography>
        
        <Form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="gardenId"
            label="Enter Garden ID"
            name="gardenId"
            autoFocus
            value={gardenId}
            onChange={handleGardenIdChange}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            disabled={!gardenId.trim()}
          >
            Enter Garden
          </Button>
        </Form>
      </ContentPaper>
    </RootContainer>
  );
};

export default LandingPage;