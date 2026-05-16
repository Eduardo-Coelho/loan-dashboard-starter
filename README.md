# Loan Dashboard Assessment - Starter Kit

## Quick Start

1. Extract this ZIP file
2. Open a terminal in the extracted directory
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open http://localhost:5173 in your browser

## Assessment Overview

**Duration:** 4-5 hours (3 hours core + 1-2 hours optional module)

**Objective:** Build a loan application dashboard with role-based permissions and sensitive data handling.

## Documentation

- **TASK_REQUIREMENTS.md** - Complete assessment requirements and evaluation criteria
- **STARTER_KIT_CONTENTS.md** - Documentation of all provided code and utilities

## What's Provided

### Working Features
- Role switching between LOAN_OFFICER and SENIOR_OFFICER
- 20 mock loan applications with realistic data
- Example component (LoanSummaryCard) showing expected patterns
- Risk calculation utilities
- Currency and date formatting functions
- TypeScript types for all data structures
- Custom hook example for data fetching

### Technology Stack
- React 18 with TypeScript
- Material-UI (MUI) for components
- Apollo Client for GraphQL (mocked)
- Vite for build tooling

## Project Structure

```
src/
├── components/       # UI components (RoleSwitcher, LoanSummaryCard)
├── contexts/        # Auth context for role management
├── hooks/           # Custom React hooks
├── mocks/           # Mock data and Apollo mocks
├── types/           # TypeScript type definitions
├── utils/           # Utility functions (risk, formatting)
└── App.tsx          # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run type-check` - Check TypeScript types

## Getting Started

1. Review the requirements in TASK_REQUIREMENTS.md
2. The application will load with example summary cards
3. Your implementation should replace the "Application Table" placeholder
4. Use the provided utilities and components as needed
5. Test with both LOAN_OFFICER and SENIOR_OFFICER roles

## Key Implementation Areas

### Core Requirements (Required)
1. Application list table with sorting and filtering
2. Application detail modal
3. Risk score display with color coding
4. Permission-based UI (sensitive data handling)
5. State management documentation

### Optional Modules (Choose One)
- Advanced Permission System & Audit Trail
- Complex Data Visualisation & Analytics
- Real-Time Collaboration Features
- Advanced Testing & Developer Experience

## Important Notes

- Mock data is static and resets on page refresh
- Role switching immediately affects data visibility
- Sensitive fields return `null` for LOAN_OFFICER role
- All TypeScript types are in `src/types/index.ts`
- Use the provided utilities rather than creating your own

## Troubleshooting

**Build errors:** Ensure you're using Node.js 16+ and npm 7+

**Mock data not loading:** Check the browser console and ensure the `useLoanApplications` hook is imported correctly

**TypeScript errors:** Use the provided types from `src/types/index.ts`

## Submission

1. Complete the core requirements and one optional module
2. Document your approach in the required markdown files
3. ZIP your entire project directory
4. Name it: `loan-dashboard-[yourname].zip`
5. Submit by the specified deadline

---

For detailed requirements and evaluation criteria, see TASK_REQUIREMENTS.md