import { AppBar, Toolbar, Typography, useMediaQuery, useTheme, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import AvatarMenu from '@components/ui/AvatarMenu';

// Import logo
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
});

const LogoContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  top: '.25rem',
}));

const AppHeader = () => {
  const { t } = useTranslation('navigation');
  const theme = useTheme();
  const { gardenId } = useParams<{ gardenId: string }>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  // Get the current page title based on the route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/home')) return t('home');
    if (path.includes('/map')) return t('map');
    if (path.includes('/watering')) return t('watering');
    if (path.includes('/notifications')) return t('notifications');
    if (path.includes('/garden-settings')) return t('gardenSettings');
    if (path.includes('/settings')) return t('settings');
    return '';
  };

  return (
    <AppBarStyled position="sticky">
      <ToolbarStyled>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <LogoContainer>
              <LogoSvg role="img">
                <title>{t('common:appName')}</title>
                <use
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xlinkHref={`${logoSvg}#logo`}
                />
              </LogoSvg>
              <Typography variant="h4" color="inherit" noWrap={isMobile} sx={{ fontSize: '0.5rem' }}>
                {gardenId}
              </Typography>
            </LogoContainer>
          </Grid>
          
          <Grid item xs={4} sx={{ textAlign: 'center' }} >
            <Typography variant="h4" color="inherit">
              {getPageTitle()}
            </Typography>
          </Grid>
          
          <Grid item xs={4} sx={{ textAlign: 'right', paddingRight: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <AvatarMenu />
          </Grid>
        </Grid>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default AppHeader;