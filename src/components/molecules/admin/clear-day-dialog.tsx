import PrimaryBtn from '@/components/atoms/primary-btn';

type ClearDayDialogProps = {
    closeDialog: () => void;
    onClick: () => void;
    isPending: boolean;
};
export default function ClearDayDialog({
    closeDialog,
    onClick,
    isPending
}: ClearDayDialogProps) {

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                disabled={isPending}
                onClick={onClick}
                className="w-full"
            >
                Очистить все
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

