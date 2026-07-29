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
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { PlanAssignment } from '../../hooks/useWateringPlan';
import { useDateFnsLocale } from '../../hooks';
import { WateringPersonChip } from './WateringPersonChip';

interface DateRowPerson {
  personIri: string;
  name: string;
}

interface WateringPlanDetailModalProps {
  open: boolean;
  onClose: () => void;
  assignments: PlanAssignment[];
  personNames: Record<string, string>;
  gardenName?: string;
  gardenId?: string;
  gardenLocation?: string;
}

function buildDateRows(
  assignments: PlanAssignment[],
  personNames: Record<string, string>
): Array<{ date: string; persons: DateRowPerson[] }> {
  const byDate = new Map<string, DateRowPerson[]>();

  for (const a of assignments) {
    if (!byDate.has(a.date)) byDate.set(a.date, []);
    const name = personNames[a.personIri] ?? a.personIri.split('/').pop() ?? a.personIri;
    byDate.get(a.date)!.push({ personIri: a.personIri, name });
  }

  return Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, persons]) => ({ date, persons }));
}

export function WateringPlanDetailModal({
  open,
  onClose,
  assignments,
  personNames,
  gardenName,
  gardenId,
  gardenLocation,
}: WateringPlanDetailModalProps) {
  const { t } = useTranslation('watering');
  const locale = useDateFnsLocale();
  const rows = buildDateRows(assignments, personNames);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = rows
      .map(({ date, persons }) => {
        const dateStr = format(parseISO(date), 'EEE d MMM yyyy', { locale });
        const names = persons.map((p) => p.name).join(', ');
        return `${dateStr} → ${names}`;
      })
      .join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                {rows.map(({ date, persons }) => (
                  <TableRow key={date} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {format(parseISO(date), 'EEE, d MMM', { locale })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {persons.map(({ personIri, name }) => (
                          <WateringPersonChip
                            key={personIri}
                            name={name}
                            personIri={personIri}
                            assignments={assignments}
                            gardenName={gardenName ?? gardenId ?? 'Garden'}
                            gardenId={gardenId ?? 'garden'}
                            gardenLocation={gardenLocation}
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
        <Button
          onClick={handleCopy}
          startIcon={<ContentCopyIcon fontSize="small" />}
          disabled={rows.length === 0}
          color={copied ? 'success' : 'inherit'}
        >
          {copied ? t('plan.copiedButton') : t('plan.copyButton')}
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button onClick={onClose} color="primary">
          {t('plan.closeButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WateringPlanDetailModal;
