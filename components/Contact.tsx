

import React, { useContext, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';
import CurvedSeparator from './CurvedSeparator';
import { PhoneIcon } from './icons/PhoneIcon';
import { EmailIcon } from './icons/EmailIcon';
import { LocationIcon } from './icons/LocationIcon';

const Contact: React.FC = () => {
  const { state } = useContext(AppContext);
  const { lawyerName, contact: translations } = state.siteData.content[state.language];
  const siteConfig = state.siteData;

  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const displayNumber = "06 16 35 12 85";

  const inputStyle = {
    backgroundColor: '#0F172A',
    border: '1px solid rgba(201,168,76,0.15)',
    color: '#F8FAFC',
  };

  const inputFocusClass = 'focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const payload = {
        ...data,
        subject: `Nouveau message de contact de ${data.name}`,
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
        form.reset();
      } else {
        throw new Error(result.message || 'An unknown error occurred.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="pb-32 md:pb-48 relative" style={{ backgroundColor: '#0B1120' }}>
      <div className="container mx-auto px-6">
        <span className={`inline-block uppercase tracking-[0.25em] text-sm font-semibold mb-4 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ color: '#C9A84C' }}>
          {state.language === 'ar' ? 'تواصلوا معنا' : state.language === 'en' ? 'Get In Touch' : 'Nous Contacter'}
        </span>
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-center mb-4 transition-opacity duration-1000 delay-100 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ color: '#F8FAFC' }}>{`${translations.titlePrefix} `}<span style={{ color: '#C9A84C' }}>{lawyerName}</span></h2>
        <p className={`text-center mb-14 max-w-2xl mx-auto transition-opacity duration-1000 delay-200 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ color: '#94A3B8' }}>{translations.intro}</p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Contact Info */}
          <div className={`flex flex-col items-center md:items-start transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 rtl:translate-x-10'}`}>
            <div className="space-y-8 w-full">
              {/* Phone */}
              <div className="flex items-start gap-5 group">
                <div className="p-4 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-105" style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <PhoneIcon className="w-6 h-6" style={{ color: '#C9A84C' }}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: '#F8FAFC' }}>{translations.phonePrompt}</h3>
                  <a href={`tel:+${siteConfig.contact.whatsappNumber}`} className="transition-colors hover:opacity-80" style={{ color: '#C9A84C' }} dir="ltr">
                    {displayNumber}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5 group">
                <div className="p-4 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-105" style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <EmailIcon className="w-6 h-6" style={{ color: '#C9A84C' }}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: '#F8FAFC' }}>{translations.emailPrompt}</h3>
                  <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:opacity-80" style={{ color: '#C9A84C' }}>
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-5 group">
                <div className="p-4 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-105" style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <LocationIcon className="w-6 h-6" style={{ color: '#C9A84C' }}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: '#F8FAFC' }}>{translations.addressTitle}</h3>
                  <p style={{ color: '#CBD5E1' }}>{siteConfig.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Form */}
          <div className={`transition-all duration-1000 ease-out delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 rtl:-translate-x-10'}`}>
            {isSubmitted ? (
               <div className="p-8 rounded-xl text-center flex flex-col items-center justify-center h-full min-h-[360px]" style={{ backgroundColor: '#1A2332', border: '1px solid rgba(201,168,76,0.15)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold font-heading mb-2" style={{ color: '#F8FAFC' }}>{translations.form.successTitle}</h3>
                <p style={{ color: '#94A3B8' }}>{translations.form.successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="formType" value="contact" />
                <div>
                  <label htmlFor="name" className="sr-only">{translations.form.name}</label>
                  <input
                    type="text" id="name" name="name"
                    placeholder={translations.form.name} required
                    className={`w-full rounded-lg py-3.5 px-4 ${inputFocusClass}`}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">{translations.form.email}</label>
                  <input
                    type="email" id="email" name="email"
                    placeholder={translations.form.email} required
                    className={`w-full rounded-lg py-3.5 px-4 ${inputFocusClass}`}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">{translations.form.message}</label>
                  <textarea
                    id="message" name="message" rows={5}
                    placeholder={translations.form.message} required
                    className={`w-full rounded-lg py-3.5 px-4 ${inputFocusClass}`}
                    style={inputStyle}
                  ></textarea>
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full font-bold py-3.5 px-8 rounded-lg text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transform hover:scale-[1.01] flex items-center justify-center cursor-pointer"
                  style={{ backgroundColor: '#C9A84C', color: '#0B1120' }}
                >
                   {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{state.language === 'ar' ? 'جاري الإرسال...' : state.language === 'en' ? 'Sending...' : 'Envoi en cours...'}</span>
                    </>
                  ) : translations.form.submit}
                </button>
              </form>
            )}
          </div>
          
          {/* Map Section */}
          <div className={`md:col-span-2 mt-8 transition-all duration-1000 ease-out delay-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-full h-80 rounded-xl overflow-hidden relative group" style={{ border: '1px solid rgba(201,168,76,0.1)' }}>
              <iframe
                title={translations.addressTitle}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.8923382820244!2d-7.6786413225418215!3d33.55202864072867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda62d002f02a2c5%3A0xb07ed45b0e4fd797!2sCabinet%20d'avocats%20Hassar!5e0!3m2!1sen!2sma!4v1763085523896!5m2!1sen!2sma"
                width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} loading="lazy"
                className="absolute inset-0 w-full h-full transition-all duration-300"
              ></iframe>
               <a 
                href={siteConfig.contact.googleMapsLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 z-10 font-semibold py-2.5 px-5 rounded-lg shadow-lg flex items-center gap-2 transform transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ backgroundColor: 'rgba(11,17,32,0.8)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002 2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>{translations.viewOnMap}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <CurvedSeparator type="bottom" colorClass="text-[#0F172A]" />
    </section>
  );
};

export default Contact;
