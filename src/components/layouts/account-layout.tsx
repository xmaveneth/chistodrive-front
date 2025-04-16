import Logo from '@/components/atoms/logo';
import { useUserContext } from '@/lib/hooks/context/use-user-context';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import AccountNavLink from '@/components/atoms/account-nav-link';
import DialogLayout from '@/components/layouts/dialog-layout';
import DeleteUserDialog from '@/components/molecules/account/delete-user-dialog';
import AccountHeader from '@/components/molecules/account/account-header';
import UserData from '@/components/molecules/account/user-data';

export default function AccountLayout() {
    const { isLoading, isLoggedIn } = useUserContext();
    const navigate = useNavigate();

    const [showDeleteAccountDialog, setShowDeleteAccountDialog] =
        useState(false);

    useEffect(() => {
        if (!isLoggedIn && isLoading === false) {
            navigate('/');
        }
    }, []);

    return (
        <div className="primary-px primary-py">
            <header className="flex items-center justify-center mb-6 sm:mb-10 xl:mb-12">
                <Logo className="w-33.5 sm:w-80 xl:w-123.5" />
            </header>
            <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                <div className="mb-4">
                    <AccountHeader openDialog={() => setShowDeleteAccountDialog(true)} />

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
                <Outlet />
            </section>

            <DialogLayout
                title="Вы уверены что хотите удалить данный аккаунт?"
                isOpen={showDeleteAccountDialog}
                closeDialog={() => setShowDeleteAccountDialog(false)}
            >
                <DeleteUserDialog closeDialog={() => setShowDeleteAccountDialog(false)} />
            </DialogLayout>
        </div>
    );
}
