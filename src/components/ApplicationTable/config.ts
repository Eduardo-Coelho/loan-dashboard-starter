import { ApplicationStatus } from '../../types';
import { SortField } from '../../hooks/useLoanApplications';

export interface ColumnConfig {
  id: string;
  label: string;
  sortField?: SortField;
  align?: 'left' | 'right' | 'center';
  width?: number | string;
}

export const COLUMNS: ColumnConfig[] = [
  {
    id: 'applicantName',
    label: 'Applicant Name',
    sortField: 'applicantName',
    width: '20%',
  },
  {
    id: 'amount',
    label: 'Loan Amount',
    sortField: 'amount',
    align: 'right',
    width: '14%',
  },
  {
    id: 'riskScore',
    label: 'Risk Score',
    sortField: 'riskScore',
    align: 'center',
    width: '14%',
  },
  { id: 'status', label: 'Status', align: 'center', width: '14%' },
  {
    id: 'submittedAt',
    label: 'Submitted',
    sortField: 'submittedAt',
    width: '14%',
  },
  { id: 'actions', label: 'Actions', align: 'right', width: '24%' },
];

export interface StatusFilterOption {
  value: ApplicationStatus | '';
  label: string;
}

export const STATUS_FILTER_OPTIONS: StatusFilterOption[] = [
  { value: '', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'UNDER_REVIEW', label: 'Under Review' },
];

// Statuses that can still be processed (non-terminal)
export const PROCESSABLE_STATUSES: ApplicationStatus[] = [
  'PENDING',
  'UNDER_REVIEW',
];

// Valid transitions per current status
export const STATUS_TRANSITIONS: Partial<
  Record<ApplicationStatus, ApplicationStatus[]>
> = {
  PENDING: ['UNDER_REVIEW', 'APPROVED', 'REJECTED'],
  UNDER_REVIEW: ['APPROVED', 'REJECTED'],
};

export const SKELETON_ROW_COUNT = 6;
