import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

type LoanSummaryCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
};

export const LoanSummaryCard = ({
  title,
  value,
  subtitle,
  trend,
  color = 'primary',
}: LoanSummaryCardProps) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom variant="overline">
          {title}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h4" component="div" color={`${color}.main`}>
            {value}
          </Typography>

          {trend && (
            <>
              {trend === 'up' && <TrendingUpIcon color="success" />}
              {trend === 'down' && <TrendingDownIcon color="error" />}
            </>
          )}
        </Box>

        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
