import { LoanApplication, RiskCalculation, RiskCategory, RiskBreakdown } from '../types'

export function calculateRiskScore(application: LoanApplication): RiskCalculation {
  const creditScoreImpact = ((850 - application.creditScore) / 550) * 3.5
  const debtToIncomeImpact = Math.min(application.debtToIncomeRatio * 10 * 0.35, 3.5)
  const loanAmountImpact = Math.min((application.amount / 500000) * 3, 3)
  
  const score = Math.min(creditScoreImpact + debtToIncomeImpact + loanAmountImpact, 10)

  let category: RiskCategory
  if (score <= 3) category = 'LOW'
  else if (score <= 7) category = 'MEDIUM'
  else category = 'HIGH'

  const breakdown: RiskBreakdown = {
    creditScoreImpact: Math.round(creditScoreImpact * 100) / 100,
    debtToIncomeImpact: Math.round(debtToIncomeImpact * 100) / 100,
    loanAmountImpact: Math.round(loanAmountImpact * 100) / 100,
    factors: [
      {
        name: 'Credit Score',
        value: application.creditScore,
        impact: creditScoreImpact,
        description: `Credit score of ${application.creditScore}`,
      },
      {
        name: 'Debt-to-Income Ratio',
        value: application.debtToIncomeRatio,
        impact: debtToIncomeImpact,
        description: `DTI ratio of ${(application.debtToIncomeRatio * 100).toFixed(1)}%`,
      },
      {
        name: 'Loan Amount',
        value: application.amount,
        impact: loanAmountImpact,
        description: `Loan amount of £${application.amount.toLocaleString()}`,
      },
    ],
  }

  return {
    score: Math.round(score * 10) / 10,
    category,
    breakdown,
    calculatedAt: new Date().toISOString(),
  }
}

export function getRiskCategoryColor(category: RiskCategory): string {
  switch (category) {
    case 'LOW': return '#4caf50'
    case 'MEDIUM': return '#ff9800'
    case 'HIGH': return '#f44336'
    default: return '#9e9e9e'
  }
}