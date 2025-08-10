import { Navigate, Outlet, useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/organisms/shared/error-boundary';
import { useIsCurrentUserAdmin } from '@/lib/hooks/auth/use-is-current-user-admin';
import AccountNavLink from '@/components/atoms/account-nav-link';
import ScriptMenuBtn from '@/components/atoms/script-menu-btn';
import { Transition } from '@headlessui/react';
import useToggle from '@/lib/hooks/utils/use-toggle';
import useMediaQuery from '@/lib/hooks/utils/use-media-query';
import { cn } from '@/lib/utils';
import { useScripts } from '@/lib/hooks/scripts/use-scripts';
import SecondaryBtn from '../atoms/secondary-btn';
import DialogLayout from './dialog-layout';
import LaunchScriptDialog from '../molecules/scripts/launch-script-dialog';

export default function ScriptLayout() {
    const { data: isAdmin, isLoading } = useIsCurrentUserAdmin();
    const [showMenu, toggleShowMenu] = useToggle(false);
    const isMobile = useMediaQuery('(max-width: 420px)');
    const { carwashId, id } = useParams();
    const [showModal, toggleModal] = useToggle(false);

    const { data: scripts, isLoading: scriptsLoading } = useScripts(
        Number(carwashId)
    );

    if (isLoading) return null;

    if (!isAdmin) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    function handleClick() {
        toggleModal(true);
    }

    const currentScript = scripts?.data.find(
        (script) => script.script_id === Number(id)
    );

    const isReady = currentScript?.script_status === "Готов";

    const ScriptInfo = () =>
        currentScript ? (
            <div className="flex justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    {currentScript.script_name}
                    <div className="text-[0.6rem] border border-white px-1 py-0.5 w-max shrink-0 rounded-sm">
                        {currentScript.script_status}
                    </div>
                </div>
                {isReady === false && <SecondaryBtn
                    onClick={handleClick}
                    className="text-xs sm:text-sm md:text-base py-2 rounded-lg"
                >
                    Готов
                </SecondaryBtn>}
            </div>
        ) : null;

    return (
        <>
            <div className="mb-4 xs:mb-6 text-lg sm:text-xl md:text-2xl md:mb-12">
                {scriptsLoading ? (
                    <div className="text-transparent bg-gray-200 animate-pulse w-70 rounded-sm">
                        loading
                    </div>
                ) : (
                    <ScriptInfo />
                )}
            </div>
            <div className="mb-4">
                {isMobile && (
                    <ScriptMenuBtn
                        onClick={toggleShowMenu}
                        className={cn('w-full')}
                    >
                        {showMenu ? 'Скрыть меню' : 'Показать меню'}
                    </ScriptMenuBtn>
                )}
                <Transition
                    show={showMenu || !isMobile}
                    enter="transition-all duration-300 ease-in"
                    enterFrom="h-0 opacity-0"
                    enterTo="h-[193px] opacity-100"
                    leave="transition-all duration-300 ease-out"
                    leaveFrom="h-[193px] opacity-100"
                    leaveTo="h-0 opacity-0"
                >
                    <nav
                        className={cn(
                            'flex items-center flex-col gap-3 xs:flex-row xs:gap-0',
                            isMobile && 'mt-4'
                        )}
                    >
                        <AccountNavLink
                            path={`vehicle_types`}
                            className="pb-2 w-full xs:w-auto xs:text-xs sm:text-sm md:text-base"
                        >
                            Тип авто
                        </AccountNavLink>
                        <AccountNavLink
                            path={`boxes`}
                            className="pb-2 w-full xs:w-auto xs:text-xs sm:text-sm md:text-base"
                        >
                            Боксы
                        </AccountNavLink>
                        <AccountNavLink
                            path={`workers`}
                            className="pb-2 w-full xs:w-auto xs:text-xs sm:text-sm md:text-base"
                        >
                            Сотрудники
                        </AccountNavLink>

                        <AccountNavLink
                            path={`services`}
                            className="pb-2 w-full xs:w-auto xs:text-xs sm:text-sm md:text-base"
                        >
                            Услуги
                        </AccountNavLink>
                        <AccountNavLink
                            path={`intervals`}
                            className="pb-2 w-full xs:w-auto xs:text-xs sm:text-sm md:text-base"
                        >
                            Интервалы
                        </AccountNavLink>
                    </nav>
                </Transition>
            </div>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Outlet />
            </ErrorBoundary>

            <DialogLayout
                isOpen={showModal}
                title="Вы уверены что хотите перевести скрипт в работу?"
                description="После перевода скрипта в работу, он станет недоступен для редактирования"
                closeDialog={() => toggleModal(false)}
            >
                <LaunchScriptDialog
                    closeDialog={() => toggleModal(false)}
                />
            </DialogLayout>
        </>
    );
}
