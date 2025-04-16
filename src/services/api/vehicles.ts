import { Car } from '@/lib/types/user';
import { CreateVehiclePayload, VehicleType } from '@/lib/types/vehicles';
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

export const fetchVehicles = async (): Promise<Car[]> => {
    const response = await axiosInstance.get<Car[]>(
        '/api/vehicles?is_grouped=false'
    );
    return response.data;
};

export const deleteVehicle = async (vehicle_id: number): Promise<void> => {
    await axiosInstance.delete('/api/delete_vehicle', {
        params: { vehicle_id },
    });
};
