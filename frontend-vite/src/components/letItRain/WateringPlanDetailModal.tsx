import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { format, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import type { PlanAssignment } from '../../hooks/useWateringPlan';

interface WateringPlanDetailModalProps {
  open: boolean;
  onClose: () => void;
  assignments: PlanAssignment[];
  personNames: Record<string, string>;
}

function buildDateRows(
  assignments: PlanAssignment[],
  personNames: Record<string, string>
): Array<{ date: string; names: string[] }> {
  const byDate = new Map<string, string[]>();

  for (const a of assignments) {
    if (!byDate.has(a.date)) byDate.set(a.date, []);
    const name = personNames[a.personIri] ?? a.personIri.split('/').pop() ?? a.personIri;
    byDate.get(a.date)!.push(name);
  }

  return Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, names]) => ({ date, names }));
}

export function WateringPlanDetailModal({
  open,
  onClose,
  assignments,
  personNames,
}: WateringPlanDetailModalProps) {
  const { t } = useTranslation('watering');
  const rows = buildDateRows(assignments, personNames);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      data-cy="plan-detail-modal"
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{t('plan.detailTitle')}</Typography>
          <IconButton onClick={onClose} size="small" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ px: 0 }}>
        {rows.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ px: 3, py: 2 }}>
            {t('plan.noAssignments')}
          </Typography>
        ) : (
          <TableContainer component={Paper} elevation={0} data-cy="plan-detail-table">
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', width: '35%' }}>
                    {t('plan.dateColumn')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {t('plan.gardenersColumn')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(({ date, names }) => (
                  <TableRow key={date} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {format(parseISO(date), 'EEE, d MMM')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {names.map((name) => (
                          <Chip
                            key={name}
                            label={name}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('plan.closeButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WateringPlanDetailModal;
