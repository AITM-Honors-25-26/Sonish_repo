import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { registerRequest, loginRequest, getMeRequest } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, if a token exists, verify it and hydrate the user
  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await getMeRequest();
        setUser(data.data.user);
      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  const register = useCallback(async (payload) => {
    const { data } = await registerRequest(payload);
    localStorage.setItem('token', data.data.token);
    setUser(data.data.user);
    return data;
  }, []);

  const login = useCallback(async (payload) => {
    const { data } = await loginRequest(payload);
    localStorage.setItem('token', data.data.token);
    setUser(data.data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
