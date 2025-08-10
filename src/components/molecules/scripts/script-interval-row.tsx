import { cn } from '@/lib/utils';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

type ScriptIntervalRowProps = {
    children: React.ReactNode;
    columns: string;
    width: number;
    onDelete: () => void;
    onEdit: () => void;
    readonly?: boolean;
};

export default function ScriptIntervalRow({
    onDelete,
    onEdit,
    children,
    columns,
    width,
    readonly = false,
}: ScriptIntervalRowProps) {
    return (
        <div
            className="text-center grid divide-x-1 mx-4 divide-white/20 border-y border-white/20 text-sm md:text-base"
            style={{
                gridTemplateColumns: columns,
                width: `${width}px`,
            }}
        >
            <button
                onClick={onEdit}
                disabled={readonly}
                className={cn(
                    'py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg',
                    readonly && 'text-btn-bg/50 cursor-auto'
                )}
            >
                <PencilSquareIcon className="size-4" />
            </button>
            {children}
            <div className="py-3 flex items-center justify-center border-l border-white/20">
                {' '}
                <button
                    disabled={readonly}
                    onClick={onDelete}
                    className={cn(
                        'cursor-pointer',
                        readonly && 'opacity-50 cursor-auto'
                    )}
                >
                    <TrashIcon className="text-btn-bg size-4 mx-auto" />
                </button>
            </div>
        </div>
    );
}
