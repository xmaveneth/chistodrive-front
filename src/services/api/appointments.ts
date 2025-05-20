import { AppointmentResponse, FiltersResponse } from "@/lib/types/appointments";
import { axiosInstance } from "./axios-instance";

export async function getCarwashAppointments(
    car_wash_id: number
): Promise<AppointmentResponse> {
    const response = await axiosInstance.get<AppointmentResponse>(
        `/api/car_wash/${car_wash_id}/appointments`
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

