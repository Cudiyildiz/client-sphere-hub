
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define user roles
export type UserRole = 'admin' | 'staff' | 'brand';

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Mock user data (In a real app, this would come from an API)
const MOCK_USERS = {
  admin: {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin' as UserRole,
  },
  staff: {
    id: 'staff-1',
    name: 'Staff User',
    email: 'staff@example.com',
    role: 'staff' as UserRole,
  },
  brand: {
    id: 'brand-1',
    name: 'Brand User',
    email: 'brand@example.com',
    role: 'brand' as UserRole,
  },
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('crm_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation (in real app, this would be a backend API call)
      if (email && password) {
        const mockUser = MOCK_USERS[role];
        if (mockUser && mockUser.email === email) {
          // Store user in local storage
          localStorage.setItem('crm_user', JSON.stringify(mockUser));
          setUser(mockUser);
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        throw new Error('Email and password are required');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('crm_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
