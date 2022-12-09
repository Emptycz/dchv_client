import { createContext } from 'react';
export interface ISidebarContext {
  isExtended: boolean,
  activeRoute?: string,
  setActiveRoute: (route: string) => void,
  setIsExtended: (mode: boolean) => void,
}

export const SidebarContext = createContext<ISidebarContext>({
  isExtended: true,
  activeRoute: undefined,
  setActiveRoute: () => {},
  setIsExtended: () => {},
});

export const SidebarContextProvider = SidebarContext.Provider;