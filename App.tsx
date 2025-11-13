
import React from 'react';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import { useAppContext } from './contexts/AppContext';

const App: React.FC = () => {
  const { state } = useAppContext();
  
  // FIX: Implement simple path-based routing to display the correct page
  // (LandingPage, LoginPage, or AdminDashboard) based on the URL and authentication state.
  // This makes the login and admin functionality accessible.
  const path = window.location.pathname;

  if (path.startsWith('/admin')) {
    return state.isAuthenticated ? <AdminDashboard /> : <LoginPage />;
  }
  
  // Default to landing page for all other paths
  return <LandingPage />;
};

export default App;
