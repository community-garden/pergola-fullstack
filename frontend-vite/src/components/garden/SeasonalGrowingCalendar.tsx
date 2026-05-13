import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Box, IconButton, Tooltip, Chip, Typography } from '@mui/material';
import { Edit, EditOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { PlantSpecies, PlantVariety } from '../../schema/patch-schema';
import {
  extractPlantData,
  getPlantDisplayName,
  extractPeriods,
  periodOverlapsMonth,
  MONTH_BOUNDARIES,
  type PlantData,
  type Period,
  type PeriodType,
} from './plant-helpers';
import { CalendarLegend } from './CalendarLegend';
import { PeriodEditHandle } from './PeriodEditHandle';

export interface SeasonalGrowingCalendarProps {
  data: (PlantSpecies | PlantVariety)[];
  onDataChange?: (data: (PlantSpecies | PlantVariety)[]) => void;
  periodColors?: {
    sowingOutdoors?: string;
    sowingUnderGlass?: string;
    harvest?: string;
  };
  defaultVisibleProperties?: string[];
}

const DEFAULT_PERIOD_COLORS = {
  sowingOutdoors: '#4caf50',
  sowingUnderGlass: '#2196f3',
  harvest: '#ff9800',
};

/**
 * Month cell renderer component
 */
interface MonthCellProps {
  periods: Period[];
  monthIndex: number;
  editMode: boolean;
  periodColors: Record<PeriodType, string>;
  onPeriodChange?: (periodIndex: number, updates: Partial<Period>) => void;
  onTooltipUpdate?: (day: number, x: number, y: number) => void;
  onTooltipClear?: () => void;
}

/**
 * Calculate the visual position and width of a period bar within a month cell
 */
const calculatePeriodBarStyle = (period: Period, monthIndex: number): { left: string; right: string } => {
  const month = MONTH_BOUNDARIES[monthIndex];
  const monthLength = month.end - month.start + 1;
  
  // Calculate overlap
  const overlapStart = Math.max(period.start, month.start);
  const overlapEnd = Math.min(period.end, month.end);
  
  // Calculate positions as percentages
  const leftOffset = ((overlapStart - month.start) / monthLength) * 100;
  const rightOffset = ((month.end - overlapEnd) / monthLength) * 100;
  
  return {
    left: `${leftOffset}%`,
    right: `${rightOffset}%`,
  };
};

const MonthCell = ({ periods, monthIndex, editMode, periodColors, onPeriodChange, onTooltipUpdate, onTooltipClear }: MonthCellProps) => {
  const overlappingPeriods = periods.filter((period) =>
    periodOverlapsMonth(period, monthIndex)
  );

  if (overlappingPeriods.length === 0) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          minHeight: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0, // Remove Box padding
        }}
      >
        {editMode && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
              },
            }}
          />
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        padding: 0,
      }}
    >
        {overlappingPeriods.map((period, idx) => {
          const periodIndex = periods.indexOf(period);
          const month = MONTH_BOUNDARIES[monthIndex];
          const isFirstMonth = period.start >= month.start && period.start <= month.end;
          const isLastMonth = period.end >= month.start && period.end <= month.end;
          const barStyle = calculatePeriodBarStyle(period, monthIndex);

          return (
            <Box
              key={`${period.type}-${idx}`}
              sx={{
                position: 'relative',
                flex: 1,
                minHeight: editMode ? 12 : 8,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: barStyle.left,
                  right: barStyle.right,
                  top: 0,
                  bottom: 0,
                  backgroundColor: periodColors[period.type],
                  borderRadius: 0.25,
                  cursor: editMode ? 'pointer' : 'default',
                  opacity: editMode ? 0.8 : 0.9,
                  '&:hover': editMode
                    ? {
                        opacity: 1,
                        boxShadow: 1,
                        '& .period-handle': {
                          opacity: 1,
                        },
                      }
                    : {},
                }}
              >
                <PeriodEditHandle
                  side="start"
                  period={period}
                  periodIndex={periodIndex}
                  isVisible={editMode && isFirstMonth && !!onPeriodChange}
                  onPeriodChange={onPeriodChange!}
                  onTooltipUpdate={onTooltipUpdate}
                  onTooltipClear={onTooltipClear}
                />
                <PeriodEditHandle
                  side="end"
                  period={period}
                  periodIndex={periodIndex}
                  isVisible={editMode && isLastMonth && !!onPeriodChange}
                  onPeriodChange={onPeriodChange!}
                  onTooltipUpdate={onTooltipUpdate}
                  onTooltipClear={onTooltipClear}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
  );
};

export const SeasonalGrowingCalendar = ({
  data,
  onDataChange,
  periodColors = DEFAULT_PERIOD_COLORS,
  defaultVisibleProperties = ['germinationDays', 'daysToHarvest', 'spacing'],
}: SeasonalGrowingCalendarProps) => {
  const { t } = useTranslation('garden');
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState<(PlantSpecies | PlantVariety)[]>(data);
  const [tooltipState, setTooltipState] = useState<{ day: number; x: number; y: number } | null>(null);
  const tooltipTimeoutRef = useRef<number | null>(null);

  // Sync local data with prop changes
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        cancelAnimationFrame(tooltipTimeoutRef.current);
      }
    };
  }, []);

  // Transform data to PlantData format
  const plantData = useMemo(() => localData.map(extractPlantData), [localData]);

  // Throttled tooltip update
  const updateTooltip = useCallback((day: number, x: number, y: number) => {
    if (tooltipTimeoutRef.current) {
      cancelAnimationFrame(tooltipTimeoutRef.current);
    }
    tooltipTimeoutRef.current = requestAnimationFrame(() => {
      setTooltipState({ day, x, y });
    });
  }, []);

  const clearTooltip = useCallback(() => {
    if (tooltipTimeoutRef.current) {
      cancelAnimationFrame(tooltipTimeoutRef.current);
    }
    setTooltipState(null);
  }, []);

  // Handle period changes
  const handlePeriodChange = (plantIndex: number, periodIndex: number, updates: Partial<Period>) => {
    const updatedData = [...localData];
    const plant = updatedData[plantIndex];
    
    if (!plant.growingSeason) {
      plant.growingSeason = {};
    }

    const periods = extractPeriods(extractPlantData(plant));
    const period = periods[periodIndex];
    
    if (!period) return;

    // Update the corresponding fields based on period type
    if (updates.start !== undefined) {
      if (period.type === 'sowingOutdoors') {
        plant.growingSeason.sowingOutdoorsStart = updates.start;
      } else if (period.type === 'sowingUnderGlass') {
        plant.growingSeason.sowingUnderGlassStart = updates.start;
      } else if (period.type === 'harvest') {
        plant.growingSeason.harvestStartDay = updates.start;
      }
    }
    
    if (updates.end !== undefined) {
      if (period.type === 'sowingOutdoors') {
        plant.growingSeason.sowingOutdoorsEnd = updates.end;
      } else if (period.type === 'sowingUnderGlass') {
        plant.growingSeason.sowingUnderGlassEnd = updates.end;
      } else if (period.type === 'harvest') {
        plant.growingSeason.harvestEndDay = updates.end;
      }
    }

    setLocalData(updatedData);
    onDataChange?.(updatedData);
  };

  // Merge with default colors
  const colors = useMemo(
    () => ({ ...DEFAULT_PERIOD_COLORS, ...periodColors }),
    [periodColors]
  );

  // Define columns
  const columns = useMemo<MRT_ColumnDef<PlantData>[]>(() => {
    const cols: MRT_ColumnDef<PlantData>[] = [
      // Name column (pinned left)
      {
        accessorKey: 'name',
        header: t('plantSpecies.name'),
        size: 200,
        Cell: ({ row }) => {
          const displayName = getPlantDisplayName(row.original);
          const isVariety = row.original['@type'].includes('PlantVariety');
          
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {row.original.icon && (
                <Box
                  component="span"
                  sx={{
                    fontSize: '1.5rem',
                    lineHeight: 1,
                  }}
                >
                  {row.original.icon}
                </Box>
              )}
              <Box>
                <Box sx={{ fontWeight: isVariety ? 'normal' : 'medium' }}>
                  {displayName}
                </Box>
                {row.original.scientificName && (
                  <Box
                    sx={{
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                      fontStyle: 'italic',
                    }}
                  >
                    {row.original.scientificName}
                  </Box>
                )}
              </Box>
            </Box>
          );
        },
      },
    ];

    // Add month columns
    MONTH_BOUNDARIES.forEach((month) => {
      cols.push({
        id: `month-${month.month}`,
        header: t(`growingSeason.months.${month.month + 1}`),
        size: 80,
        enableSorting: false,
        enableColumnFilter: false,
        muiTableHeadCellProps: {
          sx: {
            padding: 0, // Remove default padding from header
          },
        },
        muiTableBodyCellProps: {
          sx: {
            padding: 0, // Remove default 8px padding
          },
        },
        Cell: ({ row }) => {
          const periods = extractPeriods(row.original);
          return (
            <MonthCell
              periods={periods}
              monthIndex={month.month}
              editMode={editMode}
              periodColors={colors}
              onPeriodChange={(periodIndex, updates) => {
                handlePeriodChange(row.index, periodIndex, updates);
              }}
              onTooltipUpdate={updateTooltip}
              onTooltipClear={clearTooltip}
            />
          );
        },
      });
    });

    // Add property columns (pinned right with abbreviated headers)
    cols.push(
      {
        accessorFn: (row) => row.timing?.germinationDays,
        id: 'germinationDays',
        header: t('seasonalCalendar.abbreviations.germinationDays'),
        size: 80,
        Cell: ({ cell }) => {
          const value = cell.getValue<number>();
          return value ? `${value}` : '-';
        },
      },
      {
        accessorFn: (row) => row.timing?.daysToHarvest,
        id: 'daysToHarvest',
        header: t('seasonalCalendar.abbreviations.daysToHarvest'),
        size: 80,
        Cell: ({ cell }) => {
          const value = cell.getValue<number>();
          return value ? `${value}` : '-';
        },
      },
      {
        accessorFn: (row) => row.physicalCharacteristics?.spacing,
        id: 'spacing',
        header: t('seasonalCalendar.abbreviations.spacing'),
        size: 80,
        Cell: ({ cell }) => {
          const value = cell.getValue<number>();
          return value ? `${value}` : '-';
        },
      },
      {
        accessorFn: (row) => row.physicalCharacteristics?.height,
        id: 'height',
        header: t('seasonalCalendar.abbreviations.height'),
        size: 80,
        Cell: ({ cell }) => {
          const value = cell.getValue<number>();
          return value ? `${value}` : '-';
        },
      },
      {
        accessorFn: (row) => row.requirements?.sun,
        id: 'sun',
        header: t('seasonalCalendar.abbreviations.sun'),
        size: 80,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return value ? t(`requirements.sunValues.${value}`) : '-';
        },
      },
      {
        accessorFn: (row) => row.requirements?.water,
        id: 'water',
        header: t('seasonalCalendar.abbreviations.water'),
        size: 80,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return value ? t(`requirements.waterValues.${value}`) : '-';
        },
      }
    );

    return cols;
  }, [t, editMode, colors]);

  // Column visibility
  const columnVisibility = useMemo(() => {
    const visibility: Record<string, boolean> = {};
    
    // All columns are visible by default except optional property columns
    const optionalProps = ['height', 'sun', 'water'];
    optionalProps.forEach((prop) => {
      visibility[prop] = defaultVisibleProperties.includes(prop);
    });
    
    return visibility;
  }, [defaultVisibleProperties]);

  const table = useMaterialReactTable({
    columns,
    data: plantData,
    enableStickyHeader: true,
    enableColumnPinning: true,
    enableFullScreenToggle: true,
    enableDensityToggle: true,
    enableHiding: true,
    enableColumnActions: true,
    enableSorting: true,
    enableColumnOrdering: false,
    enablePagination: false,
    enableBottomToolbar: false,
    layoutMode: 'grid-no-grow', // Constant column widths for proper pinning
    initialState: {
      columnPinning: {
        left: ['name'],
        right: ['germinationDays', 'daysToHarvest', 'spacing', 'height', 'sun', 'water'],
      },
      columnVisibility,
      density: 'compact',
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: 'calc(100vh - 200px)',
      },
    },
    muiTablePaperProps: {
      sx: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Tooltip title={editMode ? t('seasonalCalendar.editMode') : t('seasonalCalendar.editMode')}>
          <IconButton
            onClick={() => setEditMode(!editMode)}
            color={editMode ? 'primary' : 'default'}
          >
            {editMode ? <EditOff /> : <Edit />}
          </IconButton>
        </Tooltip>
        {editMode && (
          <Chip
            label={t('seasonalCalendar.editMode')}
            color="primary"
            size="small"
            variant="outlined"
          />
        )}
      </Box>
    ),
  });

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {tooltipState && (
        <Box
          sx={{
            position: 'fixed',
            left: tooltipState.x,
            top: tooltipState.y - 70,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 10000,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              padding: '6px 10px',
              borderRadius: 1.5,
              boxShadow: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 70,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -5,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid',
                borderTopColor: 'primary.main',
              },
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.65rem', lineHeight: 1.2 }}>
              {(() => {
                const monthIndex = MONTH_BOUNDARIES.findIndex(
                  (m) => tooltipState.day >= m.start && tooltipState.day <= m.end
                );
                return monthIndex >= 0 ? t(`growingSeason.months.${monthIndex + 1}`) : '';
              })()}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>
              {(() => {
                const monthIndex = MONTH_BOUNDARIES.findIndex(
                  (m) => tooltipState.day >= m.start && tooltipState.day <= m.end
                );
                return monthIndex >= 0 ? tooltipState.day - MONTH_BOUNDARIES[monthIndex].start + 1 : tooltipState.day;
              })()}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.8, lineHeight: 1 }}>
              Day {tooltipState.day}
            </Typography>
          </Box>
        </Box>
      )}
      <MaterialReactTable table={table} />
      <CalendarLegend periodColors={colors} />
    </Box>
  );
};

