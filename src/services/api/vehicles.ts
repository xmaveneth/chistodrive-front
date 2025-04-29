import { Car, VehicleTypeMap } from '@/lib/types/user';
import {
    CreateVehiclePayload,
    ScriptVehicleTypesResponse,
    VehicleType,
} from '@/lib/types/vehicles';
import { axiosInstance } from '@/services/api/axios-instance';

export const fetchVehicleTypes = async (): Promise<VehicleType[]> => {
    const response = await axiosInstance.get<VehicleType[]>(
        '/api/vehicle_types'
    );
    return response.data;
};

export const createVehicle = async (
    payload: CreateVehiclePayload
): Promise<void> => {
    await axiosInstance.post('/api/create_vehicle', payload);
};

export function fetchVehicles(isGrouped: true): Promise<VehicleTypeMap>;
export function fetchVehicles(isGrouped?: false): Promise<Car[]>;

export async function fetchVehicles(
    isGrouped: boolean = false
): Promise<Car[] | VehicleTypeMap> {
    const response = await axiosInstance.get<Car[] | VehicleTypeMap>(
        `/api/vehicles?is_grouped=${isGrouped}`
    );
    return response.data;
}

export const deleteVehicle = async (vehicle_id: number): Promise<void> => {
    await axiosInstance.delete('/api/delete_vehicle', {
        params: { vehicle_id },
    });
};

export async function getScriptVehicleTypes(
    script_id: number
): Promise<ScriptVehicleTypesResponse> {
    const response = await axiosInstance.get<ScriptVehicleTypesResponse>(
        `/api/script/${script_id}/vehicle_types`
    );
    return response.data;
}
