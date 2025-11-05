
import React from 'react';
import LandingPage from './pages/LandingPage';
// FIX: Import components for routing
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import { useAppContext } from './contexts/AppContext';

const App: React.FC = () => {
  // FIX: Add routing logic based on context state
  const { state } = useAppContext();
  const { route, isAuthenticated } = state;

  if (route.startsWith('/admin')) {
    if (isAuthenticated) {
      return <AdminDashboard />;
    }
    return <LoginPage />;
  }
  
  // Default to landing page for any other route
  return <LandingPage />;
};

export default App;
