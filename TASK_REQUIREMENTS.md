# Senior React Engineer Assessment: Financial Loan Management System

**Duration:** 4-5 hours total (3 hours core + 1-2 hours for chosen optional)  
**Stack:** React + TypeScript + Apollo Client + MUI (free tier)  
**Context:** Building a module for a financial system with permissions and sensitive data

## Assessment Structure

Complete the Core Requirements first, then choose ONE optional module that best showcases your expertise.

---

## PART A: Core Requirements (3 hours)

### Context

You're building a loan application dashboard for financial officers. The system handles sensitive data and has basic role-based permissions.

### User Roles

Two roles are provided with different permission levels:

```typescript
enum UserRole {
  LOAN_OFFICER = 'LOAN_OFFICER',      // Can view and process applications
  SENIOR_OFFICER = 'SENIOR_OFFICER'   // Can view, process, and access sensitive data
}
```

A role switcher is provided in the starter code for testing different access levels.

### 1. Application List View

Create a table displaying loan applications with the following columns:

| Column | Type | Required Features |
|--------|------|------------------|
| Applicant Name | string | Sortable |
| Loan Amount | number | Sortable, formatted as GBP currency |
| Risk Score | number | Colour-coded (red/amber/green), sortable |
| Status | enum | Filterable dropdown |
| Submitted Date | date | Sortable, relative time display |
| Actions | buttons | View Details, Process (if permitted) |

**Required Functionality:**
- Client-side sorting (at least 3 columns)
- Status filter dropdown (Pending/Approved/Rejected/Under Review/All)
- Search by applicant name
- Loading states with MUI Skeleton
- Empty state when no results
- Responsive design (mobile-friendly)

### 2. Application Detail Modal

Clicking "View Details" opens a modal with:

**Basic Information Tab:**
- Applicant details (name, email, phone)
- Loan amount and purpose
- Term length (months)
- Monthly payment calculation

**Financial Information Tab:**
- Annual income
- Credit score  
- Debt-to-income ratio
- Employment status
- Risk score with breakdown

**Sensitive Data Handling:**

Only `SENIOR_OFFICER` can see unmasked sensitive fields:
- National Insurance Number
- Full Date of Birth
- Bank Account Details

For `LOAN_OFFICER`, these fields should show masked values only (e.g., "****3456").

### 3. Risk Score Implementation

Implement the risk scoring system (0-10 scale):
- Use the provided `calculateRiskScore()` function in `utils/risk.ts`
- Display the score with colour coding:
  - 0-3: Green (LOW)
  - 4-7: Amber (MEDIUM)  
  - 8-10: Red (HIGH)
- Show the breakdown of factors contributing to the score

### 4. State Management Implementation

**Required: Implement AND document your state management approach**

You must handle:
- Server state (from GraphQL)
- UI state (filters, sorting, selection)
- Computed/derived state
- Loading and error states

**Required Implementations:**
1. **Optimistic Update**: Implement status change with rollback on error
2. **Filter Persistence**: Maintain filter state through page refresh
3. **Cache Update**: After mutation, update list without refetching

**Required Documentation:**

Create a `STATE_ARCHITECTURE.md` file explaining:
- Your state management approach and rationale
- Data flow for a complete user action
- Performance optimisations
- Trade-offs accepted

### 5. Permission-Based UI

- Hide/show UI elements based on current role
- Disable actions without permission (with tooltip explanation)
- Show lock icon next to restricted data
- Display current user role in header

### 6. Project Organisation

- Structure your code in a way that would scale to a 50+ component application
- Consider how a new developer would navigate your codebase
- Document your structure decisions in README.md

### Core Technical Requirements

**Must Have:**
- TypeScript with proper typing (no `any`)
- Error handling with user-friendly messages
- Loading states for all async operations
- Responsive design (mobile-friendly)
- Clean, logical folder structure (your choice - document it)
- At least one custom hook
- Proper React patterns (memo, useCallback where appropriate)
- Inline comments for complex state logic

**Deliverables for Core:**
- Working application
- README with setup instructions and architecture explanation
- STATE_ARCHITECTURE.md as specified above

---

## PART B: Optional Modules (Choose ONE)

Select the module that best demonstrates your strengths:

### Option 1: Advanced Permission System & Audit Trail

**Focus:** Security, audit compliance, complex state management

**Minimum Viable Implementation (all required):**
- Add 2 additional roles (AUDITOR read-only, BRANCH_MANAGER full access)  
- Implement field-level unmasking with logging (at least 2 sensitive fields)  
- Show activity timeline in detail view (last 5 actions)  
- Bulk select and approve/reject (at least 3 at once)  
- Document security decisions in SECURITY.md

**If Time Permits:**
- Session timeout warning
- Re-authentication for sensitive operations
- Export audit log
- Role-based approval limits

**Success Criteria:** Core features work with clear audit trail visible

---

### Option 2: Complex Data Visualisation & Analytics

**Focus:** Data presentation, performance, complex calculations

**Minimum Viable Implementation (all required):**
- 3 summary cards with calculated metrics  
- 2 interactive charts (e.g., risk distribution, approvals over time)  
- Advanced filtering with at least 3 filter types  
- Virtual scrolling for the main table (use react-window)  
- Document performance decisions in PERFORMANCE.md

**If Time Permits:**
- Saved filter combinations
- URL-based filter state
- Export to CSV
- Drill-down interactions

**Success Criteria:** Charts render with real data and demonstrate measurable performance improvement

---

### Option 3: Real-Time Collaboration Features

**Focus:** WebSocket/subscription patterns, optimistic UI, conflict resolution

**Minimum Viable Implementation (all required):**
- Mock subscription for application updates (polling every 5 seconds is acceptable)  
- "Claim" system showing who's viewing what  
- Optimistic update with rollback for at least 2 operations  
- Simple activity feed (last 10 actions)  
- Document conflict handling in REALTIME.md

**If Time Permits:**
- Presence indicators
- Offline queue
- Conflict resolution UI
- Push notifications

**Success Criteria:** Updates from simulated "other users" are visible with working optimistic UI

---

### Option 4: Advanced Testing & Developer Experience

**Focus:** Testing strategies, developer tooling, documentation

**Minimum Viable Implementation (all required):**
- 5 unit tests for permission/business logic  
- 2 integration tests for user workflows  
- Storybook for 3 key components  
- Mock data generator with realistic patterns  
- Document testing strategy in TESTING.md

**If Time Permits:**
- Error boundary tests
- Performance benchmarks
- API documentation
- Visual regression tests

**Success Criteria:** Tests pass, Storybook runs, and clear testing patterns are demonstrated

---

## Evaluation Criteria

### Core Tasks (60% weight):
- TypeScript usage and type safety (10%)
- Component architecture (10%)
- State management implementation (15%)
- Permission implementation (10%)
- GraphQL integration (10%)
- Code quality and patterns (5%)

### Optional Module (40% weight):
- Depth of implementation (15%)
- Problem-solving approach (10%)
- Code quality in complex scenarios (10%)
- Documentation and reasoning (5%)

## Final Deliverables

1. **ZIP File** containing:
   - Complete implementation
   - All source code
   - package.json with any added dependencies

2. **README.md** including:
   - Setup and run instructions
   - Which optional module you chose and why
   - Architecture and organisation explanation:
     - Your folder structure
     - Why this organisation was chosen
     - How it would scale to 100+ components
     - Where new features would be added
   - List of assumptions made
   - Production checklist (what's missing for real deployment)

3. **STATE_ARCHITECTURE.md** (required):
   - State management approach and rationale
   - Data flow diagram or description
   - Performance decisions
   - Trade-offs accepted

4. **Documentation for optional module:**
   - Named according to the module chosen (SECURITY.md, PERFORMANCE.md, REALTIME.md, or TESTING.md)
   - Technical approach taken
   - Challenges and solutions
   - Alternative approaches considered

## Guidelines

- Complete core requirements before starting optional module
- Choose the optional module that best showcases your expertise
- If running short on time, document what you would implement
- Comment complex logic, especially in the optional module
- Show your thought process through commits and documentation
- Focus on clean, working code rather than trying to implement everything

## Common Pitfalls to Avoid

1. Putting everything in App.tsx instead of creating proper components
2. Using TypeScript `any` type instead of proper typing
3. Missing error handling and loading states
4. Forgetting mobile responsiveness
5. Over-engineering simple requirements
6. Insufficient documentation

## Out of Scope

- Real backend/API integration
- Authentication implementation
- Real encryption
- File uploads
- Email notifications
- Payment processing
- Real WebSocket connections (mock them instead)

## Submission Instructions

1. ZIP your completed project
2. Name it: `loan-dashboard-[yourname].zip`
3. Ensure it includes all deliverables listed above
4. Submit by the specified deadline

Make reasonable assumptions where necessary and document them in your README.