import { RootLayout } from '@/components/layouts/root-layout';
import About from '@/pages/about';
import Account from '@/pages/account';
import Home from '@/pages/home';
import Policy from '@/pages/policy';
import Rules from '@/pages/rules';
import Search from '@/pages/search';

export const routes = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },    
            { path: 'search', element: <Search /> },      
            { path: 'account', element: <Account /> },  
            { path: 'policy', element: <Policy /> },  
            { path: 'rules', element: <Rules /> },  
            { path: 'about', element: <About /> },  
        ],
    },
];
