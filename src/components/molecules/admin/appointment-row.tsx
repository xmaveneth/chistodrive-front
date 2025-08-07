import { CarwashAppointment } from '@/lib/types/appointments';
import {
    formatDateForScripts,
    formatTimeToHHMM,
} from '@/lib/utils/format-date';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

type AppointmentRowProps = {
    appointment: CarwashAppointment;
    index: number;
    id: number;
    onEdit: () => void;
};

export default function AppointmentRow({
    appointment,
    index,
    onEdit,
}: AppointmentRowProps) {
    function TableField({ content }: { content: string }) {
        return (
            <div className="py-3 flex items-center justify-center">
                {content}
            </div>
        );
    }
    return (
        <div className="w-392 sm:w-452 text-center grid grid-cols-[60px_1.5fr_1fr_2f_1fr_1fr_250px_1fr_1fr_1fr_1fr_1fr_60px] divide-x-1 mx-4 divide-white/20 border-y border-white/20">

            <button
                type="button"
                onClick={onEdit}
                className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg"
            >
                <PencilSquareIcon className="size-4" />
                {index}
            </button>
            <TableField content={appointment.status} />
            <TableField content={formatDateForScripts(appointment.date)} />
            <TableField content={formatTimeToHHMM(appointment.time)} />
            <TableField content={appointment.service} />
            <TableField content={appointment.price.toString()} />
            <TableField content={appointment.worker} />
            <TableField content={appointment.box} />
            <TableField content={appointment.auto} />
            <TableField content={appointment.reg_num} />
            <TableField content={appointment.name} />
            <TableField content={appointment.telephone} />
            <div className="py-3 flex items-center justify-center"> </div>
        </div>
    );
}
