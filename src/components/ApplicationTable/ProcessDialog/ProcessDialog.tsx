import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';
import { ApplicationStatus, LoanApplication } from '../../../types';
import { StatusChip } from '../../StatusChip';
import { STATUS_TRANSITIONS } from '../config';

type ProcessDialogProps = {
  application: LoanApplication | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (id: string, status: ApplicationStatus) => Promise<void>;
};

export const ProcessDialog = ({
  application,
  open,
  onClose,
  onConfirm,
}: ProcessDialogProps) => {
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | ''>(
    '',
  );
  const [loading, setLoading] = useState(false);

  const availableTransitions = application
    ? (STATUS_TRANSITIONS[application.status] ?? [])
    : [];

  const handleConfirm = async () => {
    if (!application || !selectedStatus) return;
    setLoading(true);
    await onConfirm(application.id, selectedStatus);
    setLoading(false);
    setSelectedStatus('');
    onClose();
  };

  const handleClose = () => {
    if (loading) return;
    setSelectedStatus('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Process Application</DialogTitle>
      <DialogContent>
        {application && (
          <>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {application.applicantName} — {application.id}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Current status: <StatusChip status={application.status} />
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel>New Status</InputLabel>
              <Select
                label="New Status"
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value as ApplicationStatus)
                }
              >
                {availableTransitions.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s.replace('_', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!selectedStatus || loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? 'Updating…' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
