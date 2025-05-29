import AdminSkeleton from '@/components/atoms/admin-skeleton';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { DatePicker } from '@/components/organisms/admin/date-picker';
import { useCalendarData } from '@/lib/hooks/calendar/use-calendar-data';
import { ScheduleVersion } from '@/lib/types/schedule';
import { cn } from '@/lib/utils';
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

    console.log(calendarData);
    return (
        <div>
            <DatePicker value={date} onChange={selectDate} />
            <InitialScriptVersions
                versions={calendarData?.versions}
                isLoading={isLoading}
            />
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
            <TableHead>
                <div>Название</div>
                <div>Создан</div>
                <div></div>
            </TableHead>

            {isLoading || versions == null ? (
                <div className="mx-4">
                    <AdminSkeleton className="mx-auto !w-240 !sm:w-342" />
                </div>
            ) : versions && versions.length > 0 ? (
                versions.map((version, idx) => (
                    <div key={`version-${idx}`}>
                        <InitialScriptVersionRow
                            version={version}
                            index={idx + 1}
                            onClick={() => {}}
                        />
                    </div>
                ))
            ) : (
                <div>На эту дату слоты еще не сформированы</div>
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
        <div className="mx-auto w-max">
            <div className="w-150 sm:w-252 text-center grid grid-cols-[60px_1fr_1fr_160px] divide-x-1 mx-4 divide-white/20 border-y border-white/20">
                <div className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg">
                    {index}
                </div>
                <div className="py-3 flex items-center justify-center">
                    <span className="mx-auto">{version.name}</span>
                </div>
                <div className="py-3 flex items-center justify-center">
                    {formatDateForScripts(version.created_at)}
                </div>
                <div className="py-3 flex items-center justify-center">
                    {' '}
                    <PrimaryBtn onClick={onClick} className="text-sm">
                        Применить
                    </PrimaryBtn>
                </div>
            </div>
        </div>
    );
}

type TableHeadProps = {
    children: React.ReactNode;
};

function TableHead({ children }: TableHeadProps) {
    return (
        <div
            className={cn(
                'w-158 sm:w-260 mx-auto grid-cols-[60px_1fr_1fr_160px] sticky top-0 z-20 text-center grid bg-light-bg p-4 rounded-full divide-x-1 divide-white/20 mb-4'
            )}
        >
            <div className="sticky left-0 z-20 bg-light-bg rounded-l-xl  text-btn-bg">
                №
                <span className="absolute left-0 top-0 bottom-0  w-10 bg-light-bg -z-10"></span>
            </div>
            {children}
        </div>
    );
}
