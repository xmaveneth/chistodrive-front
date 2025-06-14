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
import { cn } from '@/lib/utils';
import InfoSkeleton from '@/components/molecules/admin/info-skeleton';
import CarwashInfo from '@/components/molecules/admin/carwash-info';
import DialogLayout from '@/components/layouts/dialog-layout';
import EditScheduleDialog from '@/components/molecules/admin/edit-schedule-dialog';

export default function CarwashLayout() {
    const { id } = useParams();

    const parsedId = Number(id);
    const { data: carwash, isLoading, isError } = useCarwashById(parsedId);

    const [showActions, toggleActions] = useToggle(false);
    const [showScheduleDialog, setShowScheduleDialog] = useToggle(false);

    const modalRef = useRef(null);

    useClickOutside(modalRef, () => {
        if (showActions) toggleActions(false);
    });

    if (isError) return <p>Ошибка загрузки мойки</p>;

    const reviewNum = carwash?.data.review_num;
    const appointmentNum = carwash?.data.appointment_num;
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

                    <LayoutBottomNav
                        appointmentNum={appointmentNum}
                        reviewNum={reviewNum}
                        carwashId={parsedId}
                        isVisible={showActions}
                    />
                </div>
            </div>
            {isLoading || carwash == null ? (
                <InfoSkeleton />
            ) : (
                <CarwashInfo
                    carwash={carwash.data}
                    onClick={() => setShowScheduleDialog(true)}
                />
            )}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Outlet />
            </ErrorBoundary>

            <DialogLayout
                title="Редактировать график работы"
                description="Заполните поля, чтобы редактировать график работы"
                isOpen={showScheduleDialog}
                closeDialog={() => setShowScheduleDialog(false)}
                widthClass='sm:w-100 max-w-100'
            >
                <EditScheduleDialog
                    schedules={carwash?.data.schedule ?? null}
                    carWashId={parsedId}
                    closeDialog={() => setShowScheduleDialog(false)}
                />
            </DialogLayout>
        </div>
    );
}
