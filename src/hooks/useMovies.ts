
import { useState, useEffect } from 'react';

// Simplified Movie interface
interface Movie {
  id: string;
  title: string;
  category: string;
  // Add other movie properties as needed
}

// Mock K-Movies data - Replace this array with your JSON data
const kmovies: Movie[] = [
  // TEMPLATE: Replace this with your JSON data
  // Example format:
  {
    id: "1",
    title: "Example K-Movie 1",
    category: "K-Drama"
  },
  {
    id: "2", 
    title: "Example K-Movie 2",
    category: "K-Movie"
  }
  // Add your complete movie JSON data here...
];

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading delay to match Firebase behavior
    const loadMovies = async () => {
      try {
        setLoading(true);
        
        // Use local JSON data instead of Firebase
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        setMovies(kmovies);
        setError(null);
        
        /* FIREBASE CODE - COMMENTED OUT FOR LATER USE
        const q = query(collection(db, 'movies'), orderBy('title'));
        const querySnapshot = await getDocs(q);
        const moviesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Movie[];
        setMovies(moviesData);
        */
        
      } catch (err) {
        console.error('Error loading movies:', err);
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // Group movies by category
  const moviesByCategory = movies.reduce((acc, movie) => {
    const category = movie.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(movie);
    return acc;
  }, {} as Record<string, Movie[]>);

  return {
    movies,
    moviesByCategory,
    loading,
    error,
  };
};
