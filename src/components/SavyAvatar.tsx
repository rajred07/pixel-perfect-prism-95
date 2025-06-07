
import React from 'react';

export const SavyAvatar: React.FC = () => {
  return (
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-0.5">
        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden border-2 border-transparent bg-clip-padding">
          <img 
            src="/lovable-uploads/b1b3df6b-53a2-4a09-a7d6-33e1edf1db7f.png" 
            alt="Savyy AI Avatar" 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
