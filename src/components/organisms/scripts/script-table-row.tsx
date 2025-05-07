import ScriptBoxDropdown from '@/components/atoms/script-box-dropdown';
import ScriptWorkerDropdown from '@/components/atoms/script-worker-dropdown';
import ScriptIntervalRow from '@/components/molecules/scripts/script-interval-row';
import ScriptTableHead from '@/components/molecules/scripts/script-table-head';
import { Interval, ServiceWithIntervals } from '@/lib/types/intervals';
import { cn } from '@/lib/utils';
import { formatTimeToHHMM } from '@/lib/utils/format-date';

type ScriptTableRowType = {
    service: ServiceWithIntervals;
    columnClass: string;
    tableWidth: number;
    onDelete: (value: React.SetStateAction<Interval | null>) => void;
    onEdit: (value: React.SetStateAction<Interval | null>) => void;
};
export default function ScriptTableRow({
    service,
    columnClass,
    tableWidth,
    onDelete,
    onEdit,
}: ScriptTableRowType) {
    return (
        <div className={cn('scrollbar-hidden overflow-x-auto')}>
            <ScriptTableHead columns={columnClass} width={tableWidth}>
                <div className="flex items-center justify-center md:text-lg">
                    Интервалы
                </div>
                <div className="flex items-center justify-center md:text-lg">
                    Мастера
                </div>
                <div className="flex items-center justify-center md:text-lg">
                    Стоимость, ₽
                </div>
                <div className="flex items-center justify-center md:text-lg">
                    Боксы
                </div>
                <div></div>
            </ScriptTableHead>
            {service.intervals.map((interval, intervalIdx) => (
                <ScriptIntervalRow
                    key={`script-interval-row-${intervalIdx}-${interval}`}
                    columns={columnClass}
                    width={tableWidth - 30}
                    onDelete={() => onDelete(interval)}
                    onEdit={() => onEdit(interval)}
                >
                    <div className="flex-1 flex items-center justify-center">
                        {`${formatTimeToHHMM(
                            interval.start_time
                        )} - ${formatTimeToHHMM(interval.end_time)}`}
                    </div>
                    <ScriptWorkerDropdown workers={interval.workers} />
                    <div className="flex-1 flex items-center justify-center">
                        {`${interval.price} ₽`}
                    </div>
                    <ScriptBoxDropdown boxes={interval.boxes} />
                </ScriptIntervalRow>
            ))}
        </div>
    );
}
