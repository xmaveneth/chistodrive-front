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
