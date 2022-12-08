import { createContext } from 'react';
export interface ISidebarContext {
  isExtended: boolean,
  setIsExtended: (mode: boolean) => void,
}

export const SidebarContext = createContext<ISidebarContext>({
  isExtended: true,
  setIsExtended: () => {},
});

export const SidebarContextProvider = SidebarContext.Provider;