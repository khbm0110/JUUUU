

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { SiteData, Language } from '../types';
import { initialDb } from '../data/db';

interface AppState {
  siteData: SiteData;
  language: Language;
}

interface AppContextType {
  state: AppState;
  setLanguage: (lang: Language) => void;
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  navigate: (path: string) => void;
  updateSiteData: (data: SiteData) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    siteData: initialDb,
    language: Language.FR,
  });
  // Using sessionStorage to persist login state across reloads for a better demo experience.
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('isLoggedIn') === 'true');
  
  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  const setLanguage = (lang: Language) => {
    setState(s => ({ ...s, language: lang }));
  };

  const login = (password: string): boolean => {
    // This is a mock login. In a real app, you'd have a proper auth system.
    if (password === '123456') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navigate = (path: string) => {
    // This is a mock navigation. In a real app, you'd use a router like React Router.
    window.location.href = path;
  };

  const updateSiteData = (data: SiteData) => {
    setState(s => ({ ...s, siteData: data }));
    // Here you would also likely save the data to a backend.
    alert('Site data saved! (In a real app, this would be an API call)');
  };
  
  return (
    <AppContext.Provider value={{ state, setLanguage, isLoggedIn, login, logout, navigate, updateSiteData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);