import { useEffect, useState } from "react";
import { movieService } from "../services/movieService";
import type { Movie } from "../types";

type UseMoviesOptions = {
  search?: string;
  genre?: string;
  sort?: string;
  onlyFavorites?: boolean;
  page?: number;
};

export function useMovies({
  search = "",
  genre = "",
  sort = "popularity",
  onlyFavorites = false,
  page = 1,
}: UseMoviesOptions = {}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [isLiveApi, setIsLiveApi] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await movieService.fetchMovies({
          search,
          genre,
          sort,
          onlyFavorites,
          page,
          signal: controller.signal,
        });

        setMovies(data.results);
        setTotalResults(data.total_results);
        setIsLiveApi(data.isLiveApi);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError("Failed to load movies.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();

    return () => {
      controller.abort();
    };
  }, [search, genre, sort, onlyFavorites, page]);

  return {
    movies,
    isLoading,
    error,
    totalResults,
    isLiveApi,
  };
}