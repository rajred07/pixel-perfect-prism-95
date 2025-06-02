
import React from 'react';

interface Movie {
  id: string;
  title: string;
  year?: string;
  poster?: string;
}

interface MovieSectionProps {
  category: string;
  movies: Movie[];
  selectedMovie: string | null;
  onMovieSelect: (movie: Movie) => void;
  isVisible: boolean;
}

export const MovieSection: React.FC<MovieSectionProps> = ({
  category,
  movies,
  selectedMovie,
  onMovieSelect,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="px-6 py-4 border-b border-[#362B2B] max-sm:px-4">
      <h3 className="text-white text-lg font-semibold mb-4 capitalize">
        {category} Movies
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#362B2B] scrollbar-track-transparent">
        {movies.map((movie) => (
          <button
            key={movie.id}
            onClick={() => onMovieSelect(movie)}
            className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all min-w-[150px] text-left ${
              selectedMovie === movie.title
                ? 'border-[#E8B5B8] bg-[#362B2B] text-white'
                : 'border-[#362B2B] bg-[#171212] text-gray-300 hover:border-[#E8B5B8]/50 hover:bg-[#362B2B]/50'
            }`}
          >
            <div className="font-medium text-sm">{movie.title}</div>
            {movie.year && (
              <div className="text-xs text-gray-400 mt-1">{movie.year}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
