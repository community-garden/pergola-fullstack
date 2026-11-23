import React from 'react';
import { Box, Divider } from '@mui/material';
import { motion } from 'motion/react';
import { LeftPanelHeader } from './LeftPanelHeader';
import { LeftPanelItem } from './LeftPanelItem';
import type {
  SchedulerResource,
  LeftPanelMode,
  UseSchedulerReturn,
} from '../SchedulerTypes';

const PANEL_WIDTHS: Record<LeftPanelMode, number> = {
  full: 1,       // uses the configured leftPanelWidth
  medium: 0.6,   // 60 % of full
  minimal: 40,   // px, just enough for icon
};

interface LeftPanelProps<TData = unknown> {
  resources: Array<SchedulerResource<TData> & { depth: number }>;
  state: UseSchedulerReturn;
  leftPanelWidth: number;
  leftPanelHeader?: React.ReactNode;
  leftPanelActions?: React.ReactNode;
  leftPanelCollapsible: boolean;
  rowHeight: number;
  resourceLaneCount: Map<string, number>;
  renderResource?: (resource: SchedulerResource<TData>) => React.ReactNode;
  headerHeight: number;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
}

export function LeftPanel<TData = unknown>({
  resources,
  state,
  leftPanelWidth,
  leftPanelHeader,
  leftPanelActions,
  leftPanelCollapsible,
  rowHeight,
  resourceLaneCount,
  renderResource,
  headerHeight,
  scrollRef,
  onScroll,
}: LeftPanelProps<TData>) {
  const { panelMode, setPanelMode, expandedResourceIds, toggleResource } = state;

  const effectiveWidth =
    panelMode === 'minimal'
      ? PANEL_WIDTHS.minimal
      : panelMode === 'medium'
      ? Math.round(leftPanelWidth * PANEL_WIDTHS.medium)
      : leftPanelWidth;

  return (
    <motion.div
      animate={{ width: effectiveWidth }}
      transition={{ type: 'spring', stiffness: 300, damping: 35 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'hidden',
        borderRight: '1px solid',
        borderColor: 'var(--mui-palette-divider, rgba(0,0,0,0.12))',
        background: 'var(--mui-palette-background-paper, #fff)',
        zIndex: 2,
      }}
    >
      {/* Header row — matches timeline header height */}
      <LeftPanelHeader
        mode={panelMode}
        onModeChange={setPanelMode}
        actions={panelMode === 'minimal' ? undefined : leftPanelActions}
        collapsible={leftPanelCollapsible}
        height={headerHeight}
      >
        {leftPanelHeader}
      </LeftPanelHeader>

      <Divider />

      {/* Scrollable resource rows — kept in sync with grid via scrollRef */}
      <Box
        ref={scrollRef}
        onScroll={onScroll}
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          // Hide scrollbar visually but keep functionality
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {resources.map((resource) => (
          <Box
            key={resource.id}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <LeftPanelItem
              resource={resource}
              mode={panelMode}
              rowHeight={rowHeight}
              laneCount={resourceLaneCount.get(resource.id) ?? 1}
              isExpanded={expandedResourceIds.has(resource.id)}
              onToggle={toggleResource}
              renderResource={renderResource as (r: SchedulerResource<unknown>) => React.ReactNode}
            />
          </Box>
        ))}
      </Box>
    </motion.div>
  );
}
