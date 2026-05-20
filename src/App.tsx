import { useState, useCallback } from 'react';
import { Container, Typography, Box, Alert, Grid } from '@mui/material';
import { useLoanApplications } from './hooks/useLoanApplications';
import { formatCurrency } from './utils/formatting';
import { useAuth } from './contexts';
import {
  RoleSwitcher,
  LoanSummaryCard,
  ApplicationTable,
  ApplicationDetailModal,
  MetricsCharts,
} from './components';
import { LoanApplication } from './types';

function App() {
  const { currentUser } = useAuth();
  const {
    applications,
    loading,
    filters,
    setFilters,
    sortConfig,
    setSortConfig,
    updateStatus,
    mutationError,
    clearMutationError,
    statusOverrides,
  } = useLoanApplications();

  const [selectedApplication, setSelectedApplication] =
    useState<LoanApplication | null>(null);

  // Both roles can view details and process
  const canProcess = true;

  const totalApplications = applications.length;
  const pendingCount = applications.filter(
    (app) => app.status === 'PENDING',
  ).length;
  const approvedCount = applications.filter(
    (app) => app.status === 'APPROVED',
  ).length;
  const totalValue = applications.reduce((sum, app) => sum + app.amount, 0);

  const handleViewDetails = useCallback((app: LoanApplication) => {
    setSelectedApplication(app);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedApplication(null);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box py={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography variant="h4" component="h1">
              Loan Application Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser.name}
            </Typography>
          </Box>
          <RoleSwitcher />
        </Box>

        <Alert
          severity={currentUser.role === 'SENIOR_OFFICER' ? 'success' : 'info'}
          sx={{ mb: 3 }}
        >
          Logged in as <strong>{currentUser.role.replace('_', ' ')}</strong>
          {currentUser.role === 'LOAN_OFFICER' &&
            ' — sensitive fields are masked'}
          {currentUser.role === 'SENIOR_OFFICER' &&
            ' — full access to all data'}
        </Alert>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <LoanSummaryCard
              title="Total Applications"
              value={totalApplications}
              subtitle="Matching current filters"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LoanSummaryCard
              title="Pending Review"
              value={pendingCount}
              subtitle="Requires action"
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LoanSummaryCard
              title="Approved"
              value={approvedCount}
              subtitle="Successfully processed"
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LoanSummaryCard
              title="Total Value"
              value={formatCurrency(totalValue)}
              subtitle="Sum of filtered applications"
              color="secondary"
            />
          </Grid>
        </Grid>

        <MetricsCharts applications={applications} />

        <ApplicationTable
          applications={applications}
          loading={loading}
          filters={filters}
          sortConfig={sortConfig}
          mutationError={mutationError}
          statusOverrides={statusOverrides}
          onFiltersChange={setFilters}
          onSortChange={setSortConfig}
          onViewDetails={handleViewDetails}
          onUpdateStatus={updateStatus}
          onClearMutationError={clearMutationError}
          canProcess={canProcess}
        />

        <ApplicationDetailModal
          application={selectedApplication}
          open={selectedApplication !== null}
          onClose={handleCloseModal}
        />
      </Box>
    </Container>
  );
}

export default App;
