
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
// FIX: Removed AdminConsultationsIcon and AdminAppointmentsIcon as they are no longer used.
import { AdminDashboardIcon, AdminLogoutIcon, AdminMenuIcon, AdminCloseIcon } from '../components/admin/icons';
// FIX: Removed unused and deprecated Type imports for Consultation and AppointmentRequest.

const AdminDashboard: React.FC = () => {
  // FIX: Removed navigate and state from context as they are no longer directly used here.
  const { logout } = useAppContext();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // FIX: logout() from context now handles navigation.
    logout();
  };

  const renderContent = () => {
    switch (activeTab) {
      // FIX: Removed deprecated 'consultations' and 'appointments' cases.
      default:
        return <DashboardHome />;
    }
  };
  
  const navItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: <AdminDashboardIcon className="w-5 h-5" /> },
      // FIX: Removed deprecated 'consultations' and 'appointments' nav items.
  ];

  const Sidebar = () => (
     <aside className={`absolute inset-y-0 left-0 z-30 w-64 px-4 py-8 overflow-y-auto bg-gray-900 border-r border-gray-700 transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <h2 className="text-2xl font-semibold text-center text-white font-heading">Admin</h2>
        <nav className="mt-8 space-y-2">
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${activeTab === item.id ? 'bg-yellow-500 text-gray-900' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                >
                    {item.icon}
                    <span className="mx-4 font-medium">{item.label}</span>
                </button>
            ))}
        </nav>
        <div className="absolute bottom-4 w-full pr-8">
            <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
            >
                <AdminLogoutIcon className="w-5 h-5" />
                <span className="mx-4 font-medium">Déconnexion</span>
            </button>
        </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-800 text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700 md:hidden">
            <h2 className="text-xl font-semibold">Admin</h2>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <AdminCloseIcon className="w-6 h-6" /> : <AdminMenuIcon className="w-6 h-6" />}
            </button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-6">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

const DashboardHome: React.FC = () => (
    <div>
        <h1 className="text-3xl font-bold text-white mb-4">Bienvenue sur le tableau de bord</h1>
        <p className="text-gray-400">Sélectionnez une section dans le menu pour commencer.</p>
        <p className="text-gray-500 mt-4">Note: La gestion des consultations et des demandes de rappel a été déplacée vers un service externe et n'est plus disponible ici.</p>
    </div>
);

// FIX: Removed the unused DataTable component.


export default AdminDashboard;
