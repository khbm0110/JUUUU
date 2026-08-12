import React, { useContext } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';

const About: React.FC = () => {
  const { state } = useContext(AppContext);
  const { lawyerName, about: translations } = state.siteData.content[state.language];
  const { aboutImageUrl } = state.siteData;

  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="relative py-24 md:py-36 overflow-hidden" style={{ backgroundColor: 'var(--navy-deep)' }}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-mesh"></div>
      <div className="deco-ring hidden lg:block" style={{ width: '600px', height: '600px', top: '-200px', left: '-200px' }}></div>
      <div className="deco-dot-grid hidden lg:block" style={{ bottom: '15%', right: '3%' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="section-badge">
              {state.language === 'ar' ? 'من نحن' : state.language === 'en' ? 'About Us' : 'Qui Sommes-Nous'}
            </span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-5 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ color: 'var(--text-primary)' }}>
            {translations.titlePrefix} <span className="text-gold-gradient">{lawyerName}</span>
          </h2>
          <div className={`w-16 h-0.5 mx-auto transition-all duration-700 delay-200 ${isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ background: 'var(--gold)' }}></div>
        </div>

        {/* Content: Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Column */}
          {aboutImageUrl && (
            <div className={`relative transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-3xl blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.4), transparent 70%)' }}></div>
              
              {/* Main image with glass frame */}
              <div className="relative glass rounded-2xl overflow-hidden group">
                <img 
                  src={aboutImageUrl} 
                  alt={lawyerName} 
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(6,10,19,0.6) 100%)' }}></div>
              </div>

              {/* Floating experience badge */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 glass-gold rounded-2xl p-5 animate-float shadow-2xl" style={{ animationDelay: '2s' }}>
                <p className="text-3xl font-bold font-heading text-gold-gradient">15+</p>
                <p className="text-xs font-medium mt-1" style={{ color: 'var(--text-muted)' }}>
                  {state.language === 'ar' ? 'سنوات خبرة' : state.language === 'en' ? 'Years Exp.' : 'Ans Exp.'}
                </p>
              </div>

              {/* Decorative accent line */}
              <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: 'rgba(201,168,76,0.2)' }}></div>
            </div>
          )}

          {/* Text Column */}
          <div className={aboutImageUrl ? '' : 'lg:col-span-2'}>
            <div className={`space-y-6 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{translations.p1}</p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{translations.p2}</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        {translations.values && translations.values.length > 0 && (
          <div ref={valuesRef} className="mt-24 md:mt-32">
            <div className="section-divider-gold mb-16"></div>
            
            <h3 className={`text-2xl md:text-3xl font-bold font-heading text-center mb-12 transition-all duration-700 ${valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ color: 'var(--text-primary)' }}>
              {translations.valuesTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {translations.values.map((value, index) => (
                <div 
                  key={value.title}
                  className={`glass-card rounded-2xl p-8 text-center transition-all duration-500 ${valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  {/* Gold number accent */}
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-5 text-sm font-bold" style={{ 
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
                    color: 'var(--gold)',
                    border: '1px solid rgba(201,168,76,0.15)'
                  }}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h4 className="text-xl font-bold mb-3 font-heading" style={{ color: 'var(--gold)' }}>{value.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;