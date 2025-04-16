import { Appointment } from '@/lib/types/user';
import { formatDateToDayMonthLabel } from '@/lib/utils/format-date';
import { MapPinIcon } from '@heroicons/react/16/solid';

type AccountEntryProsp = {
    entry: Appointment;
    onClick: () => void;
};

export function AccountEntry({ entry, onClick }: AccountEntryProsp) {
    return (
            <button
                onClick={onClick}
                type="button"
                className="w-full text-left px-3 py-3 pl-6 bg-input-bg flex items-center justify-between gap-3 sm:gap-5 cursor-pointer transition-colors duration-200 ease-in hover:bg-zinc-700/60 focus-within:bg-zinc-700/60 rounded-2xl"
            >
                <div className="flex-1 break-all">
                    <div className="mb-1 md:text-lg">{entry.car_wash_name}</div>
                    <p className="flex items-start gap-1 mb-2.5 text-xs sm:text-sm text-white/70 break-all">
                        <MapPinIcon className="size-4 shrink-0 mt-1 text-btn-bg hidden xs:block" />
                        {entry.location && entry.location}
                    </p>
                </div>
                <div className="flex items-start gap-1 flex-wrap text-xs sm:text-sm text-white/70 flex-1 md:justify-center">
                    <p>{entry.date && formatDateToDayMonthLabel(entry.date)}</p>
                    <p>{entry.time && entry.time}</p>
                    <p>{entry.reg_num && entry.reg_num}</p>
                </div>
            </button>
    );
}
