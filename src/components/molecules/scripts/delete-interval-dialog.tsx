import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteScriptInterval } from '@/lib/hooks/scripts/use-delete-script-interval';
import { Interval } from '@/lib/types/intervals';
import { useParams } from 'react-router-dom';

type DeleteIntervalDialogProps = {
    closeDialog: () => void;
    selectIntervalForDeletion: Interval | null;
};

export default function DeleteIntervalDialog({
    closeDialog,
    selectIntervalForDeletion,
}: DeleteIntervalDialogProps) {
    const { id } = useParams();
    const { mutate, isPending } = useDeleteScriptInterval(closeDialog);

    function handleClick() {
        if (selectIntervalForDeletion == null) return;

        mutate({
            script_id: Number(id),
            interval_id: selectIntervalForDeletion.interval_id,
        });
    }

    return (
        <div className="my-6">
            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full mb-3"
            >
                Удалить
            </PrimaryBtn>

            <PrimaryBtn
                type="button"
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </div>
    );
}
