import SecondaryBtn from '@/components/atoms/secondary-btn';
import ScriptCheckbox from '@/components/forms/script-checkbox';
import { useGetScriptVehicleTypes } from '@/lib/hooks/vehicles/use-get-script-vehicle-types';
import { useUpdateScriptVehicleTypes } from '@/lib/hooks/vehicles/use-update-script-vehicle-types';
import { useVehicleTypes } from '@/lib/hooks/vehicles/use-vehicle-types';
import { range } from '@/lib/utils/range';
import {
    createAllVehiclesArray,
    createSelectedVehiclesArray,
    generateSelectedVehicleIds,
} from '@/lib/utils/script-vehicles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ScriptVehicles() {
    const { id } = useParams<{ id: string }>();
    const { mutate: updateVehicles } = useUpdateScriptVehicleTypes(Number(id));

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

    if (isLoadingSelectedVehicles || isLoadingAllVehicles)
        return <Skeleton />;
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
                        isChecked={selectedVehicleNames.includes(vehicleName)}
                    >
                        {vehicleName}
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

function Skeleton() {
    return (
        <div className="mt-6 md:mt-8 grid gap-3">
            {range(1, 7).map((index) => (
                <div
                    key={`skeleton-${index}`}
                    className="rounded-sm bg-gray-200 text-transparent animate-pulse w-max text-sm md:text-base"
                >
                    loading loading loading
                </div>
            ))}
        </div>
    );
}
