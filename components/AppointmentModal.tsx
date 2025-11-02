import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CloseIcon } from './icons/CloseIcon';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const { state } = useContext(AppContext);
  const translations = state.siteData.content[state.language].contact.appointmentModal;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // IMPORTANT: Replace this with your Google Apps Script Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw6vGZ5DMHEAEzYHrOuwyfsec3E-7Vkv_iy1kGGguHElDE2K70HqLPlKsVcMGSlIzOB/exec";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            setIsSubmitted(true);
            form.reset();
            setTimeout(() => {
                onClose();
                setTimeout(() => setIsSubmitted(false), 300); // Reset for next time
            }, 4000);
        } else {
            alert('An error occurred. Please try again.');
        }
    } catch (error) {
        alert('A network error occurred. Please check your connection and try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-lg relative border border-gray-700" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label={translations.close}>
          <CloseIcon className="w-6 h-6" />
        </button>

        {isSubmitted ? (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold font-heading text-yellow-400 mb-4">{translations.title}</h2>
                <p className="text-lg text-green-400">{translations.success}</p>
            </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold font-heading text-white mb-6 text-center">{translations.title}</h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="formType" value="appointment" />
              <input type="text" name="name" placeholder={translations.name} required className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />
              <input type="email" name="email" placeholder={translations.email} required className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />
              <input type="tel" name="phone" placeholder={translations.phone} required className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />
              <input type="text" name="subject" placeholder={translations.subject} required className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />
              <input type="datetime-local" name="preferredDateTime" title={translations.dateTime} required className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />

              <fieldset className="pt-2">
                <legend className="text-sm font-medium text-gray-400 mb-2">{translations.confirmation}</legend>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input type="radio" name="confirmationMethod" value="email" defaultChecked className="accent-yellow-500" />
                    <span>{translations.byEmail}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input type="radio" name="confirmationMethod" value="sms" className="accent-yellow-500" />
                    <span>{translations.bySms}</span>
                  </label>
                </div>
              </fieldset>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : translations.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;