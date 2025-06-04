
import React from 'react';

export const SavyAvatar: React.FC = () => {
  return (
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-blue-500 to-purple-600 p-0.5 animate-glow">
        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden border-2 border-transparent bg-clip-padding">
          {/* Using a placeholder anime-style avatar - in a real app, you'd use a custom illustration */}
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=48&h=48&fit=crop&crop=face"
            alt="Savy - Your Movie Expert"
            className="w-full h-full object-cover rounded-full filter brightness-110 contrast-110 saturate-110"
          />
          {/* Robotic eye overlay effect */}
          <div className="absolute inset-0 rounded-full">
            <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
          </div>
        </div>
      </div>
      {/* Glass effect border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/20 to-transparent pointer-events-none"></div>
    </div>
  );
};
