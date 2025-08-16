import DialogLayout from '@/components/layouts/dialog-layout';
import Login from '@/components/organisms/home/login';
import Signup from '@/components/organisms/home/signup';
import ErrorFallback from '@/components/organisms/shared/error-boundary';
import Footer from '@/components/organisms/shared/footer';
import { useAuthContext } from '@/lib/hooks/context/use-auth-context';
import { CityProvider } from '@/lib/providers/city-provider';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import RestorePassword from '../organisms/home/restore-password';
import { useState } from 'react';

export function RootLayout() {
    const {
        showLoginDialog,
        showSignupDialog,
        showForgotPasswordDialog,
        toggleLoginDialog,
        toggleSignupDialog,
        toggleForgotPasswordDialog,
    } = useAuthContext();

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const [isFinalSignupForm, setIsFinalSignupForm] = useState(false);

    return (
        <CityProvider>
            <ScrollRestoration />
            <div className="max-w-360 mx-auto">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Outlet />
                </ErrorBoundary>

                <Footer />
            </div>

            <DialogLayout
                title="Восстановление пароля"
                description={
                    token
                        ? 'Введите новый пароль'
                        : 'Подтвердите свой емаил для того, чтобы восстановить пароль к вашему аккаунту'
                }
                isOpen={showForgotPasswordDialog}
                closeDialog={() => toggleForgotPasswordDialog(false)}
            >
                <RestorePassword />
            </DialogLayout>

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
                    onForgotPasswordClick={() => {
                        toggleLoginDialog(false);
                        toggleForgotPasswordDialog(true);
                    }}
                />
            </DialogLayout>

            <DialogLayout
                title="Регистрация"
                description={
                    isFinalSignupForm
                        ? 'Введите код доступа из смс и email, которые придут вам в течение 5 минут'
                        : 'Заполните форму, чтобы получить доступ к сервису'
                }
                isOpen={showSignupDialog}
                closeDialog={() => toggleSignupDialog(false)}
            >
                <Signup
                    setDescription={(val) => setIsFinalSignupForm(val)}
                    onClick={() => {
                        toggleLoginDialog(true);
                        toggleSignupDialog(false);
                    }}
                />
            </DialogLayout>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Zoom}
            />
        </CityProvider>
    );
}
