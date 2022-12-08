import React, { useState } from 'react';
import { SidebarContextProvider } from '../Contexts/SidebarContext';

type SidebarProviderType = {
  children: React.ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderType) => {
  const [isExtended, setIsExtended] = useState<boolean>(true);
  return (
    <SidebarContextProvider value={{
      isExtended: isExtended,
      setIsExtended,
    }}>
      {children}
    </SidebarContextProvider>
  );
};
