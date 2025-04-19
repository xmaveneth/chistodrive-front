import { axiosInstance } from '@/services/api/axios-instance';

export const fetchCarwashes = async (city: string) => {
    const { data } = await axiosInstance.get(
        `/api/car_wash/index_page_car_washes?city=${city}`
    );
    return data;
};

export interface MakeAppointmentPayload {
    slot_id: number;
    vehicle_id: number;
}

export async function makeAppointment(
    payload: MakeAppointmentPayload
): Promise<string> {
    const response = await axiosInstance.post('/api/appointment', payload);
    return response.data;
}

export async function deleteAppointment(
    appointment_id: number
): Promise<string> {
    const response = await axiosInstance.delete('/api/appointment', {
        params: { appointment_id },
    });
    return response.data;
}
