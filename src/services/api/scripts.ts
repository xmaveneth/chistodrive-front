import { ScriptsResponse } from '@/lib/types/scripts';
import { axiosInstance } from '@/services/api/axios-instance';

export async function fetchScripts(
    carWashId: number
): Promise<ScriptsResponse> {
    const response = await axiosInstance.get<ScriptsResponse>('/api/scripts', {
        params: { car_wash_id: carWashId },
    });

    return response.data;
}

export async function createScript(
    name: string,
    car_wash_id: number
): Promise<string> {
    const response = await axiosInstance.post<string>('/api/create_script', {
        name,
        car_wash_id,
    });

    return response.data;
}

export async function deleteScript(script_id: number): Promise<string> {
    const response = await axiosInstance.delete<string>('/api/delete_script', {
        params: { script_id },
    });

    return response.data;
}
