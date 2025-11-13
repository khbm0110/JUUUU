
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SiteData, Language } from '../types';
import { initialDb } from '../data/db';

interface AppState {
  siteData: SiteData;
  language: Language;
  // FIX: Added to track login state for the admin dashboard.
  isAuthenticated: boolean;
}

interface AppContextType {
  state: AppState;
  setLanguage: (lang: Language) => void;
  // FIX: Added for admin authentication.
  login: (password: string) => boolean;
  logout: () => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    siteData: initialDb,
    language: Language.FR,
    // FIX: Initialize authentication state.
    isAuthenticated: false,
  });

  const setLanguage = (lang: Language) => {
    setState(s => ({ ...s, language: lang }));
  };

  // FIX: Implement login and logout functions to manage authentication state.
  const login = (password: string): boolean => {
    // NOTE: This is a placeholder for a real authentication system.
    // In a real application, this password check would be handled by a secure backend service.
    if (password === 'adminPassword123!') {
      setState(s => ({ ...s, isAuthenticated: true }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setState(s => ({ ...s, isAuthenticated: false }));
  };


  return (
    <AppContext.Provider value={{ state, setLanguage, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
