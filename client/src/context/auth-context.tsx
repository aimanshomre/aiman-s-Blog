import axios from "axios";
import React, { useContext, useEffect, useState, type ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const UserContext = React.createContext<AuthContextType | null>(null);

axios.defaults.withCredentials = true;

interface AuthProviderProps {
  children: ReactNode;
}
export const API_BASE_URL = "http://localhost:3001";
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/auth/me`);
      setUser(data.user);
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }
  const value = { user, loading, logout, checkAuth };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
