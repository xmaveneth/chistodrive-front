import { RootLayout } from '@/components/layouts/root-layout';
import Account from '@/pages/account';
import Home from '@/pages/home';

export const routes = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },        
            { path: 'account', element: <Account /> },  
        ],
    },
];
