import PrimaryBtn from '@/components/atoms/primary-btn';

type DeleteCarwashDialogProps = {
    closeDialog: () => void;
};
export default function DeleteCarwashDialog({
    closeDialog,
}: DeleteCarwashDialogProps) {
    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                className="w-full"
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
