import { AppointmentResponse, FiltersPayload, FiltersResponse } from '@/lib/types/appointments';
import { axiosInstance } from './axios-instance';

export async function getCarwashAppointments(
    car_wash_id: number,
    payload: FiltersPayload
): Promise<AppointmentResponse> {
    const response = await axiosInstance.post<AppointmentResponse>(
        `/api/car_wash/${car_wash_id}/appointments`, payload
    );
    return response.data;
}

export async function getFilterValues(
    car_wash_id: number
): Promise<FiltersResponse> {
    const response = await axiosInstance.get<FiltersResponse>(
        `/api/car_wash/${car_wash_id}/filter_values`
    );
    return response.data;
}

export async function updateCarwashAppointment(
    car_wash_id: number,
    appointment_id: number,
    status_id: number
): Promise<string> {
    const response = await axiosInstance.patch<string>(
        `/api/car_wash/${car_wash_id}/appointments`,
        {
            appointment_id,
            status_id,
        }
    );
    return response.data;
}
