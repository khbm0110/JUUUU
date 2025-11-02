
import React, { useState, useContext } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';
import CurvedSeparator from './CurvedSeparator';

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );

const Contact: React.FC = () => {
  const { state } = useContext(AppContext);
  const { lawyerName, contact: translations } = state.siteData.content[state.language];
  const siteConfig = state.siteData;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  const displayNumber = "06 16 35 12 85";

  // IMPORTANT: Replace this placeholder with your new Google Apps Script Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyEayCRLvVf1aSJ0m7_WvUTe2pG9MTd8jnhPPm2X-HgLBO-MtP3f11df0iW8HGkZUPw8g/exec";
  
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
        setFormSubmitted(true);
        form.reset();
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
       alert('Une erreur réseau est survenue. Veuillez vérifier votre connexion et réessayer.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="bg-gray-900 pb-32 md:pb-48 relative">
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-bold font-heading text-center mb-12 text-yellow-400 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>{`${translations.titlePrefix} ${lawyerName}`}</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Contact Info, Address & Map */}
          <div className={`flex flex-col items-center md:items-start text-center md:text-left rtl:md:text-right transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 rtl:translate-x-10'}`}>
            <div className="mb-8 text-center md:text-left rtl:md:text-right w-full">
              <p className="text-gray-400 mb-6">{translations.intro}</p>
              
              <div className="text-gray-400 mb-6">
                  {translations.phonePrompt}
                  <a href={`tel:+${siteConfig.contact.whatsappNumber}`} className="text-yellow-400 hover:underline inline-flex items-center gap-2 ml-2 rtl:mr-2 rtl:ml-0">
                      <PhoneIcon className="w-4 h-4" />
                      <span>{displayNumber}</span>
                  </a>
              </div>

              <div className="text-gray-400">
                  {translations.emailPrompt} <a href={`mailto:${siteConfig.contact.email}`} className="text-yellow-400 hover:underline">{siteConfig.contact.email}</a>
              </div>
            </div>
            
            <div className="text-gray-400 mb-6 text-left rtl:text-right w-full">
              <h3 className="font-bold text-lg text-white mb-2">{translations.addressTitle}</h3>
              <p>{siteConfig.contact.address}</p>
            </div>

            <div className="w-full h-64 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative">
              <iframe
                title={translations.addressTitle}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.593361528601!2d-7.64332802434526!3d33.58980757333634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d3ab514571e9%3A0x4d32f52316fde5de!2sMa%C3%AEtre%20Fatima%20Azzahraa%20HASSAR!5e0!3m2!1sen!2sma!4v1716305541675!5m2!1sen!2sma"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                loading="lazy"
                className="absolute inset-0 w-full h-full"
                style={{ filter: 'grayscale(0.8) contrast(1.2) opacity(0.8)' }}
              ></iframe>
            </div>
            <a href={siteConfig.contact.googleMapsLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-yellow-400 hover:underline">
              {translations.viewOnMap}
            </a>
          </div>
          
          {/* Right Column: Form */}
          <div className={`transition-all duration-1000 ease-out delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 rtl:-translate-x-10'}`}>
            {formSubmitted ? (
               <div className="bg-gray-800 p-8 rounded-lg text-center h-full flex items-center justify-center">
                 <p className="text-xl text-green-400">{translations.form.success}</p>
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-yellow-400 transition-colors duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : translations.form.submit}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
      <CurvedSeparator type="bottom" colorClass="text-black" />
    </section>
  );
};

export default Contact;