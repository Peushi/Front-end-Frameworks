type SearchBarProps = {
  query: string;
  onChange: (value: string) => void;
};

function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;