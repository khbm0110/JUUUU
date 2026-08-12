

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

  const inputStyle = {
    backgroundColor: '#0B1120',
    border: '1px solid rgba(201,168,76,0.15)',
    color: '#F8FAFC',
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    const payload = {
        ...data,
        subject: `Nouvelle demande de rappel de ${data.name}`,
        from_name: "Cabinet Hassar Site"
    };

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    if (isSubmitted) {
        setIsSubmitted(false);
    }
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 overflow-y-auto" style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} onClick={handleClose}>
      <div className="rounded-xl shadow-2xl w-full max-w-md relative" style={{ backgroundColor: '#1A2332', border: '1px solid rgba(201,168,76,0.15)' }} onClick={e => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-4 right-4 transition-colors z-10 cursor-pointer" style={{ color: '#94A3B8' }} aria-label={translations.close}>
          <CloseIcon className="w-6 h-6" />
        </button>
        
        {isSubmitted ? (
          <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-3xl font-bold font-heading mb-2" style={{ color: '#F8FAFC' }}>{translations.successTitle}</h2>
            <p className="mb-8 max-w-xs mx-auto leading-relaxed" style={{ color: '#94A3B8' }}>{translations.successMessage}</p>
            <button onClick={handleClose} className="font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer" style={{ backgroundColor: '#C9A84C', color: '#0B1120' }}>
              {translations.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col max-h-[90vh]">
            <div className="p-6 md:p-8 flex-shrink-0" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
              <h2 className="text-2xl font-bold font-heading text-center" style={{ color: '#F8FAFC' }}>{translations.title}</h2>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto">
              <input type="hidden" name="formType" value="appointment_request" />
              
              <div className="space-y-4">
                <input type="text" name="name" placeholder={translations.name} required className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all" style={inputStyle} />
                <input type="email" name="email" placeholder={translations.email} required className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all" style={inputStyle} />
                <input type="tel" name="phone" placeholder={translations.phone} required className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all" style={inputStyle} />
                <textarea name="message" placeholder={translations.message} rows={3} className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all" style={inputStyle}></textarea>
              </div>
            </div>
            
            <div className="p-6 md:p-8 flex-shrink-0" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
              {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: '#C9A84C', color: '#0B1120' }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{state.language === 'ar' ? 'جاري الإرسال...' : 'Envoi en cours...'}</span>
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
