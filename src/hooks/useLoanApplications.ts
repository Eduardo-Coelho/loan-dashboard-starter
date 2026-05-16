import { useState, useMemo } from 'react'
import { ApplicationFilters, LoanApplication } from '../types'
import { mockApplications } from '../mocks/mockData'

export function useLoanApplications(initialFilters?: ApplicationFilters) {
  const [filters, setFilters] = useState<ApplicationFilters>(initialFilters || {})
  
  // For now, using mock data directly - candidates will integrate with Apollo
  const applications = useMemo(() => {
    let filtered = [...mockApplications]
    
    if (filters.status) {
      filtered = filtered.filter(app => app.status === filters.status)
    }
    
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(app => 
        app.applicantName.toLowerCase().includes(term) ||
        app.email.toLowerCase().includes(term)
      )
    }
    
    if (filters.minAmount) {
      filtered = filtered.filter(app => app.amount >= filters.minAmount!)
    }
    
    if (filters.maxAmount) {
      filtered = filtered.filter(app => app.amount <= filters.maxAmount!)
    }
    
    return filtered
  }, [filters])

  return {
    applications,
    loading: false,
    error: null,
    filters,
    setFilters,
  }
}