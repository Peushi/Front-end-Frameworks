
import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import StatsBanner from "../components/StatsBanner";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { useAppContext } from "../context/AppContext";
import { getApiKey, setApiKey } from "../utils/storage";
import type { Movie } from "../types";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showWatchlist, setShowWatchlist] = useState(false);

  const [showApiConfig, setShowApiConfig] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(getApiKey);

  const { watchlist } = useAppContext();

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

  const handleToggleFavorites = () => {
    setOnlyFavorites((current) => !current);
    setShowWatchlist(false);
  };

  const handleSaveApiKey = () => {
    setApiKey(apiKeyInput);
    setShowApiConfig(false);
    window.location.reload();
  };

  const handleRemoveApiKey = () => {
    setApiKey("");
    setApiKeyInput("");
    setShowApiConfig(false);
    window.location.reload();
  };

  const displayedMovies = showWatchlist ? watchlist : movies;

  return (
    <>
      <Header
        search={search}
        onSearch={setSearch}
        onlyFavorites={onlyFavorites}
        onToggleFavorites={handleToggleFavorites}
        onOpenApiConfig={() => {
          setApiKeyInput(getApiKey());
          setShowApiConfig(true);
        }}
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
        <button
          type="button"
          className="watchlist-toggle"
          onClick={() => {
            setShowWatchlist((current) => !current);
            setOnlyFavorites(false);
          }}
        >
          {showWatchlist
            ? "Back to All Movies"
            : `My Watchlist (${watchlist.length})`}
        </button>

        {!showWatchlist && isLoading && <p>Loading movies...</p>}

        {!showWatchlist && error && <p>{error}</p>}

        {(showWatchlist || (!isLoading && !error)) && (
          <MovieList
            movies={displayedMovies}
            onMovieClick={setSelectedMovie}
          />
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {showApiConfig && (
        <div
          role="presentation"
          onClick={() => setShowApiConfig(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="api-modal-title"
            onClick={(event) => event.stopPropagation()}
            style={{
              background: "var(--bg-card, #171a21)",
              color: "var(--text-main, white)",
              border: "1px solid var(--border-color, #333)",
              borderRadius: "16px",
              padding: "28px",
              width: "100%",
              maxWidth: "440px",
            }}
          >
            <h2 id="api-modal-title">TMDB API Configuration</h2>

            <p>
              Enter your TMDB Read Access Token to load live movie data.
            </p>

            <label htmlFor="api-key-input">
              API Read Access Token
            </label>

            <input
              id="api-key-input"
              type="password"
              value={apiKeyInput}
              onChange={(event) => setApiKeyInput(event.target.value)}
              placeholder="Enter your TMDB token..."
              style={{
                display: "block",
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                marginTop: "8px",
                marginBottom: "20px",
                borderRadius: "8px",
              }}
            />

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button type="button" onClick={handleSaveApiKey}>
                Save API Key
              </button>

              <button type="button" onClick={handleRemoveApiKey}>
                Remove API Key
              </button>

              <button
                type="button"
                onClick={() => setShowApiConfig(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
