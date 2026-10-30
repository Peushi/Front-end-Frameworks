
import { NavLink } from "react-router-dom";
import {
  Search,
  Heart,
  Sun,
  Moon,
  KeyRound,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

type HeaderProps = {
  search: string;
  onSearch: (value: string) => void;
  onlyFavorites: boolean;
  onToggleFavorites: () => void;
  onOpenApiConfig: () => void;
};

const Header = ({
  search,
  onSearch,
  onlyFavorites,
  onToggleFavorites,
  onOpenApiConfig,
}: HeaderProps) => {
  const { theme, toggleTheme, favorites } = useAppContext();

  return (
    <header className="site-header">
      <div className="header-inner">
        <nav className="header-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">
            About
          </NavLink>
        </nav>

        <div className="header-search">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="header-actions">
          <button
            className={`btn-icon-label ${onlyFavorites ? "active" : ""}`}
            onClick={onToggleFavorites}
          >
            <Heart size={18} />
            <span>
              {onlyFavorites ? "All Movies" : "Favorites"}
            </span>
            <span className="count-badge">{favorites.length}</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="theme-toggle-btn"
          >
            {theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <button
            className="btn-icon-label"
            onClick={onOpenApiConfig}
          >
            <KeyRound size={18} />
            <span>API Key</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
