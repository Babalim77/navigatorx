import { useState, useEffect } from 'react';
import { getNavigatorInstance } from './NavigatorXProvider';

export function ShortcutHelp() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-help', handleOpen);

    return () => {
      window.removeEventListener('open-help', handleOpen);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const nav = getNavigatorInstance();
    nav.registerShortcut('closeHelp', ['Shift', 'Escape'], () => {
      setIsOpen(false);
    });

    return () => {
      nav.unregisterShortcut('closeHelp');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const shortcuts = [
    { keys: 'Shift+H', action: 'Go to Home' },
    { keys: 'Shift+A', action: 'Go to About' },
    { keys: 'Shift+D', action: 'Go to Dashboard' },
    { keys: 'Shift+S,', action: 'Go to Settings' },
    { keys: 'Shift+K', action: 'Open Search' },
    { keys: 'Shift+?', action: 'Show this help' },
    { keys: 'Esc', action: 'Close modal' },
  ];

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-content help-modal" onClick={e => e.stopPropagation()}>
        <h2>Keyboard Shortcuts</h2>
        <div className="shortcuts-list">
          {shortcuts.map(({ keys, action }) => (
            <div key={keys} className="shortcut-item">
              <kbd>{keys}</kbd>
              <span>{action}</span>
            </div>
          ))}
        </div>
        <button onClick={() => setIsOpen(false)} className="btn-primary">
          Close
        </button>
      </div>
    </div>
  );
}