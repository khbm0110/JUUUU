import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { LogoIcon } from '../components/icons/LogoIcon';

const LoginPage: React.FC = () => {
  const { login } = useAppContext();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(password);
    if (!success) {
      setError('Mot de passe incorrect.');
    }
    // No need to navigate, App.tsx will re-render the correct component
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-center">
            <LogoIcon className="h-16 text-yellow-400" />
        </div>
        <h2 className="text-2xl font-bold text-center text-white font-heading">
          Espace Administration
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-bold text-gray-900 bg-yellow-500 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 transition-all transform hover:scale-105"
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
