import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-link">
          Home <kbd>Shift+H</kbd>
        </Link>
        <Link to="/about" className="nav-link">
          About <kbd>Shift+A</kbd>
        </Link>
        <Link to="/dashboard" className="nav-link">
          Dashboard <kbd>Shift+D</kbd>
        </Link>
        <Link to="/settings" className="nav-link">
          Settings <kbd>Shift+S</kbd>
        </Link>
      </nav>
      <div className="header-actions">
        <button className="btn-secondary">
          Search <kbd>Shift+K</kbd>
        </button>
        <button className="btn-secondary">
          Help <kbd>Shift+?</kbd>
        </button>
      </div>
    </header>
  );
}
