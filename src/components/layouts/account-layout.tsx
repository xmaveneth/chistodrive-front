import Logo from '@/components/atoms/logo';
import { useUserContext } from '@/lib/hooks/useUserContext';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AccountLayout() {
    const { isLoading, isLoggedIn } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn && isLoading == false) {
            navigate('/');
        }
    }, [isLoading, isLoggedIn]);

    return (
        <div className="primary-px primary-py">
            <header className="flex items-center justify-center mb-6 sm:mb-10 xl:mb-12">
                <Logo className="w-33.5 sm:w-80 xl:w-123.5" />
            </header>
            <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                <Outlet />
            </section>
        </div>
    );
}
