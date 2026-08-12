import React, { useContext } from 'react';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import { AppContext } from '../contexts/AppContext';

interface StatItem {
  value: number;
  suffix: string;
  labelFr: string;
  labelEn: string;
  labelAr: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  {
    value: 15,
    suffix: '+',
    labelFr: "Annees d'Experience",
    labelEn: 'Years of Experience',
    labelAr: 'سنوات الخبرة',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    value: 500,
    suffix: '+',
    labelFr: 'Dossiers Traites',
    labelEn: 'Cases Handled',
    labelAr: 'قضية تم التعامل معها',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  },
  {
    value: 98,
    suffix: '%',
    labelFr: 'Taux de Satisfaction',
    labelEn: 'Satisfaction Rate',
    labelAr: 'نسبة الرضا',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
  },
  {
    value: 11,
    suffix: '',
    labelFr: 'Domaines Juridiques',
    labelEn: 'Legal Areas',
    labelAr: 'مجال قانوني',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
];

const StatCard: React.FC<{ stat: StatItem; language: string; startAnimation: boolean; delay: number; isInView: boolean }> = ({ 
  stat, language, startAnimation, delay, isInView 
}) => {
  const count = useCountUp(startAnimation ? stat.value : 0, 2200);
  const label = language === 'ar' ? stat.labelAr : language === 'en' ? stat.labelEn : stat.labelFr;

  return (
    <div 
      className={`glass-card rounded-2xl p-6 md:p-8 text-center transition-all duration-600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ 
        background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
        color: 'var(--gold)'
      }}>
        {stat.icon}
      </div>
      {/* Number */}
      <p className="text-4xl md:text-5xl font-bold font-heading mb-2">
        <span className="text-gold-gradient">{count}</span>
        <span style={{ color: 'var(--gold-light)' }}>{stat.suffix}</span>
      </p>
      {/* Label */}
      <p className="text-sm font-medium tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>{label}</p>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const { state } = useContext(AppContext);
  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="relative py-20 md:py-28" style={{ backgroundColor: 'var(--navy-deep)' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              language={state.language}
              startAnimation={isInView}
              delay={index * 120}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
