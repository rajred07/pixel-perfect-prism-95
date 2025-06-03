
import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Movie {
  id: string;
  title: string;
  japaneseTitle?: string;
  year?: string;
  episodes?: string;
  genres?: string;
  popularity?: string;
}

export const useMovies = (category: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch for specific categories that use Firebase
    if (!['anime', 'bollywood', 'hollywood', 'dramas'].includes(category)) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        // Map categories to Firebase collections
        const collectionMap: { [key: string]: string } = {
          'anime': 'json_data',
          'bollywood': 'bollywood_movies',
          'hollywood': 'hollywood_movies',
          'dramas': 'drama_series'
        };

        const collectionName = collectionMap[category];
        const moviesRef = collection(db, collectionName);
        const q = query(moviesRef);
        const querySnapshot = await getDocs(q);
        const moviesData: Movie[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Handle different data structures based on category
          if (category === 'anime') {
            if (data["English Title"]) {
              moviesData.push({
                id: doc.id,
                title: data["English Title"],
                japaneseTitle: data["Japanese Title"] || "",
                year: extractYear(data["Premiered"] || data["Aired"] || ""),
                episodes: data["Episodes"] || "",
                genres: data["Genres"] || "",
                popularity: data["Popularity"] || "",
              });
            }
          } else {
            // For other categories, assume standard structure
            if (data.title || data.name) {
              moviesData.push({
                id: doc.id,
                title: data.title || data.name,
                year: data.year || extractYear(data.release_date || data.aired || ""),
                episodes: data.episodes || data.seasons || "",
                genres: data.genres || "",
                popularity: data.rating || data.popularity || "",
              });
            }
          }
        });

        // Sort alphabetically by title
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

// Helper function to extract year from date strings
const extractYear = (dateString: string): string => {
  if (!dateString) return "";

  // Handle formats like "Jan 7, 2017 to Mar 25, 2017" or "Winter 2017"
  const yearMatch = dateString.match(/\b(19|20)\d{2}\b/);
  return yearMatch ? yearMatch[0] : "";
};
