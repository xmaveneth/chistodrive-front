import { CarWashServicesResponse } from '@/lib/types/service-params';
import {
    ScriptWorkersResponse,
    WorkerAssignmentsResponse,
    WorkersResponse,
} from '@/lib/types/workers';
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

export const getCarWashServices = async (
    car_wash_id: number,
    service_category_id?: number | null
): Promise<CarWashServicesResponse> => {
    const response = await axiosInstance.get<CarWashServicesResponse>(
        `/api/car_wash/${car_wash_id}/services`,
        {
            params:
                service_category_id != null
                    ? { service_category_id }
                    : undefined,
        }
    );

    return response.data;
};

export async function assignScriptWorker(
    script_id: number,
    script_worker_id: number,
    script_box_id: number
): Promise<string> {
    const response = await axiosInstance.post<string>(
        `/api/script/${script_id}/assign_worker`,
        {
            script_worker_id,
            script_box_id,
        }
    );
    return response.data;
}

export async function unassignScriptWorker(
    script_id: number,
    assignment_id: number
): Promise<string> {
    const response = await axiosInstance.delete<string>(
        `/api/script/${script_id}/unassign_worker`,
        {
            params: { assignment_id },
        }
    );
    return response.data;
}

export async function getAssignedScriptWorkers(
    script_id: number
): Promise<WorkerAssignmentsResponse> {
    const response = await axiosInstance.get<WorkerAssignmentsResponse>(
        `/api/script/${script_id}/assign_worker`
    );
    return response.data;
}

export async function createCarwashWorker(
    car_wash_id: number,
    full_name: string,
    job_title: string
): Promise<string> {
    const response = await axiosInstance.post<string>(
        `/api/car_wash/${car_wash_id}/workers`,
        {
            full_name,
            job_title,
        }
    );
    return response.data;
}
