import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteFavouriteCarwash } from '@/lib/hooks/carwash/use-delete-favourite-carwash';

type DeleteCarwashDialogProps = {
    closeDialog: () => void;
    car_wash_id: number | null;
};
export default function DeleteCarwashDialog({
    closeDialog,
    car_wash_id
}: DeleteCarwashDialogProps) {
    const { mutate: deleteFavouriteCarwash, isPending: isDeleteFavoritePending } =
        useDeleteFavouriteCarwash(
            closeDialog, 
            () => { },
        );

    function handleClick() {
        if (car_wash_id == null) return;
        deleteFavouriteCarwash(car_wash_id)
    }

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                onClick={handleClick}
                className="w-full"
                disabled={isDeleteFavoritePending}
            >
                Удалить автомойку
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
