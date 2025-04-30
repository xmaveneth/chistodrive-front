import { BoxesResponse, ScriptBoxesResponse } from '@/lib/types/boxes';
import { axiosInstance } from '@/services/api/axios-instance';

export async function getCarWashBoxes(
    car_wash_id: number
): Promise<BoxesResponse> {
    const response = await axiosInstance.get<BoxesResponse>(
        `/api/car_wash/${car_wash_id}/boxes`
    );
    return response.data;
}

export async function getScriptBoxes(
    script_id: number
): Promise<ScriptBoxesResponse> {
    const response = await axiosInstance.get<ScriptBoxesResponse>(
        `/api/script/${script_id}/boxes`
    );
    return response.data;
}

export async function updateScriptBoxes(
    script_id: number,
    boxIds: number[]
): Promise<string> {
    const response = await axiosInstance.patch<string>(
        `/api/script/${script_id}/boxes`,
        { data: boxIds }
    );

    return response.data;
}
