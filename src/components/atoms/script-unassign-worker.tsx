import { useUnassignScriptWorker } from '@/lib/hooks/workers/use-unassign-script-worker';
import { X } from 'lucide-react';
import { useParams } from 'react-router-dom';

type ScriptUnassignWorkerProps = {
    boxName: string;
    assignmentId: number;
};

export default function ScriptUnassignWorker({
    boxName,
    assignmentId,
}: ScriptUnassignWorkerProps) {
    const { id } = useParams<{ id: string }>();
    const { mutate, isPending } = useUnassignScriptWorker(Number(id));

    function handleClick() {
        mutate(assignmentId);
    }

    return (
        <div className="flex items-center gap-1.5">
            <div className="bg-input-bg py-1 text-xs px-3 rounded-full text-text-muted">
                {boxName}
            </div>
            <button
                onClick={handleClick}
                disabled={isPending}
                className="cursor-pointer aspect-square rounded-full flex items-center justify-center bg-input-bg p-1"
            >
                <X className="size-3.5" />
            </button>
        </div>
    );
}
