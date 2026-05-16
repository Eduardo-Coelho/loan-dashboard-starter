import { gql } from '@apollo/client'

export const GET_APPLICATIONS = gql`
  query GetApplications($status: String, $searchTerm: String) {
    loanApplications(status: $status, searchTerm: $searchTerm) {
      id
      applicantName
      email
      amount
      status
      riskScore
      submittedAt
      creditScore
    }
  }
`

export const GET_APPLICATION_DETAIL = gql`
  query GetApplicationDetail($id: ID!) {
    loanApplication(id: $id) {
      id
      applicantName
      email
      amount
      status
      riskScore
      submittedAt
      creditScore
      annualIncome
      debtToIncomeRatio
      purpose
      termMonths
      employmentStatus
      nationalInsurance {
        masked
        value
        isRestricted
      }
      dateOfBirth {
        masked
        value
        isRestricted
      }
      bankDetails {
        masked
        value
        isRestricted
      }
    }
  }
`

export const UPDATE_APPLICATION_STATUS = gql`
  mutation UpdateApplicationStatus($id: ID!, $status: String!, $comment: String!) {
    updateApplicationStatus(id: $id, status: $status, comment: $comment) {
      id
      status
    }
  }
`