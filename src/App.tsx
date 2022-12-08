import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Paths from './Routes/Routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './Providers/AuthProvider';
import { SidebarProvider } from './Providers/SidebarProvider';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <AuthProvider>
          <BrowserRouter>
            <SidebarProvider>
              <Paths />
            </SidebarProvider>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
