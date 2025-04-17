import PrimaryBtn from '@/components/atoms/primary-btn';

type DeleteSlotDialogProps = {
    closeDialog: () => void;
};
export default function DeleteSlotDialog({
    closeDialog,
}: DeleteSlotDialogProps) {
    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
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
