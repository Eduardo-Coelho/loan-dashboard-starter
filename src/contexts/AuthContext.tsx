import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type UserRole = 'LOAN_OFFICER' | 'SENIOR_OFFICER';

interface User {
  id: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'user-1',
    name: 'Test User',
    role: 'LOAN_OFFICER',
  });

  const switchRole = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};