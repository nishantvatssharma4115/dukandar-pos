import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('resuai_token'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('resuai_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      localStorage.setItem('resuai_token', token);
    } else {
      localStorage.removeItem('resuai_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('resuai_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('resuai_user');
    }
  }, [user]);

  const handleAuthFlow = useCallback(async (authFn, payload) => {
    setIsLoading(true);
    setError('');
    try {
      const result = await authFn(payload);
      setToken(result.token);
      setUser(result.user);
      return result;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(''), []);

  const value = useMemo(
    () => ({
      token,
      user,
      isLoading,
      error,
      clearError,
      register: (payload) => handleAuthFlow(registerUser, payload),
      login: (payload) => handleAuthFlow(loginUser, payload),
      logout: () => {
        setToken(null);
        setUser(null);
      }
    }),
    [token, user, isLoading, error, handleAuthFlow, clearError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

