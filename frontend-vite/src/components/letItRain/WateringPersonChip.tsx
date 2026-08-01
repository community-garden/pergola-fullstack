import { useCallback, useState } from 'react';
import { Chip, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { generateWateringICS } from '@pergola/letitrain';
import type { PlanAssignment } from '../../hooks/useWateringPlan';

export interface WateringPersonChipProps {
  name: string;
  personIri: string;
  assignments: PlanAssignment[];
  gardenName: string;
  gardenId: string;
  gardenLocation?: string;
  size?: 'small' | 'medium';
  variant?: 'assigned' | 'available';
  removable?: boolean;
  onRemove?: () => void;
  onAssign?: () => void;
}

export function WateringPersonChip({
  name,
  personIri,
  assignments,
  gardenName,
  gardenId,
  gardenLocation,
  size = 'small',
  variant = 'assigned',
  removable = false,
  onRemove,
  onAssign,
}: WateringPersonChipProps) {
  const { t } = useTranslation('watering');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleDownload = () => {
    const eventSummary = t('chip.icsEventSummary', { gardenName });
    const icsContent = generateWateringICS({
      personIri,
      assignments,
      eventSummary,
      gardenId,
      gardenLocation,
    });

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${gardenId}-watering-${name.replace(/\s+/g, '-').toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setAnchorEl(null);
  };

  const handleDelete = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onRemove?.();
    },
    [onRemove]
  );

  const isAvailable = variant === 'available';
  const deleteAriaLabel = isAvailable
    ? t('chip.removeAvailability', { name })
    : t('chip.removeAssignment', { name });

  return (
    <>
      <Chip
        label={name}
        size={size}
        color={isAvailable ? 'default' : 'primary'}
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        onDelete={removable && onRemove ? handleDelete : undefined}
        sx={{
          cursor: 'pointer',
          ...(isAvailable && {
            color: 'text.secondary',
            borderColor: 'grey.400',
            opacity: 0.85,
          }),
        }}
        aria-label={isAvailable ? t('chip.fallbackAvailable', { name }) : name}
        slotProps={{
          deleteIcon: {
            'aria-label': deleteAriaLabel,
          },
        }}
        data-cy={isAvailable ? 'watering-chip-available' : 'watering-chip-assigned'}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {onAssign && (
          <MenuItem onClick={() => { setAnchorEl(null); onAssign(); }}>
            {t('chip.assignToDate')}
          </MenuItem>
        )}
        <MenuItem onClick={handleDownload}>
          {t('chip.downloadCalendar')}
        </MenuItem>
      </Menu>
    </>
  );
}

export default WateringPersonChip;
