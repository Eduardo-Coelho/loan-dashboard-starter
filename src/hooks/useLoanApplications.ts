import { useState, useMemo, useCallback } from 'react';
import {
  ApplicationFilters,
  ApplicationStatus,
  LoanApplication,
} from '../types';
import { useAuth } from '../contexts';
import { mockApplications } from '../__fixtures__/mockData';

const FILTER_STORAGE_KEY = 'loan-dashboard-filters';
const SORT_STORAGE_KEY = 'loan-dashboard-sort';

export type SortField =
  | 'applicantName'
  | 'amount'
  | 'riskScore'
  | 'submittedAt';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

interface StatusOverride {
  status: ApplicationStatus;
  isPending: boolean;
}

function applyRoleMasking(app: LoanApplication, role: string): LoanApplication {
  if (role === 'SENIOR_OFFICER') return app;
  return {
    ...app,
    nationalInsurance: { ...app.nationalInsurance, value: null },
    dateOfBirth: { ...app.dateOfBirth, value: null },
    bankDetails: { ...app.bankDetails, value: null },
  };
}

function sortApplications(
  apps: LoanApplication[],
  sort: SortConfig,
): LoanApplication[] {
  return [...apps].sort((a, b) => {
    const dir = sort.direction === 'asc' ? 1 : -1;
    switch (sort.field) {
      case 'applicantName':
        return dir * a.applicantName.localeCompare(b.applicantName);
      case 'amount':
        return dir * (a.amount - b.amount);
      case 'riskScore':
        return dir * (a.riskScore - b.riskScore);
      case 'submittedAt':
        return (
          dir *
          (new Date(a.submittedAt).getTime() -
            new Date(b.submittedAt).getTime())
        );
      default:
        return 0;
    }
  });
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

// Simulates a network mutation — 10% failure rate to demonstrate optimistic rollback
async function simulateStatusMutation(
  _id: string,
  _status: ApplicationStatus,
): Promise<void> {
  return new Promise<void>((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(
          new Error('Server error: status update failed. Changes rolled back.'),
        );
      } else {
        resolve();
      }
    }, 800),
  );
}

export function useLoanApplications(initialFilters?: ApplicationFilters) {
  const { currentUser } = useAuth();

  const [filters, setFiltersRaw] = useState<ApplicationFilters>(() =>
    loadFromStorage(FILTER_STORAGE_KEY, initialFilters ?? {}),
  );

  const [sortConfig, setSortConfigRaw] = useState<SortConfig>(() =>
    loadFromStorage(SORT_STORAGE_KEY, {
      field: 'submittedAt' as SortField,
      direction: 'desc' as SortDirection,
    }),
  );

  // Keyed by application id — tracks both optimistic and confirmed overrides
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, StatusOverride>
  >({});
  const [mutationError, setMutationError] = useState<string | null>(null);

  const setFilters = useCallback((newFilters: ApplicationFilters) => {
    setFiltersRaw(newFilters);
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(newFilters));
  }, []);

  const setSortConfig = useCallback((newSort: SortConfig) => {
    setSortConfigRaw(newSort);
    localStorage.setItem(SORT_STORAGE_KEY, JSON.stringify(newSort));
  }, []);

  const applications = useMemo(() => {
    let data = mockApplications.map((app) => {
      const masked = applyRoleMasking(app, currentUser.role);
      const override = statusOverrides[app.id];
      return override ? { ...masked, status: override.status } : masked;
    });

    if (filters.status) {
      data = data.filter((app) => app.status === filters.status);
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      data = data.filter((app) =>
        app.applicantName.toLowerCase().includes(term),
      );
    }
    if (filters.minAmount !== undefined) {
      data = data.filter((app) => app.amount >= filters.minAmount!);
    }
    if (filters.maxAmount !== undefined) {
      data = data.filter((app) => app.amount <= filters.maxAmount!);
    }

    return sortApplications(data, sortConfig);
  }, [filters, sortConfig, statusOverrides, currentUser.role]);

  const updateStatus = useCallback(
    async (id: string, newStatus: ApplicationStatus): Promise<void> => {
      const previousStatus =
        statusOverrides[id]?.status ??
        mockApplications.find((a) => a.id === id)?.status;

      setMutationError(null);

      // Optimistic update — immediately reflect the change in the UI
      setStatusOverrides((prev) => ({
        ...prev,
        [id]: { status: newStatus, isPending: true },
      }));

      try {
        await simulateStatusMutation(id, newStatus);
        // Commit: mark as no longer pending
        setStatusOverrides((prev) => ({
          ...prev,
          [id]: { status: newStatus, isPending: false },
        }));
      } catch (err) {
        // Rollback to previous status
        setStatusOverrides((prev) => {
          const next = { ...prev };
          if (previousStatus !== undefined) {
            next[id] = { status: previousStatus, isPending: false };
          } else {
            delete next[id];
          }
          return next;
        });
        setMutationError(
          err instanceof Error ? err.message : 'Status update failed',
        );
      }
    },
    [statusOverrides],
  );

  const clearMutationError = useCallback(() => setMutationError(null), []);

  return {
    applications,
    loading: false,
    error: null,
    filters,
    setFilters,
    sortConfig,
    setSortConfig,
    updateStatus,
    mutationError,
    clearMutationError,
    statusOverrides,
  };
}
