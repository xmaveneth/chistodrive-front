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
