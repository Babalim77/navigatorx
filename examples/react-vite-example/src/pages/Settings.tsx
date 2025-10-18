import { useState } from 'react';
import { getNavigatorInstance } from '../components/NavigatorXProvider';

export function Settings() {
  const [shortcuts, setShortcuts] = useState<any[]>([]);

  const loadShortcuts = () => {
    const nav = getNavigatorInstance();
    const allShortcuts = nav.getShortcuts();
    setShortcuts(
      Object.entries(allShortcuts).map(([id, data]: [string, any]) => ({
        id,
        keys: data.keys.join('+'),
      }))
    );
  };

  const clearAll = () => {
    const nav = getNavigatorInstance();
    nav.clear();
    setShortcuts([]);
  };

  return (
    <div className="page">
      <h1>⚙️ Settings</h1>
      <p>Manage your keyboard shortcuts</p>

      <div className="card">
        <h2>Registered Shortcuts</h2>
        <button onClick={loadShortcuts} className="btn-primary">
          Load Shortcuts
        </button>
        <button onClick={clearAll} className="btn-secondary">
          Clear All
        </button>

        {shortcuts.length > 0 && (
          <div className="shortcuts-table">
            {shortcuts.map(({ id, keys }) => (
              <div key={id} className="shortcut-row">
                <span className="shortcut-id">{id}</span>
                <kbd>{keys}</kbd>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}