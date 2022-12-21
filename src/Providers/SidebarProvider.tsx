import React, { useState } from 'react';
import { SidebarContextProvider } from '../Contexts/SidebarContext';

type SidebarProviderType = {
  children: React.ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderType) => {
  const [isExtended, setIsExtended] = useState<boolean>(true);
  const [activeRoute, setActiveRoute] = useState<string | undefined>(window.location.pathname);

  return (
    <SidebarContextProvider value={{
      isExtended: isExtended,
      activeRoute,
      setActiveRoute,
      setIsExtended,
    }}>
      {children}
    </SidebarContextProvider>
  );
};
