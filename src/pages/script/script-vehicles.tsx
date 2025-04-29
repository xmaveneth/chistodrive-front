import ScriptCheckbox from '@/components/forms/script-checkbox';
import useDebounce from '@/lib/hooks/utils/use-debounce';
import { useGetScriptVehicleTypes } from '@/lib/hooks/vehicles/use-get-script-vehicle-types';
import { useUpdateScriptVehicleTypes } from '@/lib/hooks/vehicles/use-update-script-vehicle-types';
import { useVehicleTypes } from '@/lib/hooks/vehicles/use-vehicle-types';
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

    useDebounce(
        () => {
            if (isLoadingSelectedVehicles === false) {
                updateVehicles(
                    generateSelectedVehicleIds(
                        allVehicles,
                        selectedVehicleNames
                    )
                );
            }
        },
        3000,
        [selectedVehicleNames]
    );

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
        return <p>Loading...</p>;
    if (selectedVehiclesError || allVehiclesError)
        return <p>Error loading vehicle types</p>;

    return (
        <div className="grid gap-3 mt-6 md:mt-8">
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
    );
}
