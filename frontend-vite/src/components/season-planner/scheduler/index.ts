// Public API
export { Scheduler } from './Scheduler';
export { useScheduler } from './useScheduler';
export { useOptimisticMutation } from './hooks/useOptimisticMutation';

// Types
export type {
  SchedulerProps,
  SchedulerItem,
  SchedulerResource,
  TimelineHeaderConfig,
  TimelineUnit,
  UseSchedulerOptions,
  UseSchedulerReturn,
  LeftPanelMode,
  LaneInfo,
} from './SchedulerTypes';

// Pre-built timeline configurations
export {
  createDateConfig,
  createYearHeaderConfig,
  createMonthHeaderConfig,
  createDayHeaderConfig,
  createStageConfig,
  createTimecodeConfig,
  ONE_DAY_MS,
} from './timeline/defaultTimelineConfigs';

// Utility functions (useful for consumers building custom renderers / hooks)
export {
  assignLanes,
  assignAllLanes,
  buildResourceLaneCount,
  flattenResources,
  toPixels,
  toUnit,
  snapToStep,
  snapToNearestItem,
  getVisibleRange,
  clamp,
} from './scheduleUtils';
