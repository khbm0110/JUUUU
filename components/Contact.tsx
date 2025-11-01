import React, { useState, useContext } from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';

const Contact: React.FC = () => {
  const { state, addConsultation } = useContext(AppContext);
  const { lawyerName, contact: translations } = state.siteData.content[state.language];
  const siteConfig = state.siteData;

  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return; // Basic validation

    // Use context function to add new consultation
    addConsultation({ name, email, message });

    // Reset form and show success message
    setName('');
    setEmail('');
    setMessage('');
    setFormSubmitted(true);
    
    // Hide the success message after 5 seconds
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const whatsappLink = `https://wa.me/${siteConfig.contact.whatsappNumber}`;

  return (
    <section ref={ref} id="contact" className="bg-gray-900 py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-bold font-heading text-center mb-12 text-yellow-400 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>{`${translations.titlePrefix} ${lawyerName}`}</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className={`flex flex-col items-center md:items-start text-center md:text-left rtl:md:text-right transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 rtl:translate-x-10'}`}>
            <p className="text-gray-400 mb-6">{translations.intro}</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-green-400 transition-colors duration-300 transform hover:scale-105 shadow-lg mb-6"
            >
              <WhatsAppIcon className="h-6 w-6 me-3" />
              {translations.whatsapp}
            </a>
            
            <div className="text-gray-400 mb-6">
                {translations.emailPrompt} <a href={`mailto:${siteConfig.contact.email}`} className="text-yellow-400 hover:underline">{siteConfig.contact.email}</a>
            </div>

            <div className="text-gray-400 mb-6 text-left rtl:text-right w-full">
              <h3 className="font-bold text-lg text-white mb-2">{translations.addressTitle}</h3>
              <p>{siteConfig.contact.address}</p>
            </div>

            <a href={siteConfig.contact.googleMapsLink} target="_blank" rel="noopener noreferrer" className="w-full group">
              <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative">
                <img src="https://images.unsplash.com/photo-1569336415962-a42945a473db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Map Location" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"/>
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 flex items-center justify-center transition-all duration-300">
                  <p className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-black/30 p-2 rounded">
                    {translations.viewOnMap}
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className={`transition-all duration-1000 ease-out delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 rtl:-translate-x-10'}`}>
            {formSubmitted ? (
               <div className="bg-gray-800 p-8 rounded-lg text-center h-full flex items-center justify-center">
                 <p className="text-xl text-green-400">{translations.form.success}</p>
               </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">{translations.form.name}</label>
                <input
                  type="text"
                  id="name"
                  placeholder={translations.form.name}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">{translations.form.email}</label>
                <input
                  type="email"
                  id="email"
                  placeholder={translations.form.email}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">{translations.form.message}</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder={translations.form.message}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-yellow-400 transition-colors duration-300 transform hover:scale-105"
              >
                {translations.form.submit}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;