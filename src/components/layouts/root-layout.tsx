import DialogLayout from '@/components/layouts/dialog-layout';
import Login from '@/components/organisms/home/login';
import Signup from '@/components/organisms/home/signup';
import Footer from '@/components/organisms/shared/footer';
import { useAuthContext } from '@/lib/hooks/useAuthContext';
import { CityProvider } from '@/lib/providers/city-provider';
import { Outlet, ScrollRestoration } from 'react-router-dom';

export function RootLayout() {
    const {
        showLoginDialog,
        showSignupDialog,
        toggleLoginDialog,
        toggleSignupDialog,
    } = useAuthContext();
    
    return (
        <CityProvider>
            <ScrollRestoration />
            <div className="max-w-360 mx-auto">
                <Outlet />

                <Footer />
            </div>

            <DialogLayout
                title="Авторизация"
                description="Войдите в свой аккаунт на сайте"
                isOpen={showLoginDialog}
                closeDialog={() => toggleLoginDialog(false)}
            >
                <Login
                    onClick={() => {
                        toggleLoginDialog(false);
                        toggleSignupDialog(true);
                    }}
                />
            </DialogLayout>

            <DialogLayout
                title="Регистрация"
                description="Заполните форму, чтобы получить доступ к сервису"
                isOpen={showSignupDialog}
                closeDialog={() => toggleSignupDialog(false)}
            >
                <Signup
                    onClick={() => {
                        toggleLoginDialog(true);
                        toggleSignupDialog(false);
                    }}
                />
            </DialogLayout>
        </CityProvider>
    );
}
