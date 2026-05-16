import React from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'

export const RoleSwitcher: React.FC = () => {
  const { currentUser, switchRole } = useAuth()

  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel>Role</InputLabel>
      <Select
        value={currentUser.role}
        label="Role"
        onChange={(e) => switchRole(e.target.value as any)}
      >
        <MenuItem value="LOAN_OFFICER">Loan Officer</MenuItem>
        <MenuItem value="SENIOR_OFFICER">Senior Officer</MenuItem>
      </Select>
    </FormControl>
  )
}