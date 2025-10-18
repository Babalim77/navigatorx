import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavigatorXProvider } from './components/NavigatorXProvider';
import { SearchModal } from './components/SearchModal';
import { ShortcutHelp } from './components/ShortcutHelp';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <NavigatorXProvider>
        <div className="app">
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <SearchModal />
          <ShortcutHelp />
        </div>
      </NavigatorXProvider>
    </BrowserRouter>
  );
}

export default App;