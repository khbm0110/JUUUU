import React, { useContext, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';
import { PhoneIcon } from './icons/PhoneIcon';
import { EmailIcon } from './icons/EmailIcon';
import { LocationIcon } from './icons/LocationIcon';

const Contact: React.FC = () => {
  const { state } = useContext(AppContext);
  const { lawyerName, contact: translations } = state.siteData.content[state.language];
  const siteConfig = state.siteData;

  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
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
    const data = Object.fromEntries(formData.entries());
    const payload = { ...data, subject: `Nouveau message de contact de ${data.name}`, from_name: "Cabinet Hassar Site" };
    try {
      const response = await fetch('/api/submit-contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (response.ok && result.status === 'success') { setIsSubmitted(true); form.reset(); }
      else { throw new Error(result.message || 'An unknown error occurred.'); }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message.');
    } finally { setIsSubmitting(false); }
  };

  const contactItems = [
    { icon: <PhoneIcon className="w-5 h-5" style={{ color: 'var(--gold)' }} />, label: translations.phonePrompt, value: displayNumber, href: `tel:+${siteConfig.contact.whatsappNumber}`, dir: 'ltr' as const },
    { icon: <EmailIcon className="w-5 h-5" style={{ color: 'var(--gold)' }} />, label: translations.emailPrompt, value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: <LocationIcon className="w-5 h-5" style={{ color: 'var(--gold)' }} />, label: translations.addressTitle, value: siteConfig.contact.address, href: siteConfig.contact.googleMapsLink, external: true },
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-36 overflow-hidden" style={{ backgroundColor: 'var(--navy-deep)' }}>
      <div className="absolute inset-0 bg-mesh"></div>
      <div className="deco-ring hidden lg:block" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="section-badge">
              {state.language === 'ar' ? 'تواصلوا معنا' : state.language === 'en' ? 'Get In Touch' : 'Nous Contacter'}
            </span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-5 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ color: 'var(--text-primary)' }}>
            {translations.titlePrefix} <span className="text-gold-gradient">{lawyerName}</span>
          </h2>
          <p className={`max-w-2xl mx-auto transition-all duration-700 delay-200 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ color: 'var(--text-muted)' }}>{translations.intro}</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Left: Contact Info (2 cols) */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {contactItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="block glass-card rounded-2xl p-5 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110" style={{ 
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))'
                  }}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                    <p className="font-medium text-sm transition-colors" style={{ color: 'var(--gold)' }} dir={item.dir}>{item.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {/* Right: Form (3 cols) */}
          <div className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass-card rounded-2xl p-8 md:p-10">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5" style={{ background: 'rgba(201,168,76,0.1)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-3" style={{ color: 'var(--text-primary)' }}>{translations.form.successTitle}</h3>
                  <p style={{ color: 'var(--text-muted)' }}>{translations.form.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="hidden" name="formType" value="contact" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input type="text" id="name" name="name" placeholder={translations.form.name} required className="input-glass" />
                    <input type="email" id="email" name="email" placeholder={translations.form.email} required className="input-glass" />
                  </div>
                  <textarea id="message" name="message" rows={5} placeholder={translations.form.message} required className="input-glass" style={{ resize: 'vertical' }}></textarea>
                  {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{state.language === 'ar' ? 'جاري الإرسال...' : state.language === 'en' ? 'Sending...' : 'Envoi en cours...'}</span>
                      </>
                    ) : <span>{translations.form.submit}</span>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className={`mt-16 max-w-5xl mx-auto transition-all duration-1000 delay-600 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="glass rounded-2xl overflow-hidden relative group" style={{ height: '320px' }}>
            <iframe
              title={translations.addressTitle}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.8923382820244!2d-7.6786413225418215!3d33.55202864072867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda62d002f02a2c5%3A0xb07ed45b0e4fd797!2sCabinet%20d'avocats%20Hassar!5e0!3m2!1sen!2sma!4v1763085523896!5m2!1sen!2sma"
              width="100%" height="100%" frameBorder="0" scrolling="no" loading="lazy"
              className="absolute inset-0 w-full h-full transition-all duration-300"
            ></iframe>
            <a 
              href={siteConfig.contact.googleMapsLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="absolute bottom-4 right-4 z-10 glass-gold rounded-xl py-2.5 px-5 font-medium text-sm flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ color: 'var(--gold)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>{translations.viewOnMap}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
