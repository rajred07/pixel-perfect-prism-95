
import React from 'react';

interface TopNavigationProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  selectedCategory,
  onCategorySelect
}) => {
  const categories = [
    { id: 'bollywood', label: 'Bollywood', icon: '🎬' },
    { id: 'hollywood', label: 'Hollywood', icon: '🎞️' },
    { id: 'anime', label: 'Anime', icon: '🎥' },
    { id: 'dramas', label: 'K-Drama', icon: '📺' },
    { id: 'kmovies', label: 'K-Movies', icon: '🎦' },
    { id: 'manga', label: 'Manga', icon: '📚' }
  ];

  return (
    <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-300 dark:border-[#362B2B] bg-white dark:bg-[#171212] max-md:gap-4 max-sm:gap-2 max-sm:px-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === category.id
              ? 'bg-blue-500 text-white dark:bg-[#362B2B] dark:text-white'
              : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:text-white dark:hover:bg-[#362B2B]/50'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </button>
      ))}
    </div>
  );
};
