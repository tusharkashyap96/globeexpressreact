import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock admin user for demo purposes
const mockAdminUser = {
  id: 'admin123',
  email: 'admin@globeexpresslogistics.com',
  name: 'Admin User',
  role: 'admin',
  avatar: null
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(mockAdminUser);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    // Mock login - always succeeds for demo
    setCurrentUser(mockAdminUser);
    return { user: mockAdminUser, token: 'mock-token' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isAdmin = currentUser?.role === 'admin';

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    isAdmin,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}