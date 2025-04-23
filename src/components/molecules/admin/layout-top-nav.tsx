import { WindowIcon } from '@heroicons/react/24/solid';
import { ArchiveBoxIcon, UsersIcon } from '@heroicons/react/16/solid';
import AdminItemBtn from '@/components/atoms/admin-item-btn';

type LayoutTopNavProps = {
    carwashId: number;
};
export default function LayoutTopNav({ carwashId }: LayoutTopNavProps) {
    return (
        <nav className="bg-light-bg flex flex-wrap items-center gap-2 sm:gap-4 rounded-xl px-3 py-1.5 sm:py-2 sm:px-4">
            <AdminItemBtn
                routeName={`/admin/carwash/${carwashId}`}
                className="text-xs sm:text-sm"
            >
                <WindowIcon className="text-btn-bg size-[1.5em]" />
                Скрипты
            </AdminItemBtn>
            <AdminItemBtn
                routeName={`/admin/carwash/${carwashId}/employees`}
                className="text-xs sm:text-sm hidden xs:flex"
            >
                <UsersIcon className="text-btn-bg size-[1.5em]" />
                Сотрудники
            </AdminItemBtn>
            <AdminItemBtn
                routeName={`/admin/carwash/${carwashId}/boxes`}
                className="text-xs sm:text-sm hidden sm:flex"
            >
                <ArchiveBoxIcon className="text-btn-bg size-[1.5em]" />
                Боксы
            </AdminItemBtn>
        </nav>
    );
}
