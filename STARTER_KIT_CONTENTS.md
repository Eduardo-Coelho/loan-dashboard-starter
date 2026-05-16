# Starter Kit - Provided Code Documentation

This document contains all the mock code and utilities provided in the starter kit. These files are already included in your project.

## Quick Start

```bash
npm install
npm run dev
# Opens at http://localhost:5173
```

## Provided File Structure

```
loan-dashboard-starter/
├── package.json                 # Dependencies configured
├── tsconfig.json               # TypeScript configuration
├── tsconfig.node.json          # TypeScript node configuration
├── vite.config.ts             # Vite configuration
├── index.html                 # HTML entry point
└── src/
    ├── main.tsx               # Application entry point
    ├── App.tsx                # Main app component
    ├── vite-env.d.ts         # Vite environment types
    ├── types/
    │   └── index.ts          # Complete TypeScript types
    ├── mocks/
    │   ├── apolloMocks.tsx   # GraphQL mocks with role logic
    │   └── mockData.ts       # 20 sample applications
    ├── graphql/
    │   └── queries.ts        # Pre-written GraphQL queries
    ├── contexts/
    │   └── AuthContext.tsx   # Role management context
    ├── components/
    │   ├── RoleSwitcher.tsx  # Role switching UI
    │   └── LoanSummaryCard.tsx # Example component pattern
    ├── hooks/
    │   └── useLoanApplications.ts # Example custom hook
    └── utils/
        ├── risk.ts           # Risk calculation logic
        └── formatting.ts     # Currency & date formatters
```

---

## Core Configuration Files

### package.json

Contains all necessary dependencies:
- `@apollo/client` - GraphQL client
- `@mui/material` - UI components
- `react` and `react-dom` - React framework
- `react-window` - Virtual scrolling library
- TypeScript and development dependencies

### TypeScript Configuration

- `tsconfig.json` - Main TypeScript configuration
- `tsconfig.node.json` - Node-specific TypeScript configuration
- Strict mode enabled with proper React JSX support

### Vite Configuration

- Development server on port 5173
- Auto-opens browser on start
- React plugin configured

---

## Type System (src/types/index.ts)

### Core Types

```typescript
LoanApplication         // Main application data structure
SensitiveField         // Handles masked/unmasked sensitive data
ApplicationStatus      // PENDING | APPROVED | REJECTED | UNDER_REVIEW
EmploymentStatus       // EMPLOYED | SELF_EMPLOYED | UNEMPLOYED
UserRole              // LOAN_OFFICER | SENIOR_OFFICER
```

### Risk Types

```typescript
RiskCalculation       // Complete risk assessment result
RiskBreakdown        // Detailed breakdown of risk factors
RiskFactor          // Individual risk factor contribution
RiskCategory        // LOW | MEDIUM | HIGH
```

### Helper Types

```typescript
ApplicationFilters   // Filter options for application list
```

---

## Mock Data System

### Mock Data Generator (src/mocks/mockData.ts)

Provides 20 realistic UK loan applications with:
- Realistic UK names and email addresses
- Loan amounts from £10,000 to £500,000
- Credit scores from 300-850
- Risk scores calculated based on multiple factors
- Various statuses and submission dates

Special test cases:
- Application #1: £500,000 (max amount), 9.5 risk score
- Application #2: £10,000 (min amount), 1.2 risk score  
- Application #3: Submitted today
- Application #4: Submitted yesterday

### GraphQL Mocks (src/mocks/apolloMocks.tsx)

Role-based data access implementation:
- `createMocksForRole(userRole)` - Returns appropriate mocked responses
- Sensitive fields return `null` for `LOAN_OFFICER`
- Full data access for `SENIOR_OFFICER`

---

## GraphQL Queries (src/graphql/queries.ts)

Pre-written queries for use with Apollo Client:

- `GET_APPLICATIONS` - Fetch all applications with optional filters
- `GET_APPLICATION_DETAIL` - Fetch single application with full details
- `UPDATE_APPLICATION_STATUS` - Update application status mutation

Note: These are provided as reference. The mock data currently bypasses GraphQL for simplicity.

---

## Authentication Context (src/contexts/AuthContext.tsx)

Provides role management throughout the application:

```typescript
const { currentUser, switchRole } = useAuth()
```

- `currentUser` - Contains id, name, and role
- `switchRole(role)` - Updates the current user's role
- Must wrap components with `AuthProvider`

---

## Components

### RoleSwitcher (src/components/RoleSwitcher.tsx)

Pre-built dropdown for testing different roles:
- Switches between LOAN_OFFICER and SENIOR_OFFICER
- Automatically updates context
- Affects data visibility in mock responses

### LoanSummaryCard (src/components/LoanSummaryCard.tsx)

Example component demonstrating expected patterns:
- Proper TypeScript props interface
- MUI component usage
- Conditional rendering for trends
- Flexible color theming

Usage example:
```typescript
<LoanSummaryCard
  title="Total Applications"
  value={42}
  subtitle="All time"
  trend="up"
  color="primary"
/>
```

This component is provided as a pattern reference. Candidates should create similar components following this structure.

---

## Utility Functions

### Risk Calculation (src/utils/risk.ts)

```typescript
calculateRiskScore(application: LoanApplication): RiskCalculation
getRiskCategoryColor(category: RiskCategory): string
```

Risk score formula (0-10 scale):
- Credit Score Impact: (850 - creditScore) / 550 * 3.5
- Debt-to-Income Impact: debtToIncomeRatio * 10 * 0.35  
- Loan Amount Impact: min(amount / 500000 * 3, 3)

Categories:
- 0-3: LOW (green)
- 4-7: MEDIUM (amber)
- 8-10: HIGH (red)

### Formatting (src/utils/formatting.ts)

```typescript
formatCurrency(amount: number): string      // Returns "£50,000"
formatRelativeTime(dateString: string): string  // Returns "Today", "3 days ago", etc.
```

---

## Custom Hooks

### useLoanApplications (src/hooks/useLoanApplications.ts)

Example hook demonstrating data fetching pattern:

```typescript
const { 
  applications,  // Filtered applications
  loading,       // Loading state
  error,        // Error state
  filters,      // Current filters
  setFilters    // Update filters
} = useLoanApplications(initialFilters)
```

Currently uses mock data directly. Candidates should integrate with Apollo Client.

---

## How Role-Based Data Access Works

The system implements role-based field visibility:

### LOAN_OFFICER Access
```typescript
{
  nationalInsurance: {
    masked: "AB****56C",  // Always visible
    value: null,          // No access to real value
    isRestricted: true
  }
}
```

### SENIOR_OFFICER Access
```typescript
{
  nationalInsurance: {
    masked: "AB****56C",     // Always visible
    value: "AB123456C",      // Full access to real value
    isRestricted: true
  }
}
```

---

## Usage Examples

### Using the Custom Hook
```typescript
const { applications, loading, setFilters } = useLoanApplications({
  status: 'PENDING'
})
```

### Checking Permissions
```typescript
if (application.nationalInsurance.value === null) {
  // User lacks permission - show masked only
  return <span>{application.nationalInsurance.masked}</span>
} else {
  // User has permission - can show/unmask
  return <span>{application.nationalInsurance.value}</span>
}
```

### Risk Calculation
```typescript
const risk = calculateRiskScore(application)
const color = getRiskCategoryColor(risk.category)
```

### Formatting Values
```typescript
formatCurrency(50000)                    // "£50,000"
formatRelativeTime('2024-01-01T10:00:00Z')  // "3 days ago"
```

---

## Important Notes

1. **Mock data is static** - Changes won't persist on page refresh
2. **Role affects data immediately** - Switching roles updates data visibility
3. **TypeScript is strict** - No `any` types should be used in your implementation
4. **Utilities are tested** - Use the provided functions confidently
5. **Apollo Client is configured** - But mocks currently bypass it for simplicity

---

## Troubleshooting

### Mock data not displaying
- Check browser console for errors
- Ensure `useLoanApplications` hook is imported correctly
- Verify component is wrapped in necessary providers

### Role switching not affecting data
- Ensure components are using the `useAuth` hook
- Check that `AuthProvider` wraps your app

### TypeScript errors
- Use types from `src/types/index.ts`
- Don't modify provided type definitions
- Check for typos in property names

---

This documentation covers all provided code in the starter kit. Focus on building your features using these foundations.