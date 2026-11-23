import { Chip, IconButton, Tooltip } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import EditOff from '@mui/icons-material/EditOff';
import { useTranslation } from 'react-i18next';

interface EditModeToggleProps {
  editMode: boolean;
  onToggle: () => void;
  /** `icon`: compact button (panel headers); `chip`: labelled, always readable state. */
  variant?: 'icon' | 'chip';
  /** Not usable (yet): shown greyed out, with this hint instead of the usual tooltip. */
  disabledHint?: string;
}

/** Switch between read-only and edit mode of a planner. */
export const EditModeToggle = ({ editMode, onToggle, variant = 'icon', disabledHint }: EditModeToggleProps) => {
  const { t } = useTranslation('garden');
  const disabled = Boolean(disabledHint);
  const title = disabledHint ?? t(editMode ? 'editMode.on' : 'editMode.off');
  if (variant === 'chip') {
    return (
      <Tooltip title={title}>
        {/* a span, so the tooltip also works on the disabled chip */}
        <span>
        <Chip
          size="small"
          icon={editMode ? <Edit /> : <EditOff />}
          label={t('editMode.label')}
          color={editMode ? 'primary' : 'default'}
          variant={editMode ? 'filled' : 'outlined'}
          onClick={onToggle}
          data-testid="edit-mode-toggle"
          aria-pressed={editMode}
          disabled={disabled}
        />
        </span>
      </Tooltip>
    );
  }
  return (
    <Tooltip title={title} placement="right">
      <span>
      <IconButton
        disabled={disabled}
        size="small"
        onClick={onToggle}
        color={editMode ? 'primary' : 'default'}
        sx={{ flexShrink: 0 }}
        data-testid="edit-mode-toggle"
        aria-pressed={editMode}
      >
        {editMode ? <Edit fontSize="small" /> : <EditOff fontSize="small" />}
      </IconButton>
      </span>
    </Tooltip>
  );
};
