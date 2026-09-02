import MovieCard from "./components/MovieCard";

function App() {
  const movie = {
    title: "Inception",
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  };

  return (
    <div>
      <h1>Movie App</h1>
      <MovieCard movie={movie} />
    </div>
  );
}

export default App;

