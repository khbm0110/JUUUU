import React from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import { useAppContext } from './contexts/AppContext';

const App: React.FC = () => {
  const { state, navigate } = useAppContext();
  const { page, isAuthenticated } = state;
  
  // Sync page state with browser URL on initial load.
  // This allows direct navigation to /login or /admin.
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    // Only navigate if path is for admin/login and state isn't already set.
    if (page === '/' && (currentPath === '/login' || currentPath === '/admin')) {
      navigate(currentPath);
    }
  }, []); // Empty dependency array means this runs once on mount.

  if (page === '/login' || page === '/admin') {
    return isAuthenticated ? <AdminDashboard /> : <LoginPage />;
  }
  
  return <LandingPage />;
};

export default App;