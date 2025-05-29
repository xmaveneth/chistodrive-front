import AdminSkeleton from '@/components/atoms/admin-skeleton';
import TableHead from '@/components/molecules/admin/table-head';
import { DatePicker } from '@/components/organisms/admin/date-picker';
import { useCalendarData } from '@/lib/hooks/calendar/use-calendar-data';
import { ScheduleVersion } from '@/lib/types/schedule';
import {
    formatDateForScripts,
    formatDateToString,
} from '@/lib/utils/format-date';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AdminCalendar() {
    const { id } = useParams();
    const [date, setDate] = useState(new Date());
    const { data: calendarData, isLoading } = useCalendarData(
        Number(id),
        formatDateToString(date)
    );

    function selectDate(newDate: Date | null) {
        if (newDate == null) return;

        setDate(newDate);
    }

    if (isLoading) return <div>Loading...</div>;

    console.log(calendarData);
    return (
        <div>
            <DatePicker value={date} onChange={selectDate} />
            <InitialScriptVersions versions={calendarData?.versions} isLoading={isLoading} />
        </div>
    );
}

type InitialScriptVersionsProps = {
    isLoading: boolean;
    versions: ScheduleVersion[] | undefined;
};

function InitialScriptVersions({
    versions,
    isLoading,
}: InitialScriptVersionsProps) {
    return (
        <div className="overflow-auto scrollbar-hidden text-xs sm:text-base">
            <TableHead gridClass="grid-cols-[60px_1fr_1fr_1fr_60px]">
                <div>Название</div>
                <div>Создан</div>
                <div>Статус</div>
                <div></div>
            </TableHead>

            {isLoading || versions == null ? (
                <AdminSkeleton />
            ) : (
                versions &&
                versions.map((version, idx) => (
                    <div key={`version-${idx}`}>
                        <InitialScriptVersionRow
                            version={version}
                            index={idx + 1}
                            onClick={() => {}}
                        />
                    </div>
                ))
            )}
        </div>
    );
}

type InitialScriptVersionRow = {
    version: ScheduleVersion;
    index: number;
    onClick: () => void;
};

function InitialScriptVersionRow({
    version,
    index,
    onClick,
}: InitialScriptVersionRow) {
    return (
        <div className="w-180 sm:w-282 text-center grid grid-cols-[60px_1fr_1fr_1fr_60px] divide-x-1 mx-4 divide-white/20 border-y border-white/20">
            <div className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg">
                {index}
            </div>
            <div className="py-3 flex items-center justify-center">
                <span className="mr-auto">{version.name}</span>
            </div>
            <div className="py-3 flex items-center justify-center">
                {formatDateForScripts(version.created_at)}
            </div>
            <div className="py-3 flex items-center justify-center">
                {' '}
                <button onClick={onClick} className="cursor-pointer">
                    Apply
                </button>
            </div>
        </div>
    );
}
