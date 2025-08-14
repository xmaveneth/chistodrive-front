import AccountAddBtn from '@/components/atoms/account-add-btn';
import { Script } from '@/lib/types/scripts';
import { cn } from '@/lib/utils';
import { formatDateForScripts } from '@/lib/utils/format-date';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

type ScriptRowProps = {
    script: Script;
    index: number;
    id: number;
    onDelete: () => void;
    onClick: () => void;
    readonly?: boolean;
};

export default function ScriptRow({
    script,
    index,
    readonly = false,
    onDelete,
    onClick,
    id,
}: ScriptRowProps) {
    return (
        <div className="w-180 sm:w-282 text-center grid grid-cols-[60px_1fr_1fr_1fr_60px] divide-x-1 mx-4 divide-white/20 border-y border-white/20">
            <Link
                to={`${id}/vehicle_types`}
                className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg"
            >
                <PencilSquareIcon className="size-4" />
                {index}
            </Link>
            <div className="py-3 flex items-center justify-center">
                {!readonly && (
                    <AccountAddBtn
                        onClick={onClick}
                        className="ml-3"
                    />
                )}
                <span className={cn(!readonly && "mr-auto")}>{script.script_name}</span>
                <span
                    className="ml-4"
                    aria-hidden={true}
                ></span>
            </div>
            <div className="py-3 flex items-center justify-center">
                {formatDateForScripts(script.script_created_at)}
            </div>
            <div className="py-3 flex items-center justify-center">
                {script.script_status}
            </div>
            <div className="py-3 flex items-center justify-center">
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
