
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
    // Only fetch for anime category, ignore others for now
    if (category !== "anime") {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch from json_data collection
        const moviesRef = collection(db, "json_data");

        // Create query to get all documents
        const q = query(moviesRef);

        const querySnapshot = await getDocs(q);
        const moviesData: Movie[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Extract the English Title and other relevant fields
          if (data["English Title"]) {
            moviesData.push({
              id: doc.id,
              title: data["English Title"],
              japaneseTitle: data["Japanese Title"] || "",
              year: data["Premiered"] || data["Aired"] || "",
              episodes: data["Episodes"] || "",
              genres: data["Genres"] || "",
              popularity: data["Popularity"] || "",
              // Add any other fields you want to use
            });
          }
        });

        // Sort alphabetically by English title
        moviesData.sort((a, b) => a.title.localeCompare(b.title));

        setMovies(moviesData);
      } catch (err: any) {
        console.error("Error fetching movies:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  return { movies, loading, error };
};

// Alternative version if you want to filter by specific criteria
export const useAnimeMovies = (category: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category !== "anime") {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const moviesRef = collection(db, "json_data");
        const querySnapshot = await getDocs(moviesRef);
        const moviesData: Movie[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Only include documents that have an English Title
          if (data["English Title"] && data["English Title"].trim() !== "") {
            moviesData.push({
              id: doc.id,
              title: data["English Title"],
              japaneseTitle: data["Japanese Title"] || "",
              // Extract year from different possible fields
              year: extractYear(data["Premiered"] || data["Aired"] || ""),
              episodes: data["Episodes"] || "N/A",
              genres: data["Genres"] || "N/A",
              popularity: data["Popularity"] || "",
            });
          }
        });

        // Sort by title
        moviesData.sort((a, b) => a.title.localeCompare(b.title));

        setMovies(moviesData);
      } catch (err: any) {
        console.error("Error fetching anime:", err);
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
