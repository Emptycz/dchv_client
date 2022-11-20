import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Paths from './Routes/Routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './Providers/AuthProvider';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <AuthProvider>
          <BrowserRouter>
            <Paths />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
