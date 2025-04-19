import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteAppointment } from '@/lib/hooks/carwashes/use-delete-appoitment';
import { Appointment } from '@/lib/types/user';

type CancelEntryDialogProps = {
    closeDialog: () => void;
    entry: Appointment | null;
};
export default function CancelEntryDialog({
    closeDialog,
    entry
}: CancelEntryDialogProps) {
    const {
        mutate: cancelAppointment,
        isPending,
    } = useDeleteAppointment(closeDialog);

    function handleCancel() {
        if (entry == null) return;

        cancelAppointment(entry.appointment_id);
    }

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn disabled={isPending} onClick={handleCancel} className="w-full">Отменить запись</PrimaryBtn>
            <PrimaryBtn
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </div>
    );
}
