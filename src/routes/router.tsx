import AccountLayout from '@/components/layouts/account-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import About from '@/pages/about';
import AccountCars from '@/pages/account/cars';
import AccountEntries from '@/pages/account/entries';
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
            { path: 'policy', element: <Policy /> },
            { path: 'rules', element: <Rules /> },
            { path: 'about', element: <About /> },
            {
                path: 'account',
                element: <AccountLayout />,
                children: [
                    { index: true, element: <AccountEntries /> },
                    { path: 'cars', element: <AccountCars /> },
                ],
            },
        ],
    },
];
