
import { useState, useEffect } from "react";
// import { collection, getDocs, query } from "firebase/firestore";
// import { db } from "../lib/firebase";

interface Movie {
  id: string;
  title: string;
  japaneseTitle?: string;
  year?: string;
  episodes?: string;
  genres?: string;
  genre?: string[];
  popularity?: string;
  synopsis?: string;
  score?: string;
}

// Local JSON data - Replace this with your actual JSON data
const localMovieData: { [key: string]: any[] } = {
  kmovies: [
    // TEMPLATE: Replace this array with your K-Movies JSON data
    // Example structure:
    {
      id: "1",
      title: "Parasite",
      year: "2019",
      genre: ["Thriller", "Drama"],
      synopsis: "A poor family schemes to become employed by a wealthy family by infiltrating their household and posing as unrelated, highly qualified individuals.",
      score: "8.6"
    },
    {
      id: "2", 
      title: "Oldboy",
      year: "2003",
      genre: ["Action", "Drama", "Mystery"],
      synopsis: "After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is released, only to find that he must find his captor in five days.",
      score: "8.4"
    },
    {
      id: "3",
      title: "Train to Busan", 
      year: "2016",
      genre: ["Horror", "Action", "Thriller"],
      synopsis: "While a zombie virus breaks out in South Korea, passengers struggle to survive on the train from Seoul to Busan.",
      score: "7.6"
    }
    // Add your complete K-Movies JSON data here
  ],
  // You can add other categories here later
  anime: [],
  bollywood: [],
  hollywood: [],
  dramas: [],
  manga: []
};

export const useMovies = (category: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch for specific categories
    if (!['anime', 'bollywood', 'hollywood', 'dramas', 'kmovies', 'manga'].includes(category)) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        // Use local JSON data instead of Firebase
        const categoryData = localMovieData[category] || [];
        const moviesData: Movie[] = [];

        categoryData.forEach((data, index) => {
          if (data.title) {
            moviesData.push({
              id: data.id || `${category}_${index}`,
              title: data.title,
              japaneseTitle: data.japaneseTitle || "",
              year: data.year || extractYear(data.release_date || data.aired || ""),
              episodes: data.episodes || data.seasons || "",
              genres: Array.isArray(data.genre) ? data.genre.join(', ') : (data.genres || ""),
              genre: Array.isArray(data.genre) ? data.genre : [],
              popularity: data.popularity || "",
              synopsis: data.synopsis || "",
              score: data.score || data.rating || data.popularity || "",
            });
          }
        });

        // Sort alphabetically by title
        moviesData.sort((a, b) => a.title.localeCompare(b.title));
        setMovies(moviesData);
      } catch (err: any) {
        console.error(`Error loading ${category} movies:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  return { movies, loading, error };
};

/* 
FIREBASE CODE - COMMENTED FOR FUTURE USE

import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../lib/firebase";

export const useMovies = (category: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!['anime', 'bollywood', 'hollywood', 'dramas', 'kmovies', 'manga'].includes(category)) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const collectionMap: { [key: string]: string } = {
          'anime': 'Anime',
          'bollywood': 'Bollywood',
          'hollywood': 'Hollywood',
          'dramas': 'KDrama',
          'kmovies': 'KMovie',
          'manga': 'Manga'
        };

        const collectionName = collectionMap[category];
        const moviesRef = collection(db, collectionName);
        const q = query(moviesRef);
        const querySnapshot = await getDocs(q);
        const moviesData: Movie[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.title) {
            moviesData.push({
              id: doc.id,
              title: data.title,
              japaneseTitle: data.japaneseTitle || "",
              year: data.year || extractYear(data.release_date || data.aired || ""),
              episodes: data.episodes || data.seasons || "",
              genres: Array.isArray(data.genre) ? data.genre.join(', ') : (data.genres || ""),
              genre: Array.isArray(data.genre) ? data.genre : [],
              popularity: data.popularity || "",
              synopsis: data.synopsis || "",
              score: data.score || data.rating || data.popularity || "",
            });
          }
        });

        moviesData.sort((a, b) => a.title.localeCompare(b.title));
        setMovies(moviesData);
      } catch (err: any) {
        console.error(`Error fetching ${category} movies:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  return { movies, loading, error };
};
*/

// Helper function to extract year from date strings
const extractYear = (dateString: string): string => {
  if (!dateString) return "";

  // Handle formats like "Jan 7, 2017 to Mar 25, 2017" or "Winter 2017"
  const yearMatch = dateString.match(/\b(19|20)\d{2}\b/);
  return yearMatch ? yearMatch[0] : "";
};
