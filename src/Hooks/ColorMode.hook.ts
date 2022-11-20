import { ColorModeContext } from './../Contexts/ColorModeContext';
import { useContext } from 'react';

type ColorModeType = {
  mode: 'light' | 'dark',
  setMode: (mode: 'light' | 'dark') => void,
};

const useColorMode = (): ColorModeType => {
  const { darkMode, setDarkMode } = useContext(ColorModeContext);

  return {
    mode: darkMode ? 'dark' : 'light',
    setMode: (mode) => setDarkMode(mode === 'dark')
  };
};

export default useColorMode;
