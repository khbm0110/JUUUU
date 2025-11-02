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
        {count}{stat.suffix}
      </p>
      <p className="text-gray-300 mt-2 font-body text-sm uppercase tracking-widest">{stat.label}</p>
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
    <div ref={ref} className="mt-16 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:-translate-x-1/3 md:w-full [perspective:1000px]">
      <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl p-8 md:p-10 border border-gray-700/50">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-y-10 gap-x-6 [transform-style:preserve-3d]">
          {translations.items.map((stat, index) => (
            <div 
              key={`${state.language}-${index}`}
              className={`transition-all duration-1000 ease-out origin-left ${
                isInView
                  ? 'opacity-100 translate-x-0 rotate-y-0'
                  : 'opacity-0 -translate-x-3/4 -rotate-y-90'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <StatCard stat={stat} startAnimation={isInView} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;