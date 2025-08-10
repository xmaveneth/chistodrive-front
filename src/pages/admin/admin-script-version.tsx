import ScriptBtn from '@/components/atoms/script-btn';
import SecondaryBtn from '@/components/atoms/secondary-btn';
import DialogLayout from '@/components/layouts/dialog-layout';
import DeleteTemplateSlotDialog from '@/components/molecules/admin/delete-template-slot-dialog';
import IntervalSkeleton from '@/components/molecules/admin/interval-skeleton';
import LaunchScriptVersionDialog from '@/components/molecules/scripts/launch-script-version-dialog';
import ScriptVersionTableRow from '@/components/organisms/scripts/script-version-table-row';
import { useScriptVersion } from '@/lib/hooks/scripts/use-script-version';
import { useScripts } from '@/lib/hooks/scripts/use-scripts';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { ScriptVersionTimeSlot } from '@/lib/types/script-version';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AdminScriptVersion() {
    const { id, carwashId } = useParams<{ id: string; carwashId: string }>();
    const { data, isLoading } = useScriptVersion(Number(id));
    const { data: scripts, isLoading: scriptsLoading } = useScripts(
        Number(carwashId)
    );

    const [showModal, toggleModal] = useToggle(false);
    const [currentVersionInterval, setCurrentVersionInterval] = useState(0);
    const [showDeleteSlotDialog, toggleDeleteSlotDialog] = useToggle(false);
    const [selectedSlot, setSelectedSlot] =
        useState<ScriptVersionTimeSlot | null>(null);

    const versionInfo =
        data?.slots.map((versionSlot, idx) => ({
            slotName: versionSlot.vehicle_name,
            index: idx,
        })) ?? [];

    function handleClick() {
        toggleModal(true);
    }

    const currentScriptVersion = scripts?.data
        .flatMap((script) => script.versions)
        .find((scriptVersion) => scriptVersion.version_id === Number(id));

    const isReady = currentScriptVersion?.version_status === 'Готов';

    const ScriptVersionInfo = () =>
        currentScriptVersion ? (
            <div className="flex justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    {currentScriptVersion.version_name}
                    <div className="text-[0.6rem] border border-white px-1 py-0.5 w-max shrink-0 rounded-sm">
                        {currentScriptVersion.version_status}
                    </div>
                </div>
                {isReady === false && (
                    <SecondaryBtn
                        onClick={handleClick}
                        className="text-xs sm:text-sm md:text-base py-2 rounded-lg"
                    >
                        Готов
                    </SecondaryBtn>
                )}
            </div>
        ) : null;

    {
        scriptsLoading ? (
            <div className="text-transparent bg-gray-200 animate-pulse w-70 rounded-sm">
                loading
            </div>
        ) : (
            <ScriptVersionInfo />
        );
    }

    if (isLoading) return <IntervalSkeleton />;

    if (data == null) return null;

    return (
        <>
            <div className="mb-4 xs:mb-6 text-lg sm:text-xl md:text-2xl md:mb-12">
                <ScriptVersionInfo />
            </div>{' '}
            <div>
                <div className="flex items-center gap-4 my-8 flex-wrap">
                    {versionInfo.map((slot, vehicleIntervalIdx) => (
                        <ScriptBtn
                            key={`vehicle-slot-btn-${vehicleIntervalIdx}`}
                            onClick={() =>
                                setCurrentVersionInterval(vehicleIntervalIdx)
                            }
                            isAcitve={
                                currentVersionInterval === vehicleIntervalIdx
                            }
                            className="text-sm md:text-base"
                        >
                            {slot.slotName}
                        </ScriptBtn>
                    ))}
                </div>
                <div>
                    {data.slots.length > 0 &&
                        data.slots[currentVersionInterval].slots_data.map(
                            (serviceInterval, serviceIntervalIdx) => {
                                return (
                                    <div key={`slot-${serviceIntervalIdx}`}>
                                        <div className="my-6 md:text-lg">
                                            {
                                                serviceInterval.service_category_name
                                            }
                                        </div>
                                        {serviceInterval.service_list.map(
                                            (service, serviceIdx) => (
                                                <div
                                                    key={`service-${serviceIntervalIdx}-${serviceIdx}`}
                                                >
                                                    <div className="mt-10 mb-4">
                                                        {`${serviceIdx + 1}. ${service.service_name}`}
                                                    </div>
                                                    <ScriptVersionTableRow
                                                        workers={
                                                            service.workers
                                                        }
                                                        onDelete={(slot) => {
                                                            setSelectedSlot(
                                                                slot
                                                            );
                                                            toggleDeleteSlotDialog(
                                                                true
                                                            );
                                                        }}
                                                        readonly={isReady === true}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                );
                            }
                        )}
                </div>
            </div>
            <DialogLayout
                title="Вы уверены что хотите удалить данный слот?"
                isOpen={showDeleteSlotDialog}
                closeDialog={() => toggleDeleteSlotDialog(false)}
            >
                <DeleteTemplateSlotDialog
                    selectedSlot={selectedSlot}
                    closeDialog={() => toggleDeleteSlotDialog(false)}
                />
            </DialogLayout>
            <DialogLayout
                isOpen={showModal}
                title="Вы уверены что хотите перевести данную версию скрипта в работу?"
                description="После перевода версии скрипта в работу, она станет недоступна для редактирования"
                closeDialog={() => toggleModal(false)}
            >
                <LaunchScriptVersionDialog
                    closeDialog={() => toggleModal(false)}
                />
            </DialogLayout>
        </>
    );
}
