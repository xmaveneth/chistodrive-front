import SecondaryBtn from '@/components/atoms/secondary-btn';
import ScriptCheckbox from '@/components/forms/script-checkbox';
import DialogLayout from '@/components/layouts/dialog-layout';
import AssignWorkerDialog from '@/components/molecules/scripts/assign-worker-dialog';
import ScriptCheckboxSkeleton from '@/components/molecules/scripts/script-checkbox-skeleton';
import { STORAGE_KEYS } from '@/lib/constants/storageKeys';
import { useCarWashBoxes } from '@/lib/hooks/boxes/use-carwash-boxes';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { useAssignedScriptWorkers } from '@/lib/hooks/workers/use-assigned-script-workers';
import { useCarWashWorkers } from '@/lib/hooks/workers/use-carwash-workers';
import { useScriptWorkers } from '@/lib/hooks/workers/use-script-workers';
import { useUpdateScriptWorkers } from '@/lib/hooks/workers/use-update-script-workers';
import { Worker } from '@/lib/types/workers';
import {
    createAllWOrkersArray,
    createSelectedWorkersArray,
    generateSelectedWorkerIds,
} from '@/lib/utils/sort-script-workers';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ScriptWorkers() {
    const { id } = useParams<{ id: string }>();
    const { mutate: updateBoxes } = useUpdateScriptWorkers(Number(id));

    const [showAddModal, toggleShowAddModal] = useToggle(false);
    const [currentWorker, setCurrentWorker] = useState<Worker | null>(null);

    const currentCarwashId = localStorage.getItem(
        STORAGE_KEYS.ADMIN_CARWASH_ID
    );

    const {
        data: selectedWorkers,
        isLoading: isLoadingSelectedWorkers,
        error: selectedWorkersError,
    } = useScriptWorkers(Number(id));
    const {
        data: allWorkers,
        isLoading: isLoadingAllWorkers,
        error: allWorkersError,
    } = useCarWashWorkers(Number(currentCarwashId));
    const {
        data: allBoxes,
        isLoading: isLoadingAllBoxes,
        error: allBoxesError,
    } = useCarWashBoxes(Number(currentCarwashId));
    const {
        data: assignedWorkers,
        isLoading: isLoadingAssignedWorkers,
        error: assignedWorkersError,
    } = useAssignedScriptWorkers(Number(id));

    const [allWorkerNames, setAllWorkerNames] = useState(
        createAllWOrkersArray(allWorkers)
    );
    const [selectedWorkerNames, setselectedWorkerNames] = useState(
        createSelectedWorkersArray(selectedWorkers)
    );

    useEffect(() => {
        setselectedWorkerNames(createSelectedWorkersArray(selectedWorkers));
    }, [isLoadingSelectedWorkers]);

    useEffect(() => {
        setAllWorkerNames(createAllWOrkersArray(allWorkers));
    }, [isLoadingAllWorkers]);

    function handleClick() {
        updateBoxes(generateSelectedWorkerIds(allWorkers, selectedWorkerNames));
    }

    function handleChange(workerName: string) {
        if (selectedWorkerNames.includes(workerName)) {
            setselectedWorkerNames((prev) =>
                prev.filter((vehicle) => vehicle !== workerName)
            );
        } else {
            setselectedWorkerNames((prev) => [...prev, workerName]);
        }
    }

    function handleDialogClick(workerName: string) {
        if (allWorkers == null || allWorkers.data == null) return;

        const currentWorker = allWorkers.data.find(
            (worker) => worker.full_name === workerName
        );

        setCurrentWorker(currentWorker || null);
        toggleShowAddModal(true);
    }

    if (
        isLoadingSelectedWorkers ||
        isLoadingAllWorkers ||
        isLoadingAssignedWorkers ||
        isLoadingAllBoxes
    )
        return <ScriptCheckboxSkeleton />;
    if (
        selectedWorkersError ||
        allWorkersError ||
        assignedWorkersError ||
        allBoxesError
    )
        return <p>Произошла ошибка загрузки сотрудников, попробуйте позже</p>;

    return (
        <div className="mt-6 md:mt-8">
            <div className="grid gap-3">
                {allWorkerNames?.map((workerName) => {
                    const isChecked = selectedWorkerNames.includes(workerName);
                    const isSelected =
                        selectedWorkers?.data.find(
                            (selectedWorker) =>
                                selectedWorker.full_name === workerName
                        ) || false;

                    return (
                        <div
                            key={workerName}
                            className="flex items-start xs:items-center justify-between gap-2 flex-col xs:flex-row"
                        >
                            <ScriptCheckbox
                                name={workerName}
                                onChange={() => handleChange(workerName)}
                                onBlur={() => {}}
                                key={workerName}
                                isChecked={isChecked}
                            >
                                {workerName}
                            </ScriptCheckbox>

                            {isSelected && (
                                <button
                                    onClick={() =>
                                        handleDialogClick(workerName)
                                    }
                                    className="cursor-pointer text-text-muted text-sm md:text-base hover:underline underline-offset-4"
                                >
                                    Добавить в бокс
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            <SecondaryBtn
                onClick={handleClick}
                className="mt-6 py-2 rounded-lg"
            >
                Сохранить
            </SecondaryBtn>

            <DialogLayout
                title="Добавление сотрудника в бокс"
                description="Выберите сотрудника, чтобы добавить в бокс"
                isOpen={showAddModal}
                closeDialog={() => toggleShowAddModal(false)}
            >
                <AssignWorkerDialog
                    allBoxes={allBoxes?.data || []}
                    currentWorker={currentWorker}
                    closeDialog={() => toggleShowAddModal(false)}
                />
            </DialogLayout>
        </div>
    );
}
