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
    const payload = { ...data, subject: `Nouvelle demande de rappel de ${data.name}`, from_name: "Cabinet Hassar Site" };
    try {
      const response = await fetch('/api/submit-contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (response.ok && result.status === 'success') { setIsSubmitted(true); }
      else { throw new Error(result.message || 'An unknown error occurred.'); }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send request.');
    } finally { setIsSubmitting(false); }
  };

  const handleClose = () => {
    if (isSubmitted) setIsSubmitted(false);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 overflow-y-auto"
      style={{ backgroundColor: 'rgba(6,10,19,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={handleClose}
    >
      <div 
        className="rounded-2xl shadow-2xl w-full max-w-md relative animate-scale-in"
        style={{ backgroundColor: 'var(--navy-card)', border: '1px solid var(--glass-border-hover)', boxShadow: 'var(--shadow-gold-lg)' }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 w-9 h-9 rounded-xl glass flex items-center justify-center transition-all hover:scale-110 cursor-pointer z-10" 
          style={{ color: 'var(--text-muted)' }}
          aria-label={translations.close}
        >
          <CloseIcon className="w-4 h-4" />
        </button>
        
        {isSubmitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(201,168,76,0.1)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold font-heading mb-3" style={{ color: 'var(--text-primary)' }}>{translations.successTitle}</h2>
            <p className="mb-8 max-w-xs mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>{translations.successMessage}</p>
            <button onClick={handleClose} className="btn-primary cursor-pointer">
              <span>{translations.close}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col max-h-[90vh]">
            <div className="p-6 md:p-8 flex-shrink-0">
              <h2 className="text-xl font-bold font-heading text-center" style={{ color: 'var(--text-primary)' }}>{translations.title}</h2>
            </div>
            
            <div className="px-6 md:px-8 pb-6 overflow-y-auto">
              <div className="space-y-4">
                <input type="hidden" name="formType" value="appointment_request" />
                <input type="text" name="name" placeholder={translations.name} required className="input-glass" />
                <input type="email" name="email" placeholder={translations.email} required className="input-glass" />
                <input type="tel" name="phone" placeholder={translations.phone} required className="input-glass" />
                <textarea name="message" placeholder={translations.message} rows={3} className="input-glass" style={{ resize: 'vertical' }}></textarea>
              </div>
            </div>
            
            <div className="p-6 md:px-8 md:pb-8 flex-shrink-0">
              {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{state.language === 'ar' ? 'جاري الإرسال...' : 'Envoi en cours...'}</span>
                  </>
                ) : <span>{translations.submit}</span>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
