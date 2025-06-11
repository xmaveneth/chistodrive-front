import { Appointment } from '@/lib/types/user';
import { formatDateToDayMonthLabel, formatTimeToHHMM } from '@/lib/utils/format-date';
import { MapPinIcon } from '@heroicons/react/16/solid';

type AccountEntryProps = {
    entry: Appointment;
    onClick: () => void;
};

export function AccountEntry({ entry, onClick }: AccountEntryProps) {
    return (
            <button
                onClick={onClick}
                type="button"
                className="w-full text-left px-3 py-3 pl-6 bg-input-bg flex flex-col xs:flex-row items-center justify-between gap-3 sm:gap-5 cursor-pointer transition-colors duration-200 ease-in hover:bg-zinc-700/60 rounded-2xl"
            >
                <div className="flex-1 break-all">
                    <div className="mb-1 md:text-lg text-center xs:text-left flex items-center flex-wrap gap-2">
                    {entry.car_wash_name}
                    <div className='text-[0.6rem] border border-white px-1 py-0.5 w-max shrink-0 rounded-sm'>{entry.status}</div>
                </div>
                    <p className="flex items-start gap-1 mb-2.5 text-xs sm:text-sm text-white/70 break-all">
                        <MapPinIcon className="size-4 shrink-0 text-btn-bg xs:mt-1" />
                        {entry.location && entry.location}
                    </p>
                </div>
                <div className="flex items-start gap-1 flex-wrap text-xs sm:text-sm text-white/70 flex-1 justify-end pr-5">
                    <p>{entry.date && formatDateToDayMonthLabel(entry.date)}</p>
                    <p>{entry.time && formatTimeToHHMM(entry.time)}</p>
                    <p>{entry.reg_num && entry.reg_num}</p>
                </div>
            </button>
    );
}
