import React from 'react';

interface CurvedSeparatorProps {
  colorClass: string;
  type: 'top' | 'bottom';
}

const CurvedSeparator: React.FC<CurvedSeparatorProps> = ({ colorClass, type }) => {
  const wrapperClasses = 'absolute left-0 w-full overflow-hidden';
  const style: React.CSSProperties = { lineHeight: 0 };
  
  if (type === 'top') {
    style.top = 0;
    style.transform = 'rotate(180deg)';
  } else {
    style.bottom = 0;
  }

  return (
    <div className={wrapperClasses} style={style}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="relative block w-[calc(100%+1.3px)] h-[100px] md:h-[160px]"
      >
        {/* Layer 1: semi-transparent background wave */}
        <path
          d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,208C672,203,768,149,864,144C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          className={`fill-current ${colorClass}`}
          style={{ opacity: 0.4 }}
        />
        {/* Layer 2: opaque foreground wave */}
        <path
          d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,154.7C672,128,768,96,864,112C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          className={`fill-current ${colorClass}`}
        />
      </svg>
    </div>
  );
};

export default CurvedSeparator;
