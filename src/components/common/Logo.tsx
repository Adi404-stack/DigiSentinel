import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Geometric Sentinel Shield Icon */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-electric-500/20 rounded-xl blur-sm"></div>
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full text-electric-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagonal Shield Outline */}
          <polygon
            points="20,2 36,10 36,28 20,38 4,28 4,10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="text-electric-500"
          />
          {/* Inner Cyan Circuit Matrix */}
          <polygon
            points="20,8 30,14 30,26 20,32 10,26 10,14"
            stroke="#06B6D4"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            opacity="0.85"
          />
          {/* Central Sentinel Core Node */}
          <circle cx="20" cy="20" r="4.5" fill="#3B82F6" />
          <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
          {/* Radial Signal Radar Rays */}
          <line x1="20" y1="8" x2="20" y2="15.5" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="24.5" x2="20" y2="32" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center tracking-tight">
          <span className={`font-extrabold ${textSizes[size]} text-white tracking-wider`}>DIGI</span>
          <span className={`font-extrabold ${textSizes[size]} bg-gradient-to-r from-electric-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent`}>
            SENTINEL
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
            Discover. Defend. Prove.
          </span>
        )}
      </div>
    </div>
  );
};
