import Logo from '@/components/atoms/logo';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AccountNavLink from '@/components/atoms/account-nav-link';
import DialogLayout from '@/components/layouts/dialog-layout';
import DeleteUserDialog from '@/components/molecules/account/delete-user-dialog';
import AccountHeader from '@/components/molecules/account/account-header';
import UserData from '@/components/molecules/account/user-data';
import { useCurrentUser } from '@/lib/hooks/auth/use-current-user';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/organisms/shared/error-boundary';

export default function AccountLayout() {
    const { data: user, isLoading, isError } = useCurrentUser();

    const [showDeleteAccountDialog, setShowDeleteAccountDialog] =
        useState(false);

    const isLoggedIn = !(isError || !user);

    if (isLoading) return null;

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="primary-px primary-py">
            <header className="flex items-center justify-center mb-6 sm:mb-10 xl:mb-12">
                <Logo className="w-33.5 sm:w-80 xl:w-123.5" isHeading={false} />
            </header>
            <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                <div className="mb-4">
                    <AccountHeader
                        openDialog={() => setShowDeleteAccountDialog(true)}
                    />

                    <UserData />

                    <nav className="flex items-center">
                        <AccountNavLink path="/account">Записи</AccountNavLink>
                        <AccountNavLink path="/account/cars">
                            Мои авто
                        </AccountNavLink>
                        <AccountNavLink path="/account/favorite">
                            Избранное
                        </AccountNavLink>
                    </nav>
                </div>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Outlet />
                </ErrorBoundary>
            </section>

            <DialogLayout
                title="Вы уверены что хотите удалить данный аккаунт?"
                isOpen={showDeleteAccountDialog}
                closeDialog={() => setShowDeleteAccountDialog(false)}
            >
                <DeleteUserDialog
                    closeDialog={() => setShowDeleteAccountDialog(false)}
                />
            </DialogLayout>
        </div>
    );
}
