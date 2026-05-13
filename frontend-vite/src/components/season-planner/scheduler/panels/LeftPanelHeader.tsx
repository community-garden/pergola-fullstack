import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import type { LeftPanelMode } from '../SchedulerTypes';

interface LeftPanelHeaderProps {
  children?: React.ReactNode;
  mode: LeftPanelMode;
  onModeChange: (mode: LeftPanelMode) => void;
  collapsible: boolean;
  height: number;
}

const NEXT_MODE: Record<LeftPanelMode, LeftPanelMode> = {
  full: 'medium',
  medium: 'minimal',
  minimal: 'full',
};

const MODE_TITLE: Record<LeftPanelMode, string> = {
  full: 'Compact (hide descriptions)',
  medium: 'Icons only',
  minimal: 'Expand panel',
};

export const LeftPanelHeader: React.FC<LeftPanelHeaderProps> = ({
  children,
  mode,
  onModeChange,
  collapsible,
  height,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height,
        px: 1,
        borderBottom: 1,
        borderColor: 'divider',
        flexShrink: 0,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ flex: 1, overflow: 'hidden', minWidth: 0 }}>{children}</Box>
      {collapsible && (
        <Tooltip title={MODE_TITLE[mode]} placement="right">
          <IconButton
            size="small"
            onClick={() => onModeChange(NEXT_MODE[mode])}
            sx={{ ml: 0.5, flexShrink: 0 }}
          >
            <ViewSidebarOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
