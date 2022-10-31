import { createContext } from 'react';

export interface IColorModeContext {
  darkMode: boolean,
  setDarkMode: (darkMode: boolean) => void,
}

export const ColorModeContext = createContext<IColorModeContext>({
  darkMode: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDarkMode: () => {},
});

export const ColorModeContextProvider = ColorModeContext.Provider;
