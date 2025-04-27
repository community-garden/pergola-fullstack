import { BottomNavigation, Tab, Tabs, styled } from '@mui/material';
import { 
  Home as HomeIcon, 
  Map as MapIcon, 
  Opacity as WaterdropIcon, 
  EventNote as EventNoteIcon, 
  Settings as SettingsIcon 
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BottomNavigationStyled = styled(BottomNavigation)(({ theme }) => ({
  zIndex: theme.zIndex.appBar,
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.main,
}));

const FooterContainer = styled('footer')({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
});

// Custom styled Tabs component to change the active indicator color
const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.secondary.main,
  },
  '& .Mui-selected': {
    color: theme.palette.secondary.light + ' !important',
  },
}));

interface BottomNavProps {
  gardenId: string;
}

const BottomNav = ({ gardenId }: BottomNavProps) => {
  const { t } = useTranslation('navigation');
  const { pathname } = useLocation();

  // Helper function to create accessible tab props
  const a11yTabProps = (index: number, route: string) => {
    const linkTo = `/${gardenId}/${route}`;
    return {
      component: Link,
      to: linkTo,
      value: linkTo,
      title: pathname,
      id: `scrollable-prevent-tab-${index}`,
      'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
  };

  return (
    <FooterContainer>
      <BottomNavigationStyled>
        <StyledTabs centered value={pathname}>
          <Tab
            icon={<HomeIcon />}
            aria-label={t('home')}
            {...a11yTabProps(0, 'home')}
          />
          <Tab
            icon={<MapIcon />}
            aria-label={t('map')}
            {...a11yTabProps(1, 'map')}
          />
          <Tab
            icon={<WaterdropIcon />}
            aria-label={t('watering')}
            {...a11yTabProps(2, 'watering')}
          />
          <Tab
            icon={<EventNoteIcon />}
            aria-label={t('notifications')}
            {...a11yTabProps(3, 'notifications')}
          />
          <Tab
            icon={<SettingsIcon />}
            aria-label={t('settings')}
            {...a11yTabProps(4, 'garden-settings')}
          />
        </StyledTabs>
      </BottomNavigationStyled>
    </FooterContainer>
  );
};

export default BottomNav;