import SecondaryBtn from '@/components/atoms/secondary-btn';
import ScriptCheckbox from '@/components/forms/script-checkbox';
import ScriptCheckboxSkeleton from '@/components/molecules/scripts/script-checkbox-skeleton';
import { STORAGE_KEYS } from '@/lib/constants/storageKeys';
import { useCarWashWorkers } from '@/lib/hooks/workers/use-carwash-workers';
import { useScriptWorkers } from '@/lib/hooks/workers/use-script-workers';
import { useUpdateScriptWorkers } from '@/lib/hooks/workers/use-update-script-workers';
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

    if (isLoadingSelectedWorkers || isLoadingAllWorkers)
        return <ScriptCheckboxSkeleton />;
    if (selectedWorkersError || allWorkersError)
        return <p>Произошла ошибка загрузки сотрудников, попробуйте позже</p>;

    return (
        <div className="mt-6 md:mt-8">
            <div className="grid gap-3">
                {allWorkerNames?.map((workerName) => (
                    <ScriptCheckbox
                        name={workerName}
                        onChange={() => handleChange(workerName)}
                        onBlur={() => {}}
                        key={workerName}
                        isChecked={selectedWorkerNames.includes(workerName)}
                    >
                        {workerName}
                    </ScriptCheckbox>
                ))}
            </div>

            <SecondaryBtn
                onClick={handleClick}
                className="mt-6 py-2 rounded-lg"
            >
                Сохранить
            </SecondaryBtn>
        </div>
    );
}
