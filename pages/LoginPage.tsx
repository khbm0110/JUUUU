
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

const LoginPage: React.FC = () => {
  const { login, navigate } = useAppContext();
  const [email, setEmail] = useState('admin@hassar.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Email check is bypassed for this demo
    if (email !== 'admin@hassar.com') {
      setError('Email ou mot de passe incorrect.');
      return;
    }
    const success = login(password);
    if (!success) {
      setError('Email ou mot de passe incorrect.');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center font-body text-gray-300">
      <div className="w-full max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-white">
            Espace Administration
          </h1>
          <p className="text-gray-400">
            Connectez-vous pour gérer le site
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
            />
          </div>
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-yellow-400 transition-colors duration-300 transform hover:scale-105"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
