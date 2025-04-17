import { RootLayout } from '@/components/layouts/root-layout';
import { lazyLoad } from '@/lib/utils/lazy-load';
import Home from '@/pages/home';
import Policy from '@/pages/policy';
import Rules from '@/pages/rules';

const Search = lazyLoad('../../pages/search');
const About = lazyLoad('../../pages/about');
const AccountLayout = lazyLoad('../../components/layouts/account-layout');
const AccountCars = lazyLoad('../../pages/account/cars');
const AccountEntries = lazyLoad('../../pages/account/entries');
const AccountFavorite = lazyLoad('../../pages/account/favorite');

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
                    { path: 'favorite', element: <AccountFavorite /> },
                ],
            },
        ],
    },
];
