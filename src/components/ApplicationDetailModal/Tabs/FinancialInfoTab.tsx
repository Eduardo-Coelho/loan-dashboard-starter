import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Divider,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import { LoanApplication } from '../../../types';
import { calculateRiskScore, getRiskCategoryColor } from '../../../utils/risk';
import { formatCurrency } from '../../../utils/formatting';
import { EMPLOYMENT_STATUS_LABELS, RISK_FACTOR_MAX } from '../config';
import { RiskScoreBadge } from '../../RiskScoreBadge';

type FieldRowProps = {
  label: string;
  value: React.ReactNode;
};

const FieldRow = ({ label, value }: FieldRowProps) => (
  <Box>
    <Typography variant="caption" color="text.secondary" display="block">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={500}>
      {value}
    </Typography>
  </Box>
);

type FinancialInfoTabProps = {
  application: LoanApplication;
};

export const FinancialInfoTab = ({ application }: FinancialInfoTabProps) => {
  const risk = calculateRiskScore(application);
  const riskColor = getRiskCategoryColor(risk.category);

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom sx={{ mb: 1.5 }}>
        Financial Details
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <FieldRow
            label="Annual Income"
            value={formatCurrency(application.annualIncome)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldRow
            label="Credit Score"
            value={`${application.creditScore} / 850`}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldRow
            label="Debt-to-Income Ratio"
            value={`${(application.debtToIncomeRatio * 100).toFixed(1)}%`}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldRow
            label="Employment Status"
            value={
              EMPLOYMENT_STATUS_LABELS[application.employmentStatus] ??
              application.employmentStatus
            }
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" gutterBottom sx={{ mb: 1.5 }}>
        Risk Assessment
      </Typography>

      <Box display="flex" alignItems="center" gap={1.5} sx={{ mb: 2 }}>
        <RiskScoreBadge
          score={risk.score}
          category={risk.category}
          showLabel={false}
        />
        <Typography variant="body1" fontWeight={700} color={riskColor}>
          {risk.score} / 10 — {risk.category} RISK
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {risk.breakdown.factors.map((factor) => (
          <Tooltip
            key={factor.name}
            title={`${factor.description} — contribution: ${factor.impact.toFixed(2)}`}
          >
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{ mb: 0.5 }}
              >
                <Typography variant="caption" color="text.secondary">
                  {factor.name}
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  color={riskColor}
                >
                  {factor.impact.toFixed(2)} / {RISK_FACTOR_MAX}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(factor.impact / RISK_FACTOR_MAX) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: `${riskColor}22`,
                  '& .MuiLinearProgress-bar': { backgroundColor: riskColor },
                }}
              />
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};
