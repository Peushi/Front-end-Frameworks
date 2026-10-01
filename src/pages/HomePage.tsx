import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import StatsBanner from "../components/StatsBanner";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { getFavorites, getTheme, setTheme } from "../utils/storage";
import type { Movie } from "../types";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [theme, setCurrentTheme] = useState<"dark" | "light">(getTheme());
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [favoriteCount, setFavoriteCount] = useState(
    () => getFavorites().length,
  );

  const {
    movies,
    isLoading,
    error,
    totalResults,
    isLiveApi,
  } = useMovies({
    search,
    genre,
    sort,
    onlyFavorites,
  });

  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  const handleToggleFavorites = () => {
    setOnlyFavorites((current) => !current);
  };

  return (
    <>
      <Header
        search={search}
        onSearch={setSearch}
        onlyFavorites={onlyFavorites}
        onToggleFavorites={handleToggleFavorites}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        favCount={favoriteCount}
        onOpenApiConfig={() => {}}
      />

      <FilterBar
        genre={genre}
        onGenreChange={setGenre}
        sort={sort}
        onSortChange={setSort}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <StatsBanner
        totalMovies={movies.length}
        totalResults={totalResults}
        isLiveApi={isLiveApi}
      />

      <main className="main-container">
        {isLoading && <p>Loading movies...</p>}

        {error && <p>{error}</p>}

        {!isLoading && !error && (
          <MovieList
            movies={movies}
            onMovieClick={setSelectedMovie}
          />
        )}
      </main>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
};

export default HomePage;