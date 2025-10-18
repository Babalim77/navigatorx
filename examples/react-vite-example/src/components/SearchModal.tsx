import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNavigatorInstance } from './NavigatorXProvider';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Settings', path: '/settings' },
];

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const nav = getNavigatorInstance();

    // Register search shortcut
    nav.registerShortcut('search', ['Shift', 'k'], () => {
      setIsOpen(true);
    });

    return () => {
      nav.unregisterShortcut('search');
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const nav = getNavigatorInstance();

    // Register escape to close
    nav.registerShortcut('closeSearch', ['Shift', 'Escape'], () => {
      setIsOpen(false);
      setQuery('');
    });

    // Focus input
    inputRef.current?.focus();

    return () => {
      nav.unregisterShortcut('closeSearch');
    };
  }, [isOpen]);

  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="search"
          placeholder="Search pages... (Esc to close)"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="search-input"
        />
        <div className="search-results">
          {filteredPages.map(page => (
            <div
              key={page.path}
              className="search-result"
              onClick={() => handleSelect(page.path)}
            >
              {page.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}