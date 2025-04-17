import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteVehicle } from '@/lib/hooks/vehicles/use-delete-vehicle';

type DeleteVehicleDialogProps = {
    closeDialog: () => void;
    selectedVehicleId: number;
};
export default function DeleteVehicleDialog({
    closeDialog,
    selectedVehicleId
}: DeleteVehicleDialogProps) {
    const { mutate: deleteVehicle, isPending } = useDeleteVehicle(closeDialog);

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn disabled={isPending} onClick={() => deleteVehicle(selectedVehicleId)} className="w-full">Удалить автомобиль</PrimaryBtn>
            <PrimaryBtn
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </div>
    );
}
