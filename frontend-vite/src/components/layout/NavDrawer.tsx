import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Chip,
} from '@mui/material';
import {
  Home as HomeIcon,
  Map as MapIcon,
  LocalFlorist as PlantsIcon,
  CalendarMonth as SeasonPlannerIcon,
  Opacity as WaterdropIcon,
  Event as EventsIcon,
  EventNote as EventNoteIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { isFeatureEnabled } from '@config/featureFlags';

import logoSvg from '@assets/logo-pergola-title.svg';

const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  background: theme.palette.primary.main,
}));

const LogoSvg = styled('svg')(({ theme }) => ({
  width: '120px',
  height: '52px',
  fill: theme.palette.primary.contrastText,
}));

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
  gardenId: string;
}

interface NavItem {
  icon: React.ReactNode;
  labelKey: string;
  route: string;
  featureFlag: string;
}

const navItems: NavItem[] = [
  { icon: <HomeIcon />, labelKey: 'home', route: 'home', featureFlag: 'home' },
  { icon: <MapIcon />, labelKey: 'map', route: 'map', featureFlag: 'map' },
  { icon: <PlantsIcon />, labelKey: 'plants', route: 'plants', featureFlag: 'plants' },
  { icon: <SeasonPlannerIcon />, labelKey: 'seasonPlanner', route: 'season-planner', featureFlag: 'seasonPlanner' },
  { icon: <WaterdropIcon />, labelKey: 'watering', route: 'watering', featureFlag: 'watering' },
  { icon: <EventsIcon />, labelKey: 'events', route: 'events', featureFlag: 'events' },
  { icon: <EventNoteIcon />, labelKey: 'notifications', route: 'notifications', featureFlag: 'notifications' },
  { icon: <SettingsIcon />, labelKey: 'gardenSettings', route: 'garden-settings', featureFlag: 'settings' },
];

const NavDrawer = ({ open, onClose, gardenId }: NavDrawerProps) => {
  const { t } = useTranslation('navigation');
  const { pathname } = useLocation();

  return (
    <Drawer variant="temporary" anchor="left" open={open} onClose={onClose}>
      <LogoBox>
        <LogoSvg role="img">
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref={`${logoSvg}#logo`}
          />
        </LogoSvg>
      </LogoBox>
      <Divider />
      <List sx={{ width: 240, pt: 1 }} onClick={onClose}>
        {navItems.map(({ icon, labelKey, route, featureFlag }) => {
          const enabled = isFeatureEnabled(featureFlag);
          const to = `/${gardenId}/${route}`;
          const selected = pathname.startsWith(to);
          
          return (
            <ListItemButton
              key={route}
              component={Link}
              to={to}
              selected={selected}
              disabled={!enabled}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={t(labelKey)} />
              {!enabled && (
                <Chip 
                  label="July 2026" 
                  size="small" 
                  color="primary"
                  variant="outlined"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
