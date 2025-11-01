
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SiteData, Language } from '../types';
import { initialDb } from '../data/db';

interface AppState {
  siteData: SiteData;
  language: Language;
}

interface AppContextType {
  state: AppState;
  setLanguage: (lang: Language) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    siteData: initialDb,
    language: Language.FR,
  });

  const setLanguage = (lang: Language) => {
    setState(s => ({ ...s, language: lang }));
  };
  
  return (
    <AppContext.Provider value={{ state, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
