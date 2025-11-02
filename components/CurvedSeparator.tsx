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
        className="relative block w-[calc(100%+1.3px)] h-[100px] md:h-[150px]"
      >
        <defs>
          <filter id="strong-shadow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feOffset dx="0" dy="15" in="SourceAlpha" result="offOut" />
            <feGaussianBlur stdDeviation="8" in="offOut" result="blurOut" />
            <feComponentTransfer in="blurOut" result="opacOut">
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="opacOut" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M0,160L60,181.3C120,203,240,245,360,250.7C480,256,600,224,720,197.3C840,171,960,149,1080,160C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          className={`fill-current ${colorClass}`}
          style={{ filter: `url(#strong-shadow-filter)` }}
        />
      </svg>
    </div>
  );
};

export default CurvedSeparator;
