import AdminItemBtn from '@/components/atoms/admin-item-btn';
import { Transition } from '@headlessui/react';
import {
    ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/solid';
import { ArchiveBoxIcon, CalendarDaysIcon, UsersIcon, WindowIcon } from '@heroicons/react/16/solid';
import { ClipboardListIcon } from 'lucide-react';

type LayoutBottomNavProps = {
    isVisible: boolean;
    carwashId: number;
    reviewNum: number | undefined;
};

export default function LayoutBottomNav({
    isVisible,
    carwashId,
    reviewNum,
}: LayoutBottomNavProps) {
    return (
        <Transition show={isVisible}>
            <nav className="bg-light-bg absolute top-12 right-0 sm:top-15 w-full flex flex-wrap items-center gap-4 sm:gap-6 rounded-xl px-4 py-3 transition duration-200 ease-in data-[closed]:opacity-0 data-[closed]:scale-x-50 origin-right">
                <AdminItemBtn
                    routeName={`/admin/carwash/${carwashId}/reviews`}
                    className="text-xs sm:text-sm relative xs:hidden"
                >
                    <ChatBubbleBottomCenterTextIcon className="text-btn-bg size-[1.5em]" />
                    Отзывы
                    {reviewNum != null && reviewNum > 0 && <div className="absolute size-5 rounded-full bg-btn-bg -right-2 font-medium text-sm top-1 -translate-y-1/2 flex items-center justify-center p-1">{reviewNum}</div>}
                </AdminItemBtn>
                <AdminItemBtn
                    routeName={`/admin/carwash/${carwashId}/calendar`}
                    className="text-xs sm:text-sm sm:hidden"
                >
                    <CalendarDaysIcon className="text-btn-bg size-[1.5em]" />
                    Календарь
                </AdminItemBtn>
                <AdminItemBtn
                    routeName={`/admin/carwash/${carwashId}/services`}
                    className="text-xs sm:text-sm"
                >
                    <ClipboardListIcon className="text-btn-bg size-[1.5em]" />
                    Услуги
                </AdminItemBtn>
                <AdminItemBtn
                    routeName={`/admin/carwash/${carwashId}/employees`}
                    className="text-xs sm:text-sm"
                >
                    <UsersIcon className="text-btn-bg size-[1.5em]" />
                    Сотрудники
                </AdminItemBtn>
                <AdminItemBtn
                    routeName={`/admin/carwash/${carwashId}/boxes`}
                    className="text-xs sm:text-sm"
                >
                    <ArchiveBoxIcon className="text-btn-bg size-[1.5em]" />
                    Боксы
                </AdminItemBtn>
                <AdminItemBtn
                    routeName={`/admin/carwash/${carwashId}`}
                    className="text-xs sm:text-sm"
                >
                    <WindowIcon className="text-btn-bg size-[1.5em]" />
                    Скрипты
                </AdminItemBtn>
            </nav>
        </Transition>
    );
}
