import { ScheduleData } from '@/lib/types/schedule';
import { axiosInstance } from './axios-instance';

export async function getCalendarData(
    car_wash_id: number,
    date_field: string
): Promise<ScheduleData> {
    const response = await axiosInstance.get<ScheduleData>(
        '/api/calendar/current_day',
        {
            params: {
                car_wash_id,
                date_field,
            },
        }
    );

    return response.data;
}
