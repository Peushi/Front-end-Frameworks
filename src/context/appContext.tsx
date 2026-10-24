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
} from "../utils/storage";

// 1. Define the state
type State = {
  theme: Theme;
  favorites: Movie[];
};

// 2. Define the actions
type Action =
  | { type: "SET_THEME"; payload: Theme }
  | { type: "TOGGLE_FAVOURITE"; payload: Movie };

// 3. Reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };

    case "TOGGLE_FAVOURITE":
      toggleFavoriteStorage(action.payload);

      return {
        ...state,
        favorites: getFavorites(),
      };

    default:
      return state;
  }
};

// 4. Define the context value
type AppContextType = {
  theme: Theme;
  toggleTheme: () => void;
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
};

// 5. Create the context
const AppContext = createContext<AppContextType | undefined>(
  undefined,
);

// 6. Create the provider
export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    theme: getTheme(),
    favorites: getFavorites(),
  });

  // Persist the theme and apply it to the document
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
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: movie,
    });
  };

  const isFavorite = (id: number) =>
    state.favorites.some((movie) => movie.id === id);

  return (
    <AppContext.Provider
      value={{
        theme: state.theme,
        toggleTheme,
        favorites: state.favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 7. Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be used within an AppProvider",
    );
  }

  return context;
};