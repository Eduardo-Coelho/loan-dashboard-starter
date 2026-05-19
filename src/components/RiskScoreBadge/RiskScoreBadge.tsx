import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import { RiskCategory } from '../../types';
import { getRiskCategoryColor } from '../../utils/risk';

interface RiskScoreBadgeProps {
  score: number;
  category: RiskCategory;
  showLabel?: boolean;
}

export const RiskScoreBadge: React.FC<RiskScoreBadgeProps> = ({
  score,
  category,
  showLabel = true,
}) => {
  const color = getRiskCategoryColor(category);
  const label = showLabel ? `${score} ${category}` : String(score);

  return (
    <Tooltip title={`Risk: ${category} (${score}/10)`}>
      <Chip
        label={label}
        size="small"
        sx={{
          backgroundColor: `${color}22`,
          color: color,
          border: `1px solid ${color}`,
          fontWeight: 600,
          fontSize: '0.75rem',
        }}
      />
    </Tooltip>
  );
};
