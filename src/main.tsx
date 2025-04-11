import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/assets/styles.css';
import '@/assets/fonts/fonts.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/routes/router.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={createBrowserRouter(routes)} />
        </QueryClientProvider>
    </StrictMode>
);