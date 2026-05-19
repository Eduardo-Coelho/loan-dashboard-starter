import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { SensitiveField } from '../../../types';

type SensitiveDataFieldProps = {
  label: string;
  field: SensitiveField;
};

export const SensitiveDataField = ({
  label,
  field,
}: SensitiveDataFieldProps) => {
  const isVisible = field.value !== null;
  const displayValue = isVisible ? field.value! : field.masked;

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" display="block">
        {label}
      </Typography>
      <Box display="flex" alignItems="center" gap={0.5}>
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{ fontFamily: isVisible ? 'inherit' : 'monospace' }}
        >
          {displayValue}
        </Typography>
        {!isVisible && (
          <Tooltip title="Restricted — Senior Officer access required">
            <LockIcon
              fontSize="inherit"
              color="disabled"
              sx={{ fontSize: 14 }}
            />
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};
