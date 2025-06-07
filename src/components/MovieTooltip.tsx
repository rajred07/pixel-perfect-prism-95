
import React from 'react';

interface Movie {
  id: string;
  title: string;
  genres?: string;
  genre?: string[];
  synopsis?: string;
  score?: string;
}

interface MovieTooltipProps {
  movie: Movie;
  isVisible: boolean;
  position: { x: number; y: number };
}

export const MovieTooltip: React.FC<MovieTooltipProps> = ({ 
  movie, 
  isVisible, 
  position 
}) => {
  const formatGenres = (movie: Movie): string => {
    if (movie.genre && Array.isArray(movie.genre)) {
      return movie.genre.slice(0, 3).join(', ');
    }
    if (movie.genres) {
      return movie.genres.split(',').slice(0, 3).join(',').trim();
    }
    return 'Unknown';
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl p-4 max-w-xs transition-all duration-300 ease-out opacity-100 transform scale-100 pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: 'translateY(-100%)'
      }}
    >
      <div className="space-y-2">
        <h3 className="font-bold text-black dark:text-white text-sm leading-tight">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            Genre:
          </span>
          <span className="text-xs text-gray-800 dark:text-gray-200">
            {formatGenres(movie)}
          </span>
        </div>

        {movie.score && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Score:
            </span>
            <span className="bg-yellow-500 text-black px-1.5 py-0.5 rounded text-xs font-medium">
              ⭐ {movie.score}
            </span>
          </div>
        )}

        {movie.synopsis && (
          <div className="space-y-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium block">
              Synopsis:
            </span>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {movie.synopsis.length > 120 
                ? `${movie.synopsis.substring(0, 120)}...` 
                : movie.synopsis
              }
            </p>
          </div>
        )}
      </div>
      
      {/* Tooltip arrow */}
      <div className="absolute bottom-0 left-4 transform translate-y-full">
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-200 dark:border-t-gray-600"></div>
      </div>
    </div>
  );
};
