import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Divider, Tabs, Tab, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { 
  Notifications as NotificationsIcon, 
  Event as EventIcon,
  WaterDrop as WaterDropIcon,
  Spa as SpaIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`notifications-tabpanel-${index}`}
      aria-labelledby={`notifications-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Notifications = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        {t('navigation:notifications')}
      </Typography>
      
      <ContentPaper>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="notification tabs">
            <Tab label="Notifications" icon={<NotificationsIcon />} />
            <Tab label="Calendar" icon={<EventIcon />} />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <List>
            <ListItem>
              <ListItemIcon>
                <WaterDropIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Watering Reminder" 
                secondary="It's time to water your tomatoes and peppers" 
              />
            </ListItem>
            <Divider />
            
            <ListItem>
              <ListItemIcon>
                <SpaIcon color="success" />
              </ListItemIcon>
              <ListItemText 
                primary="Harvest Time" 
                secondary="Your carrots are ready to be harvested" 
              />
            </ListItem>
            <Divider />
            
            <ListItem>
              <ListItemIcon>
                <InfoIcon color="info" />
              </ListItemIcon>
              <ListItemText 
                primary="Garden Tip" 
                secondary="Consider adding mulch to retain moisture during hot days" 
              />
            </ListItem>
          </List>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="body1" paragraph>
            This is a placeholder for the calendar view. In the actual implementation, 
            this would display a calendar with garden events and tasks.
          </Typography>
          <Box 
            sx={{ 
              width: '100%', 
              height: '300px', 
              border: '2px dashed grey', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 2
            }}
          >
            <Typography variant="body2" color="textSecondary">
              Calendar View Area
            </Typography>
          </Box>
        </TabPanel>
      </ContentPaper>
    </Box>
  );
};

export default Notifications;