
import { Grid3X3, List } from "lucide-react";

type FilterBarProps = {
  genre: string;
  onGenreChange: (genre: string) => void;
  sort: string;
  onSortChange: (sort: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
};

const genres = [
  { id: "", name: "All" },
  { id: "28", name: "Action" },
  { id: "12", name: "Adventure" },
  { id: "16", name: "Animation" },
  { id: "35", name: "Comedy" },
  { id: "80", name: "Crime" },
  { id: "18", name: "Drama" },
  { id: "27", name: "Horror" },
  { id: "10749", name: "Romance" },
  { id: "878", name: "Sci-Fi" },
  { id: "53", name: "Thriller" },
];

const FilterBar = ({
  genre,
  onGenreChange,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
}: FilterBarProps) => {
  return (
    <section className="filter-bar">
      <div className="genre-pills-scroll">
        {genres.map((item) => (
          <button
            key={item.id}
            className={`genre-pill ${genre === item.id ? "active" : ""}`}
            onClick={() => onGenreChange(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="filter-actions-right">
        <div className="sort-select-wrapper">
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
            <option value="release_date">Release Date</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div className="view-toggle-group">
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => onViewModeChange("grid")}
            aria-label="Grid view"
          >
            <Grid3X3 size={18} />
          </button>

          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => onViewModeChange("list")}
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
