import PrimaryBtn from '@/components/atoms/primary-btn';
import AppliedScriptVersion from '@/components/molecules/admin/applied-script-version';
import { InitialScriptVersions } from '@/components/molecules/admin/initial-script-versions';
import { DatePicker } from '@/components/organisms/admin/date-picker';
import { useActivateCalendarSlot } from '@/lib/hooks/calendar/use-activate-calendar-slot';
import { useCalendarData } from '@/lib/hooks/calendar/use-calendar-data';
import { useClearAllDay } from '@/lib/hooks/calendar/use-clear-all-day';
import { useDeactivateCalendarSlot } from '@/lib/hooks/calendar/use-deactivate-calendar-slot';
import { formatDateToString } from '@/lib/utils/format-date';
import { Switch } from '@headlessui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AdminCalendar() {
    const { id } = useParams();
    const [date, setDate] = useState(new Date());
    const { data: calendarData, isLoading } = useCalendarData(
        Number(id),
        formatDateToString(date)
    );

    const { mutate: clearDay, isPending: pendingClearAllDay } =
        useClearAllDay();

    const { mutate: activateDay, isPending: pendingActivateDay } =
        useActivateCalendarSlot();

    const { mutate: deactivateDay, isPending: pendingDeactivateDay } =
        useDeactivateCalendarSlot();

    const [enabled, setEnabled] = useState(false);

    function handleDayToggle(newVal: boolean) {
        setEnabled(newVal);
        if (newVal === false) {
            deactivateDay({
                date: formatDateToString(date),
                car_wash_id: Number(id),
            })
        } else {
            activateDay({
                date: formatDateToString(date),
                car_wash_id: Number(id),
            })
        }
    }

    function selectDate(newDate: Date | null) {
        if (newDate == null) return;

        setDate(newDate);
    }

    const isApplied = calendarData?.is_applied;

    return (
        <div>
            <div className="relative">
                <DatePicker value={date} onChange={selectDate} />

                <div className="flex flex-col gap-4 items-end justify-between h-full ml-auto lg:absolute lg:right-0 lg:bottom-0">
                    <div>
                        <p>Выкл/Вкл день</p>
                        <Switch
                            checked={enabled}
                            onChange={handleDayToggle}
                            className="group ml-auto mt-2 relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-white/10 data-focus:outline data-focus:outline-white"
                            disabled={pendingActivateDay || pendingDeactivateDay}
                        >
                            <span
                                aria-hidden="true"
                                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
                            />
                        </Switch>

                    </div>
                    <PrimaryBtn
                        disabled={pendingClearAllDay}
                        onClick={() =>
                            clearDay({
                                date_field: formatDateToString(date),
                                car_wash_id: Number(id),
                            })
                        }
                        className="w-50 text-sm lg:text-base"
                    >
                        Очистить все
                    </PrimaryBtn>
                </div>
            </div>
            {isApplied ? (
                <AppliedScriptVersion data={calendarData?.slots} />
            ) : (
                <InitialScriptVersions
                    versions={calendarData?.versions}
                    isLoading={isLoading}
                    date={formatDateToString(date)}
                />
            )}
        </div>
    );
}
