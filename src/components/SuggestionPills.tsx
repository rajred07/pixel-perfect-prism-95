
import React from 'react';

interface SuggestionPillsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const SuggestionPills: React.FC<SuggestionPillsProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    "Is it worth watching?",
    "Any similar recommendations?",
    "What's the plot about?"
  ];

  return (
    <div className="flex flex-wrap gap-2 px-4 py-2 max-sm:px-3 font-poppins">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion)}
          className="px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 rounded-full shadow-md hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 transition-all duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-800/40 dark:hover:to-blue-800/40"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};
