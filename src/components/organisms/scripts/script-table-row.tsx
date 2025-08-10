import ScriptDropdown from '@/components/molecules/scripts/script-dropdown';
import ScriptIntervalRow from '@/components/molecules/scripts/script-interval-row';
import ScriptTableHead from '@/components/molecules/scripts/script-table-head';
import { Interval, ServiceWithIntervals } from '@/lib/types/intervals';
import { cn } from '@/lib/utils';
import { formatTimeToHHMM } from '@/lib/utils/format-date';
import { pluralizeBox, pluralizeMaster } from '@/lib/utils/pluralizer';

type ScriptTableRowType = {
    service: ServiceWithIntervals;
    columnClass: string;
    tableWidth: number;
    onDelete: (value: React.SetStateAction<Interval | null>) => void;
    onEdit: (value: React.SetStateAction<Interval | null>) => void;
    readonly?: boolean;
};
export default function ScriptTableRow({
    service,
    columnClass,
    tableWidth,
    onDelete,
    onEdit,
    readonly = false
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
                    readonly={readonly}
                >
                    <div className="flex-1 flex items-center justify-center">
                        {`${formatTimeToHHMM(
                            interval.start_time
                        )} - ${formatTimeToHHMM(interval.end_time)}`}
                    </div>
                    <ScriptDropdown
                        items={interval.workers}
                        getName={(w) => w.worker_name}
                        pluralize={pluralizeMaster}
                    />
                    <div className="flex-1 flex items-center justify-center">
                        {`${interval.price} ₽`}
                    </div>
                    <ScriptDropdown
                        items={interval.boxes}
                        getName={(b) => b.box_name}
                        pluralize={pluralizeBox}
                    />
                </ScriptIntervalRow>
            ))}
        </div>
    );
}
