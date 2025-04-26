import { Script } from '@/lib/types/scripts';
import { formatDateForScripts } from '@/lib/utils/format-date';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

type ScriptRowProps = {
    script: Script;
    index: number;
};

export default function ScriptRow({ script, index }: ScriptRowProps) {
    return (
        <div className="w-180 sm:w-282 text-center grid grid-cols-[60px_1fr_1fr_1fr_60px] divide-x-1 mx-4 divide-white/20 border-y border-white/20">
            <button className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg">
                <PencilSquareIcon className="size-4" /> 
                {index}
            </button>
            <div className="py-3">{script.script_name}</div>
            <div className="py-3">{formatDateForScripts(script.script_created_at)}</div>
            <div className="py-3">{script.script_status}</div>
            <div className="py-3">
                {' '}
                <button className="cursor-pointer">
                    <TrashIcon className="text-btn-bg size-4 mx-auto" />
                </button>
            </div>
        </div>
    );
}
