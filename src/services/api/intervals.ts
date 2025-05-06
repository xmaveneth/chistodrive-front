import { ScheduleIntervalsResponse } from '@/lib/types/intervals';
import { axiosInstance } from '@/services/api/axios-instance';

export const getScriptIntervals = async (
    script_id: number
): Promise<ScheduleIntervalsResponse> => {
    const response = await axiosInstance.get<ScheduleIntervalsResponse>(
        `/api/script/${script_id}/intervals`
    );

    return response.data;
};

export const createScriptInterval = async (
    script_id: number,
    service_param_id: number,
    start_time: string,
    end_time: string
): Promise<string> => {
    const response = await axiosInstance.post<string>(
        `/api/script/${script_id}/intervals`,
        {
            service_param_id,
            start_time,
            end_time,
        }
    );

    return response.data;
};

export const deleteScriptInterval = async (
    script_id: number,
    interval_id: number
): Promise<string> => {
    const response = await axiosInstance.delete<string>(
        `/api/script/${script_id}/intervals`,
        { params: { interval_id } }
    );

    return response.data;
};

export const updateScriptInterval = async (
    script_id: number,
    interval_id: number,
    price: number,
    workers: { script_worker_id: number; prio_num: number }[],
    boxes: { script_box_id: number; prio_num: number }[]
): Promise<string> => {
    const response = await axiosInstance.patch<string>(
        `/api/script/${script_id}/intervals`,
        {
            interval_id,
            price,
            workers,
            boxes,
        }
    );

    return response.data;
};
