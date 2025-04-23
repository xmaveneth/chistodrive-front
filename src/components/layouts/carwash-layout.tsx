import { Outlet, useParams } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/organisms/shared/error-boundary';
import { Ellipsis } from 'lucide-react';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { useRef } from 'react';
import useClickOutside from '@/lib/hooks/utils/use-click-outside';
import { useCarwashById } from '@/lib/hooks/carwashes/use-fetch-carwash-by-id';
import LayoutBottomNav from '@/components/molecules/admin/layout-bottom-nav';
import LayoutTopNav from '@/components/molecules/admin/layout-top-nav';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { workSchedule } from '@/lib/data/carwash-schedule';
import { getWeekdayShortName } from '@/lib/utils/get-weekday-short-names';
import { cn } from '@/lib/utils';
import InfoSkeleton from '@/components/molecules/admin/info-skeleton';

export default function CarwashLayout() {
    const { id } = useParams();

    const parsedId = Number(id);
    const { data: carwash, isLoading, isError } = useCarwashById(parsedId);

    const [showActions, toggleActions] = useToggle(false);

    const modalRef = useRef(null);

    useClickOutside(modalRef, () => {
        if (showActions) toggleActions(false);
    });

    if (isError) return <p>Ошибка загрузки мойки</p>;

    return (
        <div>
            <div
                className={cn(
                    'mt-2 mb-5 sm:mb-8 md:mb-12',
                    isLoading && 'pointer-events-none'
                )}
            >
                <div
                    ref={modalRef}
                    className="flex items-center justify-center relative gap-2 max-w-75 sm:max-w-125 mx-auto sm:gap-4"
                >
                    {parsedId && <LayoutTopNav carwashId={parsedId} />}
                    <button
                        onClick={() => toggleActions()}
                        className="aspect-square rounded-full bg-light-bg p-2 cursor-pointer transition-scale duration-250 ease-in hover:scale-110"
                    >
                        <Ellipsis className="text-white size-6 sm:size-8" />
                    </button>

                    <LayoutBottomNav carwashId={parsedId} isVisible={showActions} />
                </div>
            </div>
            {isLoading || carwash == null ? (
                <InfoSkeleton />
            ) : (
                <div className="flex flex-col gap-8 mb-6 sm:mb-11 sm:flex-row sm:justify-between">
                    <div className="space-y-2 sm:order-2 sm:text-right">
                        <p className="text-2xl font-medium sm:text-3xl">
                            {carwash.name}
                        </p>
                        <p>
                            <span className="text-text-muted">Адрес:</span>{' '}
                            {carwash.location}
                        </p>
                        {carwash?.telephone && (
                            <p>
                                <span className="text-text-muted">
                                    Телефон:
                                </span>{' '}
                                {carwash.telephone}
                            </p>
                        )}

                        <PrimaryBtn className="mt-8 text-sm sm:ml-auto">
                            Редактировать график работы
                        </PrimaryBtn>
                    </div>
                    <ul className="space-y-2">
                        {workSchedule.map((weekday, idx) => (
                            <li key={`weekday-${idx}`}>
                                <span className="text-text-muted">
                                    {getWeekdayShortName(idx)}:
                                </span>{' '}
                                {weekday.is_day_off
                                    ? 'Выходной'
                                    : `с ${weekday.start} до ${weekday.end}`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Outlet />
            </ErrorBoundary>
        </div>
    );
}
