import { LoanApplication } from '../types'

const firstNames = ['James', 'Emma', 'Oliver', 'Sophie', 'William', 'Charlotte', 'Thomas', 'Emily']
const lastNames = ['Smith', 'Jones', 'Williams', 'Brown', 'Taylor', 'Davies', 'Wilson', 'Evans']
const purposes = ['Home Purchase', 'Home Improvement', 'Debt Consolidation', 'Business Expansion', 'Vehicle Purchase', 'Education']

function generateNI(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const prefix = letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)]
  const numbers = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
  const suffix = letters[Math.floor(Math.random() * 26)]
  return `${prefix}${numbers}${suffix}`
}

function generateApplication(index: number): LoanApplication {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const ni = generateNI()
  const creditScore = Math.floor(Math.random() * 550) + 300
  const annualIncome = Math.floor(Math.random() * 150000) + 20000
  const amount = Math.floor(Math.random() * 490000) + 10000
  const debtToIncomeRatio = Math.random() * 0.6
  
  const creditScoreFactor = ((850 - creditScore) / 550) * 3.5
  const dtiFactor = debtToIncomeRatio * 10 * 0.35
  const amountFactor = Math.min((amount / 500000) * 3, 3)
  const riskScore = Math.min(creditScoreFactor + dtiFactor + amountFactor, 10)

  return {
    id: `APP-2024-${(index + 1).toString().padStart(5, '0')}`,
    applicantName: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.co.uk`,
    amount,
    status: ['PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW'][Math.floor(Math.random() * 4)] as any,
    riskScore: Math.round(riskScore * 10) / 10,
    submittedAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
    nationalInsurance: {
      masked: `${ni.slice(0, 2)}****${ni.slice(-2)}`,
      value: ni,
      isRestricted: true,
    },
    dateOfBirth: {
      masked: '**/**/19**',
      value: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/19${Math.floor(Math.random() * 40) + 60}`,
      isRestricted: true,
    },
    bankDetails: {
      masked: '****-****-****-1234',
      value: '1234-5678-9012-1234',
      isRestricted: true,
    },
    creditScore,
    annualIncome,
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 100) / 100,
    purpose: purposes[Math.floor(Math.random() * purposes.length)],
    termMonths: [12, 24, 36, 48, 60, 84, 120][Math.floor(Math.random() * 7)],
    employmentStatus: ['EMPLOYED', 'SELF_EMPLOYED', 'UNEMPLOYED'][Math.floor(Math.random() * 3)] as any,
  }
}

export const mockApplications = Array.from({ length: 20 }, (_, i) => generateApplication(i))

// Add specific test cases
mockApplications[0].amount = 500000
mockApplications[0].riskScore = 9.5
mockApplications[0].status = 'PENDING'

mockApplications[1].amount = 10000
mockApplications[1].riskScore = 1.2
mockApplications[1].status = 'APPROVED'

mockApplications[2].submittedAt = new Date().toISOString()
mockApplications[3].submittedAt = new Date(Date.now() - 86400000).toISOString()