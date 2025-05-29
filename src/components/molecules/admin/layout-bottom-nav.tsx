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
};

export default function LayoutBottomNav({
    isVisible,
    carwashId,
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
                    className="text-xs sm:text-sm"
                >
                    <DocumentIcon className="text-btn-bg size-[1.5em]" />
                    Записи
                </AdminItemBtn>
                <AdminItemBtn
                    routeName={`/admin/carwash/${carwashId}/reviews`}
                    className="text-xs sm:text-sm"
                >
                    <ChatBubbleBottomCenterTextIcon className="text-btn-bg size-[1.5em]" />
                    Отзывы
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
