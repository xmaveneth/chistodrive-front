import AdminLayout from '@/components/layouts/admin-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import AdminCarwashes from '@/pages/admin/admin-carwashes';
import Home from '@/pages/home';
import Policy from '@/pages/policy';
import Rules from '@/pages/rules';
import { lazy } from 'react';

const Search = lazy(() => import('@/pages/search'));
const About = lazy(() => import('@/pages/about'));
const AccountLayout = lazy(() => import('@/components/layouts/account-layout'));
const AccountCars = lazy(() => import('@/pages/account/cars'));
const AccountEntries = lazy(() => import('@/pages/account/entries'));
const AccountFavorite = lazy(() => import('@/pages/account/favorite'));

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
            {
                path: 'admin',
                element: <AdminLayout />,
                children: [
                    { index: true, element: <AdminCarwashes /> },
                ],
            },
        ],
    },
];
