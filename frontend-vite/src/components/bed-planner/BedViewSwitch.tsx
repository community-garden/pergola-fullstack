import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import NotesIcon from '@mui/icons-material/EditNote';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import { useTranslation } from 'react-i18next';

export type BedView = 'plan' | 'timeline' | 'notes';

interface BedViewSwitchProps {
  value: BedView;
  onChange: (view: BedView) => void;
  /** phones have no side panel: the notes are a view of their own */
  withNotes?: boolean;
}

/** Switches the bed page between the graphic bed plan, the timeline (and notes on phones). */
export const BedViewSwitch = ({ value, onChange, withNotes }: BedViewSwitchProps) => {
  const { t } = useTranslation('garden');
  const views: { view: BedView; label: string; icon: React.ReactNode }[] = [
    { view: 'plan', label: t('bedPlanner.viewPlan'), icon: <GridOnIcon fontSize="small" /> },
    { view: 'timeline', label: t('bedPlanner.viewTimeline'), icon: <ViewTimelineIcon fontSize="small" /> },
    ...(withNotes ? [{ view: 'notes' as const, label: t('bedPlanner.viewNotes'), icon: <NotesIcon fontSize="small" /> }] : []),
  ];
  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      value={value}
      onChange={(_e, v: BedView | null) => v && onChange(v)}
      aria-label={t('bedPlanner.viewPlan')}
      data-testid="bed-view-switch"
    >
      {views.map(({ view, label, icon }) => (
        <ToggleButton key={view} value={view} aria-label={label} data-testid={`bed-view-${view}`} sx={{ px: 1 }}>
          <Tooltip title={label}>
            <span style={{ display: 'flex' }}>{icon}</span>
          </Tooltip>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
