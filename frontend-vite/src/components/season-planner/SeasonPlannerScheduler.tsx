import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { DayPilot, DayPilotScheduler } from '@daypilot/daypilot-lite-react';
import { useAnyOfFilterStore } from '@graviola/edb-state-hooks';
import { sortBy } from 'lodash-es';
import type { Patch } from 'schema';
import '../../assets/daypilot/themes/dark.css';
import '../../assets/daypilot/themes/light.css';
import '../../assets/daypilot/toolbar.css';

const COLOR_OPTIONS: DayPilot.ModalFormOption[] = [
  { name: '(default)', id: 'default' },
  { name: 'Blue', id: '#6fa8dc' },
  { name: 'Green', id: '#93c47d' },
  { name: 'Yellow', id: '#ffd966' },
  { name: 'Red', id: '#f6b26b' },
];

function patchStableId(patch: Patch, index: number): string {
  return patch['@id'] ?? `urn:patch:local:${index}`;
}

function patchesToResources(patches: Patch[]): DayPilot.ResourceData[] {
  return patches.map((patch, idx) => ({
    id: patchStableId(patch, idx),
    name: patch.name,
  }));
}

export const SeasonPlannerScheduler = () => {
  /** All patches in the store (not scoped to the current garden yet). */
  const patchesQuery = useAnyOfFilterStore<{ patches: Patch[] }>({ patches: 'Patch' }, {});
  const patches = useMemo(
    () => sortBy(patchesQuery.data?.patches ?? [], (p) => p.name.toLowerCase()),
    [patchesQuery.data?.patches],
  );

  const [scheduler, setScheduler] = useState<DayPilot.Scheduler | null>(null);
  const [events, setEvents] = useState<DayPilot.EventData[]>([]);

  const [startDate] = useState(() => DayPilot.Date.today().firstDayOfYear());
  const [days] = useState(() => DayPilot.Date.today().daysInYear());
  const [theme, setTheme] = useState('light');

  const [schedulerHeight, setSchedulerHeight] = useState(400);
  const schedulerWrapRef = useRef<HTMLDivElement>(null);

  const themes = [
    { name: 'light', text: 'Light' },
    { name: 'dark', text: 'Dark' },
  ];

  const resources = useMemo(() => patchesToResources(patches), [patches]);

  const resourceOptions = useMemo(
    () =>
      resources.map((r) => ({
        name: r.name ?? String(r.id),
        id: r.id as string | number,
      })),
    [resources],
  );

  const eventEditForm = useMemo((): DayPilot.ModalFormItem[] => {
    return [
      { name: 'Text', id: 'text' },
      { name: 'Start', id: 'start', type: 'datetime', disabled: true },
      { name: 'End', id: 'end', type: 'datetime', disabled: true },
      { name: 'Patch', id: 'resource', type: 'select', options: resourceOptions },
      { name: 'Color', id: 'backColor', type: 'select', options: COLOR_OPTIONS },
    ];
  }, [resourceOptions]);

  const editEvent = useCallback(
    async (e: DayPilot.Event) => {
      if (!scheduler) {
        return;
      }
      const modal = await DayPilot.Modal.form(eventEditForm, e.data);
      if (modal.canceled) {
        return;
      }
      const merged = { ...e.data, ...modal.result } as DayPilot.EventData & { backColor?: string };
      if (merged.backColor === 'default') {
        delete merged.backColor;
      }
      scheduler.events.update(merged);
    },
    [scheduler, eventEditForm],
  );

  const onTimeRangeSelected = useCallback(
    async (args: DayPilot.SchedulerTimeRangeSelectedArgs) => {
      if (!scheduler) {
        return;
      }
      const data: DayPilot.EventData = {
        start: args.start,
        end: args.end,
        resource: args.resource,
        id: DayPilot.guid(),
        text: 'Event',
      };

      const modal = await DayPilot.Modal.form(eventEditForm, data);

      scheduler.clearSelection();

      if (modal.canceled) {
        return;
      }
      const merged = { ...data, ...modal.result } as DayPilot.EventData & { backColor?: string };
      if (merged.backColor === 'default') {
        delete merged.backColor;
      }
      scheduler.events.add(merged);
    },
    [scheduler, eventEditForm],
  );

  const onBeforeEventRender = useCallback(
    (args: DayPilot.SchedulerBeforeEventRenderArgs) => {
      args.data.borderColor = 'darker';
      args.data.areas = [
        {
          right: 5,
          top: 'calc(50% - 15px)',
          width: 30,
          height: 30,
          symbol: '/icons/daypilot.svg#edit',
          borderRadius: '50%',
          backColor: '#ffffff99',
          fontColor: '#999999',
          padding: 5,
          onClick: async (clickArgs: { source: DayPilot.Event }) => {
            await editEvent(clickArgs.source);
          },
        },
      ];
    },
    [editEvent],
  );

  useEffect(() => {
    const firstDayOfMonth = DayPilot.Date.today().firstDayOfMonth();
    const firstId = patches.length ? patchStableId(patches[0], 0) : undefined;
    if (firstId) {
      setEvents([
        {
          id: 'demo-1',
          text: 'Sample event',
          start: firstDayOfMonth.addDays(1),
          end: firstDayOfMonth.addDays(6),
          resource: firstId,
        },
      ]);
    } else {
      setEvents([]);
    }

    scheduler?.scrollTo(DayPilot.Date.today().firstDayOfMonth());
  }, [scheduler, patches]);

  useEffect(() => {
    const el = schedulerWrapRef.current;
    if (!el) {
      return;
    }
    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height;
      if (h > 0) {
        setSchedulerHeight(Math.floor(h));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (patchesQuery.isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, p: 2 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (patchesQuery.isError) {
    return (
      <Box sx={{ p: 2, flex: 1 }}>
        <Typography variant="body1" color="error">
          Could not load patches: {patchesQuery.error?.message ?? 'unknown error'}
        </Typography>
      </Box>
    );
  }

  if (!patches.length) {
    return (
      <Box sx={{ p: 2, flex: 1 }}>
        <Typography variant="body1" color="text.secondary">
          No patches in the datastore yet. Create patches to plan seasons per patch row.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div className="toolbar">
        <label htmlFor="season-planner-theme">Theme:</label>
        <select
          id="season-planner-theme"
          value={theme}
          onChange={(e) => {
            setTheme(e.target.value);
          }}
        >
          {themes.map((t) => (
            <option key={t.name} value={t.name}>
              {t.text}
            </option>
          ))}
        </select>
        <Typography component="span" variant="body2" sx={{ ml: 2, opacity: 0.85 }}>
          All patches · {patches.length} row{patches.length === 1 ? '' : 's'}
        </Typography>
      </div>

      <Box ref={schedulerWrapRef} sx={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <DayPilotScheduler
          scale="Day"
          timeHeaders={[{ groupBy: 'Month' }, { groupBy: 'Day', format: 'd' }]}
          startDate={startDate}
          days={days}
          cellWidth={60}
          eventHeight={40}
          events={events}
          resources={resources}
          onBeforeEventRender={onBeforeEventRender}
          onTimeRangeSelected={onTimeRangeSelected}
          controlRef={setScheduler}
          theme={theme}
          timeRangeSelectedHandling="Enabled"
          height={schedulerHeight}
          heightSpec="Fixed"
          rowHeaderWidth={280}
        />
      </Box>
    </Box>
  );
};
