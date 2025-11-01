
import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CloseIcon } from './icons/CloseIcon';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const { state, addAppointmentRequest } = useContext(AppContext);
  const translations = state.siteData.content[state.language].contact.appointmentModal;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDateTime, setPreferredDateTime] = useState('');
  const [confirmationMethod, setConfirmationMethod] = useState<'sms' | 'email'>('email');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !preferredDateTime) return;

    addAppointmentRequest({
      name,
      email,
      phone,
      preferredDateTime,
      confirmationMethod,
    });

    setIsSubmitted(true);
    setTimeout(() => {
        onClose();
        // Reset state after the modal has closed
        setTimeout(() => {
          setIsSubmitted(false);
          setName('');
          setEmail('');
          setPhone('');
          setPreferredDateTime('');
        }, 300);
    }, 4000);
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder={translations.name} value={name} onChange={e => setName(e.target.value)} required className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />
              <input type="email" placeholder={translations.email} value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />
              <input type="tel" placeholder={translations.phone} value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />
              <input type="datetime-local" title={translations.dateTime} value={preferredDateTime} onChange={e => setPreferredDateTime(e.target.value)} required className="w-full bg-gray-900 border border-gray-600 p-3 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />

              <fieldset className="pt-2">
                <legend className="text-sm font-medium text-gray-400 mb-2">{translations.confirmation}</legend>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input type="radio" name="confirmation" value="email" checked={confirmationMethod === 'email'} onChange={() => setConfirmationMethod('email')} className="accent-yellow-500" />
                    <span>{translations.byEmail}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input type="radio" name="confirmation" value="sms" checked={confirmationMethod === 'sms'} onChange={() => setConfirmationMethod('sms')} className="accent-yellow-500" />
                    <span>{translations.bySms}</span>
                  </label>
                </div>
              </fieldset>
              
              <button type="submit" className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg mt-4">
                {translations.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
