import DarkBtn from '@/components/atoms/dark-btn';
import Logo from '@/components/atoms/logo';
import ScriptBtn from '@/components/atoms/script-btn';
import DialogLayout from '@/components/layouts/dialog-layout';
import DeleteTemplateSlotDialog from '@/components/molecules/admin/delete-template-slot-dialog';
import IntervalSkeleton from '@/components/molecules/admin/interval-skeleton';
import ScriptVersionTableRow from '@/components/organisms/scripts/script-version-table-row';
import ErrorFallback from '@/components/organisms/shared/error-boundary';
import { STORAGE_KEYS } from '@/lib/constants/storageKeys';
import { useScriptVersion } from '@/lib/hooks/scripts/use-script-version';
import { useLocalStorage } from '@/lib/hooks/utils/use-local-storage';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { ScriptVersionTimeSlot } from '@/lib/types/script-version';
import { ArrowBigLeft } from 'lucide-react';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminScriptVersion() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useScriptVersion(Number(id));
    const [currentVersionInterval, setCurrentVersionInterval] = useState(0);
    const [showDeleteSlotDialog, toggleDeleteSlotDialog] = useToggle(false);
    const [selectedSlot, setSelectedSlot] =
        useState<ScriptVersionTimeSlot | null>(null);

    const versionInfo =
        data?.slots.map((versionSlot, idx) => ({
            slotName: versionSlot.vehicle_name,
            index: idx,
        })) ?? [];

    if (isLoading)
        return (
            <ScriptVersionLayout>
                <IntervalSkeleton />
            </ScriptVersionLayout>
        );

    if (data == null) return null;

    return (
        <ScriptVersionLayout>
            {' '}
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
                                                    <div className="mt-3 mb-4">
                                                        {`${serviceIdx + 1}. ${service.service_name}`}
                                                    </div>
                                                    <ScriptVersionTableRow
                                                        workers={
                                                            service.workers
                                                        }
                                                        onDelete={(slot) => {setSelectedSlot(slot); toggleDeleteSlotDialog(true)}}
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
        </ScriptVersionLayout>
    );
}

type ScriptVersionLayoutProps = {
    children: React.ReactNode;
};

function ScriptVersionLayout({ children }: ScriptVersionLayoutProps) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        const path = location.pathname;

        switch (true) {
            case path.startsWith('/script'): {
                const savedId = localStorage.getItem(
                    STORAGE_KEYS.ADMIN_CARWASH_ID
                );
                if (savedId) {
                    navigate(`/admin/carwash/${savedId}`);
                } else {
                    navigate('/admin');
                }
                break;
            }

            default:
                navigate(-1);
                break;
        }
    };

    const [scriptVersionNamesMap] = useLocalStorage<Record<number, string>>(
        'script_version_names_map',
        {}
    );

    const { id } = useParams<{ id: string }>();
    const parsedId = Number(id);

    return (
        <div className="primary-px primary-py">
            <header className="flex items-center justify-between mb-6 sm:mb-10 xl:mb-12">
                <div className="w-15 md:w-50">
                    <DarkBtn onClick={handleBackClick} className="mr-auto">
                        <ArrowBigLeft className="size-4 text-white" />
                        <span className="hidden md:block text-sm ml-1 mr-2">
                            Вернуться назад
                        </span>
                    </DarkBtn>
                </div>

                <Logo className="w-33.5 sm:w-80 xl:w-123.5" isHeading={false} />

                <div className="w-15 md:w-50" aria-hidden={true}></div>
            </header>
            <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                <div className="mb-4 xs:mb-6 text-lg sm:text-xl md:text-2xl md:mb-12">
                    {scriptVersionNamesMap[parsedId]}
                </div>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    {children}
                </ErrorBoundary>
            </section>
        </div>
    );
}
