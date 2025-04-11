import Footer from '@/components/organisms/shared/footer';
import { CityProvider } from '@/lib/providers/city-provider';
import { Outlet, ScrollRestoration } from 'react-router-dom';

export function RootLayout() {
    return (
        <CityProvider>
            <ScrollRestoration />
            <div className="max-w-360 mx-auto">
                <Outlet />

                <Footer />
            </div>
        </CityProvider>
    );
}
