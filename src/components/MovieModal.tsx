import { X } from "lucide-react";
import type { Movie } from "../types";
import { getPosterUrl, getBackdropUrl } from "../data/sampleMovies";
import { getGenreNames } from "../data/genres";

type MovieModalProps = {
  movie: Movie | null;
  onClose: () => void;
};

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  if (!movie) {
    return null;
  }

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div
        className="modal-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close"
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
            alt={movie.title}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;