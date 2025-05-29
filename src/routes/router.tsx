import { RootLayout } from '@/components/layouts/root-layout';
import About from '@/pages/about';
import Home from '@/pages/home';
import NotFound from '@/pages/not-found';
import Policy from '@/pages/policy';
import Rules from '@/pages/rules';
import Search from '@/pages/search';
import { lazy } from 'react';

const AccountLayout = lazy(() => import('@/components/layouts/account-layout'));
const AccountCars = lazy(() => import('@/pages/account/cars'));
const AccountEntries = lazy(() => import('@/pages/account/entries'));
const AccountFavorite = lazy(() => import('@/pages/account/favorite'));
const AdminCarwashes = lazy(() => import('@/pages/admin/admin-carwashes'));
const AdminScripts = lazy(() => import('@/pages/admin/admin-scripts'));
const AdminEmployees = lazy(() => import('@/pages/admin/admin-employees'));
const AdminBoxes = lazy(() => import('@/pages/admin/admin-boxes'));
const AdminCalendar = lazy(() => import('@/pages/admin/admin-calendar'));
const AdminEntries = lazy(() => import('@/pages/admin/admin-entries'));
const AdminReviews = lazy(() => import('@/pages/admin/admin-reviews'));
const CarwashLayout = lazy(() => import('@/components/layouts/carwash-layout'));
const AdminLayout = lazy(() => import('@/components/layouts/admin-layout'));
const ScriptLayout = lazy(() => import('@/components/layouts/script-layout'));

const ScriptBoxes = lazy(() => import('@/pages/script/script-boxes'));
const ScriptIntervals = lazy(() => import('@/pages/script/script-intervals'));
const ScriptServices = lazy(() => import('@/pages/script/script-services'));
const ScriptVehicles = lazy(() => import('@/pages/script/script-vehicles'));
const ScriptWorkers = lazy(() => import('@/pages/script/script-workers'));
const AdminScriptVersion = lazy(() => import('@/pages/admin/admin-script-version'))

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
                    {
                        path: 'carwash/:id',
                        element: <CarwashLayout />,
                        children: [
                            { index: true, element: <AdminScripts /> },
                            { path: 'employees', element: <AdminEmployees /> },
                            { path: 'boxes', element: <AdminBoxes /> },
                            { path: 'entries', element: <AdminEntries /> },
                            { path: 'reviews', element: <AdminReviews /> },
                            { path: 'calendar', element: <AdminCalendar /> },
                        ],
                    },
                ],
            },
            {
                path: 'script/:id',
                element: <ScriptLayout />,
                children: [
                    { path: 'vehicle_types', element: <ScriptVehicles /> },
                    { path: 'services', element: <ScriptServices /> },
                    { path: 'intervals', element: <ScriptIntervals /> },
                    { path: 'boxes', element: <ScriptBoxes /> },
                    { path: 'workers', element: <ScriptWorkers /> },
                ],
            },
            {
                path: 'script-version/:id',
                element: <AdminScriptVersion />,
            },
        ],
    },
    { path: '*', element: <NotFound /> },
];
