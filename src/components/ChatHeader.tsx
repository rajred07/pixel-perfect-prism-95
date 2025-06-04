
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
    <div className="flex justify-between items-center border-b px-6 py-4 border-gray-300 dark:border-[#362B2B] bg-white dark:bg-[#171212] font-poppins">
      <div className="flex items-center gap-4">
        <SavyAvatar />
        <h1 className="text-black dark:text-white text-xl font-bold leading-tight">
          Savy – Your Movie Expert 🤖🎬
        </h1>
      </div>
      <div className="flex justify-end items-center gap-6 flex-1">
        {selectedMovie && (
          <div className="flex h-10 justify-center items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
            <span className="text-black dark:text-white text-sm font-medium leading-tight flex-1">
              🎬 Currently Selected: {selectedMovie}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button 
            className={`flex h-10 w-10 justify-center items-center rounded-xl hover:bg-gray-100 dark:hover:bg-[#362B2B]/80 transition-colors ${
              theme === 'light' ? 'bg-gray-100 dark:bg-[#362B2B]' : 'bg-gray-200 dark:bg-[#362B2B]/50'
            }`}
            aria-label="Toggle light mode"
            onClick={toggleTheme}
          >
            <Sun className="w-5 h-5 text-black dark:text-white" />
          </button>
          <button 
            className={`flex h-10 w-10 justify-center items-center rounded-xl hover:bg-gray-100 dark:hover:bg-[#362B2B]/80 transition-colors ${
              theme === 'dark' ? 'bg-gray-100 dark:bg-[#362B2B]' : 'bg-gray-200 dark:bg-[#362B2B]/50'
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
