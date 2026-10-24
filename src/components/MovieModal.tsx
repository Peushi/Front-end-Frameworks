import { X, Heart } from "lucide-react";
import type { Movie } from "../types";
import { getPosterUrl, getBackdropUrl } from "../data/sampleMovies";
import { getGenreNames } from "../data/genres";
import { useAppContext } from "../context/AppContext";

type MovieModalProps = {
  movie: Movie | null;
  onClose: () => void;
};

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const { toggleFavorite, isFavorite } = useAppContext();

  if (!movie) {
    return null;
  }

  const favourite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    toggleFavorite(movie);
  };

  return (
    <div
      className="modal-overlay active"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${movie.title} details`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close movie details"
        >
          <X size={20} />
        </button>

        <div
          className="modal-backdrop-hero"
          style={{
            backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})`,
          }}
        />

        <div className="modal-body">
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
            className="modal-poster"
          />

          <div className="modal-content-details">
            <h2 className="modal-title">{movie.title}</h2>

            {movie.original_title !== movie.title && (
              <p className="modal-original-title">
                {movie.original_title}
              </p>
            )}

            <div className="modal-meta-row">
              <span className="modal-meta-item">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>

              <span className="modal-meta-item">
                {movie.release_date?.slice(0, 4)}
              </span>

              <span className="modal-meta-item">
                {movie.vote_count} votes
              </span>
            </div>

            <div className="movie-genres-tags">
              {getGenreNames(movie.genre_ids).map((genre) => (
                <span key={genre} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>

            <div>
              <h3 className="modal-overview-heading">Overview</h3>
              <p className="modal-overview">{movie.overview}</p>
            </div>

            <button
              type="button"
              className={`favorite-btn ${
                favourite ? "is-favourite" : ""
              }`}
              onClick={handleFavoriteClick}
              aria-label={
                favourite
                  ? "Remove from Favourites"
                  : "Add to Favourites"
              }
              aria-pressed={favourite}
            >
              <Heart
                size={18}
                fill={favourite ? "currentColor" : "none"}
              />
              {favourite ? "Remove from Favourites" : "Add to Favourites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;