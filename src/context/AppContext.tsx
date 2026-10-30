
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import type { Movie, Theme } from "../types";
import {
  getFavorites,
  toggleFavorite as toggleFavoriteStorage,
  getTheme,
  setTheme,
  getWatchlist,
  toggleWatchlist as toggleWatchlistStorage,
} from "../utils/storage";

type State = {
  theme: Theme;
  favorites: Movie[];
  watchlist: Movie[];
};

type Action =
  | { type: "SET_THEME"; payload: Theme }
  | { type: "SET_FAVORITES"; payload: Movie[] }
  | { type: "SET_WATCHLIST"; payload: Movie[] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };

    case "SET_FAVORITES":
      return { ...state, favorites: action.payload };

    case "SET_WATCHLIST":
      return { ...state, watchlist: action.payload };

    default:
      return state;
  }
};

type AppContextType = {
  theme: Theme;
  toggleTheme: () => void;
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
  watchlist: Movie[];
  toggleWatchlist: (movie: Movie) => void;
  isInWatchlist: (id: number) => boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    theme: getTheme(),
    favorites: getFavorites(),
    watchlist: getWatchlist(),
  });

  useEffect(() => {
    setTheme(state.theme);
  }, [state.theme]);

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    });
  };

  const toggleFavorite = (movie: Movie) => {
    toggleFavoriteStorage(movie);
    dispatch({
      type: "SET_FAVORITES",
      payload: getFavorites(),
    });
  };

  const isFavorite = (id: number) =>
    state.favorites.some((movie) => movie.id === id);

  const toggleWatchlist = (movie: Movie) => {
    toggleWatchlistStorage(movie);
    dispatch({
      type: "SET_WATCHLIST",
      payload: getWatchlist(),
    });
  };

  const isInWatchlist = (id: number) =>
    state.watchlist.some((movie) => movie.id === id);

  return (
    <AppContext.Provider
      value={{
        theme: state.theme,
        toggleTheme,
        favorites: state.favorites,
        toggleFavorite,
        isFavorite,
        watchlist: state.watchlist,
        toggleWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
