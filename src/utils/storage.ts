import type { Movie, Theme } from "../types";

const FAVORITES_KEY = "cinegrid_favorites";
const WATCHLIST_KEY = "cinegrid_watchlist";
const THEME_KEY = "cinegrid_theme";
const API_KEY = "cinegrid-api-key";

export function getFavorites(): Movie[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getWatchlist(): Movie[] {
  try {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function toggleWatchlist(movie: Movie): Movie[] {
  const watchlist = getWatchlist();

  const exists = watchlist.some((item) => item.id === movie.id);

  const updated = exists
    ? watchlist.filter((item) => item.id !== movie.id)
    : [...watchlist, movie];

  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));

  return updated;
}

export function toggleFavorite(movie: Movie): Movie[] {
  const favorites = getFavorites();

  const exists = favorites.some((fav) => fav.id === movie.id);

  const updated = exists
    ? favorites.filter((fav) => fav.id !== movie.id)
    : [...favorites, movie];

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

  return updated;
}

export function getTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);

  return stored === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}

export function getApiKey(): string {
  return localStorage.getItem(API_KEY) || "";
}

export function setApiKey(key: string): void {
  localStorage.setItem(API_KEY, key.trim());
}