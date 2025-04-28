import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/organisms/shared/error-boundary';
import { useIsCurrentUserAdmin } from '@/lib/hooks/auth/use-is-current-user-admin';
import DarkBtn from '@/components/atoms/dark-btn';
import { ArrowBigLeft } from 'lucide-react';
import Logo from '@/components/atoms/logo';
import AccountNavLink from '@/components/atoms/account-nav-link';
import { useLocalStorage } from '@/lib/hooks/utils/use-local-storage';

export default function ScriptLayout() {
    const { data: isAdmin, isLoading } = useIsCurrentUserAdmin();
     const [scriptNamesMap,] = useLocalStorage<Record<number, string>>('script_names_map', {});
    const navigate = useNavigate();
    const { id } = useParams();

    const parsedId = Number(id);

    if (isLoading) return null;

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="primary-px primary-py">
            <header className="flex items-center justify-between mb-6 sm:mb-10 xl:mb-12">
                <div className="w-15 md:w-50">
                    <DarkBtn onClick={() => navigate(-1)} className="mr-auto">
                        <ArrowBigLeft className="size-4 text-white" />
                        <span className="hidden md:block text-sm ml-1 mr-2">
                            Вернуться назад
                        </span>
                    </DarkBtn>
                </div>

                <Logo className="w-33.5 sm:w-80 xl:w-123.5" isHeading={false} />

                <div className="w-15 md:w-50" aria-hidden={true}></div>
            </header>
            <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                <div className="mb-8 text-lg sm:text-xl md:text-2xl md:mb-12">{scriptNamesMap[parsedId] }</div>
                <div className="mb-4">
                    <nav className="flex items-center flex-col gap-3 xs:flex-row xs:gap-0">
                        <AccountNavLink
                            path={`/script/${parsedId}/vehicle_types`}
                            className="pb-2 w-full xs:w-auto xs:text-xs sm:text-sm md:text-base"
                        >
                            Тип авто
                        </AccountNavLink>
                        <AccountNavLink
                            path={`/script/${parsedId}/workers`}
                            className="pb-2 w-full xs:w-auto xs:text-xs sm:text-sm md:text-base"
                        >
                            Сотрудники
                        </AccountNavLink>
                        <AccountNavLink
                            path={`/script/${parsedId}/boxes`}
                            className="pb-2 w-full xs:w-auto xs:text-xs sm:text-sm md:text-base"
                        >
                            Боксы
                        </AccountNavLink>

                        <AccountNavLink
                            path={`/script/${parsedId}/services`}
                            className="pb-2 w-full xs:w-auto xs:text-xs sm:text-sm md:text-base"
                        >
                            Услуги
                        </AccountNavLink>
                        <AccountNavLink
                            path={`/script/${parsedId}/intervals`}
                            className="pb-2 w-full xs:w-auto xs:text-xs sm:text-sm md:text-base"
                        >
                            Интервалы
                        </AccountNavLink>
                    </nav>
                </div>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Outlet />
                </ErrorBoundary>
            </section>
        </div>
    );
}
