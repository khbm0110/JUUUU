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
        className="relative block w-[calc(100%+1.3px)] h-[75px] md:h-[120px]"
      >
        <path
          d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,133.3C960,107,1056,85,1152,90.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          className={`fill-current ${colorClass}`}
        ></path>
      </svg>
    </div>
  );
};

export default CurvedSeparator;
