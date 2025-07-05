import { ChatBubbleBottomCenterTextIcon, DocumentIcon } from '@heroicons/react/16/solid';
import AdminItemBtn from '@/components/atoms/admin-item-btn';
import { CalendarDaysIcon } from 'lucide-react';

type LayoutTopNavProps = {
    carwashId: number;
    appointmentNum: number | undefined;
    reviewNum: number | undefined;
};
export default function LayoutTopNav({ carwashId, appointmentNum, reviewNum }: LayoutTopNavProps) {
    return (
        <nav className="bg-light-bg flex flex-wrap items-center gap-2 sm:gap-4 rounded-xl px-3 py-1.5 sm:py-2 sm:px-4">
            <AdminItemBtn
                routeName={`/admin/carwash/${carwashId}`}
                className="relative text-xs sm:text-sm"
            >
                <DocumentIcon className="text-btn-bg size-[1.5em]" />
                Записи
                {appointmentNum != null && appointmentNum > 0 && <div className="absolute size-5 rounded-full bg-btn-bg -right-2 font-medium text-sm top-1 -translate-y-1/2 flex items-center justify-center p-1">{appointmentNum}</div>}
            </AdminItemBtn>
            <AdminItemBtn
                routeName={`/admin/carwash/${carwashId}/reviews`}
                className="text-xs sm:text-sm relative hidden xs:flex"
            >
                <ChatBubbleBottomCenterTextIcon className="text-btn-bg size-[1.5em]" />
                Отзывы
                {reviewNum != null && reviewNum > 0 && <div className="absolute size-5 rounded-full bg-btn-bg -right-2 font-medium text-sm top-1 -translate-y-1/2 flex items-center justify-center p-1">{reviewNum}</div>}
            </AdminItemBtn>
            <AdminItemBtn
                routeName={`/admin/carwash/${carwashId}/calendar`}
                className="text-xs sm:text-sm hidden sm:flex"
            >
                <CalendarDaysIcon className="text-btn-bg size-[1.5em]" />
                Календарь
            </AdminItemBtn>
        </nav>
    );
}
