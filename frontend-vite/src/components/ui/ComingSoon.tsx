import { Box, Typography, Paper, styled } from '@mui/material';
import { TimerOff as TimerOffIcon } from '@mui/icons-material';

const ComingSoonPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  boxShadow: theme.shadows[3],
  textAlign: 'center',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
}));

interface ComingSoonProps {
  featureName: string;
  releaseDate: string;
}

export const ComingSoon = ({ featureName, releaseDate }: ComingSoonProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <ComingSoonPaper elevation={3}>
        <TimerOffIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
        
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Coming Soon
        </Typography>
        
        <Typography variant="h6" color="textSecondary" paragraph>
          {featureName}
        </Typography>
        
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2, mb: 1 }}>
          This feature is not yet ready and will be available in
        </Typography>
        
        <Typography 
          variant="h5" 
          color="primary" 
          fontWeight="bold"
          sx={{ mt: 2, mb: 3 }}
        >
          {releaseDate}
        </Typography>
        
        <Typography variant="body2" color="textSecondary">
          We're working hard to bring you this feature. Stay tuned!
        </Typography>
      </ComingSoonPaper>
    </Box>
  );
};
