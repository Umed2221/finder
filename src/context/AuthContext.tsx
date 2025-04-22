import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  isEmployer: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  name: string;
  isEmployer: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials with API
    // For demo, we'll simulate successful login
    
    // Mock users data (would come from API)
    const mockUsers: User[] = [
      {
        id: 1,
        username: 'user1',
        email: 'user@example.com',
        name: 'Иван Петров',
        isEmployer: false
      },
      {
        id: 2,
        username: 'employer1',
        email: 'employer@example.com',
        name: 'ООО "Технологии"',
        isEmployer: true
      }
    ];
    
    // Check if email exists and password matches (simplified)
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser) {
      throw new Error('Неверный email или пароль');
    }
    
    // In a real app, you would compare hashed passwords
    // For demo purposes, we'll skip password verification
    
    // Set the authenticated user
    setUser(foundUser);
    setIsAuthenticated(true);
    
    // Store user in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(foundUser));
    
    // Redirect to home page
    navigate('/');
  };

  // Register function
  const register = async (data: RegisterFormData) => {
    // In a real app, you would send registration data to API
    // For demo, we'll simulate successful registration
    
    const newUser: User = {
      id: Math.floor(Math.random() * 1000) + 3, // Generate random ID
      username: data.username,
      email: data.email,
      name: data.name,
      isEmployer: data.isEmployer
    };
    
    // Set the authenticated user
    setUser(newUser);
    setIsAuthenticated(true);
    
    // Store user in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(newUser));
    
    // Redirect to home page
    navigate('/');
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    navigate('/');
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};