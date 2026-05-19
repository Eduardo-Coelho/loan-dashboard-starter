import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoanApplication } from '../../types';
import { StatusChip } from '../StatusChip';
import { DETAIL_TABS } from './config';
import { BasicInfoTab, FinancialInfoTab } from './Tabs';

type ApplicationDetailModalProps = {
  application: LoanApplication | null;
  open: boolean;
  onClose: () => void;
};

export const ApplicationDetailModal = ({
  application,
  open,
  onClose,
}: ApplicationDetailModalProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Reset tab when a new application is opened
  const handleEnter = () => setActiveTab(0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionProps={{ onEnter: handleEnter }}
    >
      {application && (
        <>
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pb: 1,
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {application.applicantName}
              </Typography>
              <Chip
                label={application.id}
                size="small"
                variant="outlined"
                sx={{ ml: 1.5, fontSize: '0.7rem' }}
              />
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <StatusChip status={application.status} />
              <IconButton size="small" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              {DETAIL_TABS.map((tab) => (
                <Tab key={tab.id} label={tab.label} />
              ))}
            </Tabs>
          </Box>

          <DialogContent sx={{ pt: 3 }}>
            {activeTab === 0 && <BasicInfoTab application={application} />}
            {activeTab === 1 && <FinancialInfoTab application={application} />}
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
