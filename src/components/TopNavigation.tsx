
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
    { id: 'anime', label: 'Anime/Manga', icon: '🎥' },
    { id: 'dramas', label: 'Dramas', icon: '📺' }
  ];

  return (
    <div className="flex items-center gap-6 px-6 py-4 border-b border-[#362B2B] max-md:gap-4 max-sm:gap-2 max-sm:px-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === category.id
              ? 'bg-[#362B2B] text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#362B2B]/50'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </button>
      ))}
    </div>
  );
};
