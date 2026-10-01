import { NavLink } from "react-router-dom";
import {
  Search,
  Heart,
  Sun,
  Moon,
  KeyRound,
} from "lucide-react";

type HeaderProps = {
  search: string;
  onSearch: (value: string) => void;
  onlyFavorites: boolean;
  onToggleFavorites: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  favCount: number;
  onOpenApiConfig: () => void;
};

const Header = ({
  search,
  onSearch,
  onlyFavorites,
  onToggleFavorites,
  theme,
  onToggleTheme,
  favCount,
  onOpenApiConfig,
}: HeaderProps) => {
  return (
    <header className="site-header">
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/about">
          About
        </NavLink>
      </nav>

      <div className="header-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="header-actions">
        <button onClick={onToggleFavorites}>
          <Heart size={18} />
          {onlyFavorites ? "All Movies" : `Favorites (${favCount})`}
        </button>

        <button onClick={onToggleTheme}>
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button onClick={onOpenApiConfig}>
          <KeyRound size={18} />
          API Key
        </button>
      </div>
    </header>
  );
};

export default Header;