import {
    ScriptVersionTimeSlot,
    ScriptVersionWorker,
} from '@/lib/types/script-version';
import { cn } from '@/lib/utils';
import { formatTimeToHHMM } from '@/lib/utils/format-date';
import { Trash2Icon } from 'lucide-react';

type ScriptVersionTableRowType = {
    workers: ScriptVersionWorker[];
    onDelete: (slot: ScriptVersionTimeSlot) => void;
    readonly?: boolean;
};
export default function ScriptVersionTableRow({
    workers,
    onDelete,
    readonly = false,
}: ScriptVersionTableRowType) {
    return (
        <div className={cn('scrollbar-hidden overflow-x-auto')}>
            <div className="w-max">
                <div
                    className={cn(
                        'sticky top-0 z-20 text-center grid bg-light-bg p-4 rounded-full divide-x-1 divide-white/20 mb-4 grid-cols-[60px_180px_1fr_60px] md:grid-cols-[60px_240px_1fr_60px]'
                    )}
                >
                    <div className="sticky left-0 z-20 bg-light-bg rounded-l-xl  text-btn-bg flex items-center justify-center">
                        №
                        <span className="absolute left-0 top-0 bottom-0  w-10 bg-light-bg -z-10"></span>
                    </div>
                    <div className="flex items-center justify-center md:text-lg">
                        Сотрудники
                    </div>
                    <div className="flex items-center justify-center md:text-lg">
                        <span className="sticky left-20 right-10 mx-3">
                            Слоты времени
                        </span>
                    </div>
                    <div></div>
                </div>
                {workers.map((worker, workerIdx) => (
                    <div
                        key={`worker-${workerIdx}`}
                        className="text-center grid divide-x-1 mx-4 divide-white/20 border-y border-white/20 text-sm md:text-base grid-cols-[60px_180px_1fr_60px] md:grid-cols-[60px_240px_1fr_60px]"
                    >
                        <button className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg">
                            {workerIdx + 1}
                        </button>
                        <div className="py-3 flex items-center justify-center border-l border-white/20">
                            {worker.worker_name}
                        </div>
                        <ul className="p-3 flex items-center gap-3">
                            {worker.slots.map((slot, slotIdx) => (
                                <li
                                    key={`slot-index-${slotIdx}`}
                                    className="flex items-center gap-1"
                                >
                                    <div
                                        className={cn(
                                            'rounded-full bg-input-bg px-3 py-2 text-sm',
                                            slot.is_active
                                                ? 'bg-[#BDA57E]'
                                                : 'bg-[#181B24]',
                                            slot.is_booked &&
                                                'bg-[#FFFFFF] text-black'
                                        )}
                                    >
                                        {formatTimeToHHMM(slot.time)}
                                    </div>
                                    {readonly === false && (
                                        <button
                                            onClick={() => onDelete(slot)}
                                            className="cursor-pointer"
                                        >
                                            <Trash2Icon className="size-3 text-btn-bg" />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="py-3 flex items-center justify-center border-l border-white/20">
                            {/* <div className="cursor-pointer"> */}
                            {/*     <AccountAddBtn onClick={() => {}} /> */}
                            {/* </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
