import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteTemplateSlot } from '@/lib/hooks/scripts/use-delete-template-slot';
import { ScriptVersionTimeSlot } from '@/lib/types/script-version';
import { formatTimeToHHMM } from '@/lib/utils/format-date';
import { useParams } from 'react-router-dom';

type DeleteTemplateSlotDialogProps = {
    closeDialog: () => void;
    selectedSlot: ScriptVersionTimeSlot | null;
};
export default function DeleteTemplateSlotDialog({
    closeDialog,
    selectedSlot,
}: DeleteTemplateSlotDialogProps) {
    const { id } = useParams();
    const parsedId = Number(id);

    const { mutate: deleteSlot, isPending } =
        useDeleteTemplateSlot(closeDialog);

    function handleClick() {
        if (selectedSlot == null) return;

        deleteSlot({
            script_version_id: parsedId,
            template_slot_id: selectedSlot.slot_id,
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
