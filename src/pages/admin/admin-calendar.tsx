import PrimaryBtn from '@/components/atoms/primary-btn';
import AppliedScriptVersion from '@/components/molecules/admin/applied-script-version';
import { InitialScriptVersions } from '@/components/molecules/admin/initial-script-versions';
import { DatePicker } from '@/components/organisms/admin/date-picker';
import { useActivateCalendarSlot } from '@/lib/hooks/calendar/use-activate-calendar-slot';
import { useCalendarData } from '@/lib/hooks/calendar/use-calendar-data';
import { useClearAllDay } from '@/lib/hooks/calendar/use-clear-all-day';
import { useDeactivateCalendarSlot } from '@/lib/hooks/calendar/use-deactivate-calendar-slot';
import { formatDateToString } from '@/lib/utils/format-date';
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

    function handleDayToggle(newVal: boolean) {
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
                    {/* <div> */}
                    {/*     <p>Выкл/Вкл день</p> */}
                    {/*     <Switch */}
                    {/*         checked={enabled} */}
                    {/*         onChange={handleDayToggle} */}
                    {/*         className="group ml-auto mt-2 relative flex h-7 w-14 cursor-pointer rounded-full p-1 ease-in-out outline-1 outline-gray-300/40 data-checked:outline-btn-bg" */}
                    {/*         disabled={pendingActivateDay || pendingDeactivateDay} */}
                    {/*     > */}
                    {/*         <span */}
                    {/*             aria-hidden="true" */}
                    {/*             className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-gray-300/40 shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7 group-data-checked:bg-btn-bg" */}
                    {/*         /> */}
                    {/*     </Switch> */}

                    {/* </div> */}

                    <PrimaryBtn
                        disabled={pendingActivateDay}
                        onClick={() =>
                            handleDayToggle(true)
                        }
                        className="w-50 text-sm lg:text-base"
                    >
                        Активировать
                    </PrimaryBtn>

                    <PrimaryBtn
                        disabled={pendingDeactivateDay}
                        onClick={() =>
                            handleDayToggle(false)
                        }
                        className="w-50 text-sm lg:text-base mb-auto"
                    >
                        Деактивировать
                    </PrimaryBtn>
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
                <>
                    <InitialScriptVersions
                        versions={calendarData?.versions}
                        isLoading={isLoading}
                        date={formatDateToString(date)}
                    />
                    {calendarData != null && <AppliedScriptVersion data={calendarData.slots} />}
                </>
            )}
        </div>
    );
}
