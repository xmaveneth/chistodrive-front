import { ScriptVersion } from '@/lib/types/scripts';
import { formatDateForScripts } from '@/lib/utils/format-date';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Link, useParams } from 'react-router-dom';
type ScriptVersionRowProps = {
    version: ScriptVersion;
    order: string;
    onDelete: () => void;
};

export default function ScriptVersionRow({
    version,
    order,
    onDelete,
}: ScriptVersionRowProps) {
    const { id } = useParams();

    return (
        <div className="w-180 sm:w-282 text-center relative grid grid-cols-[60px_100px_100px_1fr_1fr_60px] sm:grid-cols-[60px_100px_236px_1fr_1fr_60px] divide-x-1 mx-4 divide-white/20 border-b border-white/20">
            <div></div>
            <div className="flex sticky left-0 bg-background z-20">
                <Link
                    to={`/admin/carwash/${id}/script-version/${version.version_id}`}
                    className="cursor-pointer px-4 border-r border-white/20 flex items-center justify-center bg-background text-btn-bg"
                >
                    <PencilSquareIcon className="size-4" />
                </Link>
                <div className="px-4 flex items-center justify-center text-btn-bg">
                    {order}
                </div>
            </div>
            <div className="flex items-center justify-center flex-1 py-3">
                {version.version_name}
            </div>
            <div className="py-3">
                {formatDateForScripts(version.version_created_at)}
            </div>
            <div className="py-3">{version.version_status}</div>
            <div className="py-3">
                {' '}
                <button
                    onClick={onDelete}
                    className="cursor-pointer"
                >
                    <TrashIcon className="text-btn-bg size-4 mx-auto" />
                </button>
            </div>
        </div>
    );
}
