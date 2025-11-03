import React, { useContext } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import { AppContext } from './contexts/AppContext';

const App: React.FC = () => {
  const { isLoggedIn } = useContext(AppContext);

  const path = window.location.pathname;

  if (path.startsWith('/admin')) {
    return isLoggedIn ? <AdminDashboard /> : <LoginPage />;
  }

  if (path.startsWith('/login')) {
    return <LoginPage />;
  }

  return <LandingPage />;
};

export default App;
