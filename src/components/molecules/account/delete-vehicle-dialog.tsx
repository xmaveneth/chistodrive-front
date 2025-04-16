import PrimaryBtn from '@/components/atoms/primary-btn';

type DeleteVehicleDialogProps = {
    closeDialog: () => void;
};
export default function DeleteVehicleDialog({
    closeDialog,
}: DeleteVehicleDialogProps) {
    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                className="w-full"
            >
                Удалить автомобиль
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
