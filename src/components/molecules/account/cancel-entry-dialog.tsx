import PrimaryBtn from '@/components/atoms/primary-btn';

type CancelEntryDialogProps = {
    closeDialog: () => void;
};
export default function CancelEntryDialog({
    closeDialog,
}: CancelEntryDialogProps) {
    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                className="w-full"
            >
                Отменить запись
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
