
import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteCarwashBox } from '@/lib/hooks/boxes/use-delete-carwash-box';
import { Box } from '@/lib/types/boxes';
import { useParams } from 'react-router-dom';

type DeleteBoxDialogProps = {
    closeDialog: () => void;
    selectedBox: Box | null;
};
export default function DeleteBoxDialog({
    closeDialog,
    selectedBox,
}: DeleteBoxDialogProps) {
    const { id } = useParams();
    const parsedId = Number(id);

    const { mutate: deleteBox, isPending } = useDeleteCarwashBox(
        parsedId,
        closeDialog
    );

    function handleClick() {
        if (selectedBox == null) return;

        deleteBox({ id: selectedBox.id });
    }

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full"
            >
                Удалить бокс
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

