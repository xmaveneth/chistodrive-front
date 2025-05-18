import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteCarwashWorker } from '@/lib/hooks/workers/use-delete-worker';
import { Worker } from '@/lib/types/workers';
import { useParams } from 'react-router-dom';

type DeleteWorkerDialogProps = {
    closeDialog: () => void;
    selectedWorker: Worker | null;
};
export default function DeleteWorkerDialog({
    closeDialog,
    selectedWorker,
}: DeleteWorkerDialogProps) {
    const { id } = useParams();
    const parsedId = Number(id);

    const { mutate: deleteWorker, isPending } = useDeleteCarwashWorker(
        parsedId,
        closeDialog
    );

    function handleClick() {
        if (selectedWorker == null) return;

        deleteWorker({ car_wash_id: parsedId, id: selectedWorker.id });
    }

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full"
            >
                Удалить сотрудника
            </PrimaryBtn>
            <PrimaryBtn
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </div>
    );
}
