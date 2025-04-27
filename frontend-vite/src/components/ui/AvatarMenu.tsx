import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@auth/index';
import { useAppDispatch, useAppSelector } from '@store/index';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
  Typography
} from '@mui/material';
import {
  Language as LanguageIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Login as LoginIcon
} from '@mui/icons-material';

/**
 * Avatar Menu Component Props
 */
interface AvatarMenuProps {
  /** Optional className for styling */
  className?: string;
}

/**
 * Avatar Menu Component
 * 
 * Displays a user avatar that opens a menu with various options:
 * - Language selection
 * - Theme toggle
 * - Profile link
 * - Garden settings (admin only)
 * - Logout button
 * 
 * If the user is not logged in, it displays a login button instead.
 */
export const AvatarMenu = ({ className }: AvatarMenuProps) => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, signoutRedirect, signinRedirect } = useAuth();
  const dispatch = useAppDispatch();
  
  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = useState<null | HTMLElement>(null);
  
  const open = Boolean(anchorEl);
  const languageMenuOpen = Boolean(languageMenuAnchorEl);
  
  // Check if user has admin role
  // Check if user has admin role
  const isAdmin = user?.profile?.role === 'admin' ||
                 (Array.isArray(user?.profile?.roles) && user?.profile?.roles.includes('admin')) ||
                 false;
  
  // Handle avatar click to open menu
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  // Handle language menu open
  const handleLanguageMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchorEl(event.currentTarget);
    // Don't close the main menu
    event.stopPropagation();
  };
  
  // Handle language menu close
  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchorEl(null);
  };
  
  // Handle language change
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    handleLanguageMenuClose();
  };
  
  // Handle login
  const handleLogin = () => {
    signinRedirect({
      redirect_uri: window.location.origin,
    });
  };
  
  // Handle logout
  const handleLogout = () => {
    signoutRedirect();
    handleClose();
  };
  
  // If not authenticated, show login button
  if (!isAuthenticated) {
    return (
      <Button
        color="inherit"
        startIcon={<LoginIcon />}
        onClick={handleLogin}
        className={className}
      >
        {t('common.login')}
      </Button>
    );
  }
  
  // Get user initials for avatar
  const userInitials = user?.profile?.name
    ? user.profile.name.split(' ').map(n => n[0]).join('')
    : '?';
  
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
            {userInitials}
          </Avatar>
        </IconButton>
      </Tooltip>
      
      {/* Main Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User info */}
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ mr: 2 }}>{userInitials}</Avatar>
          <Typography variant="body1">{user?.profile?.name}</Typography>
        </MenuItem>
        <Divider />
        
        {/* Language selection */}
        <MenuItem onClick={handleLanguageMenuOpen}>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary={t('common.language')} />
        </MenuItem>
        
        {/* Profile link */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={t('common.myProfile')} />
        </MenuItem>
        
        {/* Garden settings (admin only) */}
        {isAdmin && (
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={t('common.gardenSettings')} />
          </MenuItem>
        )}
        
        <Divider />
        
        {/* Logout */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={t('common.logout')} />
        </MenuItem>
      </Menu>
      
      {/* Language Menu */}
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