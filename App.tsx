import React from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import { useAppContext } from './contexts/AppContext';

const App: React.FC = () => {
  const { state, navigate } = useAppContext();
  const { route, isAuthenticated } = state;

  // Simple router to render pages based on the current route
  const renderPage = () => {
    if (route === '/admin') {
      // Protect the admin route
      if (isAuthenticated) {
        return <AdminDashboard />;
      } else {
        // Redirect to login if not authenticated
        navigate('/login');
        return <LoginPage />;
      }
    }

    if (route === '/login') {
      return <LoginPage />;
    }
    
    // Default to LandingPage for '/' or any other unrecognized route
    return <LandingPage />;
  };

  return <>{renderPage()}</>;
};

export default App;