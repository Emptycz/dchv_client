import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Paths from './Routes/Routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ColorModeContextProvider } from './Contexts/ColorModeContext';
import { AuthProvider } from './Providers/AuthProvider';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const queryClient = new QueryClient();

  // Dark mode handling
  useEffect(() => {
    const currentMode = JSON.parse(localStorage.getItem('site-dark-mode') || '{}');
    if (currentMode) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  // Setting dark mode and persist the state
  const onSetDarkMode = (val: boolean) => {
    localStorage.setItem('site-dark-mode', JSON.stringify(val));
    setDarkMode(val);
  };

  return (
    <ColorModeContextProvider value={{
      darkMode,
      setDarkMode: (val) => onSetDarkMode(val),
    }}>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <AuthProvider>
            <BrowserRouter>
              <Paths />
            </BrowserRouter>
          </AuthProvider>
        </div>
      </QueryClientProvider>
    </ColorModeContextProvider>

  );
}

export default App;
