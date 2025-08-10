import SecondaryBtn from '@/components/atoms/secondary-btn';
import ScriptCheckbox from '@/components/forms/script-checkbox';
import ScriptCheckboxSkeleton from '@/components/molecules/scripts/script-checkbox-skeleton';
import { useScripts } from '@/lib/hooks/scripts/use-scripts';
import { useGetScriptVehicleTypes } from '@/lib/hooks/vehicles/use-get-script-vehicle-types';
import { useUpdateScriptVehicleTypes } from '@/lib/hooks/vehicles/use-update-script-vehicle-types';
import { useVehicleTypes } from '@/lib/hooks/vehicles/use-vehicle-types';

import {
    createAllVehiclesArray,
    createSelectedVehiclesArray,
    generateSelectedVehicleIds,
} from '@/lib/utils/sort-script-vehicles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ScriptVehicles() {
    const { carwashId, id } = useParams();
    const { mutate: updateVehicles } = useUpdateScriptVehicleTypes(Number(id));

    const { data: scripts, isLoading: scriptsLoading } = useScripts(
        Number(carwashId)
    );

    const currentScript = scripts?.data.find(
        (script) => script.script_id === Number(id)
    );

    const isReady = currentScript?.script_status === 'Готов';

    const {
        data: selectedVehicles,
        isLoading: isLoadingSelectedVehicles,
        error: selectedVehiclesError,
    } = useGetScriptVehicleTypes(Number(id));
    const {
        data: allVehicles,
        isLoading: isLoadingAllVehicles,
        error: allVehiclesError,
    } = useVehicleTypes();

    const [allVehicleNames, setAllVehicleNames] = useState(
        createAllVehiclesArray(allVehicles)
    );
    const [selectedVehicleNames, setSelectedVehicleNames] = useState(
        createSelectedVehiclesArray(selectedVehicles)
    );

    useEffect(() => {
        setSelectedVehicleNames(createSelectedVehiclesArray(selectedVehicles));
    }, [isLoadingSelectedVehicles]);

    useEffect(() => {
        setAllVehicleNames(createAllVehiclesArray(allVehicles));
    }, [isLoadingAllVehicles]);

    function handleClick() {
        updateVehicles(
            generateSelectedVehicleIds(allVehicles, selectedVehicleNames)
        );
    }

    function handleChange(vehicleName: string) {
        if (selectedVehicleNames.includes(vehicleName)) {
            setSelectedVehicleNames((prev) =>
                prev.filter((vehicle) => vehicle !== vehicleName)
            );
        } else {
            setSelectedVehicleNames((prev) => [...prev, vehicleName]);
        }
    }

    if (isLoadingSelectedVehicles || isLoadingAllVehicles || scriptsLoading)
        return <ScriptCheckboxSkeleton />;
    if (selectedVehiclesError || allVehiclesError)
        return <p>Произошла ошибка загрузки типов авто, попробуйте позже</p>;

    return (
        <div className="mt-6 md:mt-8">
            <div className="grid gap-3">
                {allVehicleNames?.map((vehicleName) => (
                    <ScriptCheckbox
                        name={vehicleName}
                        onChange={() => handleChange(vehicleName)}
                        onBlur={() => {}}
                        key={vehicleName}
                        readonly={isReady === true}
                        isChecked={selectedVehicleNames.includes(vehicleName)}
                    >
                        {vehicleName}
                    </ScriptCheckbox>
                ))}
            </div>

            {isReady === false && <SecondaryBtn
                onClick={handleClick}
                className="mt-6 py-2 rounded-lg"
            >
                Сохранить
            </SecondaryBtn>}
        </div>
    );
}
