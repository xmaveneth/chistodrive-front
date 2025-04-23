import {
    CarWash,
    CarWashListResponse,
    UpdateSchedulePayload,
} from '@/lib/types/admin';
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

export async function addFavouriteSlot(slot_id: number): Promise<string> {
    const response = await axiosInstance.post('/api/slot/favourite', null, {
        params: { slot_id },
    });
    return response.data;
}

export async function deleteFavouriteSlot(
    fav_slot_id: number
): Promise<string> {
    const response = await axiosInstance.delete('/api/slot/favourite', {
        params: { fav_slot_id },
    });

    return response.data;
}

export async function fetchAdminCarwashes(): Promise<CarWashListResponse> {
    const response = await axiosInstance.get(
        `/api/profile/car_wash_admin_list`
    );
    return response.data;
}

export const fetchCarwashById = async (id: number): Promise<CarWash> => {
    const response = await axiosInstance.get(`/api/car_wash/${id}`);
    return response.data;
};

export const updateCarwashSchedule = async ({
    car_wash_id,
    data,
}: UpdateSchedulePayload): Promise<string> => {
    const response = await axiosInstance.put(
        `/api/admin/car_wash/${car_wash_id}/schedule`,
        {
            data,
        }
    );

    return response.data;
};
