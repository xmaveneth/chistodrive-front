import ScriptCheckbox from '@/components/forms/script-checkbox';
import { useGetScriptVehicleTypes } from '@/lib/hooks/vehicles/use-get-script-vehicle-types';
import { useVehicleTypes } from '@/lib/hooks/vehicles/use-vehicle-types';
import {
    createAllVehiclesArray,
    createSelectedVehiclesArray,
} from '@/lib/utils/script-vehicles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ScriptVehicles() {
    const { id } = useParams<{ id: string }>();
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
