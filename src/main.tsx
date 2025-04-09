import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/assets/styles.css';
import '@/assets/fonts/fonts.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/routes/router.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={createBrowserRouter(routes)} />
    </StrictMode>
);
