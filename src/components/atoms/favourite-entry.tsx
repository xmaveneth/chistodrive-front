import { FavouriteSlot } from '@/lib/types/user';
import { formatDateToDayMonthLabel, formatTimeToHHMM } from '@/lib/utils/format-date';
import { MapPinIcon, XMarkIcon } from '@heroicons/react/16/solid';

type FavouriteEntryProps = {
    slot: FavouriteSlot;
    deleteSlot: () => void;
    showSlot: () => void;
};

export function FavouriteEntry({ slot, deleteSlot, showSlot }: FavouriteEntryProps) {
    return (
        <article
            className="w-full text-left px-3 py-3 pl-6 bg-input-bg flex items-center flex-col xs:flex-row justify-between gap-3 sm:gap-5 rounded-2xl"
        >
            <button onClick={showSlot} className="flex-1 break-word cursor-pointer">
                <div className="mb-1 md:text-lg text-center xs:text-left">{slot.car_wash_name}</div>
                <p className="flex items-start gap-1 mb-2.5 text-xs sm:text-sm text-white/70 break-word">
                    <MapPinIcon className="size-4 shrink-0 xs:mt-1 text-btn-bg" />
                    {slot.location && slot.location}
                </p>
            </button>
            <div className="flex items-start gap-1 flex-wrap text-xs sm:text-sm text-white/70 basis-1/3 justify-center">
                <p>{slot.date && formatDateToDayMonthLabel(slot.date)}</p>
                <p>{slot.time && formatTimeToHHMM(slot.time)}</p>
            </div>

            <button onClick={deleteSlot} className="shrink-0 aspect-square p-1 rounded-full bg-background cursor-pointer mt-2 xs:mt-0 transition-all duration-200 ease-in block hover:bg-zinc-700/60 hover:scale-105 focus-within:scale-110">
                <XMarkIcon className="size-4" />{' '}
            </button>
        </article>
    );
}
