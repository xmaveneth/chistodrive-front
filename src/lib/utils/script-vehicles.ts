import { ScriptVehicleTypesResponse, VehicleType } from '@/lib/types/vehicles';

export function createAllVehiclesArray(rawVehicles: VehicleType[] | undefined) {
    if (rawVehicles == null) return [];

    return rawVehicles.map((vehicle) => vehicle.ru_name);
}

export function createSelectedVehiclesArray(rawVehicles: ScriptVehicleTypesResponse | undefined) {
    if (rawVehicles == null || rawVehicles.data == null) return [];

    return rawVehicles.data.map((vehicle) => vehicle.ru_name);
}
