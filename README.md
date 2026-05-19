# Loan Application Dashboard

A React + TypeScript dashboard for managing and reviewing loan applications

## Tech Stack

- **React 18** with TypeScript
- **Material UI v5** (MUI) for components and styling
- **Apollo Client** with mocked GraphQL responses
- **Vite** for bundling and dev server
- **react-window** for virtualised list rendering

## Features

### Role-Based Access Control

Two user roles are supported, switchable via the Role Switcher in the top-right corner:

| Role             | Access                                                                        |
| ---------------- | ----------------------------------------------------------------------------- |
| `LOAN_OFFICER`   | View applications; sensitive fields (NI number, DOB, bank details) are masked |
| `SENIOR_OFFICER` | Full access to all data including unmasked sensitive fields                   |

### Application Table

- Sortable columns: applicant name, loan amount, risk score, submission date
- Toolbar with live search (debounced) and status filter
- Status filter: `PENDING`, `APPROVED`, `REJECTED`, `UNDER_REVIEW`
- Filter and sort preferences persisted to `localStorage`

### Optimistic Status Updates

Updating an application's status applies immediately in the UI, then confirms or rolls back based on the simulated server response (~10% failure rate to demonstrate rollback behaviour).

### Application Detail Modal

Opens on row click with two tabs:

- **Basic Info** — applicant name, email, purpose, term, employment status, submission date
- **Financial Info** — loan amount, credit score, annual income, debt-to-income ratio, risk score, and role-gated sensitive fields (NI, DOB, bank details)

### Summary Cards

Four KPI cards at the top of the dashboard show totals for the current filtered view: total applications, pending count, approved count, and combined loan value.

## Project Structure

```
src/
├── components/
│   ├── ApplicationDetailModal/   # Detail modal with tabbed layout and sensitive field handling
│   ├── ApplicationTable/         # Sortable table, toolbar, and process dialog
│   ├── LoanSummaryCard/          # KPI summary card
│   ├── RiskScoreBadge/           # Colour-coded risk badge (LOW / MEDIUM / HIGH)
│   ├── RoleSwitcher/             # Role toggle component
│   └── StatusChip/               # Colour-coded status chip
├── contexts/
│   └── AuthContext/              # Auth context — current user and role switching
├── graphql/
│   ├── queries.ts                # GraphQL query definitions
│   ├── schema.graphql            # Schema
│   └── types.ts                  # Generated GraphQL types
├── hooks/
│   ├── useLoanApplications.ts    # Core data hook — filtering, sorting, optimistic updates
│   └── useDebounce.ts            # Debounce hook used by the search input
├── mocks/
│   ├── apolloMocks.tsx           # Apollo mock provider setup
│   └── mockData.ts               # Seed data for loan applications
├── types/
│   └── index.ts                  # Shared TypeScript types
└── utils/
    ├── formatting.ts             # Currency and date formatters
    └── risk.ts                   # Risk score calculation helpers
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other commands

```bash
npm run build        # Production build (tsc + vite)
npm run preview      # Preview the production build locally
npm run type-check   # TypeScript type-check without emitting files
```

## Key Design Decisions

- **Optimistic UI with rollback** — status changes appear instantly; a simulated 10% server failure rate triggers an automatic rollback with an error banner so the pattern is easy to observe.
- **localStorage persistence** — filters and sort order survive page refreshes without a backend.
- **Role masking at the data layer** — `useLoanApplications` strips sensitive field values for `LOAN_OFFICER` before the data reaches any component, so no component needs to make role checks for display logic.
- **Debounced search** — the search input is debounced via `useDebounce` to avoid unnecessary re-renders on every keystroke.
