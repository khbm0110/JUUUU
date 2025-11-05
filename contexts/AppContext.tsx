
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { SiteData, Language } from '../types';
import { initialDb } from '../data/db';

interface AppState {
  siteData: SiteData;
  language: Language;
  // FIX: Added authentication and routing state
  isAuthenticated: boolean;
  route: string;
}

interface AppContextType {
  state: AppState;
  setLanguage: (lang: Language) => void;
  // FIX: Added authentication and navigation functions
  login: (password: string) => boolean;
  logout: () => void;
  navigate: (path: string) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

// This should be a secure secret stored in environment variables in a real application.
const ADMIN_PASSWORD = 'admin';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    siteData: initialDb,
    language: Language.FR,
    isAuthenticated: false,
    route: window.location.pathname,
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setState(s => ({ ...s, route: window.location.pathname }));
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setState(s => ({ ...s, language: lang }));
  };

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setState(s => ({ ...s, route: path }));
  };

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setState(s => ({ ...s, isAuthenticated: true }));
      navigate('/admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setState(s => ({ ...s, isAuthenticated: false }));
    navigate('/');
  };

  return (
    <AppContext.Provider value={{ state, setLanguage, login, logout, navigate }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
