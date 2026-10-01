import { useState } from "react";
import type { Movie } from "../types";
import { getPosterUrl } from "../data/sampleMovies";
import { getFavorites, toggleFavorite } from "../utils/storage";

type MovieCardProps = {
  movie: Movie;
  onClick?: () => void;
};

function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isFavourite, setIsFavourite] = useState(() =>
    getFavorites().some((favorite) => favorite.id === movie.id),
  );

  const handleFavouriteClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    toggleFavorite(movie);
    setIsFavourite((current) => !current);
  };

  return (
    <article
      className="movie-card"
      tabIndex={0}
      aria-label={movie.title}
      onClick={onClick}
    >
      <div className="poster-wrapper">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className="poster-img"
          loading="lazy"
        />

        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>

            <button
              className={`favorite-btn ${
                isFavourite ? "is-favourite" : ""
              }`}
              title={
                isFavourite
                  ? "Remove from Watchlist"
                  : "Add to Watchlist"
              }
              onClick={handleFavouriteClick}
            >
              {isFavourite ? "♥" : "♡"}
            </button>
          </div>

          <span className="quick-view-hint">View Details</span>
        </div>
      </div>

      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>

        <div className="movie-card-meta">
          <span>{movie.release_date?.slice(0, 4)}</span>
          <span>{movie.vote_count} votes</span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;