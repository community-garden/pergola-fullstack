import { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import AvatarMenu from '@components/ui/AvatarMenu';
import { useCurrentGardenInfo } from '@hooks/index';

import logoSvg from '@assets/logo-pergola-title.svg';

const LogoSvg = styled('svg')(({ theme }) => ({
  width: '120px',
  height: '52px',
  fill: theme.palette.primary.contrastText,
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  color: theme.palette.primary.contrastText,
}));

const ToolbarStyled = styled(Toolbar)({
  padding: 0,
  minHeight: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const AppHeader = () => {
  const { t } = useTranslation('navigation');
  const location = useLocation();
  const { garden, isLoading } = useCurrentGardenInfo();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/home')) return t('home');
    if (path.includes('/map')) return t('map');
    if (path.includes('/season-planner')) return t('seasonPlanner');
    if (path.includes('/watering')) return t('watering');
    if (path.includes('/notifications')) return t('notifications');
    if (path.includes('/garden-settings')) return t('gardenSettings');
    if (path.includes('/settings')) return t('settings');
    return '';
  };

  const pageTitle = getPageTitle();

  useEffect(() => {
    const parts = ['Pergola'];
    if (garden?.name) parts.push(garden.name);
    if (pageTitle) parts.push(pageTitle);
    document.title = parts.join(' - ');
  }, [garden?.name, pageTitle]);

  return (
    <AppBarStyled position="sticky">
      <ToolbarStyled>
        <LogoSvg role="img">
          <title>{t('common:appName')}</title>
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref={`${logoSvg}#logo`}
          />
        </LogoSvg>

        <Box display="flex" alignItems="center" gap={1}>
          {isLoading ? (
            <Skeleton width={80} sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
          ) : garden?.name ? (
            <Typography variant="body1" color="inherit" noWrap>
              {garden.name}
            </Typography>
          ) : null}
          <AvatarMenu />
        </Box>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default AppHeader;
