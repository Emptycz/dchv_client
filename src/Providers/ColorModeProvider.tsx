import React, { useEffect, useState } from 'react';
import { ColorModeContextProvider } from '../Contexts/ColorModeContext';

type DarkModeProviderType = {
  children: React.ReactNode;
}

export const ColorModeProvider = ({ children }: DarkModeProviderType) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

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
      {children}
    </ColorModeContextProvider>
  );
};
