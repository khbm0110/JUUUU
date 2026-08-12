import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useInView } from '../hooks/useInView';

const serviceIcons = [
  // Scale of Justice
  <svg key="scale" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>,
  // Building / Institution
  <svg key="building" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>,
  // Family
  <svg key="family" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
  // Briefcase
  <svg key="brief" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>,
  // Money/Banknote
  <svg key="money" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>,
];

const Services: React.FC = () => {
  const { state } = useContext(AppContext);
  const translations = state.siteData.content[state.language].services;
  
  const [ref, isInView] = useInView({ threshold: 0.05, triggerOnce: true });
  
  const services = translations.items;

  // Bento layout classes: first two cards are wide, others are regular
  const getCardClass = (index: number) => {
    if (index === 0) return 'bento-wide';
    if (index === 1) return '';  // normal
    if (index === 2) return '';  // normal
    if (index === 3) return 'bento-wide';
    return '';
  };

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: 'var(--navy-mid)' }}>
      {/* Mesh background */}
      <div className="absolute inset-0 bg-mesh"></div>
      
      {/* Decorative elements */}
      <div className="deco-dot-grid hidden lg:block" style={{ top: '10%', left: '5%' }}></div>
      <div className="deco-ring" style={{ width: '400px', height: '400px', bottom: '-150px', right: '-100px' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="section-badge">
              {state.language === 'ar' ? 'خدماتنا' : state.language === 'en' ? 'Our Services' : 'Nos Services'}
            </span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-5 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ color: 'var(--text-primary)' }}>
            {translations.title}
          </h2>
          <div className={`w-16 h-0.5 mx-auto transition-all duration-700 delay-200 ${isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ background: 'var(--gold)' }}></div>
        </div>
      
        {/* Bento Grid */}
        <div className="bento-grid">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`${getCardClass(index)} glass-card rounded-2xl p-6 md:p-7 flex flex-col justify-between cursor-default transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${150 + index * 80}ms` }}
            >
              <div>
                {/* Icon container */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))',
                    color: 'var(--gold)'
                  }}
                >
                  {serviceIcons[index % serviceIcons.length]}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{service}</h3>
                {index < 3 && (
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {state.language === 'ar' 
                      ? 'نقدم استشارة متخصصة وخبرة قانونية شاملة في هذا المجال'
                      : state.language === 'en'
                      ? 'We provide specialized consulting and comprehensive legal expertise in this area'
                      : 'Nous offrons un conseil specialise et une expertise juridique complete dans ce domaine'
                    }
                  </p>
                )}
              </div>
              
              {/* Hover arrow indicator */}
              <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'var(--gold)' }}>
                <span className="text-sm font-medium">
                  {state.language === 'ar' ? 'اعرف المزيد' : state.language === 'en' ? 'Learn more' : 'En savoir plus'}
                </span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--navy-deep), transparent)' }}></div>
    </section>
  );
};

export default Services;
