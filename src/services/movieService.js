import { SAMPLE_MOVIES } from "../data/sampleMovies";
import { getApiKey, getFavorites } from "../utils/storage";

const API_BASE_URL = "https://api.themoviedb.org/3";

export const movieService = {
  async fetchMovies({
    search = "",
    genre = "",
    sort = "popularity",
    onlyFavorites = false,
    page = 1,
    signal,
  } = {}) {
    const apiKey = getApiKey();

    // No API key → use sample movies
    if (!apiKey) {
      let results = [...SAMPLE_MOVIES];

      if (search) {
        results = results.filter((movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase()),
        );
      }

      if (genre) {
        results = results.filter((movie) =>
          movie.genre_ids?.includes(Number(genre)),
        );
      }

      if (sort === "rating") {
        results.sort((a, b) => b.vote_average - a.vote_average);
      } else if (sort === "release_date") {
        results.sort((a, b) =>
          (b.release_date || "").localeCompare(a.release_date || ""),
        );
      } else if (sort === "title") {
        results.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        results.sort((a, b) => b.popularity - a.popularity);
      }

      if (onlyFavorites) {
        const favorites = getFavorites();
        const favoriteIds = new Set(favorites.map((movie) => movie.id));

        results = results.filter((movie) => favoriteIds.has(movie.id));
      }

      return {
        results,
        total_pages: 1,
        total_results: results.length,
        isLiveApi: false,
      };
    }

    let url;

    if (search) {
      url = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
        search,
      )}&page=${page}`;
    } else {
      url = `${API_BASE_URL}/discover/movie?page=${page}`;

      if (genre) {
        url += `&with_genres=${genre}`;
      }

      if (sort === "rating") {
        url += "&sort_by=vote_average.desc";
      } else if (sort === "release_date") {
        url += "&sort_by=primary_release_date.desc";
      } else if (sort === "title") {
        url += "&sort_by=original_title.asc";
      } else {
        url += "&sort_by=popularity.desc";
      }
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    let results = data.results;

    if (onlyFavorites) {
      const favorites = getFavorites();
      const favoriteIds = new Set(favorites.map((movie) => movie.id));

      results = results.filter((movie) => favoriteIds.has(movie.id));
    }

    return {
      results,
      total_pages: data.total_pages,
      total_results: data.total_results,
      isLiveApi: true,
    };
  },
};