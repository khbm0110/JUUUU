import React from 'react';
import { useCountUp } from '../hooks/useCountUp';
import { useAppContext } from '../contexts/AppContext';
import { Stat } from '../types';

interface StatsProps {
  isVisible: boolean;
}

const StatCard: React.FC<{ stat: Stat, startAnimation: boolean }> = ({ stat, startAnimation }) => {
  const count = useCountUp(startAnimation ? stat.value : 0, 2000);

  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-bold font-heading text-yellow-400">
        {count}{stat.suffix}
      </p>
      <p className="text-gray-300 mt-2 font-body text-xs uppercase tracking-widest">{stat.label}</p>
    </div>
  );
};

const Stats: React.FC<StatsProps> = ({ isVisible }) => {
  const { state } = useAppContext();
  const translations = state.siteData.content[state.language].stats || { items: [] };

  if (translations.items.length === 0) {
      return null;
  }

  return (
    <div className={`
      mt-16 md:mt-0 md:absolute md:bottom-6 md:left-1/2 md:-translate-x-1/2
      md:w-[90%] md:z-20
      transition-all duration-500 ease-in-out
      bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
    `}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
        {translations.items.map((stat, index) => (
          <div 
            key={`${state.language}-${index}`}
          >
            <StatCard stat={stat} startAnimation={isVisible} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;