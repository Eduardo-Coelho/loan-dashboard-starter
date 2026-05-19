// Monthly payment uses standard amortisation: P * [r(1+r)^n] / [(1+r)^n - 1]
const ANNUAL_INTEREST_RATE = 0.055; // 5.5% APR

export function calculateMonthlyPayment(
  principal: number,
  termMonths: number,
): number {
  const r = ANNUAL_INTEREST_RATE / 12;
  if (r === 0) return principal / termMonths;
  const factor = Math.pow(1 + r, termMonths);
  return (principal * (r * factor)) / (factor - 1);
}

export interface TabConfig {
  id: string;
  label: string;
}

export const DETAIL_TABS: TabConfig[] = [
  { id: 'basic', label: 'Basic Information' },
  { id: 'financial', label: 'Financial Information' },
];

export const EMPLOYMENT_STATUS_LABELS: Record<string, string> = {
  EMPLOYED: 'Employed',
  SELF_EMPLOYED: 'Self-Employed',
  UNEMPLOYED: 'Unemployed',
};

// Risk score thresholds for breakdown bar widths (max impact per factor)
export const RISK_FACTOR_MAX = 3.5;
