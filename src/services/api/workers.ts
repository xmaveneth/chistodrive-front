import { ScriptWorkersResponse, WorkersResponse } from '@/lib/types/workers';
import { axiosInstance } from '@/services/api/axios-instance';

export async function getScriptWorkers(
    script_id: number
): Promise<ScriptWorkersResponse> {
    const response = await axiosInstance.get<ScriptWorkersResponse>(
        `/api/script/${script_id}/workers`
    );
    return response.data;
}

export async function updateScriptWorkers(
    script_id: number,
    workerIds: number[]
): Promise<string> {
    const response = await axiosInstance.patch<string>(
        `/api/script/${script_id}/workers`,
        { data: workerIds }
    );

    return response.data;
}

export async function getCarWashWorkers(
    car_wash_id: number
): Promise<WorkersResponse> {
    const response = await axiosInstance.get<WorkersResponse>(
        `/api/car_wash/${car_wash_id}/workers`
    );
    return response.data;
}
