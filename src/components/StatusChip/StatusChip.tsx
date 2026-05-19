import React from 'react'
import { Chip } from '@mui/material'
import { ApplicationStatus } from '../../types'

interface StatusChipConfig {
  label: string
  color: 'default' | 'warning' | 'success' | 'error' | 'info'
}

const STATUS_CONFIG: Record<ApplicationStatus, StatusChipConfig> = {
  PENDING: { label: 'Pending', color: 'warning' },
  APPROVED: { label: 'Approved', color: 'success' },
  REJECTED: { label: 'Rejected', color: 'error' },
  UNDER_REVIEW: { label: 'Under Review', color: 'info' },
}

interface StatusChipProps {
  status: ApplicationStatus
  size?: 'small' | 'medium'
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'small' }) => {
  const config = STATUS_CONFIG[status]
  return <Chip label={config.label} color={config.color} size={size} />
}
