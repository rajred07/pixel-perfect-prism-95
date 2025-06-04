
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { AvatarDropdown } from './AvatarDropdown';
import { SavyAvatar } from './SavyAvatar';
import { Sun, Moon } from 'lucide-react';

interface ChatHeaderProps {
  selectedMovie?: string | null;
  onSettingsClick?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedMovie,
  onSettingsClick
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center border px-10 py-3 border-gray-300 dark:border-[#362B2B] bg-white dark:bg-[#171212] max-md:px-6 max-md:py-3 max-sm:px-4 max-sm:py-3 font-poppins">
      <div className="flex items-center gap-4">
        <SavyAvatar />
        <h1 className="text-black dark:text-white text-lg font-bold leading-[23px] h-[23px]">
          Savy – Your Movie Expert 🤖🎬
        </h1>
      </div>
      <div className="flex justify-end items-center gap-8 flex-1 max-md:gap-4">
        {selectedMovie && (
          <div className="flex h-8 justify-center items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-sm px-4 py-0 rounded-xl border border-purple-200/50 dark:border-purple-700/50 max-sm:px-3 max-sm:py-0">
            <span className="text-black dark:text-white text-sm font-medium leading-[21px] flex-1 max-sm:text-xs">
              🎬 Currently Selected: {selectedMovie}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button 
            className={`flex h-10 justify-center items-center gap-2 px-2.5 py-0 rounded-xl hover:bg-gray-300 dark:hover:bg-[#362B2B]/80 transition-colors ${
              theme === 'light' ? 'bg-gray-200 dark:bg-[#362B2B]' : 'bg-gray-300 dark:bg-[#362B2B]/50'
            }`}
            aria-label="Toggle light mode"
            onClick={toggleTheme}
          >
            <Sun className="w-5 h-5 text-black dark:text-white" />
          </button>
          <button 
            className={`flex h-10 justify-center items-center gap-2 px-2.5 py-0 rounded-xl hover:bg-gray-300 dark:hover:bg-[#362B2B]/80 transition-colors ${
              theme === 'dark' ? 'bg-gray-200 dark:bg-[#362B2B]' : 'bg-gray-300 dark:bg-[#362B2B]/50'
            }`}
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
          >
            <Moon className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>
        <AvatarDropdown onSettingsClick={onSettingsClick} />
      </div>
    </div>
  );
};
