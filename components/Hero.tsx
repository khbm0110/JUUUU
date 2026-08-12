import React, { useState, useEffect, useContext } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { AppContext } from '../contexts/AppContext';

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

interface HeroProps {
  openAppointmentModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ openAppointmentModal }) => {
  const { state } = useContext(AppContext);
  const { hero: translations } = state.siteData.content[state.language];
  const { contact: contactInfo, heroImageUrl } = state.siteData;
  
  const [typedTitle, isTitleFinished] = useTypewriter(translations.title, 50);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [showDecorations, setShowDecorations] = useState(false);

  useEffect(() => {
    setShowDecorations(true);
  }, []);

  useEffect(() => {
    if (isTitleFinished) {
      const t = setTimeout(() => setShowSubtitle(true), 400);
      return () => clearTimeout(t);
    }
    setShowSubtitle(false);
    setShowCta(false);
  }, [isTitleFinished, translations.title]);

  useEffect(() => {
    if (showSubtitle) {
      const t = setTimeout(() => setShowCta(true), 500);
      return () => clearTimeout(t);
    }
  }, [showSubtitle]);

  const subtitleWords = translations.subtitle.split(' ');
  const phoneNumber = contactInfo.whatsappNumber;
  const displayNumber = "06 16 35 12 85";

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--navy-deep)' }}
    >
      {/* Background image */}
      {heroImageUrl && (
        <img
          src={heroImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center hero-bg-zoom"
          width="1024"
          height="1024"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          aria-hidden="true"
        />
      )}
      {/* Multi-layer overlay with gradient mesh */}
      <div className="absolute inset-0 z-0" style={{ 
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(11,17,32,0.85) 0%, transparent 70%),
          radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 50%),
          linear-gradient(180deg, rgba(6,10,19,0.9) 0%, rgba(11,17,32,0.7) 50%, rgba(6,10,19,0.95) 100%)
        ` 
      }}></div>

      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise z-[1]"></div>

      {/* Decorative elements */}
      <div className={`absolute z-[2] transition-all duration-1000 ${showDecorations ? 'opacity-100' : 'opacity-0'}`}>
        {/* Ring top-right */}
        <div className="deco-ring" style={{ width: '500px', height: '500px', top: '-100px', right: '-100px' }}></div>
        {/* Ring bottom-left */}
        <div className="deco-ring" style={{ width: '300px', height: '300px', bottom: '10%', left: '-80px' }}></div>
        {/* Dot grid */}
        <div className="deco-dot-grid hidden lg:block" style={{ top: '20%', right: '8%' }}></div>
      </div>

      {/* Gold accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px z-10" style={{ 
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 30%, rgba(201,168,76,0.4) 70%, transparent)' 
      }}></div>

      {/* Main content - Split Layout */}
      <div className="container mx-auto px-6 relative z-10 py-32 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[80vh]">
          
          {/* Left Column - Text Content (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full transition-all duration-700 ${showDecorations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ 
              background: 'rgba(201,168,76,0.08)', 
              border: '1px solid rgba(201,168,76,0.15)',
              transitionDelay: '200ms'
            }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--gold)' }}></span>
              <span className="text-sm font-medium tracking-wide" style={{ color: 'var(--gold)' }}>
                {state.language === 'ar' ? 'الدار البيضاء، المغرب' : state.language === 'en' ? 'Casablanca, Morocco' : 'Casablanca, Maroc'}
              </span>
            </div>

            {/* Title with typewriter */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6" style={{ color: 'var(--text-primary)' }}>
              <span>{typedTitle}</span>
              {!isTitleFinished && (
                <span className="border-r-2 ml-1 cursor-blink" style={{ borderColor: 'var(--gold)' }} aria-hidden="true"></span>
              )}
            </h1>
            
            {/* Subtitle with word-by-word reveal */}
            <div className="min-h-[60px] mb-10">
              <p className="text-lg md:text-xl max-w-xl mx-auto lg:mx-0" style={{ color: 'var(--text-secondary)' }}>
                {subtitleWords.map((word, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-500 ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </p>
            </div>
           
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0 transition-all duration-500 ${showCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a
                href={`tel:+${phoneNumber}`}
                className="btn-primary text-base"
                dir="ltr"
              >
                <PhoneIcon className="w-5 h-5" />
                <span>{displayNumber}</span>
              </a>
              <button
                onClick={openAppointmentModal}
                className="btn-outline text-base cursor-pointer"
              >
                <CalendarIcon className="w-5 h-5" />
                <span>{translations.ctaAppointment}</span>
              </button>
            </div>
          </div>

          {/* Right Column - Glass Card with Photo (5 cols) */}
          <div className={`hidden lg:flex lg:col-span-5 justify-center transition-all duration-1000 delay-500 ${showDecorations ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.3), transparent 70%)' }}></div>
              
              {/* Glass card */}
              <div className="relative glass-card rounded-2xl p-6 max-w-sm">
                {/* Photo */}
                <div className="relative rounded-xl overflow-hidden mb-6" style={{ aspectRatio: '3/4' }}>
                  <img 
                    src={state.siteData.aboutImageUrl || ''}
                    alt={state.siteData.content[state.language].lawyerName}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(6,10,19,0.8) 100%)' }}></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                      {state.siteData.content[state.language].lawyerName}
                    </p>
                    <p className="text-sm mt-1" style={{ color: 'var(--gold)' }}>
                      {state.language === 'ar' ? 'محامية بالدار البيضاء' : state.language === 'en' ? 'Lawyer in Casablanca' : 'Avocate a Casablanca'}
                    </p>
                  </div>
                </div>

                {/* Quick info items */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(201,168,76,0.05)' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,168,76,0.12)' }}>
                      <svg className="w-4 h-4" style={{ color: 'var(--gold)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{state.language === 'ar' ? 'متاحة' : state.language === 'en' ? 'Available' : 'Disponible'}</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{state.language === 'ar' ? 'الاثنين - الجمعة' : state.language === 'en' ? 'Monday - Friday' : 'Lundi - Vendredi'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(201,168,76,0.05)' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,168,76,0.12)' }}>
                      <svg className="w-4 h-4" style={{ color: 'var(--gold)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{state.language === 'ar' ? 'الموقع' : state.language === 'en' ? 'Location' : 'Localisation'}</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{state.language === 'ar' ? 'الدار البيضاء' : 'Casablanca'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating decoration */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl glass-gold flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--gold)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
