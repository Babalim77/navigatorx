import { useState } from 'react';
import { useNavigatorX } from '../hooks/useNavigatorX';

export function Dashboard() {
  const [count, setCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Page-specific shortcut
  useNavigatorX('refresh', ['Shift', 'r'], () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCount(0);
      setIsRefreshing(false);
    }, 1000);
  });

  useNavigatorX('increment', ['Shift', 'ArrowUp'], () => {
    setCount(c => c + 1);
  });

  useNavigatorX('decrement', ['Shift', 'ArrowDown'], () => {
    setCount(c => Math.max(0, c - 1));
  });

  return (
    <div className="page">
      <h1>📊 Dashboard</h1>
      <p>Page-specific shortcuts demonstration</p>

      <div className="card">
        <h2>Counter: {count}</h2>
        {isRefreshing && <p className="refreshing">Refreshing...</p>}
        
        <div className="shortcuts-info">
          <p><kbd>Shift+↑</kbd> Increment</p>
          <p><kbd>Shift+↓</kbd> Decrement</p>
          <p><kbd>Shift+R</kbd> Reset</p>
        </div>

        <div className="button-group">
          <button onClick={() => setCount(c => c + 1)}>+</button>
          <button onClick={() => setCount(c => Math.max(0, c - 1))}>-</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>
      </div>
    </div>
  );
}