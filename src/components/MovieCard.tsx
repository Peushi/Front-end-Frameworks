import type { Movie } from "../types";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";

  return (
    <div>
      <img src={posterUrl} alt={movie.title} />
      <h2>{movie.title}</h2>
    </div>
  );
};

export default MovieCard;