import React from 'react';

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  text?: string;
  isRtl?: boolean;
  showText?: boolean;
}

/**
 * A luxurious, high-quality horizontal logo for Cabinet Hassar.
 * Features a modern, minimalist scales of justice icon on the left,
 * and the firm's name on the right in elegant gold typography (#bfa14a).
 * Style: minimalist, modern luxury, timeless, professional, clean lines.
 * Background: Transparent.
 */
export const LogoIcon: React.FC<LogoIconProps> = ({
  text,
  isRtl = false,
  showText = true,
  ...props
}) => {
  // FIX: Corrected syntax for 'as const' with a ternary operator. The 'as const'
  // assertion must be applied to each object literal inside the conditional,
  // not to the result of the ternary expression itself, which is not a literal.
  const textProps = isRtl
    ? {
        x: '440',
        y: '68',
        textAnchor: 'end',
        fontSize: '40', // Adjusted for length
        letterSpacing: '1',
      } as const
    : {
        x: '125',
        y: '68',
        textAnchor: 'start',
        fontSize: '48',
        letterSpacing: '3',
      } as const;

  return (
    <svg
      viewBox="0 0 450 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={text || "Cabinet Hassar Logo Icon"}
      role="img"
      {...props}
    >
      {/* Scales of Justice Icon */}
      <g transform="scale(0.95) translate(5, 2)" fill="none" stroke="#bfa14a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 90V10" />
          <path d="M15 10H85" />
          <path d="M30 15V35" />
          <path d="M15 40C15 40 22 55 30 55C38 55 45 40 45 40" />
          <path d="M70 15V35" />
          <path d="M55 40C55 40 62 55 70 55C78 55 85 40 85 40" />
      </g>
      
      {/* Text */}
      {showText && text && (
        <text 
          fontFamily="'Cormorant Garamond', serif"
          fontWeight="600"
          fill="#bfa14a"
          {...textProps}
        >
          {text}
        </text>
      )}
    </svg>
  );
};