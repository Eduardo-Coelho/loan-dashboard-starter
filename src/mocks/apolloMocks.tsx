import { MockedProvider } from '@apollo/client/testing'
import { GET_APPLICATIONS, GET_APPLICATION_DETAIL } from '../graphql/queries'
import { mockApplications } from './mockData'
import { useAuth } from '../contexts/AuthContext'
import React from 'react'

export const createMocksForRole = (userRole: string) => [
  {
    request: {
      query: GET_APPLICATIONS,
      variables: {},
    },
    result: () => ({
      data: {
        loanApplications: mockApplications.map(app => ({
          ...app,
          nationalInsurance: {
            ...app.nationalInsurance,
            value: userRole === 'SENIOR_OFFICER' ? app.nationalInsurance.value : null,
          },
          dateOfBirth: {
            ...app.dateOfBirth,
            value: userRole === 'SENIOR_OFFICER' ? app.dateOfBirth.value : null,
          },
          bankDetails: {
            ...app.bankDetails,
            value: userRole === 'SENIOR_OFFICER' ? app.bankDetails.value : null,
          },
        })),
      },
    }),
  },
]

export const MockedApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth()
  const mocks = createMocksForRole(currentUser.role)
  
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  )
}