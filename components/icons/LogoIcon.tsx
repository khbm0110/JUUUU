import React from 'react';

/**
 * A luxurious, high-quality horizontal logo for Cabinet Hassar.
 * Features a modern, minimalist scales of justice icon on the left,
 * and the firm's name on the right in elegant gold typography (#bfa14a).
 * Style: minimalist, modern luxury, timeless, professional, clean lines.
 * Background: Transparent.
 */
export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 450 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Cabinet Hassar Logo"
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
    <text x="125" y="68" fontFamily="'Cormorant Garamond', serif" fontSize="48" fontWeight="600" fill="#bfa14a" letterSpacing="3">
      Cabinet Hassar
    </text>
  </svg>
);
