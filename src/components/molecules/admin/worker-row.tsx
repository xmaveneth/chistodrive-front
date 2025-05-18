import { Worker } from '@/lib/types/workers';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

type WorkerRowProps = {
    worker: Worker;
    index: number;
    id: number;
    onEdit: () => void;
    onDelete: () => void;
};

export default function WorkerRow({
    worker,
    index,
    onEdit,
    onDelete,
}: WorkerRowProps) {
    return (
        <div className="w-180 sm:w-282 text-center grid grid-cols-[60px_1fr_1fr_1fr_60px] divide-x-1 mx-4 divide-white/20 border-y border-white/20">
            <button type='button'
                onClick={onEdit}
                className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg"
            >
                <PencilSquareIcon className="size-4" />
                {index}
            </button>
            <div className="py-3 flex items-center justify-center">
                <span className="">{worker.full_name}</span>
            </div>
            <div className="py-3 flex items-center justify-center">
                {worker.job_title}
            </div>
            <div className="py-3 flex items-center justify-center">
                {worker.telephone}
            </div>
            <div className="py-3 flex items-center justify-center">
                {' '}
                <button onClick={onDelete} className="cursor-pointer">
                    <TrashIcon className="text-btn-bg size-4 mx-auto" />
                </button>
            </div>
        </div>
    );
}
