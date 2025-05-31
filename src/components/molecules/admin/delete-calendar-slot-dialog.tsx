
import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteCalendarSlot } from '@/lib/hooks/calendar/use-delete-calendar-slot';
import { ScheduleSlot } from '@/lib/types/schedule';
import { formatTimeToHHMM } from '@/lib/utils/format-date';
import { useParams } from 'react-router-dom';

type DeleteCalendarSlotDialogProps = {
    closeDialog: () => void;
    selectedSlot: ScheduleSlot | null;
};
export default function DeleteCalendarSlotDialog({
    closeDialog,
    selectedSlot,
}: DeleteCalendarSlotDialogProps) {
    const { id } = useParams();
    const parsedId = Number(id);

    const { mutate: deleteSlot, isPending } =
        useDeleteCalendarSlot(closeDialog);

    function handleClick() {
        if (selectedSlot == null) return;

        deleteSlot({
            slot_id: selectedSlot.slot_id,
            car_wash_id: parsedId
        });
    }

    return (
        <div>
            <div className="rounded-full bg-input-bg px-3 py-2 mx-auto w-max text-xl -mb-5 mt-4">
                {formatTimeToHHMM(selectedSlot?.time)}
            </div>
            <div className="my-10 space-y-2">
                <PrimaryBtn
                    disabled={isPending}
                    onClick={handleClick}
                    className="w-full"
                >
                    Удалить слот
                </PrimaryBtn>
                <PrimaryBtn
                    onClick={closeDialog}
                    className="w-full bg-input-bg hover:bg-zinc-800"
                >
                    Вернуться назад
                </PrimaryBtn>
            </div>
        </div>
    );
}
