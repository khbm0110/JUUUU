

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SiteData, Language } from '../types';
import { initialDb } from '../data/db';

interface AppState {
  siteData: SiteData;
  language: Language;
  // FIX: Added state for authentication and navigation to support admin pages.
  isAuthenticated: boolean;
  page: string;
}

interface AppContextType {
  state: AppState;
  setLanguage: (lang: Language) => void;
  // FIX: Added methods required by LoginPage and AdminDashboard.
  login: (password: string) => boolean;
  logout: () => void;
  navigate: (page: string) => void;
  updateSiteData: (data: SiteData) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    siteData: initialDb,
    language: Language.FR,
    isAuthenticated: false,
    page: '/',
  });

  const setLanguage = (lang: Language) => {
    setState(s => ({ ...s, language: lang }));
  };
  
  // FIX: Implemented login, logout, navigate, and updateSiteData methods.
  const login = (password: string): boolean => {
    // This is a simplified login for demo purposes.
    if (password === '123456') {
      setState(s => ({ ...s, isAuthenticated: true }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setState(s => ({ ...s, isAuthenticated: false, page: '/' }));
  };

  const navigate = (page: string) => {
    setState(s => ({ ...s, page }));
  };
  
  const updateSiteData = (data: SiteData) => {
    setState(s => ({ ...s, siteData: data }));
  };

  return (
    <AppContext.Provider value={{ state, setLanguage, login, logout, navigate, updateSiteData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);