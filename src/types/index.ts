export interface LoanApplication {
  id: string
  applicantName: string
  email: string
  amount: number
  status: ApplicationStatus
  riskScore: number
  submittedAt: string
  creditScore: number
  annualIncome: number
  debtToIncomeRatio: number
  nationalInsurance: SensitiveField
  dateOfBirth: SensitiveField
  bankDetails: SensitiveField
  purpose: string
  termMonths: number
  employmentStatus: EmploymentStatus
}

export interface SensitiveField {
  masked: string
  value: string | null
  isRestricted: boolean
}

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW'
export type EmploymentStatus = 'EMPLOYED' | 'SELF_EMPLOYED' | 'UNEMPLOYED'
export type UserRole = 'LOAN_OFFICER' | 'SENIOR_OFFICER'

export interface RiskCalculation {
  score: number
  category: RiskCategory
  breakdown: RiskBreakdown
  calculatedAt: string
}

export interface RiskBreakdown {
  creditScoreImpact: number
  debtToIncomeImpact: number
  loanAmountImpact: number
  factors: RiskFactor[]
}

export interface RiskFactor {
  name: string
  value: number
  impact: number
  description: string
}

export type RiskCategory = 'LOW' | 'MEDIUM' | 'HIGH'

export interface ApplicationFilters {
  status?: ApplicationStatus
  searchTerm?: string
  minAmount?: number
  maxAmount?: number
  riskCategory?: RiskCategory
}