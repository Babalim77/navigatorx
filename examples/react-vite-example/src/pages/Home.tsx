export function Home() {
  return (
    <div className="page">
      <h1>🏠 Home</h1>
      <p>Welcome to NavigatorX React + Vite Example!</p>
      
      <div className="card">
        <h2>Quick Navigation</h2>
        <ul>
          <li><kbd>Shift+H</kbd> - Home</li>
          <li><kbd>Shift+A</kbd> - About</li>
          <li><kbd>Shift+D</kbd> - Dashboard</li>
          <li><kbd>Shift+S</kbd> - Settings</li>
          <li><kbd>Shift+K</kbd> - Search</li>
          <li><kbd>Shift+?</kbd> - Help</li>
        </ul>
      </div>

      <p className="hint">
        💡 Try pressing <kbd>Shift+K</kbd> to open the search modal!
      </p>
    </div>
  );
}