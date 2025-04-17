import PrimaryBtn from '@/components/atoms/primary-btn';
import { FavouriteSlot } from '@/lib/types/user';
import { formatDateToDayMonthLabel } from '@/lib/utils/format-date';
import { MapPinIcon } from '@heroicons/react/16/solid';

type AccountSlotDialogProps = {
    slot: FavouriteSlot | null;
    closeDialog: () => void;
};

export default function AccountSlotDialog({
    slot,
    closeDialog,
}: AccountSlotDialogProps) {
    if (slot == null) return null;

    return (
        <div className="flex flex-col gap-2 items-center text-white">
            <p className="font-medium text-2xl">{slot.car_wash_name}</p>
            <p className="flex items-center gap-1 my-4 text-sm text-white/70">
                <MapPinIcon className="size-6 shrink-0 text-btn-bg" />
                {slot.location}
            </p>
            <p>{slot.car_wash_name}</p>
            <p>
                {formatDateToDayMonthLabel(slot.date)} {slot.time}
            </p>

            <PrimaryBtn onClick={closeDialog} type="button" className="w-full mt-6">
                Вернуться назад
            </PrimaryBtn>
        </div>
    );
}
