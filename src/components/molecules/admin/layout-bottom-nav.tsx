import AdminItemBtn from '@/components/atoms/admin-item-btn';
import { Transition } from '@headlessui/react';
import {
    ChatBubbleBottomCenterTextIcon,
    DocumentIcon,
} from '@heroicons/react/24/solid';
import { ArchiveBoxIcon, CalendarDaysIcon, UsersIcon } from '@heroicons/react/16/solid';

type LayoutBottomNavProps = {
    isVisible: boolean;
    carwashId: number;
    reviewNum: number | undefined;
    appointmentNum: number | undefined;
};

export default function LayoutBottomNav({
    isVisible,
    carwashId,
    reviewNum,
    appointmentNum
}: LayoutBottomNavProps) {
    return (
        <Transition show={isVisible}>
            <nav className="bg-light-bg absolute top-12 right-0 sm:top-15 w-full flex flex-wrap items-center gap-4 sm:gap-6 rounded-xl px-4 py-3 transition duration-200 ease-in data-[closed]:opacity-0 data-[closed]:scale-x-50 origin-right">
                <AdminItemBtn
                    routeName={`/admin/carwash/${carwashId}/employees`}
                    className="text-xs sm:text-sm xs:hidden"
                >
                    <UsersIcon className="text-btn-bg size-[1.5em]" />
                    Сотрудники
                </AdminItemBtn>
                <AdminItemBtn
                    routeName={`/admin/carwash/${carwashId}/boxes`}
                    className="text-xs sm:text-sm sm:hidden"
                >
                    <ArchiveBoxIcon className="text-btn-bg size-[1.5em]" />
                    Боксы
                </AdminItemBtn>
                <AdminItemBtn
                    routeName={`/admin/carwash/${carwashId}/entries`}
                    className="relative text-xs sm:text-sm"
                >
                    <DocumentIcon className="text-btn-bg size-[1.5em]" />
                    Записи
                    {appointmentNum != null && appointmentNum > 0 && <div className="absolute size-5 rounded-full bg-btn-bg -right-2 font-medium text-sm top-1 -translate-y-1/2 flex items-center justify-center p-1">{appointmentNum}</div>}
                </AdminItemBtn>
                <AdminItemBtn
                    routeName={`/admin/carwash/${carwashId}/reviews`}
                    className="text-xs sm:text-sm relative"
                >
                    <ChatBubbleBottomCenterTextIcon className="text-btn-bg size-[1.5em]" />
                    Отзывы
                    {reviewNum != null && reviewNum > 0 && <div className="absolute size-5 rounded-full bg-btn-bg -right-2 font-medium text-sm top-1 -translate-y-1/2 flex items-center justify-center p-1">{reviewNum}</div>}
                </AdminItemBtn>
                <AdminItemBtn
                    routeName={`/admin/carwash/${carwashId}/calendar`}
                    className="text-xs sm:text-sm"
                >
                    <CalendarDaysIcon className="text-btn-bg size-[1.5em]" />
                    Календарь
                </AdminItemBtn>
            </nav>
        </Transition>
    );
}
