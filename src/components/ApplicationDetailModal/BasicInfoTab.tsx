import React from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { LoanApplication } from '../../types';
import { formatCurrency } from '../../utils/formatting';
import { SensitiveDataField } from './SensitiveDataField';
import { calculateMonthlyPayment } from './config';

interface FieldRowProps {
  label: string;
  value: React.ReactNode;
}

const FieldRow: React.FC<FieldRowProps> = ({ label, value }) => (
  <Box>
    <Typography variant="caption" color="text.secondary" display="block">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={500}>
      {value}
    </Typography>
  </Box>
);

interface BasicInfoTabProps {
  application: LoanApplication;
}

export const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ application }) => {
  const monthlyPayment = calculateMonthlyPayment(
    application.amount,
    application.termMonths,
  );

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom sx={{ mb: 1.5 }}>
        Applicant Details
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <FieldRow label="Full Name" value={application.applicantName} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldRow label="Email Address" value={application.email} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SensitiveDataField
            label="Date of Birth"
            field={application.dateOfBirth}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SensitiveDataField
            label="National Insurance Number"
            field={application.nationalInsurance}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" gutterBottom sx={{ mb: 1.5 }}>
        Loan Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FieldRow
            label="Loan Amount"
            value={formatCurrency(application.amount)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldRow label="Purpose" value={application.purpose} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldRow
            label="Term Length"
            value={`${application.termMonths} months`}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldRow
            label="Estimated Monthly Payment"
            value={
              <Typography
                component="span"
                variant="body2"
                fontWeight={700}
                color="primary"
              >
                {formatCurrency(monthlyPayment)}
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SensitiveDataField
            label="Bank Account Details"
            field={application.bankDetails}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
