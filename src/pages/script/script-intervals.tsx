import AccountAddBtn from '@/components/atoms/account-add-btn';
import ScriptBtn from '@/components/atoms/script-btn';
import DialogLayout from '@/components/layouts/dialog-layout';
import IntervalSkeleton from '@/components/molecules/admin/interval-skeleton';
import AddIntervalDialog from '@/components/molecules/scripts/add-interval-dialog';
import DeleteIntervalDialog from '@/components/molecules/scripts/delete-interval-dialog';
import UpdateIntervalDialog from '@/components/molecules/scripts/update-interval-dialog';
import ScriptTableRow from '@/components/organisms/scripts/script-table-row';
import { useScriptIntervals } from '@/lib/hooks/scripts/use-script-intervals';
import { useScripts } from '@/lib/hooks/scripts/use-scripts';
import useMediaQuery from '@/lib/hooks/utils/use-media-query';
import { Interval, ServiceWithIntervals } from '@/lib/types/intervals';
import { formatTimeToHHMM } from '@/lib/utils/format-date';
import {
    calculateTableWidth,
    generateColumnClass,
} from '@/lib/utils/generate-column-class';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ScriptIntervals() {
    const { id, carwashId } = useParams<{ id: string; carwashId: string }>();
    const { data, isLoading } = useScriptIntervals(Number(id));
    const isMobile = useMediaQuery('(max-width: 640px)');
    const [currentVehicleInterval, setCurrentVehicleInterval] = useState(0);

    const [selectServiceWithIntervals, setSelectServiceWithIntervals] =
        useState<ServiceWithIntervals | null>(null);

    const [selectIntervalForDeletion, setSelectIntervalForDeletion] =
        useState<Interval | null>(null);

    const [selectIntervalForUpdate, setSelectIntervalForUpdate] =
        useState<Interval | null>(null);

    const vehicleIntervals =
        data?.intervals.map((vehicleInterval, idx) => ({
            vehicleName: vehicleInterval.vehicle_type_name,
            index: idx,
        })) ?? [];

    const { data: scripts, isLoading: scriptsLoading } = useScripts(
        Number(carwashId)
    );

    const currentScript = scripts?.data.find(
        (script) => script.script_id === Number(id)
    );

    const isReady = currentScript?.script_status === 'Готов';

    if (isLoading || scriptsLoading) return <IntervalSkeleton />;

    if (data == null) return null;

    return (
        <div>
            <div className="flex items-center gap-4 my-8 flex-wrap">
                {vehicleIntervals.map((interval, vehicleIntervalIdx) => (
                    <ScriptBtn
                        key={`vehicle-interval-btn-${vehicleIntervalIdx}`}
                        onClick={() =>
                            setCurrentVehicleInterval(vehicleIntervalIdx)
                        }
                        isAcitve={currentVehicleInterval === vehicleIntervalIdx}
                        className="text-sm md:text-base"
                    >
                        {interval.vehicleName}
                    </ScriptBtn>
                ))}
            </div>
            <div>
                {data.intervals.length > 0 &&
                    data.intervals[currentVehicleInterval].interval_data.map(
                        (serviceInterval, serviceIntervalIdx) => {
                            const columns = 4;
                            const columnClass = generateColumnClass(columns);
                            const tableWidth =
                                calculateTableWidth(columns) *
                                (isMobile ? 0.65 : 1);
                            return (
                                <div key={`interval-${serviceIntervalIdx}`}>
                                    <div className="my-6 md:text-lg">
                                        {serviceInterval.service_category_name}
                                    </div>
                                    {serviceInterval.services.map(
                                        (service, serviceIdx) => (
                                            <div
                                                key={`service-${serviceIntervalIdx}-${serviceIdx}`}
                                            >
                                                <div className="mt-3 mb-4">
                                                    {`${serviceIdx + 1}. ${service.service_name}`}
                                                </div>
                                                <ScriptTableRow
                                                    service={service}
                                                    columnClass={columnClass}
                                                    tableWidth={tableWidth}
                                                    onDelete={
                                                        setSelectIntervalForDeletion
                                                    }
                                                    onEdit={
                                                        setSelectIntervalForUpdate
                                                    }
                                                    readonly={isReady === true}
                                                />
                                                {isReady === false && (
                                                    <div className="py-3 mt-1 w-188 sm:w-290">
                                                        <AccountAddBtn
                                                            onClick={() =>
                                                                setSelectServiceWithIntervals(
                                                                    service
                                                                )
                                                            }
                                                            className="sticky left-40 sm:left-52 mx-0 z-20 ml-40"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            );
                        }
                    )}
            </div>

            <DialogLayout
                isOpen={selectServiceWithIntervals != null}
                title="Добавить интервал"
                description="Заполните форму, чтобы добавить интервал"
                closeDialog={() => setSelectServiceWithIntervals(null)}
            >
                <AddIntervalDialog
                    closeDialog={() => setSelectServiceWithIntervals(null)}
                    selectServiceWithIntervals={
                        selectServiceWithIntervals || null
                    }
                />
            </DialogLayout>

            <DialogLayout
                isOpen={selectIntervalForDeletion != null}
                title="Удалить интервал"
                description={`Вы уверены что хотите удалить интервал с ${formatTimeToHHMM(
                    selectIntervalForDeletion?.start_time
                )} по ${formatTimeToHHMM(selectIntervalForDeletion?.end_time)}?`}
                closeDialog={() => setSelectIntervalForDeletion(null)}
            >
                <DeleteIntervalDialog
                    closeDialog={() => setSelectIntervalForDeletion(null)}
                    selectIntervalForDeletion={
                        selectIntervalForDeletion || null
                    }
                />
            </DialogLayout>

            <DialogLayout
                isOpen={selectIntervalForUpdate != null}
                title="Обновить интервал"
                description="Заполните форму, чтобы обновить интервал"
                closeDialog={() => setSelectIntervalForUpdate(null)}
            >
                <UpdateIntervalDialog
                    closeDialog={() => setSelectIntervalForUpdate(null)}
                    selectIntervalForUpdate={selectIntervalForUpdate || null}
                    allBoxes={data.select_values.boxes}
                    allWorkers={data.select_values.workers}
                />
            </DialogLayout>
        </div>
    );
}
