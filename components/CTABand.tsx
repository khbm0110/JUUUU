import React, { useContext } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';

const CTABand: React.FC = () => {
  const { state } = useContext(AppContext);
  const { language } = state;
  const [ref, isInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const openAppointment = () => {
    // Dispatch custom event that LandingPage can listen to
    window.dispatchEvent(new CustomEvent('open-appointment'));
  };

  return (
    <section ref={ref} className="relative py-20 md:py-24 overflow-hidden" style={{ backgroundColor: 'var(--navy-deep)' }}>
      {/* Animated gradient background */}
      <div className="absolute inset-0" style={{ 
        background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 40%, transparent 60%, rgba(201,168,76,0.04) 100%)',
      }}></div>
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 section-divider-gold"></div>
      <div className="absolute bottom-0 left-0 right-0 section-divider-gold"></div>

      {/* Rotating ring */}
      <div className="deco-ring animate-rotate-slow hidden lg:block" style={{ 
        width: '200px', height: '200px', top: '-60px', left: '10%', borderColor: 'rgba(201,168,76,0.06)' 
      }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 animate-float" style={{ 
            background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
            boxShadow: '0 0 40px rgba(201,168,76,0.1)'
          }}>
            <svg className="w-8 h-8" style={{ color: 'var(--gold)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading mb-5" style={{ color: 'var(--text-primary)' }}>
            {language === 'ar' 
              ? 'هل تبحث عن استشارة قانونية موثوقة؟' 
              : language === 'en'
              ? 'Looking for Trusted Legal Counsel?'
              : 'Vous recherchez un conseil juridique de confiance?'
            }
          </h2>
          <p className="text-base md:text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {language === 'ar'
              ? 'احجز موعدك الاستشاري الأول مجاناً ودعنا نساعدك في حل مسالتك القانونية'
              : language === 'en'
              ? 'Book your first consultation and let us help you resolve your legal matters'
              : 'Reservez votre premiere consultation et laissez-nous vous aider a resoudre vos questions juridiques'
            }
          </p>
          
          <button onClick={openAppointment} className="btn-primary text-base magnetic-hover cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <span>
              {language === 'ar' ? 'احجز موعد الآن' : language === 'en' ? 'Book Now' : 'Reserver Maintenant'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
