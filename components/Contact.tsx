

import React, { useContext, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';
import CurvedSeparator from './CurvedSeparator';
import { PhoneIcon } from './icons/PhoneIcon';
import { EmailIcon } from './icons/EmailIcon';
import { LocationIcon } from './icons/LocationIcon';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby27xOFjCSzgcc9QBkPUIW5uuh8jg7rWFFxf4XUFloG0yl7sY8FxOnyKHR5kgEx0VM7/exec';

const Contact: React.FC = () => {
  const { state } = useContext(AppContext);
  const { lawyerName, contact: translations } = state.siteData.content[state.language];
  const siteConfig = state.siteData;

  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const displayNumber = "06 16 35 12 85";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === 'success') {
          setIsSubmitted(true);
          form.reset();
        } else {
          throw new Error(result.message || 'An unknown error occurred.');
        }
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="bg-gray-900 pb-32 md:pb-48 relative">
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-bold font-heading text-center mb-12 text-yellow-400 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>{`${translations.titlePrefix} ${lawyerName}`}</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Contact Info */}
          <div className={`flex flex-col items-center md:items-start transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 rtl:translate-x-10'}`}>
            <p className="text-gray-400 leading-relaxed mb-10 text-center md:text-left rtl:md:text-right">{translations.intro}</p>
            
            <div className="space-y-8 mb-10 w-full">
              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="bg-gray-800 p-4 rounded-full border border-gray-700 flex-shrink-0 shadow-md">
                  <PhoneIcon className="w-6 h-6 text-yellow-400"/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{translations.phonePrompt}</h3>
                  <a href={`tel:+${siteConfig.contact.whatsappNumber}`} className="text-gray-400 hover:text-yellow-400 transition-colors" dir="ltr">
                    {displayNumber}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="bg-gray-800 p-4 rounded-full border border-gray-700 flex-shrink-0 shadow-md">
                  <EmailIcon className="w-6 h-6 text-yellow-400"/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{translations.emailPrompt}</h3>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-400 hover:text-yellow-400 transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-5">
                <div className="bg-gray-800 p-4 rounded-full border border-gray-700 flex-shrink-0 shadow-md">
                  <LocationIcon className="w-6 h-6 text-yellow-400"/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{translations.addressTitle}</h3>
                  <p className="text-gray-400">{siteConfig.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Form */}
          <div className={`transition-all duration-1000 ease-out delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 rtl:-translate-x-10'}`}>
            {isSubmitted ? (
               <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center flex flex-col items-center justify-center h-full min-h-[360px]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold font-heading text-white mb-2">{translations.form.successTitle}</h3>
                <p className="text-gray-400">{translations.form.successMessage}</p>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="formType" value="contact" />
                <div>
                  <label htmlFor="name" className="sr-only">{translations.form.name}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={translations.form.name}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">{translations.form.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={translations.form.email}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">{translations.form.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={translations.form.message}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                  ></textarea>
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transform hover:scale-105 flex items-center justify-center"
                >
                   {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : translations.form.submit}
                </button>
              </form>
            )}
          </div>
          
          {/* Map Section */}
          <div className={`md:col-span-2 mt-8 transition-all duration-1000 ease-out delay-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-full h-80 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative group">
              <iframe
                title={translations.addressTitle}
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3325.136359332123!2d-7.6763056!3d33.5498333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDMyJzU5LjQiTiA3wrA0MCczNC43Ilc!5e0!3m2!1sen!2sma!4v1762105363005!5m2!1sen!2sma"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                loading="lazy"
                className="absolute inset-0 w-full h-full transition-all duration-300"
                style={{ filter: 'grayscale(0.8) contrast(1.2) opacity(0.8)' }}
              ></iframe>
               <a 
                href={siteConfig.contact.googleMapsLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 z-10 bg-black/60 backdrop-blur-sm text-yellow-400 font-semibold py-2 px-4 rounded-lg shadow-lg flex items-center gap-2 hover:bg-black/80 hover:scale-105 transform transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>{translations.viewOnMap}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <CurvedSeparator type="bottom" colorClass="text-black" />
    </section>
  );
};

export default Contact;