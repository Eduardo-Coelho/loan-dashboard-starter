import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ApplicationFilters, ApplicationStatus } from '../../types';
import { STATUS_FILTER_OPTIONS } from './config';
import { useDebounce } from '../../hooks/useDebounce';

interface ApplicationTableToolbarProps {
  filters: ApplicationFilters;
  onFiltersChange: (filters: ApplicationFilters) => void;
}

export const ApplicationTableToolbar: React.FC<
  ApplicationTableToolbarProps
> = ({ filters, onFiltersChange }) => {
  const [searchInput, setSearchInput] = useState(filters.searchTerm ?? '');
  const debouncedSearch = useDebounce(searchInput, 300);

  // Propagate debounced search to parent
  useEffect(() => {
    onFiltersChange({ ...filters, searchTerm: debouncedSearch || undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value ? (value as ApplicationStatus) : undefined,
    });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    onFiltersChange({ ...filters, searchTerm: undefined });
  };

  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      flexWrap="wrap"
      sx={{ mb: 2 }}
    >
      <TextField
        size="small"
        placeholder="Search by applicant name…"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        sx={{ minWidth: 240, flexGrow: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: searchInput ? (
            <InputAdornment position="end">
              <Tooltip title="Clear search">
                <IconButton size="small" onClick={handleClearSearch}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ) : null,
        }}
      />

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={filters.status ?? ''}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
