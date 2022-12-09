import React, { useState } from 'react';
import { SidebarContextProvider } from '../Contexts/SidebarContext';

type SidebarProviderType = {
  children: React.ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderType) => {
  const [isExtended, setIsExtended] = useState<boolean>(true);
  // TODO: Try to guess where we are on startup based on URL
  const [activeRoute, setActiveRoute] = useState<string | undefined>(undefined);

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
