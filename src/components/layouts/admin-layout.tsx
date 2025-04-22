import Logo from '@/components/atoms/logo';
import { Navigate, Outlet } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/organisms/shared/error-boundary';
import { useIsCurrentUserAdmin } from '@/lib/hooks/auth/use-is-current-user-admin';

export default function AdminLayout() {
    const { data: isAdmin, isLoading } = useIsCurrentUserAdmin();

    if (isLoading) return null;

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="primary-px primary-py">
            <header className="flex items-center justify-center mb-6 sm:mb-10 xl:mb-12">
                <button>Вернуться назад</button>
                <Logo className="w-33.5 sm:w-80 xl:w-123.5" isHeading={false} />
            </header>
            <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                <div className="mb-4">
                    
                </div>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Outlet />
                </ErrorBoundary>
            </section>

        </div>
    );
}
