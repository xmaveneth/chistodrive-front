import { CarwashAppointment } from '@/lib/types/appointments';
import { formatDateForScripts, formatTimeToHHMM } from '@/lib/utils/format-date';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

type AppointmentRowProps = {
    appointment: CarwashAppointment;
    index: number;
    id: number;
    onEdit: () => void;
    onDelete: () => void;
};

export default function AppointmentRow({
    appointment,
    index,
    onEdit,
    onDelete,
}: AppointmentRowProps) {
    return (
        <div className="w-392 sm:w-452 text-center grid grid-cols-[60px_1fr_1fr_250px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_60px] divide-x-1 mx-4 divide-white/20 border-y border-white/20">
            <button type='button'
                onClick={onEdit}
                className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg"
            >
                <PencilSquareIcon className="size-4" />
                {index}
            </button>
            <div className="py-3 flex items-center justify-center">
                <span className="">{appointment.name}</span>
            </div>
            <div className="py-3 flex items-center justify-center">
                <span className="">{appointment.telephone}</span>
            </div>
            <div className="py-3 flex items-center justify-center">
                <span className="">{appointment.worker}</span>
            </div>
            <div className="py-3 flex items-center justify-center">
                <span className="">{appointment.auto}</span>
            </div>
            <div className="py-3 flex items-center justify-center">
                <span className="">{appointment.reg_num}</span>
            </div>
            <div className="py-3 flex items-center justify-center">
                <span className="">{appointment.service}</span>
            </div>
            <div className="py-3 flex items-center justify-center">
                <span className="">{appointment.price}</span>
            </div>
            <div className="py-3 flex items-center justify-center">
                <span className="">{formatTimeToHHMM(appointment.time)}</span>
            </div>
            <div className="py-3 flex items-center justify-center">
                {formatDateForScripts(appointment.date)}
            </div>
            <div className="py-3 flex items-center justify-center">
                <span className="">{appointment.status}</span>
            </div>
            <div className="py-3 flex items-center justify-center">
                {' '}
            </div>
        </div>
    );
}


