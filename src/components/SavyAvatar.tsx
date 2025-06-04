
import React from 'react';

export const SavyAvatar: React.FC = () => {
  return (
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-blue-500 to-purple-600 p-0.5 animate-glow">
        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden border-2 border-transparent bg-clip-padding">
          {/* Nerdy anime girl avatar with clear features */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center relative overflow-hidden">
            {/* Face base */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-b from-pink-50 to-rose-50 dark:from-purple-800 dark:to-blue-800"></div>
            
            {/* Hair */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-t-full"></div>
            
            {/* Glasses frame */}
            <div className="absolute top-3 left-1 right-1 h-3 border border-gray-700 dark:border-gray-300 rounded-lg bg-transparent opacity-70"></div>
            
            {/* Left human eye (behind glasses) */}
            <div className="absolute top-3.5 left-2 w-1.5 h-1.5 bg-amber-700 rounded-full"></div>
            
            {/* Right robotic eye (glowing) */}
            <div className="absolute top-3.5 right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
            
            {/* Nose */}
            <div className="absolute top-4.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-pink-300 rounded-full"></div>
            
            {/* Mouth (slight smile) */}
            <div className="absolute top-5.5 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-pink-400 rounded-full"></div>
            
            {/* Blush */}
            <div className="absolute top-4 left-0.5 w-1 h-1 bg-pink-300 rounded-full opacity-40"></div>
            <div className="absolute top-4 right-0.5 w-1 h-1 bg-pink-300 rounded-full opacity-40"></div>
            
            {/* Film strip hair clip */}
            <div className="absolute top-1 right-1 w-1.5 h-1 bg-yellow-400 rounded-sm border border-gray-600 opacity-80"></div>
          </div>
          
          {/* Circuit pattern overlay on right side */}
          <div className="absolute inset-0 rounded-full">
            <div className="absolute top-2 right-1 w-3 h-3 opacity-30">
              <svg viewBox="0 0 24 24" className="w-full h-full text-cyan-400">
                <path stroke="currentColor" strokeWidth="1" fill="none" d="M2 12h4m4-8v4m4 4h4m-4 4v4"/>
                <circle cx="8" cy="8" r="1" fill="currentColor"/>
                <circle cx="16" cy="16" r="1" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Enhanced glass effect border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/30 to-transparent pointer-events-none shadow-lg"></div>
    </div>
  );
};
