// src/App.tsx
import React from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Alert, 
  Paper,
  Grid 
} from '@mui/material'
import { RoleSwitcher } from './components/RoleSwitcher'
import { LoanSummaryCard } from './components/LoanSummaryCard'
import { useAuth } from './contexts/AuthContext'
import { useLoanApplications } from './hooks/useLoanApplications'
import { formatCurrency } from './utils/formatting'

function App() {
  const { currentUser } = useAuth()
  const { applications } = useLoanApplications()

  // Calculate summary statistics
  const totalApplications = applications.length
  const pendingCount = applications.filter(app => app.status === 'PENDING').length
  const approvedToday = applications.filter(app => {
    const today = new Date().toDateString()
    return app.status === 'APPROVED' && 
           new Date(app.submittedAt).toDateString() === today
  }).length
  const totalValue = applications.reduce((sum, app) => sum + app.amount, 0)

  return (
    <Container maxWidth="xl">
      <Box py={3}>
        {/* Header */}
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={3}
        >
          <Typography variant="h4" component="h1">
            Loan Application Dashboard
          </Typography>
          <RoleSwitcher />
        </Box>
        
        {/* Role Alert */}
        <Alert severity="info" sx={{ mb: 3 }}>
          Current Role: <strong>{currentUser.role}</strong>
          {currentUser.role === 'LOAN_OFFICER' && 
            ' - Limited access to sensitive data'}
          {currentUser.role === 'SENIOR_OFFICER' && 
            ' - Full access to all data'}
        </Alert>

        {/* Example Summary Cards - Shows component usage pattern */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Summary Statistics (Example)
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <LoanSummaryCard
                title="Total Applications"
                value={totalApplications}
                subtitle="All time"
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
                title="Approved Today"
                value={approvedToday}
                subtitle="Processed today"
                color="success"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <LoanSummaryCard
                title="Total Value"
                value={formatCurrency(totalValue)}
                subtitle="All applications"
                color="secondary"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Implementation Instructions */}
        <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom>
            Your Implementation Starts Here
          </Typography>
          <Typography paragraph>
            The starter kit is configured with:
          </Typography>
          <Box component="ul" sx={{ mt: 1 }}>
            <Typography component="li">
              20 mock loan applications loaded via the custom hook
            </Typography>
            <Typography component="li">
              Role-based data access (try switching roles)
            </Typography>
            <Typography component="li">
              Utility functions for risk calculation and formatting
            </Typography>
            <Typography component="li">
              TypeScript types for all data structures
            </Typography>
          </Box>
          <Typography sx={{ mt: 2 }}>
            <strong>Next Steps:</strong> Implement the application table below with sorting, 
            filtering, and detail modal as specified in the requirements.
          </Typography>
        </Paper>

        {/* Placeholder for Implementation */}
        <Paper sx={{ p: 3, minHeight: 400, backgroundColor: '#fafafa' }}>
          <Typography variant="h6" gutterBottom>
            Application Table
          </Typography>
          <Typography color="text.secondary">
            TODO: Implement your loan application table here
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Requirements:
            </Typography>
            <Box component="ul" sx={{ mt: 1 }}>
              <Typography variant="body2" component="li" color="text.secondary">
                Display applications in a sortable table
              </Typography>
              <Typography variant="body2" component="li" color="text.secondary">
                Add status filter dropdown
              </Typography>
              <Typography variant="body2" component="li" color="text.secondary">
                Implement search by applicant name
              </Typography>
              <Typography variant="body2" component="li" color="text.secondary">
                Show risk scores with color coding
              </Typography>
              <Typography variant="body2" component="li" color="text.secondary">
                Create detail modal on row click
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default App