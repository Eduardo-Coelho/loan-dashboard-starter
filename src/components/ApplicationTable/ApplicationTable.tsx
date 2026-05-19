import React, { useState, useCallback, memo } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  Paper,
  Skeleton,
  Box,
  Button,
  Tooltip,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { LoanApplication, ApplicationStatus } from '../../types';
import { SortConfig, SortField } from '../../hooks/useLoanApplications';
import { formatCurrency, formatRelativeTime } from '../../utils/formatting';
import { calculateRiskScore } from '../../utils/risk';
import { StatusChip } from '../StatusChip';
import { RiskScoreBadge } from '../RiskScoreBadge';
import { ApplicationTableToolbar } from './ApplicationTableToolbar';
import { ProcessDialog } from './ProcessDialog';
import { COLUMNS, SKELETON_ROW_COUNT, PROCESSABLE_STATUSES } from './config';
import { ApplicationFilters } from '../../types';

interface ApplicationTableProps {
  applications: LoanApplication[];
  loading: boolean;
  filters: ApplicationFilters;
  sortConfig: SortConfig;
  mutationError: string | null;
  statusOverrides: Record<
    string,
    { status: ApplicationStatus; isPending: boolean }
  >;
  onFiltersChange: (filters: ApplicationFilters) => void;
  onSortChange: (sort: SortConfig) => void;
  onViewDetails: (application: LoanApplication) => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => Promise<void>;
  onClearMutationError: () => void;
  canProcess: boolean;
}

const SkeletonRows: React.FC = memo(() => (
  <>
    {Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
      <TableRow key={i}>
        {COLUMNS.map((col) => (
          <TableCell key={col.id}>
            <Skeleton variant="text" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
));
SkeletonRows.displayName = 'SkeletonRows';

const EmptyState: React.FC = () => (
  <TableRow>
    <TableCell colSpan={COLUMNS.length} align="center" sx={{ py: 6 }}>
      <Typography color="text.secondary">
        No applications match your filters.
      </Typography>
    </TableCell>
  </TableRow>
);

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  loading,
  filters,
  sortConfig,
  mutationError,
  statusOverrides,
  onFiltersChange,
  onSortChange,
  onViewDetails,
  onUpdateStatus,
  onClearMutationError,
  canProcess,
}) => {
  const [processTarget, setProcessTarget] = useState<LoanApplication | null>(
    null,
  );

  const handleSortClick = useCallback(
    (field: SortField) => {
      onSortChange({
        field,
        direction:
          sortConfig.field === field && sortConfig.direction === 'asc'
            ? 'desc'
            : 'asc',
      });
    },
    [sortConfig, onSortChange],
  );

  const handleProcessConfirm = useCallback(
    async (id: string, status: ApplicationStatus) => {
      await onUpdateStatus(id, status);
    },
    [onUpdateStatus],
  );

  return (
    <>
      <ApplicationTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
      />

      <TableContainer component={Paper} variant="outlined">
        <Table size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              {COLUMNS.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align ?? 'left'}
                  width={col.width}
                  sortDirection={
                    col.sortField && sortConfig.field === col.sortField
                      ? sortConfig.direction
                      : false
                  }
                >
                  {col.sortField ? (
                    <TableSortLabel
                      active={sortConfig.field === col.sortField}
                      direction={
                        sortConfig.field === col.sortField
                          ? sortConfig.direction
                          : 'asc'
                      }
                      onClick={() => handleSortClick(col.sortField!)}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <SkeletonRows />
            ) : applications.length === 0 ? (
              <EmptyState />
            ) : (
              applications.map((app) => {
                const risk = calculateRiskScore(app);
                const override = statusOverrides[app.id];
                const isPending = override?.isPending ?? false;
                const canBeProcessed =
                  canProcess && PROCESSABLE_STATUSES.includes(app.status);

                return (
                  <TableRow
                    key={app.id}
                    hover
                    sx={{
                      opacity: isPending ? 0.65 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {app.applicantName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {app.id}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="body2">
                        {formatCurrency(app.amount)}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <RiskScoreBadge
                        score={risk.score}
                        category={risk.category}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <StatusChip status={app.status} />
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {formatRelativeTime(app.submittedAt)}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Box display="flex" gap={1} justifyContent="flex-end">
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<VisibilityIcon />}
                          onClick={() => onViewDetails(app)}
                        >
                          Details
                        </Button>

                        {canBeProcessed ? (
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => setProcessTarget(app)}
                            disabled={isPending}
                          >
                            Process
                          </Button>
                        ) : (
                          <Tooltip
                            title={
                              !canProcess
                                ? 'Requires Senior Officer role'
                                : 'Application is not in a processable state'
                            }
                          >
                            <span>
                              <Button
                                size="small"
                                variant="contained"
                                startIcon={<EditIcon />}
                                disabled
                              >
                                Process
                              </Button>
                            </span>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ProcessDialog
        application={processTarget}
        open={processTarget !== null}
        onClose={() => setProcessTarget(null)}
        onConfirm={handleProcessConfirm}
      />

      <Snackbar
        open={mutationError !== null}
        autoHideDuration={5000}
        onClose={onClearMutationError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={onClearMutationError} variant="filled">
          {mutationError}
        </Alert>
      </Snackbar>
    </>
  );
};
