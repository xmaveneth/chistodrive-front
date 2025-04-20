import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteFavouriteSlot } from '@/lib/hooks/carwashes/use-delete-favourite-slot';
import { FavouriteSlot } from '@/lib/types/user';

type DeleteSlotDialogProps = {
    closeDialog: () => void;
    selectedSlot: FavouriteSlot | null;
};
export default function DeleteSlotDialog({
    closeDialog,
    selectedSlot
}: DeleteSlotDialogProps) {

    const { mutate: deleteSlot, isPending } = useDeleteFavouriteSlot(closeDialog);

    function handleClick() {
        if (selectedSlot == null) return;

        deleteSlot(selectedSlot.id);
    }

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full"
            >
                Удалить окно
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
