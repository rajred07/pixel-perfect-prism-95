
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { AvatarDropdown } from './AvatarDropdown';
import { Sun, Moon } from 'lucide-react';

interface ChatHeaderProps {
  selectedMovie?: string | null;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedMovie
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center border px-10 py-3 border-[#362B2B] max-md:px-6 max-md:py-3 max-sm:px-4 max-sm:py-3">
      <div className="flex items-center gap-4">
        <h1 className="text-white text-lg font-bold leading-[23px] h-[23px]">
          Movie Chatbot
        </h1>
      </div>
      <div className="flex justify-end items-center gap-8 flex-1 max-md:gap-4">
        {selectedMovie && (
          <div className="flex h-8 justify-center items-center gap-2 bg-[#362B2B] px-4 py-0 rounded-xl max-sm:px-3 max-sm:py-0">
            <span className="text-white text-sm font-medium leading-[21px] flex-1 max-sm:text-xs">
              🎬 Currently Selected Movie: {selectedMovie}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button 
            className={`flex h-10 justify-center items-center gap-2 px-2.5 py-0 rounded-xl hover:bg-[#362B2B]/80 transition-colors ${
              theme === 'light' ? 'bg-[#362B2B]' : 'bg-[#362B2B]/50'
            }`}
            aria-label="Toggle light mode"
            onClick={toggleTheme}
          >
            <Sun className="w-5 h-5 text-white" />
          </button>
          <button 
            className={`flex h-10 justify-center items-center gap-2 px-2.5 py-0 rounded-xl hover:bg-[#362B2B]/80 transition-colors ${
              theme === 'dark' ? 'bg-[#362B2B]' : 'bg-[#362B2B]/50'
            }`}
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
          >
            <Moon className="w-5 h-5 text-white" />
          </button>
        </div>
        <AvatarDropdown />
      </div>
    </div>
  );
};
