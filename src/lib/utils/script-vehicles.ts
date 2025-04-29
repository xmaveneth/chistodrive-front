import { ScriptVehicleTypesResponse, VehicleType } from '@/lib/types/vehicles';

export function createAllVehiclesArray(rawVehicles: VehicleType[] | undefined) {
    if (rawVehicles == null) return [];

    return rawVehicles.map((vehicle) => vehicle.ru_name);
}

export function createSelectedVehiclesArray(
    rawVehicles: ScriptVehicleTypesResponse | undefined
) {
    if (rawVehicles == null || rawVehicles.data == null) return [];

    return rawVehicles.data.map((vehicle) => vehicle.ru_name);
}

export function generateSelectedVehicleIds(
    rawVehicles: VehicleType[] | undefined,
    selectedVehicleNames: string[]
) {
    const result: number[] = [];
    if (rawVehicles == null) return result;

    selectedVehicleNames.forEach((vehicleName) => {
        const detectedVehicle = rawVehicles.find(
            (rawVehicle) => rawVehicle.ru_name === vehicleName
        );

        if (detectedVehicle != null) {
            result.push(detectedVehicle.id);
        }
    });

    return result;
}
