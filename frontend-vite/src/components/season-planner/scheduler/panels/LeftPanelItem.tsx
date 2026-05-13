import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'motion/react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { SchedulerResource, LeftPanelMode } from '../SchedulerTypes';

interface LeftPanelItemProps<TData = unknown> {
  resource: SchedulerResource<TData> & { depth: number };
  mode: LeftPanelMode;
  rowHeight: number;
  laneCount: number;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  renderResource?: (resource: SchedulerResource<TData>) => React.ReactNode;
}

export function LeftPanelItem<TData = unknown>({
  resource,
  mode,
  rowHeight,
  laneCount,
  isExpanded,
  onToggle,
  renderResource,
}: LeftPanelItemProps<TData>) {
  const hasChildren = (resource.children?.length ?? 0) > 0;
  const totalHeight = rowHeight * Math.max(1, laneCount);

  if (renderResource) {
    return (
      <Box sx={{ height: totalHeight, display: 'flex', alignItems: 'center' }}>
        {renderResource(resource)}
      </Box>
    );
  }

  const iconNode =
    typeof resource.icon === 'string' ? (
      <Box
        component="span"
        sx={{ fontSize: mode === 'minimal' ? '1.25rem' : '1rem', lineHeight: 1 }}
      >
        {resource.icon}
      </Box>
    ) : (
      resource.icon
    );

  const itemContent = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: totalHeight,
        px: 1,
        pl: 1 + resource.depth * 1.5,
        gap: 0.75,
        cursor: hasChildren ? 'pointer' : 'default',
        '&:hover': hasChildren ? { bgcolor: 'action.hover' } : {},
        overflow: 'hidden',
      }}
      onClick={hasChildren ? () => onToggle(resource.id) : undefined}
    >
      {/* Tree toggle */}
      {hasChildren ? (
        <Box sx={{ flexShrink: 0, display: 'flex', color: 'text.secondary' }}>
          {isExpanded ? (
            <ExpandMoreIcon fontSize="small" />
          ) : (
            <ChevronRightIcon fontSize="small" />
          )}
        </Box>
      ) : (
        <Box sx={{ width: 20, flexShrink: 0 }} />
      )}

      {/* Icon */}
      {iconNode && (
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            color: 'text.primary',
          }}
        >
          {iconNode}
        </Box>
      )}

      {/* Label + description */}
      <AnimatePresence>
        {mode !== 'minimal' && (
          <motion.div
            key="label"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.18 }}
            style={{ overflow: 'hidden', minWidth: 0, flex: 1 }}
          >
            <Typography
              variant="body2"
              noWrap
              sx={{ fontWeight: 500, lineHeight: 1.2 }}
            >
              {resource.label}
            </Typography>
            <AnimatePresence>
              {mode === 'full' && resource.description && (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Typography
                    variant="caption"
                    noWrap
                    color="text.secondary"
                    sx={{ display: 'block' }}
                  >
                    {resource.description}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );

  // In minimal mode, wrap in tooltip to show label on hover
  if (mode === 'minimal') {
    return (
      <Tooltip title={resource.label} placement="right">
        {itemContent}
      </Tooltip>
    );
  }

  return itemContent;
}
