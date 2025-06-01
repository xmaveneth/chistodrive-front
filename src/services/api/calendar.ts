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

export async function applyCalendarSlot(
    date: string,
    script_version_id: number 
): Promise<string> {
    const response = await axiosInstance.post<string>(
        '/api/calendar/apply',
        null,
        {
            params: {
                date,
                script_version_id,
            },
        }
    );

    return response.data;
}

export async function activateCalendarSlot(
    date: string,
    car_wash_id: number 
): Promise<string> {
    const response = await axiosInstance.post<string>(
        '/api/calendar/activate',
        null,
        {
            params: {
                date,
                car_wash_id,
            },
        }
    );

    return response.data;
}


export async function deactivateCalendarSlot(
    date: string,
    car_wash_id: number 
): Promise<string> {
    const response = await axiosInstance.post<string>(
        '/api/calendar/deactivate',
        null,
        {
            params: {
                date,
                car_wash_id,
            },
        }
    );

    return response.data;
}


export async function clearAllCalendarDay(
    car_wash_id: number, 
    date_field: string
): Promise<string> {
    const response = await axiosInstance.post<string>(
        '/api/calendar/clear_all_day',
        null,
        {
            params: {
                date_field,
                car_wash_id,
            },
        }
    );

    return response.data;
}

export async function deleteCalendarSlot(
    slot_id: number,
    car_wash_id: number 
): Promise<string> {
    const response = await axiosInstance.delete<string>(
        '/api/calendar/delete_slot',
        {
            params: {
                slot_id,
                car_wash_id,
            },
        }
    );

    return response.data;
}

