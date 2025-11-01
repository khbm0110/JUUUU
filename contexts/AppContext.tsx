

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { SiteData, Language, Consultation, AppointmentRequest } from '../types';
import { initialDb } from '../data/db';

// Hardcoded password for demo purposes
const ADMIN_PASSWORD = '123456';

type Route = '/' | '/login' | '/admin';

interface AppState {
  siteData: SiteData;
  language: Language;
  route: Route;
  isAuthenticated: boolean;
}

interface AppContextType {
  state: AppState;
  setLanguage: (lang: Language) => void;
  navigate: (route: Route) => void;
  login: (password: string) => boolean;
  logout: () => void;
  addConsultation: (consultationData: Omit<Consultation, 'id' | 'date' | 'handled'>) => void;
  addAppointmentRequest: (appointmentData: Omit<AppointmentRequest, 'id' | 'date' | 'handled'>) => void;
  updateSiteData: (newData: SiteData) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    siteData: initialDb,
    language: Language.FR,
    route: window.location.pathname as Route || '/',
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
  });

  // Load data from localStorage on initial mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('siteData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Ensure consultations array exists for backward compatibility
        if (!parsedData.consultations) {
          parsedData.consultations = [];
        }
        // Ensure appointmentRequests array exists
        if (!parsedData.appointmentRequests) {
          parsedData.appointmentRequests = [];
        }
        setState(s => ({ ...s, siteData: parsedData }));
      }
    } catch (error) {
      console.error("Failed to load site data from localStorage", error);
      // If parsing fails, stick with initialDb
    }
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setState(s => ({ ...s, route: window.location.pathname as Route || '/' }));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);


  const setLanguage = (lang: Language) => {
    setState(s => ({ ...s, language: lang }));
  };
  
  const navigate = (route: Route) => {
    window.history.pushState({}, '', route);
    setState(s => ({ ...s, route }));
  };

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('isAuthenticated', 'true');
      setState(s => ({ ...s, isAuthenticated: true }));
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('isAuthenticated');
    setState(s => ({ ...s, isAuthenticated: false }));
    navigate('/');
  };
  
  const saveSiteData = (newSiteData: SiteData) => {
      try {
        localStorage.setItem('siteData', JSON.stringify(newSiteData));
        setState(s => ({ ...s, siteData: newSiteData }));
      } catch (error) {
        console.error("Failed to save site data to localStorage", error);
      }
  };

  const addConsultation = (consultationData: Omit<Consultation, 'id' | 'date' | 'handled'>) => {
      const newConsultation: Consultation = {
        ...consultationData,
        id: `c_${Date.now()}`,
        date: new Date().toISOString(),
        handled: false,
      };
      
      const newSiteData = JSON.parse(JSON.stringify(state.siteData));
      // Make sure consultations array exists
      if (!newSiteData.consultations) {
          newSiteData.consultations = [];
      }
      newSiteData.consultations.unshift(newConsultation); // Add to the top
      saveSiteData(newSiteData);
  };
  
  const addAppointmentRequest = (appointmentData: Omit<AppointmentRequest, 'id' | 'date' | 'handled'>) => {
    const newAppointment: AppointmentRequest = {
      ...appointmentData,
      id: `app_${Date.now()}`,
      date: new Date().toISOString(),
      handled: false,
    };
    
    const newSiteData = JSON.parse(JSON.stringify(state.siteData));
    if (!newSiteData.appointmentRequests) {
        newSiteData.appointmentRequests = [];
    }
    newSiteData.appointmentRequests.unshift(newAppointment);
    saveSiteData(newSiteData);
  };

  // This is used by the admin panel to save all changes
  const updateSiteData = (newData: SiteData) => {
      saveSiteData(newData);
  };

  return (
    <AppContext.Provider value={{ state, setLanguage, navigate, login, logout, addConsultation, addAppointmentRequest, updateSiteData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);