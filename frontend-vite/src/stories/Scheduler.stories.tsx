import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Button, Chip, Typography, Stack } from '@mui/material';
import { Scheduler } from '../components/season-planner/scheduler';
import { useScheduler } from '../components/season-planner/scheduler';
import type { SchedulerItem, SchedulerResource } from '../components/season-planner/scheduler';
import {
  createDateConfig,
  createStageConfig,
  createTimecodeConfig,
  ONE_DAY_MS,
} from '../components/season-planner/scheduler';

// ── Shared helpers ─────────────────────────────────────────────────────────

const d = (year: number, month: number, day: number) =>
  new Date(year, month - 1, day).getTime();

// ── Example data ───────────────────────────────────────────────────────────

const RESOURCES: SchedulerResource<{ emoji: string }>[] = [
  {
    id: 'https://example.org/patch/1',
    label: 'Tomato Bed',
    description: '3 m × 1.2 m raised bed',
    icon: '🍅',
    data: { emoji: '🍅' },
    children: [
      {
        id: 'https://example.org/patch/1/lane/a',
        label: 'Row A',
        description: 'Early varieties',
        icon: '🌱',
        data: { emoji: '🌱' },
      },
      {
        id: 'https://example.org/patch/1/lane/b',
        label: 'Row B',
        description: 'Late varieties',
        icon: '🌱',
        data: { emoji: '🌱' },
      },
    ],
  },
  {
    id: 'https://example.org/patch/2',
    label: 'Lettuce Bed',
    description: '2 m × 0.8 m',
    icon: '🥬',
    data: { emoji: '🥬' },
  },
  {
    id: 'https://example.org/patch/3',
    label: 'Herb Spiral',
    description: 'Perennial mixed herbs',
    icon: '🌿',
    data: { emoji: '🌿' },
  },
  {
    id: 'https://example.org/patch/4',
    label: 'Pumpkin Hill',
    description: 'Direct sow after frost',
    icon: '🎃',
    data: { emoji: '🎃' },
  },
];

const ITEMS: SchedulerItem<{ notes?: string }>[] = [
  {
    id: 'https://example.org/item/1',
    resourceId: 'https://example.org/patch/1',
    start: d(2026, 4, 1),
    end: d(2026, 7, 15),
    label: 'Tomatoes',
    color: '#e53935',
    data: { notes: 'San Marzano variety' },
  },
  {
    id: 'https://example.org/item/2',
    resourceId: 'https://example.org/patch/1',
    start: d(2026, 3, 1),
    end: d(2026, 4, 20),
    label: 'Seedling prep',
    color: '#fb8c00',
  },
  {
    id: 'https://example.org/item/3',
    resourceId: 'https://example.org/patch/1/lane/a',
    start: d(2026, 4, 5),
    end: d(2026, 6, 30),
    label: 'Tigerella',
    color: '#e53935',
  },
  {
    id: 'https://example.org/item/4',
    resourceId: 'https://example.org/patch/1/lane/b',
    start: d(2026, 5, 1),
    end: d(2026, 9, 1),
    label: 'Brandywine',
    color: '#c62828',
  },
  {
    id: 'https://example.org/item/5',
    resourceId: 'https://example.org/patch/2',
    start: d(2026, 3, 15),
    end: d(2026, 6, 1),
    label: 'Batavia',
    color: '#43a047',
  },
  {
    id: 'https://example.org/item/6',
    resourceId: 'https://example.org/patch/2',
    start: d(2026, 6, 5),
    end: d(2026, 9, 15),
    label: 'Lollo Rosso',
    color: '#2e7d32',
  },
  {
    id: 'https://example.org/item/7',
    resourceId: 'https://example.org/patch/3',
    start: d(2026, 4, 1),
    end: d(2026, 10, 31),
    label: 'Basil season',
    color: '#7b1fa2',
  },
  {
    id: 'https://example.org/item/8',
    resourceId: 'https://example.org/patch/3',
    start: d(2026, 3, 1),
    end: d(2026, 11, 30),
    label: 'Chives',
    color: '#512da8',
  },
  {
    id: 'https://example.org/item/9',
    resourceId: 'https://example.org/patch/4',
    start: d(2026, 5, 15),
    end: d(2026, 10, 15),
    label: 'Hokkaido',
    color: '#f57f17',
  },
];

// ── Meta ───────────────────────────────────────────────────────────────────

const meta: Meta<typeof Scheduler> = {
  title: 'Scheduler/Scheduler',
  component: Scheduler,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ height: '100vh', p: 2, bgcolor: 'background.default' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Scheduler>;

// ── Stories ────────────────────────────────────────────────────────────────

/**
 * Default — date-based garden schedule with all interactions enabled.
 * Try dragging items, resizing edges, and scrolling / pinch-zooming.
 */
export const Default: Story = {
  args: {
    resources: RESOURCES,
    items: ITEMS,
    canMoveItems: true,
    canResizeItems: true,
    canCreateItems: true,
    snapStep: ONE_DAY_MS,
    timelineHeaderRows: createDateConfig('day'),
    leftPanelDefaultMode: 'full',
    cellWidth: 40,
    rowHeight: 40,
  },
};

/**
 * ReadOnly — interactions disabled.
 */
export const ReadOnly: Story = {
  args: {
    ...Default.args,
    canMoveItems: false,
    canResizeItems: false,
    canCreateItems: false,
  },
};

/**
 * TreeResources — shows the expandable tree in the left panel.
 * Expand "Tomato Bed" to reveal its child rows.
 */
export const TreeResources: Story = {
  render: () => {
    const state = useScheduler({
      initialItems: ITEMS,
      initialResources: RESOURCES,
      initialPanelMode: 'full',
    });
    // Pre-expand the first resource so the tree is immediately visible
    React.useEffect(() => {
      state.toggleResource('https://example.org/patch/1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Scheduler
        resources={RESOURCES}
        items={ITEMS}
        schedulerState={state}
        canMoveItems
        canResizeItems
        snapStep={ONE_DAY_MS}
      />
    );
  },
};

/**
 * PanelModes — toggle the left panel density with the sidebar button.
 */
export const PanelModes: Story = {
  render: () => {
    const state = useScheduler({ initialItems: ITEMS, initialResources: RESOURCES });
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Stack direction="row" spacing={1}>
          <Button size="small" variant={state.panelMode === 'full' ? 'contained' : 'outlined'} onClick={() => state.setPanelMode('full')}>Full</Button>
          <Button size="small" variant={state.panelMode === 'medium' ? 'contained' : 'outlined'} onClick={() => state.setPanelMode('medium')}>Medium</Button>
          <Button size="small" variant={state.panelMode === 'minimal' ? 'contained' : 'outlined'} onClick={() => state.setPanelMode('minimal')}>Minimal</Button>
        </Stack>
        <Box sx={{ flex: 1 }}>
          <Scheduler
            resources={RESOURCES}
            items={ITEMS}
            schedulerState={state}
            canMoveItems
            canResizeItems
          />
        </Box>
      </Box>
    );
  },
};

/**
 * OverlappingItems — demonstrates multi-lane stacking.
 * Multiple items on the same resource overlap and are stacked vertically.
 */
export const OverlappingItems: Story = {
  render: () => {
    const overlapItems: SchedulerItem[] = [
      { id: 'ov1', resourceId: 'r1', start: d(2026, 4, 1), end: d(2026, 7, 1), label: 'Item A', color: '#1565c0' },
      { id: 'ov2', resourceId: 'r1', start: d(2026, 5, 1), end: d(2026, 8, 1), label: 'Item B', color: '#2e7d32' },
      { id: 'ov3', resourceId: 'r1', start: d(2026, 6, 1), end: d(2026, 9, 1), label: 'Item C', color: '#6a1b9a' },
      { id: 'ov4', resourceId: 'r1', start: d(2026, 3, 1), end: d(2026, 4, 15), label: 'Non-overlap', color: '#e65100' },
    ];
    const overlapResources: SchedulerResource[] = [
      { id: 'r1', label: 'Crowded Row', description: 'All items overlap here', icon: '📦' },
    ];
    return (
      <Scheduler
        resources={overlapResources}
        items={overlapItems}
        canMoveItems
        canResizeItems
        snapStep={ONE_DAY_MS}
      />
    );
  },
};

/**
 * CustomTimeline — non-date stage-based timeline.
 * Shows how the scheduler works with arbitrary numeric units.
 */
export const CustomTimeline: Story = {
  render: () => {
    const stages = [
      'Ideation', 'Research', 'Prototype', 'Review', 'Alpha',
      'Beta', 'Hardening', 'RC', 'Launch', 'Stabilize',
    ];
    const stageItems: SchedulerItem[] = [
      { id: 's1', resourceId: 'team-a', start: 0, end: 3, label: 'Foundation', color: '#1976d2' },
      { id: 's2', resourceId: 'team-a', start: 2, end: 5, label: 'Core API', color: '#388e3c' },
      { id: 's3', resourceId: 'team-b', start: 1, end: 4, label: 'UI Kit', color: '#7b1fa2' },
      { id: 's4', resourceId: 'team-b', start: 4, end: 7, label: 'Integration', color: '#f57c00' },
      { id: 's5', resourceId: 'team-c', start: 6, end: 9, label: 'QA', color: '#c62828' },
    ];
    const stageResources: SchedulerResource[] = [
      { id: 'team-a', label: 'Team Alpha', description: 'Backend squad', icon: '⚙️' },
      { id: 'team-b', label: 'Team Bravo', description: 'Frontend squad', icon: '🎨' },
      { id: 'team-c', label: 'Team Charlie', description: 'QA squad', icon: '🔍' },
    ];
    return (
      <Scheduler
        resources={stageResources}
        items={stageItems}
        timelineHeaderRows={createStageConfig(stages)}
        timelineStart={0}
        timelineEnd={stages.length}
        cellWidth={120}
        canMoveItems
        canResizeItems
      />
    );
  },
};

/**
 * TimecodeTimeline — media-editing style timecode at 25 fps.
 */
export const TimecodeTimeline: Story = {
  render: () => {
    const fps = 25;
    const tcItems: SchedulerItem[] = [
      { id: 'tc1', resourceId: 'track-a', start: 0, end: fps * 5, label: 'Intro', color: '#1976d2' },
      { id: 'tc2', resourceId: 'track-a', start: fps * 5, end: fps * 12, label: 'Main', color: '#388e3c' },
      { id: 'tc3', resourceId: 'track-b', start: fps * 3, end: fps * 8, label: 'BG Music', color: '#7b1fa2' },
    ];
    const tcResources: SchedulerResource[] = [
      { id: 'track-a', label: 'Video Track', icon: '🎬' },
      { id: 'track-b', label: 'Audio Track', icon: '🔊' },
    ];
    return (
      <Scheduler
        resources={tcResources}
        items={tcItems}
        timelineHeaderRows={createTimecodeConfig(fps)}
        timelineStart={0}
        timelineEnd={fps * 30}
        cellWidth={40}
        canMoveItems
        canResizeItems
        snapStep={fps} // snap to whole seconds
      />
    );
  },
};

/**
 * OptimisticUpdates — simulates a slow (1.5 s) backend with occasional
 * failures. Watch items snap back on rejection.
 */
export const OptimisticUpdates: Story = {
  render: () => {
    const [log, setLog] = useState<string[]>([]);
    const [failNext, setFailNext] = useState(false);

    const addLog = (msg: string) =>
      setLog((prev) => [`${new Date().toLocaleTimeString()} ${msg}`, ...prev.slice(0, 9)]);

    const persist = async (item: SchedulerItem) => {
      addLog(`⏳ Persisting "${item.label}"…`);
      await new Promise((res) => setTimeout(res, 1500));
      if (failNext) {
        setFailNext(false);
        addLog(`❌ Failed — rolling back "${item.label}"`);
        throw new Error('Simulated server rejection');
      }
      addLog(`✅ Saved "${item.label}"`);
    };

    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label={failNext ? 'Next move will FAIL' : 'Next move will succeed'}
            color={failNext ? 'error' : 'success'}
            size="small"
          />
          <Button size="small" variant="outlined" onClick={() => setFailNext(true)}>
            Trigger next failure
          </Button>
        </Stack>

        <Box sx={{ flex: 1 }}>
          <Scheduler
            resources={RESOURCES.slice(0, 2)}
            items={ITEMS.slice(0, 4)}
            canMoveItems
            canResizeItems
            snapStep={ONE_DAY_MS}
            onItemMove={async (item, _rid, start, end) => {
              await persist({ ...item, start, end });
            }}
            onItemResize={async (item, start, end) => {
              await persist({ ...item, start, end });
            }}
          />
        </Box>

        <Box sx={{ p: 1, bgcolor: 'background.paper', borderRadius: 1, maxHeight: 150, overflowY: 'auto' }}>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Mutation log
          </Typography>
          {log.map((entry, i) => (
            <Typography key={i} variant="caption" component="div" sx={{ fontFamily: 'monospace' }}>
              {entry}
            </Typography>
          ))}
        </Box>
      </Box>
    );
  },
};

/**
 * WithLeftPanelHeader — shows a custom slot in the left panel header.
 */
export const WithLeftPanelHeader: Story = {
  args: {
    ...Default.args,
    leftPanelHeader: (
      <Typography variant="subtitle2" noWrap>
        🌱 Garden 2026
      </Typography>
    ),
  },
};
