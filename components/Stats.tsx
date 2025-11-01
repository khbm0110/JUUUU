import React from 'react';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import { useAppContext } from '../contexts/AppContext';
import { Stat } from '../types';

const StatCard: React.FC<{ stat: Stat, startAnimation: boolean }> = ({ stat, startAnimation }) => {
  const count = useCountUp(startAnimation ? stat.value : 0, 2000);

  return (
    <div className="text-center">
      <p className="text-5xl md:text-6xl font-bold font-heading text-yellow-400">
        {count}{stat.suffix || ''}
      </p>
      <p className="text-gray-400 mt-2 font-body text-lg">{stat.label}</p>
    </div>
  );
};

const Stats: React.FC = () => {
  const { state } = useAppContext();
  const translations = state.siteData.content[state.language].stats || { items: [] };
  const [ref, isInView] = useInView({ threshold: 0.5, triggerOnce: true });

  if (translations.items.length === 0) {
      return null;
  }

  return (
    <div ref={ref} className="mt-20 md:mt-24">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-x-8">
        {translations.items.map((stat, index) => (
          <div 
            key={`${state.language}-${index}`} // Add language to key to force re-render on lang change
            className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <StatCard stat={stat} startAnimation={isInView} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;