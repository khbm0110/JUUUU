

import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CloseIcon } from './icons/CloseIcon';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const { state } = useContext(AppContext);
  const translations = state.siteData.content[state.language].contact.appointmentModal;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/submit-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setIsSubmitted(true);
      } else {
        throw new Error(result.message || 'An unknown error occurred.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 transition-opacity duration-300 overflow-y-auto" onClick={handleClose}>
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md relative border border-gray-700" onClick={e => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10" aria-label={translations.close}>
          <CloseIcon className="w-6 h-6" />
        </button>
        
        {isSubmitted ? (
          <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-3xl font-bold font-heading text-white mb-2">{translations.successTitle}</h2>
            <p className="text-gray-400 mb-8 max-w-xs mx-auto leading-relaxed">{translations.successMessage}</p>
            <button onClick={handleClose} className="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {translations.close}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col max-h-[90vh]"
          >
            <div className="p-6 md:p-8 flex-shrink-0 border-b border-gray-700">
              <h2 className="text-2xl font-bold font-heading text-white text-center">{translations.title}</h2>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto">
              <input type="hidden" name="formType" value="appointment_request" />
              
              <div className="space-y-4">
                <input type="text" name="name" placeholder={translations.name} required className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />
                <input type="email" name="email" placeholder={translations.email} required className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />
                <input type="tel" name="phone" placeholder={translations.phone} required className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />
                <textarea name="message" placeholder={translations.message} rows={3} className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white"></textarea>
              </div>
            </div>
            
            <div className="p-6 md:p-8 flex-shrink-0 border-t border-gray-700">
              {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : translations.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;