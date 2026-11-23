import {
  Box,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Map as MapIcon,
  LocalFlorist as PlantsIcon,
  CalendarMonth as SeasonPlannerIcon,
  Opacity as WaterdropIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isFeatureEnabled } from '@config/featureFlags';

interface ShortcutItem {
  icon: React.ReactNode;
  labelKey: string;
  route: string;
  featureFlag: string;
}

const shortcutItems: ShortcutItem[] = [
  { icon: <MapIcon fontSize="large" />, labelKey: 'map', route: 'map', featureFlag: 'map' },
  { icon: <PlantsIcon fontSize="large" />, labelKey: 'plants', route: 'plants', featureFlag: 'plants' },
  { icon: <SeasonPlannerIcon fontSize="large" />, labelKey: 'seasonPlanner', route: 'season-planner', featureFlag: 'seasonPlanner' },
  { icon: <WaterdropIcon fontSize="large" />, labelKey: 'watering', route: 'watering', featureFlag: 'watering' },
  { icon: <SettingsIcon fontSize="large" />, labelKey: 'gardenSettings', route: 'garden-settings', featureFlag: 'settings' },
];

const HomeShortcuts = () => {
  const theme = useTheme();
  const { gardenId = '' } = useParams();
  const { t } = useTranslation('navigation');
  const { t: tCommon } = useTranslation('common');

  const enabledItems = shortcutItems.filter(({ featureFlag }) => isFeatureEnabled(featureFlag));

  return (
    <Box
      component="nav"
      aria-label={tCommon('home.shortcutsAriaLabel')}
      data-testid="home-shortcuts"
      sx={{
        width: '100%',
        maxWidth: 720,
        mx: 'auto',
        mb: 2,
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.common.white, 0.65)}`,
        backgroundColor: alpha(theme.palette.common.white, 0.42),
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: theme.shadows[3],
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        {enabledItems.map(({ icon, labelKey, route }) => (
          <Box
            key={route}
            component={Link}
            to={`/${gardenId}/${route}`}
            data-testid={`home-shortcut-${route}`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              minWidth: 96,
              px: 1.5,
              py: 1.5,
              borderRadius: 2,
              textDecoration: 'none',
              color: 'primary.dark',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              backgroundColor: alpha(theme.palette.common.white, 0.55),
              transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
                duration: theme.transitions.duration.short,
              }),
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.85),
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[2],
              },
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: 2,
              },
            }}
          >
            {icon}
            <Typography variant="caption" fontWeight={600} textAlign="center">
              {t(labelKey)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomeShortcuts;