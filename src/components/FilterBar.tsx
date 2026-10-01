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
      <div className="genre-filters">
        {genres.map((item) => (
          <button
            key={item.id}
            className={genre === item.id ? "active" : ""}
            onClick={() => onGenreChange(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="filter-actions">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
          <option value="release_date">Release Date</option>
          <option value="title">Title</option>
        </select>

        <button
          onClick={() => onViewModeChange("grid")}
          aria-label="Grid view"
          className={viewMode === "grid" ? "active" : ""}
        >
          <Grid3X3 size={18} />
        </button>

        <button
          onClick={() => onViewModeChange("list")}
          aria-label="List view"
          className={viewMode === "list" ? "active" : ""}
        >
          <List size={18} />
        </button>
      </div>
    </section>
  );
};

export default FilterBar;