import { useMemo } from 'react';
import { Grid, Paper } from '@mui/material';
import { LoanApplication } from '../../types';
import { calculateRiskScore } from '../../utils/risk';
import { PieChart, PieSegment } from '../PieChart';

type MetricsChartsProps = {
  applications: LoanApplication[];
};

const STATUS_SEGMENTS = [
  { status: 'PENDING', label: 'Pending', color: '#ed6c02' },
  { status: 'APPROVED', label: 'Approved', color: '#2e7d32' },
  { status: 'REJECTED', label: 'Rejected', color: '#d32f2f' },
  { status: 'UNDER_REVIEW', label: 'Under Review', color: '#0288d1' },
] as const;

const AMOUNT_BUCKETS = [
  { label: 'Under £50k', max: 50_000, color: '#5c6bc0' },
  { label: '£50k – £150k', max: 150_000, color: '#42a5f5' },
  { label: '£150k – £300k', max: 300_000, color: '#26c6da' },
  { label: 'Over £300k', max: Infinity, color: '#66bb6a' },
] as const;

const RISK_SEGMENTS = [
  { category: 'LOW', label: 'Low', color: '#4caf50' },
  { category: 'MEDIUM', label: 'Medium', color: '#ff9800' },
  { category: 'HIGH', label: 'High', color: '#f44336' },
] as const;

export const MetricsCharts = ({ applications }: MetricsChartsProps) => {
  const statusSegments = useMemo<PieSegment[]>(() => {
    const counts: Record<string, number> = {};
    applications.forEach((app) => {
      counts[app.status] = (counts[app.status] ?? 0) + 1;
    });
    return STATUS_SEGMENTS.map(({ status, label, color }) => ({
      label,
      value: counts[status] ?? 0,
      color,
    }));
  }, [applications]);

  const amountSegments = useMemo<PieSegment[]>(() => {
    const counts = new Array(AMOUNT_BUCKETS.length).fill(0) as number[];
    applications.forEach((app) => {
      const idx = AMOUNT_BUCKETS.findIndex((b) => app.amount < b.max);
      if (idx >= 0) counts[idx]++;
    });
    return AMOUNT_BUCKETS.map(({ label, color }, i) => ({
      label,
      value: counts[i],
      color,
    }));
  }, [applications]);

  const riskSegments = useMemo<PieSegment[]>(() => {
    const counts: Record<string, number> = { LOW: 0, MEDIUM: 0, HIGH: 0 };
    applications.forEach((app) => {
      const { category } = calculateRiskScore(app);
      counts[category]++;
    });
    return RISK_SEGMENTS.map(({ category, label, color }) => ({
      label,
      value: counts[category],
      color,
    }));
  }, [applications]);

  const charts = [
    { title: 'Application Status', segments: statusSegments },
    { title: 'Loan Amount Range', segments: amountSegments },
    { title: 'Risk Distribution', segments: riskSegments },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {charts.map(({ title, segments }) => (
        <Grid item xs={12} md={4} key={title}>
          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <PieChart title={title} segments={segments} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
