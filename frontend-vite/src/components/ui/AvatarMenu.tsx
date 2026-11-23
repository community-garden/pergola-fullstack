import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@auth/index';
import config from '@config/index';
import { useLocalUser } from '@hooks/useLocalUser';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/material';
import {
  Language as LanguageIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  PersonOff as PersonOffIcon,
} from '@mui/icons-material';

interface AvatarMenuProps {
  className?: string;
}

export const AvatarMenu = ({ className }: AvatarMenuProps) => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, signoutRedirect, signinRedirect } = useAuth();
  const { nickname, forgetMe } = useLocalUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const languageMenuOpen = Boolean(languageMenuAnchorEl);

  const initials = isAuthenticated
    ? (user?.profile?.name?.split(' ').map((n: string) => n[0]).join('') ?? '?')
    : (nickname ? nickname.slice(0, 2).toUpperCase() : '?');

  const displayName = isAuthenticated
    ? (user?.profile?.name ?? '')
    : (nickname || t('common.anonymous'));

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    handleLanguageMenuClose();
  };

  const handleLogin = () => {
    signinRedirect({ redirect_uri: window.location.origin });
    handleClose();
  };

  const handleLogout = () => {
    signoutRedirect();
    handleClose();
  };

  const handleForgetMe = () => {
    forgetMe();
    handleClose();
  };

  return (
    <Box className={className}>
      <Tooltip title={t('common.userMenu')}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            {initials}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} disableRipple sx={{ pointerEvents: 'none' }}>
          <Avatar sx={{ mr: 2, width: 32, height: 32 }}>{initials}</Avatar>
          <Typography variant="body1">{displayName}</Typography>
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleLanguageMenuOpen}>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary={t('common.language')} />
        </MenuItem>

        {!isAuthenticated && (
          <MenuItem onClick={handleLogin} disabled={!config.auth.enabled}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText
              primary={t('common.login')}
              secondary={config.auth.enabled ? undefined : t('common.loginDisabled')}
            />
          </MenuItem>
        )}

        {!isAuthenticated && (
          <MenuItem onClick={handleForgetMe}>
            <ListItemIcon>
              <PersonOffIcon />
            </ListItemIcon>
            <ListItemText primary={t('common.forgetMe')} />
          </MenuItem>
        )}

        {isAuthenticated && (
          <>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={t('common.logout')} />
            </MenuItem>
          </>
        )}
      </Menu>

      <Menu
        anchorEl={languageMenuAnchorEl}
        id="language-menu"
        open={languageMenuOpen}
        onClose={handleLanguageMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem onClick={() => handleLanguageChange('en')} selected={i18n.language === 'en'}>
          English
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('de')} selected={i18n.language === 'de'}>
          Deutsch
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AvatarMenu;
