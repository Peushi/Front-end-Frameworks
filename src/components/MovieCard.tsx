import type { MouseEvent } from "react";
import type { Movie } from "../types";
import { getPosterUrl } from "../data/sampleMovies";
import { useAppContext } from "../context/AppContext";

type MovieCardProps = {
  movie: Movie;
  onClick?: () => void;
};

function MovieCard({ movie, onClick }: MovieCardProps) {
  const { toggleFavorite, isFavorite } = useAppContext();
  const favourite = isFavorite(movie.id);

  const handleFavouriteClick = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    toggleFavorite(movie);
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
              type="button"
              className={`favorite-btn ${
                favourite ? "is-favourite" : ""
              }`}
              title={
                favourite
                  ? "Remove from Favourites"
                  : "Add to Favourites"
              }
              aria-label={
                favourite
                  ? "Remove from Favourites"
                  : "Add to Favourites"
              }
              aria-pressed={favourite}
              onClick={handleFavouriteClick}
            >
              {favourite ? "♥" : "♡"}
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