import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, AuthState, LoginCredentials } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'authState';
const REMEMBER_EMAIL_KEY = 'rememberedEmail';

const getStoredAuthState = (): AuthState => {
  const storedAuth = localStorage.getItem(STORAGE_KEY);
  if (storedAuth) {
    return JSON.parse(storedAuth);
  }
  return {
    isAuthenticated: false,
    user: null,
  };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(getStoredAuthState());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const login = async (credentials: { email: string; password: string }, rememberMe: boolean) => {
    // 演示用，直接通过登录
    if (rememberMe) {
      localStorage.setItem(REMEMBER_EMAIL_KEY, credentials.email);
    } else {
      localStorage.removeItem(REMEMBER_EMAIL_KEY);
    }

    // 模拟登录成功
    setAuthState({
      user: {
        email: credentials.email,
        name: '演示用户',
      },
      isAuthenticated: true,
    });
  };

  const logout = () => {
    const newAuthState = {
      isAuthenticated: false,
      user: null,
    };
    setAuthState(newAuthState);
    localStorage.removeItem(STORAGE_KEY);
    // Don't remove remembered email on logout
  };

  const getRememberedEmail = () => {
    return localStorage.getItem(REMEMBER_EMAIL_KEY) || '';
  };

  const register = async (data: { email: string; password: string; username: string }) => {
    // 演示用，直接通过注册
    return true;
  };

  const resetPassword = async (email: string) => {
    // 演示用，直接通过重置密码
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        register,
        resetPassword,
        getRememberedEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}