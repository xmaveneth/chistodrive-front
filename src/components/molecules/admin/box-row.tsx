import { Box } from '@/lib/types/boxes';
import { formatDateForScripts } from '@/lib/utils/format-date';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

type BoxRowProps = {
    box: Box;
    index: number;
    id: number;
    onEdit: () => void;
    onDelete: () => void;
};

export default function BoxRow({
    box,
    index,
    onEdit,
    onDelete,
}: BoxRowProps) {
    return (
        <div className="w-172 sm:w-252 text-center grid grid-cols-[60px_1fr_1fr_60px] divide-x-1 mx-4 divide-white/20 border-y border-white/20">
            <button type='button'
                onClick={onEdit}
                className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg"
            >
                <PencilSquareIcon className="size-4" />
                {index}
            </button>
            <div className="py-3 flex items-center justify-center">
                <span className="">{box.name}</span>
            </div>
            <div className="py-3 flex items-center justify-center">
                {formatDateForScripts(box.created_at)}
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

